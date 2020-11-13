<script lang="ts">
    import axios from "axios";
    import { getContext } from "svelte";
    import router from "page";
    import { getToken, getUserId } from "../auth";

    import type { Post, Comment as CommentType } from "../types";
    import Comment from "../components/Comment.svelte";
    import ErrorAlert from "../components/ErrorAlert.svelte";

    export let params: { username: string; postId: string };
    const apiUrl = getContext("apiUrl");
    const auth = !!getToken();

    let commentError: string | null = null;

    async function getPost(): Promise<Post> {
        try {
            const { data } = await axios.get<Post>(
                apiUrl + "/posts/" + params.postId
            );
            if (data.user)
                if (data.user.username !== params.username)
                    router.redirect("/404");
            return data;
        } catch (err) {
            if (err.response.status === 404) router.redirect("/404");
            else {
                console.log({ error: err });
                throw new Error(
                    "Request failed with status: " +
                        err.response.status +
                        "\nCheck the console for further details."
                );
            }
        }
    }

    async function getComments(post: Post): Promise<CommentType[]> {
        try {
            let comments: CommentType[] = [];
            for (let i = 0; i < post.comments.length; i++) {
                const { data } = await axios.get<CommentType>(
                    apiUrl + "/comments/" + post.comments[i].id
                );
                comments.push(data);
            }

            return comments;
        } catch (err) {
            if (err.response) {
                console.log({ err });
                if (err.response.status === 404) router.redirect("/404");
                else {
                    console.log({ error: err });
                    throw new Error(
                        "Request failed with status: " +
                            err.response.status +
                            "\nCheck the console for further details."
                    );
                }
            } else throw new Error(err);
        }
    }

    function newComment(postId: number) {
        // "as HTMLInputElement" is supported in TypeScript only.
        const userId: number | null = getUserId();
        if (!userId) {
            window.location.href =
                "/auth?action=login&next=" + window.location.pathname;
            return;
        }

        const content = (
            (document.getElementById("comment") as HTMLInputElement).value || ""
        ).trim();
        if (!content) return;

        axios
            .post<Comment>(
                apiUrl + "/comments",
                {
                    content,
                    post: postId,
                    user: userId,
                },
                {
                    headers: {
                        Authorization: "Bearer " + getToken(),
                    },
                }
            )
            .then(() => window.location.reload())
            .catch((error) => {
                if (error.response) {
                    if (
                        error.response.status === 401 ||
                        error.response.status === 403
                    )
                        window.location.href =
                            "/auth?action=login&next=" +
                            window.location.pathname;
                    else {
                        commentError = "";
                        for (let message of error.response.data.message[0]
                            .messages) {
                            commentError += `${message.message}\n`;
                        }
                    }
                } else commentError = error;
            });
    }
</script>

<style>
    #comment-form {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 80% 20%;
        margin: 1rem 0;
    }

    .post {
        width: 50%;
        margin: 0 auto;
    }

    @media (max-width: 992px) {
        .post {
            width: 70%;
        }
    }

    @media (max-width: 600px) {
        .post {
            width: 90%;
        }
    }
</style>

{#await getPost()}
    <div class="w3-center w3-section w3-xxlarge w3-spin">
        <i class="fas fa-spinner" />
    </div>
{:then post}
    <div class="w3-card post">
        <a
            href={post.image.provider === 'local' && getContext('apiUrl') + post.image.url}><img
                src={post.image.provider === 'local' ? getContext('apiUrl') + post.image.url : post.image.url}
                alt={post.image.alternativeText || 'Post image'}
                style="width: 100%" /></a>
        <div class="w3-container">
            <p class="w3-small w3-text-gray">
                <a
                    href="/@{post.user.username}"
                    style="text-decoration: none">@{post.user.username}</a>
            </p>
            <p>{post.content}</p>
        </div>
    </div>

    <div class="w3-card post w3-margin-top">
        <header class="w3-container w3-border-bottom w3-border-light-gray">
            <h3>Comments</h3>
        </header>
        <div class="w3-container">
            {#if auth}
                {#if commentError}
                    <ErrorAlert message={commentError} />
                {/if}
                <form
                    on:submit|preventDefault={() => newComment(post.id)}
                    id="comment-form">
                    <input
                        type="text"
                        class="w3-input w3-border"
                        placeholder="Type your comment here"
                        id="comment" />
                    <button
                        class="w3-button w3-blue w3-hover-blue w3-border w3-border-blue"
                        type="submit">Add</button>
                </form>
            {/if}
            {#await getComments(post)}
                <div class="w3-center w3-section w3-xxlarge w3-spin">
                    <i class="fas fa-spinner" />
                </div>
            {:then comments}
                {#each comments as comment}
                    <Comment {comment} />
                {/each}
            {:catch err}
                <div
                    class="w3-panel w3-pale-red w3-padding w3-leftbar w3-border-red w3-text-red">
                    {err}
                </div>
            {/await}
        </div>
    </div>
{:catch err}
    <div
        class="w3-panel w3-pale-red w3-padding w3-leftbar w3-border-red w3-text-red">
        {err}
    </div>
{/await}

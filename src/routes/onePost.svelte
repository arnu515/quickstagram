<script lang="ts">
    import axios from "axios";
    import { getContext } from "svelte";
    import router from "page";

    import type { Post, Comment as CommentType } from "../types";
    import Comment from "../components/Comment.svelte";

    export let params: { username: string; postId: string };
    const apiUrl = getContext("apiUrl");

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
</script>

<style>
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
            href={post.image[0].provider === 'local' && getContext('apiUrl') + post.image[0].url}><img
                src={post.image[0].provider === 'local' && getContext('apiUrl') + post.image[0].url}
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

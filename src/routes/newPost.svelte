<script lang="ts">
    import { getContext, onMount } from "svelte";
    import { getToken, getUser, getUserId } from "../auth";
    import ErrorAlert from "../components/ErrorAlert.svelte";
    import axios from "axios";
    import type { User, Image as ImageType, Post } from "../types";

    const apiUrl = getContext("apiUrl");
    const user: User = getUser();
    onMount(() => {
        if (!getToken() || !user)
            window.location.href =
                "/auth?action=login&next=" + window.location.pathname;
    });

    let loading = false;
    let error: string | null = null;
    let file: File;
    let content = "";

    function chooseFile() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.addEventListener("change", ({ target }) => {
            if ((target as HTMLInputElement).files.length === 1) {
                file = (target as HTMLInputElement).files[0];
            }
        });

        input.click();
    }

    function newPost() {
        if (!content || !content.trim()) {
            error = "Enter some content";
            return;
        }
        if (!file) {
            error = "Please choose a file";
            return;
        }
        if (file.type.split("/")[0] !== "image") {
            error = "Please choose an image";
            return;
        }
        content = content.trim();

        let fd = new FormData();
        fd.append("files", file);

        loading = true;

        // uploading file
        axios
            .post<ImageType[]>(apiUrl + "/upload", fd, {
                headers: {
                    "Content-Type": "multipart/formdata",
                    Authorization: "Bearer " + getToken(),
                },
            })
            .then(({ data }) => {
                const imageId: number = data[0].id;

                // creating the post itself
                axios
                    .post<Post>(
                        apiUrl + "/posts",
                        {
                            image: imageId,
                            user: getUserId(),
                            content,
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + getToken(),
                            },
                        }
                    )
                    .then(({ data }) => {
                        window.location.href = `/@${data.user.username}/${data.id}`;
                    })
                    .catch((err) => {
                        if (err.response) {
                            if (
                                err.response.status === 401 ||
                                err.response.status === 400
                            )
                                window.location.href =
                                    "/auth?action=login&next=" +
                                    window.location.pathname;
                            else {
                                error = "";
                                for (let message of err.response.data.message[0]
                                    .messages) {
                                    error += `${message.message}\n`;
                                }
                            }
                        } else error = err;
                    });
            })
            .catch((err) => {
                if (err.response) {
                    if (
                        err.response.status === 401 ||
                        err.response.status === 400
                    )
                        window.location.href =
                            "/auth?action=login&next=" +
                            window.location.pathname;
                    else {
                        error = "";
                        for (let message of err.response.data.message[0]
                            .messages) {
                            error += `${message.message}\n`;
                        }
                    }
                } else error = err;
            });
    }
</script>

{#if user}
    <h1 class="w3-center w3-xxxlarge">New post</h1>
    <p class="w3-center w3-text-gray">Logged in as: {user.username}</p>

    <div class="w3-card w3-margin">
        {#if loading}
            <div class="w3-center w3-container">
                <i class="fas fa-spinner fa-spin fa-5x w3-margin" />
                <p class="w3-xlarge">Uploading...</p>
            </div>
        {:else}
            <form class="w3-container" on:submit|preventDefault={newPost}>
                {#if error}
                    <ErrorAlert message={error} />
                {/if}
                <div class="w3-section">
                    {#if file}
                        <p>Chosen image: {file.name}</p>
                    {:else}
                        <button
                            type="button"
                            on:click={chooseFile}
                            class="w3-button w3-white w3-border">Choose image</button>
                    {/if}
                </div>
                <div class="w3-section">
                    <label for="content">Post content</label>
                    <textarea
                        id="content"
                        rows="5"
                        bind:value={content}
                        class="w3-input w3-border" />
                </div>
                <div class="w3-section">
                    <button
                        type="submit"
                        class="w3-button w3-blue w3-border w3-border-blue w3-hover-blue"
                        style="width: 100%">Post</button>
                </div>
            </form>
        {/if}
    </div>
{/if}

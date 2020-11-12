<script lang="ts">
    import axios from "axios";
    import { getContext } from "svelte";
    import { getToken } from "../auth";
    import Post from "../components/Post.svelte";
    import type { Post as PostType } from "../types";

    const auth = !!getToken();

    async function getPosts(): Promise<PostType[]> {
        try {
            const { data } = await axios.get<PostType[]>(
                getContext("apiUrl") + "/posts?_sort=created_at:DESC"
            );
            return data;
        } catch (err) {
            console.log({ error: err });
            throw new Error(
                "Request failed with status: " +
                    err.response.status +
                    "\nCheck the console for further details."
            );
        }
    }
</script>

<h1 class="w3-xxxlarge w3-center">Posts</h1>
<div class="w3-center">
    {#if auth}
        <a
            href="/new"
            class="w3-button w3-blue w3-border w3-border-blue w3-hover-blue">New
            Post</a>
    {:else}
        <p><a href="/login">Login</a> to create posts</p>
    {/if}
</div>

{#await getPosts()}
    <div class="w3-center w3-section w3-xxlarge w3-spin">
        <i class="fas fa-spinner" />
    </div>
{:then posts}
    <div class="w3-container w3-margin">
        {#each posts as post}
            <Post {post} />
        {/each}
    </div>
{:catch err}
    <div
        class="w3-panel w3-pale-red w3-padding w3-leftbar w3-border-red w3-text-red">
        {err}
    </div>
{/await}

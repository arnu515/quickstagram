<script lang="ts">
    import axios from "axios";
    import PostComponent from "../components/Post.svelte";
    import { getContext } from "svelte";
    import type { Post } from "../types";

    export let params: { username: string };
    const apiUrl: string = getContext("apiUrl");

    async function getPosts(): Promise<Post[]> {
        try {
            const { data } = await axios.get<Post[]>(
                getContext("apiUrl") + "/posts"
            );
            return data.filter((post) => {
                if (post.user.username === params.username) return post;
            });
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
{#await getPosts()}
    <div class="w3-center w3-section w3-xxlarge w3-spin">
        <i class="fas fa-spinner" />
    </div>
{:then posts}
    <div class="w3-container w3-margin">
        {#each posts as post}
            <PostComponent {post} />
        {/each}
    </div>
{:catch err}
    <div
        class="w3-panel w3-pale-red w3-padding w3-leftbar w3-border-red w3-text-red">
        {err}
    </div>
{/await}

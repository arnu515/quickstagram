<script lang="ts">
    import { getContext } from "svelte";

    import type { Post } from "../types";

    export let post: Post;
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

<div class="w3-card post w3-section">
    <a href="/@{post.user.username}/{post.id}"><img
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
    <footer class="w3-bar w3-border-top w3-border-light-gray">
        <a
            href="/@{post.user.username}/{post.id}"
            class="w3-bar-item w3-button w3-text-blue"
            style="width:100%">{post.comments.length}
            {post.comments.length === 1 ? 'Comment' : 'Comments'}</a>
    </footer>
</div>

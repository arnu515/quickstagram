<script lang="ts">
    import type { Comment } from "../types";

    export let comment: Comment;
</script>

<div class="w3-section">
    <p class="w3-tiny w3-text-gray" style="margin-bottom: 0.2rem">
        {comment.user.username}
    </p>
    <p class="w3-small" style="margin-top: 0">{comment.content}</p>
</div>

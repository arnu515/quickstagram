<script lang="ts">
    import { onMount } from "svelte";
    import { clearToken } from "../auth";

    export let queryString: { next: string };

    onMount(() => {
        clearToken();

        // Using window.location.href instead of router.redirect to refresh the page
        // so that components like Navbar update too
        window.location.href = queryString.next || "/";
    });
</script>

<h1 class="w3-center w3-xxlarge">Logging you out...</h1>

<script lang="ts">
    import Auth from "../components/Auth.svelte";
    import router from "page";
    import { onMount } from "svelte";
    import { getToken } from "../auth";

    export const params = {};
    export let queryString: { action: "login" | "register"; next: string };

    onMount(() => {
        if (getToken()) router.redirect(queryString.next || "/posts");
    });
</script>

<Auth authMode={queryString.action} next={queryString.next} />

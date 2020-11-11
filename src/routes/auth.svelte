<script lang="ts">
    import Auth from "../components/Auth.svelte";
    import router from "page";

    export const params = {};
    export let queryString: { action: "login" | "register"; next: string };
</script>

<Auth
    authMode={queryString.action}
    on:auth={() => router.redirect(queryString.next)} />

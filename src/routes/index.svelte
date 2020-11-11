<script lang="ts">
    import Auth from "../components/Auth.svelte";

    export const queryString = {};
    export const params = {};
</script>

<div class="w3-container">
    <h1 class="w3-center w3-xxxlarge">Quickstagram</h1>
    <p class="w3-center w3-large w3-text-gray">Instagram, but quicker!</p>

    <div class="w3-center">
        <a
            href="/auth?action=register"
            class="w3-button w3-blue w3-border w3-border-blue w3-hover-blue">Register</a>
        <a
            href="/auth?action=login"
            class="w3-button w3-white w3-border w3-border-black w3-hover-white">Login</a>
    </div>

    <Auth />
</div>

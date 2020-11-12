<script lang="ts">
    import { slide } from "svelte/transition";
    import { getToken } from "../auth";

    const auth = !!getToken();
    let active = false;
</script>

<style>
    .toggler {
        display: none;
    }

    @media (max-width: 600px) {
        .logo {
            display: block;
            width: 100%;
        }
        .logo .toggler {
            float: right;
            display: initial;
        }
        .nav {
            display: flex;
            width: 100%;
            flex-direction: column;
        }

        .nav a {
            text-align: left;
        }
    }
</style>

<div class="w3-bar w3-blue">
    <div class="logo">
        <a
            href="/"
            class="w3-bar-item w3-text-white w3-button w3-hover-blue">Quickstagram</a>
        <button
            class="toggler w3-button w3-blue w3-hover-blue"
            on:click={() => (active = !active)}>
            <i class="fas fa-{active ? 'times' : 'bars'}" /></button>
    </div>
    <div class="w3-right w3-hide-small">
        {#if auth}
            <a href="/new" class="w3-bar-item w3-button w3-hover-blue">New post</a>
            <a
                href="/logout"
                class="w3-bar-item w3-button w3-hover-blue">Logout</a>
        {:else}
            <a
                href="/auth?action=login"
                class="w3-bar-item w3-button w3-hover-blue">Login</a>
            <a
                href="/auth?action=register"
                class="w3-bar-item w3-button w3-purple w3-hover-purple">Register</a>
        {/if}
    </div>
    {#if active}
        <div class="w3-right nav w3-hide-large w3-hide-medium" transition:slide>
            {#if auth}
                <a href="/new" class="w3-bar-item w3-button w3-hover-blue">New
                    post</a>
                <a
                    href="/logout"
                    class="w3-bar-item w3-button w3-hover-blue">Logout</a>
            {:else}
                <a
                    href="/auth?action=login"
                    class="w3-bar-item w3-button w3-hover-blue">Login</a>
                <a
                    href="/auth?action=register"
                    class="w3-bar-item w3-button w3-purple w3-hover-purple">Register</a>
            {/if}
        </div>
    {/if}
</div>

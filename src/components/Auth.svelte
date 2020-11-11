<script lang="ts">
    import Error from "./ErrorAlert.svelte";
    import { fade } from "svelte/transition";

    type AuthMode = "login" | "register";

    export let authMode: AuthMode = "register";

    let loginError: string | null = null;
    let registerError: string | null = null;

    let email = "";
    let password = "";
    let cpassword = "";
    let username = "";

    function login() {
        email = email.trim();
        password = password.trim();

        if (!email || !password) {
            loginError = "Fill out all fields!";
            return;
        }
        loginError = null;
    }

    function register() {
        email = email.trim();
        password = password.trim();
        cpassword = cpassword.trim();
        username = username.trim();

        if (!email || !password || !cpassword || !username) {
            registerError = "Fill out all fields!";
            return;
        }
        registerError = null;
    }
</script>

<style>
    .auth-box {
        width: 40%;
        margin: 1rem auto;
    }

    @media (max-width: 600px) {
        .auth-box {
            width: 80%;
        }
    }
</style>

<div class="w3-container">
    <div class="w3-card-4 w3-border w3-border-black auth-box">
        <div class="w3-bar w3-border-bottom w3-border-gray">
            <button
                style="width: 50%"
                on:click={() => (authMode = 'login')}
                class="w3-bar-item w3-button w3-{authMode === 'login' ? 'blue' : 'white'} w3-hover-{authMode === 'login' ? 'blue' : 'light-gray'}">Login</button>
            <button
                style="width: 50%"
                on:click={() => (authMode = 'register')}
                class="w3-bar-item w3-button w3-{authMode === 'register' ? 'blue' : 'white'} w3-hover-{authMode === 'register' ? 'blue' : 'light-gray'}">Register</button>
        </div>
        <div class="w3-container">
            <h3>{authMode === 'login' ? 'Login' : 'Register'}</h3>

            {#if authMode === 'login'}
                <form on:submit|preventDefault={login} in:fade>
                    {#if loginError}
                        <Error message={loginError} />
                    {/if}
                    <div class="w3-section">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            bind:value={email}
                            placeholder="Enter your email"
                            id="email"
                            class="w3-input w3-border w3-border-black" />
                    </div>
                    <div class="w3-section">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            bind:value={password}
                            placeholder="Enter your password"
                            id="password"
                            class="w3-input w3-border w3-border-black" />
                    </div>
                    <div class="w3-section">
                        <button
                            class="w3-button w3-blue w3-hover-blue w3-border w3-border-blue">Login</button>
                        <button
                            class="w3-button w3-white w3-hover-light-gray w3-border w3-border-black"
                            on:click={() => (authMode = 'register')}>Register</button>
                    </div>
                </form>
            {:else}
                <form on:submit|preventDefault={register} in:fade>
                    {#if registerError}
                        <Error message={registerError} />
                    {/if}
                    <div class="w3-section">
                        <label for="username">Username</label>
                        <input
                            type="text"
                            bind:value={username}
                            placeholder="Enter a username"
                            id="username"
                            class="w3-input w3-border w3-border-black" />
                    </div>
                    <div class="w3-section">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            bind:value={email}
                            placeholder="Enter your email"
                            id="email"
                            class="w3-input w3-border w3-border-black" />
                    </div>
                    <div class="w3-section">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            bind:value={password}
                            placeholder="Enter a password"
                            id="password"
                            class="w3-input w3-border w3-border-black" />
                    </div>
                    <div class="w3-section">
                        <label for="cpassword">Confirm Password</label>
                        <input
                            type="password"
                            bind:value={cpassword}
                            placeholder="Re-enter that password"
                            id="cpassword"
                            class="w3-input w3-border w3-border-black" />
                    </div>
                    <div class="w3-section">
                        <button
                            class="w3-button w3-blue w3-hover-blue w3-border w3-border-blue">Register</button>
                        <button
                            class="w3-button w3-white w3-hover-light-gray w3-border w3-border-black"
                            on:click={() => (authMode = 'login')}>Login</button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
</div>

<script lang="ts">
    import { setContext } from "svelte";
    import router from "page";
    import { parse } from "qs";

    import Index from "./routes/index.svelte";
    import Navbar from "./components/Navbar.svelte";
    import Auth from "./routes/auth.svelte";
    import Posts from "./routes/posts.svelte";
    import OnePost from "./routes/onePost.svelte";
    import NotFound from "./routes/NotFound.svelte";
    import UserProfile from "./routes/userProfile.svelte";
    import Logout from "./routes/logout.svelte";
    import NewPost from "./routes/newPost.svelte";

    export let strapiApiUrl: string;

    let page;
    let params;
    let queryString;

    function setupRouteParams(ctx: PageJS.Context, next) {
        params = ctx.params;
        queryString = parse(ctx.querystring);
        next();
    }

    router("/", setupRouteParams, () => (page = Index));
    router("/auth", setupRouteParams, () => (page = Auth));
    router("/posts", setupRouteParams, () => (page = Posts));
    router("/@:username/:postId", setupRouteParams, () => (page = OnePost));
    router("/@:username", setupRouteParams, () => (page = UserProfile));
    router("/logout", setupRouteParams, () => (page = Logout));
    router("/new", setupRouteParams, () => (page = NewPost));
    router("/*", () => (page = NotFound));

    router.start();

    setContext("apiUrl", strapiApiUrl);
</script>

<Navbar />
<svelte:component this={page} {params} {queryString} />

<script>
  import "../app.css";
  import Header from "$lib/components/navigation/header.svelte";
  import { page } from "$app/stores";
  const user = $page.data.user;
</script>

<Header>
  <li><a href="/">Home</a></li>
  {#if user}
    <li><a href="/profile" class="capitalize">{user.username}</a></li>
    <li>
      <form action="/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    </li>
  {:else}
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
  {/if}
</Header>
<slot />

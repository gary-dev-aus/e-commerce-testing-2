<script>
  import { page } from "$app/stores";
  const user = $page.data.user;
</script>

<h1>Welcome, <span class="capitalize">{user.username}</span></h1>

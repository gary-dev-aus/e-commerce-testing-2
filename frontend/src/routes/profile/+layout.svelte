<script>
  import Header from "$lib/components/navigation/header.svelte";
</script>

<Header>
  <li><a href="/profile">Dashboard</a></li>
  <li><a href="/profile/products">Products</a></li>
</Header>
<slot />

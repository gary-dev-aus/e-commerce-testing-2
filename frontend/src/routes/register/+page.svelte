<script>
  import Form from "$lib/components/form/form.svelte";

  let form = {};
  $: errors = form.errors;
</script>

<h1>Register</h1>
<Form method="POST" action="/users" bind:form>
  <label for="username">Username</label>
  <input type="text" name="username" id="username" required />
  {#if errors?.username}
    <p>{errors.username}</p>
  {/if}
  <label for="email">Email</label>
  <input type="email" name="email" id="email" required />
  {#if errors?.email}
    <p>{errors.email}</p>
  {/if}
  <label for="password">Password</label>
  <input type="password" name="password" id="password" required />
  {#if errors?.password}
    <p>{errors.password}</p>
  {/if}
  <button type="submit">Register</button>
</Form>

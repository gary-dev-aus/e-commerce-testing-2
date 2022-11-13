<script>
  import Form from "$lib/components/form/form.svelte";

  let form = {};
  $: errors = form.errors;
</script>

<h1>Login</h1>
<Form method="POST" action="/auth" bind:form>
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    id="email"
    value={form?.name ?? ""}
    required
  />
  {#if errors?.email}
    <p>{errors.email}</p>
  {/if}
  <label for="password">Password</label>
  <input
    type="password"
    name="password"
    id="password"
    value={form?.name ?? ""}
    required
  />
  {#if errors?.password}
    <p>{errors.password}</p>
  {/if}
  <button type="submit">Login</button>
</Form>

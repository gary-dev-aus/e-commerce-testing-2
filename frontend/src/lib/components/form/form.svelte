<script>
  import { invalidateAll } from "$app/navigation";
  import { fetchData } from "$lib/functions/fetchData";

  export let action;
  export let method;
  export let form;
  export let token;
  export let onSubmit = () => {};

  async function handleSubmit() {
    const data = new FormData(this);

    form.errors = {};

    const result = fetchData(token, data, method, action);

    if (result.errors) {
      result.errors.forEach((error) => {
        form.errors[error.path] = error.message;
      });
    } else {
      invalidateAll();
      if (onSubmit) {
        onSubmit();
      }
    }
  }
</script>

<form class="flex flex-col" on:submit|preventDefault={handleSubmit}>
  <slot />
</form>

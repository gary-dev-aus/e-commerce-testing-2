<script>
  import Form from "$lib/components/form/form.svelte";
  import { PUBLIC_API_URI } from "$env/static/public";
  import { invalidateAll } from "$app/navigation";

  export let data;
  let form = {};
  $: errors = form.errors;
  $: products = data.products.products;
  $: isEditingProduct = false;
  function toggleEditingProduct() {
    isEditingProduct = !isEditingProduct;
  }

  async function removeProduct(id) {
    const response = await fetch(PUBLIC_API_URI + "/products/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      credentials: "include",
    }).catch((error) => {
      console.log(error);
    });

    const result = await response.json();

    if (result.errors) {
      result.errors.forEach((error) => {
        form.errors[error.path] = error.message;
      });
    } else {
      invalidateAll();
    }
  }
</script>

<h1>Products</h1>

{#each products as product (product.id)}
  <div class="mb-4">
    <p class="capitalize">{product.title}</p>
    <p>{product.price ?? "No price set"}</p>
    <div class="flex flex-row space-x-2">
      <button on:click={toggleEditingProduct}>Edit</button>
      <button on:click={removeProduct(product.id)}>Remove</button>
    </div>
    {#if isEditingProduct}
      <Form
        action={"/products/" + product.id}
        method="POST"
        token={data.token}
        bind:form
        onSubmit={toggleEditingProduct}
      >
        <label for="title">Title</label>
        <input type="text" name="title" value={product.title} />
        <label for="price">Price</label>
        <input type="number" name="price" value={product.price} />
        <button type="submit">Save</button>
      </Form>
    {/if}
  </div>
{/each}

<h2>Add product</h2>
<Form method="POST" action="/products" bind:form token={data.token}>
  <label for="title">Title</label>
  <input
    type="title"
    name="title"
    id="title"
    value={form?.name ?? ""}
    required
  />
  {#if errors?.title}
    <p>{errors.title}</p>
  {/if}
  <label for="price">Price</label>
  <input type="price" name="price" id="price" value={form?.name ?? ""} />
  {#if errors?.price}
    <p>{errors.price}</p>
  {/if}
  <button type="submit">Add product</button>
</Form>

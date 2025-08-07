<script lang="ts">
  import Dashboard from '$features/admin/components/Dashboard.svelte'
  let title = 'Admin Dashboard - SvelteKit Scaleable App'
  let description = 'Admin Dashboard for managing the application.'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="noindex" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="og:title" content={title} />
  <meta name="og:description" content={description} />
</svelte:head>

<Dashboard />

<script lang="ts">
  import Setting from '$features/admin/components/Setting.svelte'
  
  const title = 'System Settings - SvelteKit Scaleable App'
  const description = 'ปรับแต่งค่าพื้นฐาน ความปลอดภัย การแจ้งเตือน และธีมของระบบ'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="noindex" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="og:title" content={title} />
  <meta name="og:description" content={description} />
</svelte:head>

<Setting />

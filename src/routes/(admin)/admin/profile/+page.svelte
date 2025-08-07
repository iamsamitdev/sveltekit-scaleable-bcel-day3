<script lang="ts">
  import Profile from '$features/admin/components/Profile.svelte'
  
  const title = 'User Profile - SvelteKit Scaleable App'
  const description = 'ดูและแก้ไขข้อมูลส่วนตัว ความปลอดภัย และกิจกรรมล่าสุด'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="noindex" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="og:title" content={title} />
  <meta name="og:description" content={description} />
</svelte:head>

<Profile />


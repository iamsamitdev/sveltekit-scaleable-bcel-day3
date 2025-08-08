<script lang="ts">
  import Users from "$features/admin/components/Users.svelte"

  let { data } = $props()
  const users = (data as any).users || []

  const title = "Manage Users - SvelteKit Scaleable App"
  const description = "จัดการผู้ใช้งาน ค้นหา กรอง และจัดการบทบาท/สถานะ"

  console.log(users)
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="noindex" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="og:title" content={title} />
  <meta name="og:description" content={description} />
</svelte:head>

<Users {users} />
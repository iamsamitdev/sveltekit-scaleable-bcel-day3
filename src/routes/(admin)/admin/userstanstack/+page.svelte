<script lang="ts">
  import UsersTanstack from '$features/admin/components/UsersTanstack.svelte'
  type UsersTanstackProps = { initial: any[]; nextCursor: number | string | null; limit?: number }
  let { data } = $props()
  const { initial = [], nextCursor = null, limit = 200 } = data as any
  const title = 'Manage Users - SvelteKit Scaleable App'
  const description = 'จัดการผู้ใช้งาน ค้นหา กรอง และจัดการบทบาท/สถานะ'

  const usersProps = { initial, nextCursor, limit } as any
</script>
  
  <svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="noindex" />
  </svelte:head>
  
  <UsersTanstack {...usersProps} />
<script>
  import "../../../app.css"
  import LoginForm from "$features/auth/components/LoginForm.svelte"
  let title = "เข้าสู่ระบบ - SvelteKit Scaleable App"
  let description = "เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน"
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="เข้าสู่ระบบ, เข้าสู่ระบบฟรี, เข้าสู่ระบบฟรี 2025" />
  <meta name="author" content={title} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="google" content="notranslate" />
</svelte:head>

<LoginForm />

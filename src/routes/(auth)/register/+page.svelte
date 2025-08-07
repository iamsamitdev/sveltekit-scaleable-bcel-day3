<script>
  import "../../../app.css"
  import RegisterForm from "$features/auth/components/RegisterForm.svelte"
  let title = "สมัครสมาชิก - SvelteKit Scaleable App"
  let description = "สมัครสมาชิกเพื่อเริ่มต้นใช้งาน"
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content="สมัครสมาชิก, สมัครสมาชิกฟรี, สมัครสมาชิกฟรี 2025" />
  <meta name="author" content={title} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />
  <meta name="google" content="notranslate" />
</svelte:head>

<RegisterForm />

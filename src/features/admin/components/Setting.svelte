<script lang="ts">
  // Tabs
  type TabKey = 'general' | 'security' | 'notifications' | 'appearance'
  let activeTab = $state<TabKey>('general')

  // General
  let siteName = $state('SvelteKit Admin')
  let baseUrl = $state('https://example.com')
  let timezone = $state('Asia/Bangkok')
  let language = $state('th')

  // Security
  let enforceStrongPassword = $state(true)
  let enable2FA = $state(false)
  let sessionTimeout = $state(30) // minutes

  // Notifications
  let emailReports = $state(true)
  let adminAlerts = $state(true)
  let weeklySummary = $state(false)

  // Appearance
  let theme = $state<'system' | 'light' | 'dark'>('system')
  let brandColor = $state('#2563eb')

  // Save feedback
  let savedAt = $state<string | null>(null)

  function saveSettings() {
    const now = new Date().toLocaleString('th-TH')
    savedAt = `บันทึกแล้วเมื่อ ${now}`
  }

  const tabs: Array<{ key: TabKey; label: string; icon: string }> = [
    { key: 'general', label: 'ทั่วไป', icon: '⚙️' },
    { key: 'security', label: 'ความปลอดภัย', icon: '🔒' },
    { key: 'notifications', label: 'การแจ้งเตือน', icon: '🔔' },
    { key: 'appearance', label: 'การแสดงผล', icon: '🎨' }
  ]
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-start justify-between gap-4">
    <div>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">ตั้งค่าระบบ</h1>
      <p class="text-gray-600">ปรับแต่งค่าพื้นฐาน ความปลอดภัย การแจ้งเตือน และการแสดงผลของระบบ</p>
    </div>
    <div class="flex items-center gap-3">
      {#if savedAt}
        <span class="text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">{savedAt}</span>
      {/if}
      <button type="button" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium" onclick={saveSettings}>บันทึกการตั้งค่า</button>
    </div>
  </div>

  <!-- Tabs -->
  <div class="bg-white rounded-xl border border-gray-100 p-2">
    <div class="flex flex-wrap">
      {#each tabs as t}
        <button
          type="button"
          class={`px-4 py-2 rounded-md text-sm mr-2 mb-2 ${activeTab === t.key ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          onclick={() => activeTab = t.key}
        >
          <span aria-hidden="true" class="mr-2">{t.icon}</span>{t.label}
        </button>
      {/each}
    </div>
  </div>

  <!-- Panels -->
  {#if activeTab === 'general'}
    <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 class="text-lg font-semibold text-gray-900">ทั่วไป</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="siteName">ชื่อระบบ</label>
          <input id="siteName" class="w-full h-11 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={siteName} />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="baseUrl">Base URL</label>
          <input id="baseUrl" class="w-full h-11 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={baseUrl} />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="timezone">โซนเวลา</label>
          <select id="timezone" class="w-full h-11 rounded-lg border border-gray-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={timezone}>
            <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
            <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="language">ภาษา</label>
          <select id="language" class="w-full h-11 rounded-lg border border-gray-300 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" bind:value={language}>
            <option value="th">ไทย</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </section>
  {/if}

  {#if activeTab === 'security'}
    <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 class="text-lg font-semibold text-gray-900">ความปลอดภัย</h2>
      <div class="space-y-4">
        <label class="flex items-center gap-3">
          <input type="checkbox" class="h-5 w-5 text-blue-600" bind:checked={enforceStrongPassword} />
          <span class="text-gray-800">บังคับใช้รหัสผ่านที่รัดกุม (ขั้นต่ำ 8 ตัวอักษร มีตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ)</span>
        </label>
        <label class="flex items-center gap-3">
          <input type="checkbox" class="h-5 w-5 text-blue-600" bind:checked={enable2FA} />
          <span class="text-gray-800">เปิดใช้งาน Two-Factor Authentication (2FA)</span>
        </label>
        <div class="max-w-xs">
          <label class="block text-sm font-medium text-gray-700 mb-2" for="sessionTimeout">หมดเวลาเซสชัน (นาที)</label>
          <input id="sessionTimeout" type="number" min="5" class="w-full h-11 rounded-lg border border-gray-300 px-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" bind:value={sessionTimeout} />
        </div>
      </div>
    </section>
  {/if}

  {#if activeTab === 'notifications'}
    <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 class="text-lg font-semibold text-gray-900">การแจ้งเตือน</h2>
      <div class="space-y-4">
        <label class="flex items-center gap-3">
          <input type="checkbox" class="h-5 w-5 text-blue-600" bind:checked={emailReports} />
          <span class="text-gray-800">ส่งอีเมลรายงานประจำวัน</span>
        </label>
        <label class="flex items-center gap-3">
          <input type="checkbox" class="h-5 w-5 text-blue-600" bind:checked={adminAlerts} />
          <span class="text-gray-800">แจ้งเตือนเหตุการณ์สำคัญให้ผู้ดูแล</span>
        </label>
        <label class="flex items-center gap-3">
          <input type="checkbox" class="h-5 w-5 text-blue-600" bind:checked={weeklySummary} />
          <span class="text-gray-800">สรุปรายสัปดาห์</span>
        </label>
      </div>
    </section>
  {/if}

  {#if activeTab === 'appearance'}
    <section class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 class="text-lg font-semibold text-gray-900">การแสดงผล</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">ธีม</label>
          <div class="flex items-center gap-3">
            <label class={`px-3 py-2 rounded-md border cursor-pointer ${theme === 'system' ? 'border-gray-900' : 'border-gray-300'}`}>
              <input type="radio" name="theme" class="hidden" value="system" checked={theme === 'system'} onchange={() => theme = 'system'} />ระบบ
            </label>
            <label class={`px-3 py-2 rounded-md border cursor-pointer ${theme === 'light' ? 'border-gray-900' : 'border-gray-300'}`}>
              <input type="radio" name="theme" class="hidden" value="light" checked={theme === 'light'} onchange={() => theme = 'light'} />สว่าง
            </label>
            <label class={`px-3 py-2 rounded-md border cursor-pointer ${theme === 'dark' ? 'border-gray-900' : 'border-gray-300'}`}>
              <input type="radio" name="theme" class="hidden" value="dark" checked={theme === 'dark'} onchange={() => theme = 'dark'} />มืด
            </label>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2" for="brandColor">สีประจำแบรนด์</label>
          <input id="brandColor" type="color" class="h-11 w-24 rounded-md border border-gray-300 bg-white" bind:value={brandColor} />
        </div>
      </div>
      <div class="rounded-lg border border-dashed border-gray-300 p-4">
        <div class="text-sm text-gray-600 mb-2">ตัวอย่าง</div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-md" style={`background:${brandColor}`}></div>
          <div class="px-3 py-1 rounded-md text-white" style={`background:${brandColor}`}>Primary</div>
        </div>
      </div>
    </section>
  {/if}
</div>


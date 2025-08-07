<script lang="ts">
  const stats = [
    { label: 'ผู้ใช้ทั้งหมด', value: '12,845', trend: '+4.2%', color: 'from-blue-500 to-cyan-500' },
    { label: 'คำสั่งซื้อเดือนนี้', value: '1,209', trend: '+2.1%', color: 'from-emerald-500 to-green-500' },
    { label: 'รายได้เดือนนี้', value: '฿482,300', trend: '+8.7%', color: 'from-violet-500 to-purple-500' },
    { label: 'ทิกเก็ตค้าง', value: '27', trend: '-3.0%', color: 'from-amber-500 to-orange-500' }
  ]

  const recentOrders = [
    { id: 'INV-240128-01', customer: 'Thanakorn', total: '฿12,900', status: 'จ่ายแล้ว', date: '28 ม.ค. 2025' },
    { id: 'INV-240128-02', customer: 'Pimchanok', total: '฿8,450', status: 'รอดำเนินการ', date: '28 ม.ค. 2025' },
    { id: 'INV-240127-18', customer: 'Napat', total: '฿22,500', status: 'จ่ายแล้ว', date: '27 ม.ค. 2025' },
    { id: 'INV-240127-09', customer: 'Kanyarat', total: '฿3,250', status: 'ยกเลิก', date: '27 ม.ค. 2025' }
  ]

  const topProducts = [
    { name: 'Wireless Headphones', sold: 324, revenue: '฿162,000' },
    { name: 'Mechanical Keyboard', sold: 210, revenue: '฿105,000' },
    { name: '4K Monitor', sold: 156, revenue: '฿312,000' }
  ]
</script>

<!-- Header -->
<div class="mb-8">
  <h1 class="text-2xl md:text-3xl font-bold text-gray-900">ภาพรวมระบบ</h1>
  <p class="text-gray-600">สรุปสถานะสำคัญและกิจกรรมล่าสุดของระบบ</p>
  <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each stats as s}
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class={`w-10 h-10 rounded-lg bg-gradient-to-r ${s.color} mb-4`} aria-hidden="true"></div>
        <div class="text-sm text-gray-500">{s.label}</div>
        <div class="text-2xl font-bold text-gray-900 mt-1">{s.value}</div>
        <div class={`text-xs mt-1 ${s.trend.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>เทรนด์ {s.trend}</div>
      </div>
    {/each}
  </div>
  
  <!-- Content -->
  <div class="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
    <!-- Chart placeholders -->
    <div class="xl:col-span-2 space-y-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">รายได้รายสัปดาห์</h2>
          <span class="text-sm text-gray-500">ภาพรวม 7 วันล่าสุด</span>
        </div>
        <!-- Simple sparkline placeholder -->
        <div class="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-end gap-2 p-3">
          <div class="w-8 bg-blue-400/70 rounded-t h-10"></div>
          <div class="w-8 bg-blue-500/70 rounded-t h-20"></div>
          <div class="w-8 bg-blue-400/70 rounded-t h-14"></div>
          <div class="w-8 bg-blue-600/70 rounded-t h-28"></div>
          <div class="w-8 bg-blue-500/70 rounded-t h-16"></div>
          <div class="w-8 bg-blue-700/70 rounded-t h-32"></div>
          <div class="w-8 bg-blue-500/70 rounded-t h-24"></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">ทราฟฟิกผู้ใช้</h2>
          <span class="text-sm text-gray-500">วันนี้</span>
        </div>
        <!-- Area chart placeholder -->
        <div class="h-40 rounded-lg bg-gradient-to-b from-emerald-100 to-white relative overflow-hidden">
          <div class="absolute inset-x-0 bottom-0 h-1/2 bg-emerald-200/40"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.25),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.15),transparent_45%)]"></div>
        </div>
      </div>
    </div>

    <!-- Side column: tables -->
    <div class="space-y-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">คำสั่งซื้อล่าสุด</h2>
          <a href="/admin/orders" class="text-sm text-blue-600 hover:underline">ดูทั้งหมด</a>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-gray-500">
                <th class="py-2">เลขที่</th>
                <th class="py-2">ลูกค้า</th>
                <th class="py-2">ยอดรวม</th>
                <th class="py-2">สถานะ</th>
                <th class="py-2">วันที่</th>
              </tr>
            </thead>
            <tbody>
              {#each recentOrders as o}
                <tr class="border-t border-gray-100">
                  <td class="py-2 font-medium text-gray-900">{o.id}</td>
                  <td class="py-2">{o.customer}</td>
                  <td class="py-2">{o.total}</td>
                  <td class="py-2">
                    <span class={`px-2 py-1 rounded text-xs ${o.status === 'จ่ายแล้ว' ? 'bg-emerald-100 text-emerald-700' : o.status === 'รอดำเนินการ' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{o.status}</span>
                  </td>
                  <td class="py-2 text-gray-500">{o.date}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">สินค้าขายดี</h2>
          <a href="/admin/products" class="text-sm text-blue-600 hover:underline">จัดการสินค้า</a>
        </div>
        <ul class="space-y-3">
          {#each topProducts as p}
            <li class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-gray-600" aria-hidden="true">📦</div>
                <div>
                  <div class="font-medium text-gray-900">{p.name}</div>
                  <div class="text-xs text-gray-500">ขายแล้ว {p.sold} ชิ้น</div>
                </div>
              </div>
              <div class="text-sm font-semibold text-gray-900">{p.revenue}</div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>


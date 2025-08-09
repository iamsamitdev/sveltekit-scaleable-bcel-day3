# SvelteKit Scaleable App (Public + Admin)

โปรเจกต์ตัวอย่างสำหรับ Production ที่โครงสร้างขยายง่าย ใช้ SvelteKit + Svelte 5 Runes และ Tailwind CSS v4 แยกกลุ่มหน้า Public/Auth/Admin ชัดเจน มี Service Layer, Protected Route ฝั่งเซิร์ฟเวอร์ และตัวอย่างการแสดงข้อมูลจำนวนมากด้วย Virtualization + Cursor Pagination

## Tech Stack
- SvelteKit + Svelte 5 (Runes: `$state`, `$derived`, `$props`, ใช้ `onclick` แทน `on:click`)
- Tailwind CSS v4 (import แบบใหม่ใน `src/app.css`)
- TypeScript
- Prisma ORM (PostgreSQL)
- REST API service (`$lib/services/api.ts`) รองรับ `FormData` และ `RequestInit` (`signal`)
- TanStack Virtual สำหรับแสดงผลรายการจำนวนมาก

## โครงสร้างโปรเจกต์ (สรุปส่วนสำคัญ)
```
src/
  app.css                        # Tailwind v4 + Global styles
  hooks.server.ts                # อ่าน JWT จาก Cookie/Header -> ใส่ user/token ลง locals
  lib/
    components/                  # Navbar/Footer/Admin components reuse
    layouts/                     # MainLayout, AdminLayout
    services/
      api.ts                     # HTTP client get/post/put/delete รองรับ FormData + RequestInit
    types/                       # api.ts, auth.ts, product.ts
  features/
    auth/
      components/                # LoginForm, RegisterForm
      services/
        authService.ts           # login/logout/register + ตั้ง/ลบ cookie token
    admin/
      components/
        Dashboard.svelte
        Users.svelte             # ตัวอย่างตารางธรรมดา + filter + paging
        UsersTanstack.svelte     # ตาราง virtualized + infinite loading + prefetch-all
        Products.svelte
        CreateProduct.svelte
        UpdateProduct.svelte
        Setting.svelte, Profile.svelte
      services/
        productService.ts        # CRUD สินค้า
  routes/
    (public)/                    # หน้า public
    (auth)/                      # /login, /register
    (admin)/
      +layout.server.ts          # ปกป้องทุกหน้าในกลุ่ม admin (server-side)
      admin/
        dashboard/+page.svelte
        users/+page.svelte       # เรียกใช้ Users.svelte
        userstanstack/
          +page.server.ts        # ดึง initial + nextCursor ด้วย Prisma cursor
          +page.svelte           # เรียกใช้ UsersTanstack.svelte
        members/
          +page.server.ts        # นับสถิติ (count) + initial rows (สำหรับ virtualization)
          +page.svelte           # การ์ดสรุป + ตาราง virtualized (ID/Name/Email/Phone/CreatedAt)
    api/
      users/+server.ts           # Endpoint โหลดเพิ่ม users (cursor-based)
      members/+server.ts         # Endpoint โหลดเพิ่มสมาชิก (cursor-based)
```

## Protected Route (ฝั่งเซิร์ฟเวอร์)
- ทำบนฝั่งเซิร์ฟเวอร์ทั้งหมดเพื่อรองรับ SSR และความปลอดภัย
- `hooks.server.ts`
  - อ่าน JWT จาก Authorization header หรือ Cookie `token`
  - ถอดรหัส payload ด้วย `Buffer.from(..., 'base64')` และกัน token format ผิดพลาด
  - พบ token ที่ยัง valid -> ตั้ง `locals.user`; เก็บ `locals.token` เสมอเมื่อพบ token
- `(admin)/+layout.server.ts`
  - redirect ไป `/login?next=<path>` เมื่อ “ไม่มีทั้ง `locals.user` และ `locals.token`”

หมายเหตุ: ให้ backend เซ็ต Cookie `token` แบบ `HttpOnly; Secure; SameSite=Lax` เพื่อความปลอดภัยสูงสุด

## การโหลดข้อมูลจำนวนมาก (Millions Ready)
- Server: ใช้ Prisma cursor-based pagination (`take`, `orderBy`, `cursor`) ส่ง `initial` + `nextCursor`
- Client: ใช้ `@tanstack/svelte-virtual` ทำ virtualization + infinite loading
- มีโหมด “โหลดทั้งหมด” แบบ incremental ใน `UsersTanstack.svelte` (prefetch-all) สำหรับ use-case ที่ต้องการดึงครบจริงๆ
- SSR-safe: มี fallback methods สำหรับ virtualizer เมื่อเรนเดอร์ฝั่งเซิร์ฟเวอร์

## Service Layer
- `lib/services/api.ts`
  - ถ้า body เป็น `FormData` จะไม่ตั้ง `Content-Type` ให้เอง
  - ทุกเมธอดรองรับ `RequestInit` เช่น `{ signal }`
- `features/admin/services/productService.ts`
  - `getProducts(page, search, limit, signal?)`, `getProduct(id, signal?)`
  - `createProduct(data | FormData)`, `updateProduct(id, data | FormData)` (รองรับ `_method=PUT`)
  - `deleteProduct(id)`

## Products (ตัวอย่าง CRUD ครบ)
- ค้นหา/แบ่งหน้า ด้วย `$state` + `$derived` และ `AbortController`
- ตาราง: รูปสินค้า, คอลัมน์วันที่สร้าง/แก้ไข, ปุ่มดู/แก้ไข/ลบ พร้อม modal และยืนยันการลบ
- ปุ่มเพิ่มสินค้าไป `/admin/products/create`

## Members (การ์ดสรุป + Virtualized Table)
- `members/+page.server.ts` นับจำนวนทั้งหมด (`prisma.user.count()`) แล้วส่ง `stats` ให้หน้าเพจ
- ดึง initial rows (100) สำหรับตาราง virtualized และคำนวณ `nextCursor`
- `api/members/+server.ts` เป็น endpoint โหลดเพิ่มแบบ cursor-based และ normalize `fullname`

## Tailwind CSS v4
`src/app.css`
```
@import 'tailwindcss'

@layer base {
  html { @apply scroll-smooth }
  body { font-family: "Inter", "Anuphan", sans-serif }
}
```

## คำสั่งใช้งาน
```sh
# ติดตั้ง
npm install

# เริ่มพัฒนา
npm run dev

# สร้าง build production
npm run build
npm run preview
```

## ตัวแปรแวดล้อม
```
VITE_API_BASE_URL=https://your-api.example.com/api
DATABASE_URL=postgresql://user:pass@host:5432/db
```

## แนวทางโค้ด (Guidelines)
- ใช้ Svelte Runes (`$state`, `$derived`, `$props`), ใช้ `onclick` แทน `on:click`
- โค้ดอ่านง่าย ชื่อสื่อความหมาย จัดการ edge-cases ก่อน (early return)
- A11y: ปุ่ม/ลิงก์ไอคอนล้วนใส่ `aria-label`, หลีกเลี่ยง `href="#"` หากไม่ใช่ลิงก์จริง
- Performance: เลี่ยงโหลด “ทั้งหมดทีเดียว”, ใช้ cursor + virtualization, debounce การค้นหา, ใช้ `AbortController`

## การดีบัก
- ตรวจ Cookie `token` หลัง login และค่าใน `locals` ผ่าน log ของ `hooks.server.ts`
- ตรวจ API endpoints (`/api/users`, `/api/members`) ว่าคืน `nextCursor` ถูกต้อง
- ตรวจค่า `VITE_API_BASE_URL` และ `DATABASE_URL`

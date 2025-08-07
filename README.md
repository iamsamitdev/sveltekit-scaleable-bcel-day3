# SvelteKit Scaleable App (Public + Admin)

โปรเจกต์ตัวอย่างโครงสร้างที่ขยายได้ง่าย ใช้ SvelteKit + Svelte 5 Runes และ Tailwind CSS v4 สำหรับงาน Production แยกส่วน Public, Auth, Admin ชัดเจน พร้อมระบบ Protected Route ฝั่งเซิร์ฟเวอร์

## Tech Stack
- SvelteKit + Svelte 5 (Runes: `$state`, `$derived`, `$props`, ใช้ `onclick` แทน `on:click`)
- Tailwind CSS v4 (import แบบใหม่ใน `src/app.css`)
- TypeScript
- REST API service (`$lib/services/api.ts`) รองรับ `FormData` และ `RequestInit` (เช่น `signal`)

## โครงสร้างโปรเจกต์ (สรุปเฉพาะส่วนสำคัญ)
```
src/
  app.css                       # ตั้งค่า Tailwind v4 และ global styles
  hooks.server.ts               # อ่าน JWT จาก Cookie/Header -> ใส่ user/token ลง locals
  lib/
    components/                 # Navbar/Footer/Admin Components reuse
    layouts/                    # MainLayout, AdminLayout
    services/
      api.ts                    # HTTP client get/post/put/delete รองรับ FormData
    types/                      # api.ts, auth.ts, product.ts
  features/
    auth/
      components/               # LoginForm, RegisterForm
      services/
        authService.ts          # login/logout/register + ตั้ง/ลบ cookie token
    admin/
      components/
        Products.svelte         # รายการสินค้า: ค้นหา/แบ่งหน้า/ดู/แก้ไข/ลบ + modal
        CreateProduct.svelte    # เพิ่มสินค้า + อัปโหลดรูป + พรีวิว + ลบรูป
        UpdateProduct.svelte    # แก้ไขสินค้า + อัปโหลดรูป + พรีวิว + ลบรูป
        Dashboard.svelte        # ตัวอย่างแดชบอร์ด
        Users.svelte, Setting.svelte, Profile.svelte
      services/
        productService.ts       # API สินค้า (list/get/create/update/delete)
  routes/
    (public)/                   # หน้า public
    (auth)/                     # /login, /register
    (admin)/
      +layout.server.ts         # ปกป้องทุกหน้าในกลุ่ม admin ฝั่งเซิร์ฟเวอร์
      admin/
        dashboard/+page.svelte
        products/+page.svelte   # เรียกใช้ `Products.svelte`
        products/create/+page.svelte
        products/update/+page.svelte
```

## Protected Route (แนวทางที่ใช้)
- ทำบนฝั่งเซิร์ฟเวอร์ทั้งหมดเพื่อความปลอดภัยและรองรับ SSR
- `hooks.server.ts`
  - อ่าน JWT จาก Authorization header หรือ Cookie `token`
  - ถอดรหัส payload ด้วย `Buffer.from(..., 'base64')`
  - ถ้า token ยังไม่หมดอายุ ใส่ `locals.user`; เก็บ `locals.token` เสมอเมื่อมี token
- `(admin)/+layout.server.ts`
  - redirect ไป `/login?next=<path>` เฉพาะกรณี “ไม่มีทั้ง `locals.user` และ `locals.token`”

หมายเหตุ: ควรให้ backend เซ็ต Cookie `token` แบบ `HttpOnly; Secure; SameSite=Lax` จาก response ของ login เพื่อความปลอดภัยสูงสุด

## การเรียก API (Service Layer)
- `lib/services/api.ts`
  - ถ้า body เป็น `FormData` จะไม่ตั้ง `Content-Type` ให้เอง
  - ทุกเมธอดรองรับ `RequestInit` เช่น `{ signal }`
- `features/admin/services/productService.ts`
  - `getProducts(page, search, limit, signal?)`
  - `getProduct(id, signal?)`
  - `createProduct(data | FormData)`
  - `updateProduct(id, data | FormData)` (ถ้าเป็น `FormData` จะ append `_method=PUT` และยิงผ่าน `POST`)
  - `deleteProduct(id)`

## หน้าสินค้า (Products)
- ค้นหา/แบ่งหน้า ด้วย `$state` + `$derived` และ `AbortController`
- ตาราง: รูปสินค้า, ชื่อ, หมวดหมู่, ราคา, วันที่สร้าง, วันที่แก้ไข
- ปุ่ม: ดู (popup รายละเอียด), แก้ไข (ไปหน้า update), ลบ (popup ยืนยันและเรียก API)
- ปุ่มเพิ่มสินค้า ไป `/admin/products/create`

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
```

## แนวทางโค้ด (Guidelines)
- ใช้ Runes แทน stores/directives เก่า (`onclick` แทน `on:click`)
- โค้ดอ่านง่าย ชื่อสื่อความหมาย จัดการ error/edge-case ก่อน (early return)
- A11y: ปุ่ม/ลิงก์ไอคอนล้วนใส่ `aria-label`, หลีกเลี่ยง `href="#"`

## การดีบักปัญหา Login/Protected
- ตรวจ Cookie `token` หลัง login
- ตรวจ Log ของ `hooks.server.ts` ว่าอ่าน token และตั้ง `locals` แล้วหรือไม่
- ตรวจ `VITE_API_BASE_URL` ให้ถูกต้องกับเซิร์ฟเวอร์ API

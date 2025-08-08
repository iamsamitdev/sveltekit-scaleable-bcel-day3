import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// 🚀 Configuration สำหรับการสร้างข้อมูลจำลอง
const SEED_CONFIG = {
  TOTAL_USERS: 1_000_000, // หนึ่งล้านรายการ
  BATCH_SIZE: 1000, // สร้างทีละ 1000 รายการ
  SHOW_PROGRESS_EVERY: 10000, // แสดง progress ทุก 10k รายการ
}

// ข้อมูลตัวอย่างสำหรับสร้างชื่อแบบสุ่ม
const THAI_FIRST_NAMES = [
  "สมชาย",
  "สมหญิง",
  "สมศักดิ์",
  "สมใจ",
  "สมปอง",
  "สมหมาย",
  "สมพร",
  "สมคิด",
  "สมนึก",
  "สมรัก",
  "สมฤดี",
  "สมบัติ",
  "สมบูรณ์",
  "สมพิศ",
  "สมฤทัย",
  "สมหวัง",
  "สมอำนวย",
  "สมเกียรติ",
  "สมเจตน์",
  "สมเดช",
  "สมพงษ์",
  "สมพิมพ์",
  "สมยศ",
  "สมรูป",
  "วิชัย",
  "วิทยา",
  "วิเชียร",
  "วิศาล",
  "วิษณุ",
  "วิรัช",
  "วิโรจน์",
  "วิสุทธิ์",
  "ประเสริฐ",
  "ประยุทธ",
  "ประดิษฐ์",
  "ประชา",
  "ประกอบ",
  "ประสิทธิ์",
  "ประทีป",
  "ประดับ",
  "อนุชา",
  "อนุรักษ์",
  "อนุพงษ์",
  "อนุสรณ์",
  "อนันต์",
  "อมร",
  "อรรถ",
  "อาทิตย์",
  "นิรันดร์",
  "นิธิ",
  "นิพนธ์",
  "นิรุตติ์",
  "นิคม",
  "นิติ",
  "นิรันดร์",
  "นิรุต",
]

const THAI_LAST_NAMES = [
  "ใจดี",
  "รักดี",
  "มั่นคง",
  "เจริญ",
  "สุขใส",
  "ดีงาม",
  "สว่างใส",
  "เฉลียวฉลาด",
  "ใฝ่เรียน",
  "หวานใจ",
  "งามสง่า",
  "มั่งคั่ง",
  "ครบถ้วน",
  "แปลกใหม่",
  "ฤดูดี",
  "ปรารถนา",
  "สะดวก",
  "มีชื่อเสียง",
  "ตั้งใจ",
  "อำนาจ",
  "สืบสาย",
  "เขียนดี",
  "เกียรติยศ",
  "งามพริ้ง",
  "ราบรื่น",
  "เรืองรอง",
  "ผดุงเกียรติ",
  "สร้างสรรค์",
  "พัฒนา",
  "เจริญรุ่งเรือง",
  "มั่นคงสุข",
  "ยั่งยืน",
  "สุขสันต์",
  "เปี่ยมสุข",
  "ร่วมใจ",
  "พร้อมใจ",
  "สามัคคี",
  "รวมพลัง",
  "ช่วยเหลือ",
  "เสียสละ",
  "จริงใจ",
  "ซื่อสัตย์",
  "เที่ยงธรรม",
  "ยุติธรรม",
  "ธรรมนูญ",
  "ศรัทธา",
  "อุทิศ",
  "มุ่งมั่น",
]

const DOMAINS = [
  "example.com",
  "test.com",
  "demo.com",
  "sample.com",
  "mock.com",
]

// ฟังก์ชันแปลงชื่อไทยเป็นภาษาอังกฤษ (transliteration)
const THAI_TO_ENGLISH_MAP: { [key: string]: string } = {
  ก: "k",
  ข: "kh",
  ค: "kh",
  ง: "ng",
  จ: "j",
  ฉ: "ch",
  ช: "ch",
  ซ: "s",
  ฌ: "ch",
  ญ: "y",
  ด: "d",
  ต: "t",
  ถ: "th",
  ท: "th",
  ธ: "th",
  น: "n",
  บ: "b",
  ป: "p",
  ผ: "ph",
  ฝ: "f",
  พ: "ph",
  ฟ: "f",
  ภ: "ph",
  ม: "m",
  ย: "y",
  ร: "r",
  ล: "l",
  ว: "w",
  ศ: "s",
  ษ: "s",
  ส: "s",
  ห: "h",
  อ: "o",
  ฮ: "h",
  ะ: "a",
  า: "a",
  "ิ": "i",
  "ี": "ii",
  "ึ": "ue",
  "ื": "uue",
  "ุ": "u",
  "ู": "uu",
  เ: "e",
  แ: "ae",
  โ: "o",
  ใ: "ai",
  ไ: "ai",
  ำ: "am",
  "่": "",
  "้": "",
  "๊": "",
  "๋": "",
  "์": "",
  "ั": "a",
}

function transliterateThai(thaiText: string): string {
  return thaiText
    .split("")
    .map((char) => THAI_TO_ENGLISH_MAP[char] || char)
    .join("")
    .toLowerCase()
    .replace(/[^a-z]/g, "") // เอาเฉพาะตัวอักษรอังกฤษ
}

// ฟังก์ชันสร้างข้อมูลแบบสุ่ม
function generateRandomUser(index: number) {
  const firstName =
    THAI_FIRST_NAMES[Math.floor(Math.random() * THAI_FIRST_NAMES.length)]
  const lastName =
    THAI_LAST_NAMES[Math.floor(Math.random() * THAI_LAST_NAMES.length)]
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)]

  // แปลงชื่อไทยเป็นภาษาอังกฤษสำหรับ email
  const firstNameEng = transliterateThai(firstName)
  const lastNameEng = transliterateThai(lastName)

  // สร้าง email ที่ unique (ภาษาอังกฤษ)
  const email = `${firstNameEng}${lastNameEng}${index}@${domain}`

  // สร้างเบอร์โทรแบบสุ่ม
  const phonePrefix = ["08", "09"][Math.floor(Math.random() * 2)]
  const phoneNumber = `${phonePrefix}${Math.floor(Math.random() * 10)}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}-${String(Math.floor(Math.random() * 10000)).padStart(
    4,
    "0"
  )}`

  // สร้างวันที่แบบสุ่มในช่วง 2 ปีที่ผ่านมา
  const randomDate = new Date(
    Date.now() - Math.random() * 2 * 365 * 24 * 60 * 60 * 1000
  )
  const updatedDate = new Date(
    randomDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
  )

  return {
    fullName: `${firstName} ${lastName}`, // ชื่อเต็มยังเป็นภาษาไทย
    email, // email เป็นภาษาอังกฤษ
    phoneNumber,
    createdAt: randomDate,
    updatedAt: updatedDate,
  }
}

async function main() {
  console.log("🌱 Starting seed for MASSIVE DATA...")
  console.log(`📊 Target: ${SEED_CONFIG.TOTAL_USERS.toLocaleString()} users`)
  console.log(`📦 Batch size: ${SEED_CONFIG.BATCH_SIZE} users per batch`)

  const startTime = Date.now()

  // ลบข้อมูลเก่าทั้งหมด
  console.log("🗑️  Clearing existing users...")
  await prisma.user.deleteMany()
  console.log("✅ Cleared existing users")

  // เข้ารหัสรหัสผ่านเริ่มต้น (ทำครั้งเดียว)
  console.log("🔐 Hashing default password...")
  const defaultPassword = await bcrypt.hash("123456", 12)
  console.log("✅ Password hashed")

  // สร้าง users แบบ batch
  console.log("👥 Creating users in batches...")
  let totalCreated = 0

  const totalBatches = Math.ceil(
    SEED_CONFIG.TOTAL_USERS / SEED_CONFIG.BATCH_SIZE
  )

  for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
    const batchStartTime = Date.now()

    // คำนวณจำนวนในแต่ละ batch
    const remainingUsers = SEED_CONFIG.TOTAL_USERS - totalCreated
    const currentBatchSize = Math.min(SEED_CONFIG.BATCH_SIZE, remainingUsers)

    // สร้างข้อมูลสำหรับ batch นี้
    const batchData: any[] = []
    for (let i = 0; i < currentBatchSize; i++) {
      const userIndex = totalCreated + i + 1
      const userData = generateRandomUser(userIndex)
      batchData.push({
        ...userData,
        password: defaultPassword,
      })
    }

    // Insert แบบ batch (เร็วกว่าการ insert ทีละรายการมาก)
    await prisma.user.createMany({
      data: batchData,
      skipDuplicates: true, // ป้องกัน duplicate email
    })

    totalCreated += currentBatchSize
    const batchTime = Date.now() - batchStartTime
    const avgTimePerRecord = batchTime / currentBatchSize

    // แสดง progress
    if (
      totalCreated % SEED_CONFIG.SHOW_PROGRESS_EVERY === 0 ||
      batchIndex === totalBatches - 1
    ) {
      const progress = ((totalCreated / SEED_CONFIG.TOTAL_USERS) * 100).toFixed(
        1
      )
      const elapsedTime = Date.now() - startTime
      const estimatedTotalTime =
        (elapsedTime / totalCreated) * SEED_CONFIG.TOTAL_USERS
      const remainingTime = estimatedTotalTime - elapsedTime

      console.log(
        `📈 Progress: ${totalCreated.toLocaleString()}/${SEED_CONFIG.TOTAL_USERS.toLocaleString()} (${progress}%)`
      )
      console.log(
        `⏱️  Batch ${
          batchIndex + 1
        }/${totalBatches}: ${batchTime}ms (${avgTimePerRecord.toFixed(
          2
        )}ms per record)`
      )
      console.log(
        `🕒 Estimated remaining time: ${Math.round(remainingTime / 1000)}s`
      )
      console.log("---")
    }
  }

  const totalTime = Date.now() - startTime
  const avgTimePerRecord = totalTime / totalCreated

  console.log("🎉 Seed completed successfully!")
  console.log(`✅ Created ${totalCreated.toLocaleString()} users`)
  console.log(`⏱️  Total time: ${(totalTime / 1000).toFixed(2)}s`)
  console.log(`📊 Average time per record: ${avgTimePerRecord.toFixed(2)}ms`)
  console.log(
    `🚀 Records per second: ${Math.round(
      totalCreated / (totalTime / 1000)
    ).toLocaleString()}`
  )
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
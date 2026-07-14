require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/Listing");

const imageMap = {
  "เตียงผู้ป่วยไฟฟ้า 3 ไกร์": ["https://images.pexels.com/photos/263404/pexels-photo-263404.jpeg?w=600&h=400&fit=crop"],
  "วีลแชร์อลูมิเนียมพับได้ น้ำหนักเบา": ["https://images.pexels.com/photos/8415827/pexels-photo-8415827.jpeg?w=600&h=400&fit=crop"],
  "เครื่องผลิตออกซิเจน 5 ลิตร": ["https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=600&h=400&fit=crop"],
  "ที่นอนลมป้องกันแผลกดทับ แบบรังผึ้ง": ["https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?w=600&h=400&fit=crop"],
  "เครื่องวัดความดันโลหิตดิจิตอล Omron": ["https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?w=600&h=400&fit=crop"],
  "ไม้เท้า 4 ขา อลูมิเนียมอัลลอย": ["https://images.pexels.com/photos/3874155/pexels-photo-3874155.jpeg?w=600&h=400&fit=crop"],
  "เครื่องพ่นยาขยายหลอดลม (Nebulizer)": ["https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?w=600&h=400&fit=crop"],
  "เครื่องดูดเสมหะ (Suction Machine)": ["https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg?w=600&h=400&fit=crop"],
  "วอล์คเกอร์พับได้ (Walker)": ["https://images.pexels.com/photos/3874109/pexels-photo-3874109.jpeg?w=600&h=400&fit=crop"],
  "เก้าอี้นั่งถ่าย คร่อมชักโครกได้": ["https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?w=600&h=400&fit=crop"],
  "เครื่อง CPAP แก้นอนกรน ResMed": ["https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg?w=600&h=400&fit=crop"],
  "เครื่องตรวจวัดน้ำตาลในเลือด Accu-Chek": ["https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?w=600&h=400&fit=crop"],
  "โต๊ะคร่อมเตียงผู้ป่วย ลายไม้": ["https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?w=600&h=400&fit=crop"],
  "รถเข็นผู้ป่วยไฟฟ้า บังคับด้วยจอยสติ๊ก": ["https://images.pexels.com/photos/8524607/pexels-photo-8524607.jpeg?w=600&h=400&fit=crop"],
  "เครื่องช่วยฟังแบบทัดหลังหู": ["https://images.pexels.com/photos/4386459/pexels-photo-4386459.jpeg?w=600&h=400&fit=crop"],
  "เสาน้ำเกลือสแตนเลสแบบ 4 แฉก มีล้อ": ["https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?w=600&h=400&fit=crop"],
  "ถังออกซิเจน 1.5 คิว พร้อมเกจ์วัด": ["https://images.pexels.com/photos/4386525/pexels-photo-4386525.jpeg?w=600&h=400&fit=crop"],
  "รถเข็นช่วยเดิน (Rollator) มีเบาะนั่ง": ["https://images.pexels.com/photos/3874156/pexels-photo-3874156.jpeg?w=600&h=400&fit=crop"],
  "ที่นอนยางพาราสำหรับผู้ป่วยติดเตียง": ["https://images.pexels.com/photos/5726834/pexels-photo-5726834.jpeg?w=600&h=400&fit=crop"],
  "เครื่องกระตุ้นกล้ามเนื้อไฟฟ้า TENS": ["https://images.pexels.com/photos/5726799/pexels-photo-5726799.jpeg?w=600&h=400&fit=crop"],
  "รองเท้าเฝือก (Walking Boot) ไซส์ M": ["https://images.pexels.com/photos/3874161/pexels-photo-3874161.jpeg?w=600&h=400&fit=crop"],
  "เครื่องวัดออกซิเจนปลายนิ้ว (Pulse Oximeter)": ["https://images.pexels.com/photos/4386526/pexels-photo-4386526.jpeg?w=600&h=400&fit=crop"],
  "เตียงผู้ป่วยมือหมุน 2 ไกร์": ["https://images.pexels.com/photos/263404/pexels-photo-263404.jpeg?w=600&h=400&fit=crop"],
  "สายรัดพยุงหลัง (Lumbar Support) ไซส์ L": ["https://images.pexels.com/photos/5726838/pexels-photo-5726838.jpeg?w=600&h=400&fit=crop"],
  "เครื่องยกผู้ป่วย (Patient Lift)": ["https://images.pexels.com/photos/3259630/pexels-photo-3259630.jpeg?w=600&h=400&fit=crop"],
};

async function updateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    let updated = 0;
    for (const [title, images] of Object.entries(imageMap)) {
      const result = await Listing.updateOne({ title }, { $set: { images } });
      if (result.modifiedCount > 0) {
        updated++;
        console.log(`Updated: ${title}`);
      } else {
        console.log(`Not found: ${title}`);
      }
    }

    console.log(`\nDone! Updated ${updated} listings with images`);
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

updateImages();

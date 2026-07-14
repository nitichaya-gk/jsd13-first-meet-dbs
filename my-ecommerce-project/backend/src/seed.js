require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Category = require("./models/Category");
const Listing = require("./models/Listing");
const Rating = require("./models/Rating");
const Report = require("./models/Report");
const SearchLog = require("./models/SearchLog");
const Order = require("./models/Order");

const users = [
  { _id: "65f100000000000000000001", name: "สมชาย ใจดี", phone: "081-111-1111", line_user_id: "somchai_123", rating_avg: 4.5 },
  { _id: "65f100000000000000000002", name: "วิภา รักษา", phone: "089-222-2222", line_user_id: "wipha_rx", rating_avg: 5.0 },
  { _id: "65f100000000000000000003", name: "อนันต์ สุขใจ", phone: "082-333-3333", line_user_id: "anan_s", rating_avg: 4.2 },
  { _id: "65f100000000000000000004", name: "ศิริพร พรหม", phone: "083-444-4444", line_user_id: "siriporn88", rating_avg: 4.8 },
  { _id: "65f100000000000000000005", name: "ณัฐวุฒิ คงดี", phone: "084-555-5555", line_user_id: "nut_good", rating_avg: 3.9 },
  { _id: "65f100000000000000000006", name: "กมลชนก ศรีสุข", phone: "085-666-6666", line_user_id: "kamonchanok", rating_avg: 4.7 },
  { _id: "65f100000000000000000007", name: "ธนกร บุญมา", phone: "086-777-7777", line_user_id: "thanakorn99", rating_avg: 4.0 },
  { _id: "65f100000000000000000008", name: "ปรียา แก้วตา", phone: "087-888-8888", line_user_id: "preeya_k", rating_avg: 4.6 },
  { _id: "65f100000000000000000009", name: "จักริน มั่นคง", phone: "088-999-9999", line_user_id: "jakrin_m", rating_avg: 3.8 },
  { _id: "65f100000000000000000010", name: "สุพัตรา งามดี", phone: "081-101-1010", line_user_id: "supattra", rating_avg: 4.9 },
  { _id: "65f100000000000000000011", name: "วีรชัย ทองสุข", phone: "082-202-2020", line_user_id: "weerachai", rating_avg: 4.3 },
  { _id: "65f100000000000000000012", name: "ชลธิชา ศรีทอง", phone: "083-303-3030", line_user_id: "cholthicha", rating_avg: 4.1 },
  { _id: "65f100000000000000000013", name: "พงศ์ศักดิ์ นำชัย", phone: "084-404-4040", line_user_id: "pongsak", rating_avg: 3.7 },
  { _id: "65f100000000000000000014", name: "อรทัย บุญส่ง", phone: "085-505-5050", line_user_id: "ornthai", rating_avg: 4.4 },
  { _id: "65f100000000000000000015", name: "กิตติพงษ์ พรชัย", phone: "086-606-6060", line_user_id: "kittipong", rating_avg: 4.8 },
  { _id: "65f100000000000000000016", name: "จิราพร แสงทอง", phone: "087-707-7070", line_user_id: "jiraporn", rating_avg: 4.5 },
  { _id: "65f100000000000000000017", name: "ภาณุวัฒน์ ศิริ", phone: "088-808-8080", line_user_id: "phanuwat", rating_avg: 3.6 },
  { _id: "65f100000000000000000018", name: "ลลิตา วงศ์ดี", phone: "089-909-9090", line_user_id: "lalita_w", rating_avg: 4.9 },
  { _id: "65f100000000000000000019", name: "เอกชัย มีสุข", phone: "081-212-1212", line_user_id: "ekachai", rating_avg: 4.2 },
  { _id: "65f100000000000000000020", name: "สุธิดา จันทร์ดี", phone: "082-313-1313", line_user_id: "suthida", rating_avg: 5.0 },
];

const categories = [
  { _id: "65f700000000000000000001", name: "Hospital Bed", icon: "bed" },
  { _id: "65f700000000000000000002", name: "Wheelchair", icon: "wheelchair" },
  { _id: "65f700000000000000000003", name: "Walking Aid", icon: "person-walking" },
  { _id: "65f700000000000000000004", name: "Respiratory", icon: "lungs" },
  { _id: "65f700000000000000000005", name: "Medical Monitor", icon: "heart-pulse" },
  { _id: "65f700000000000000000006", name: "Bathroom Equipment", icon: "bath" },
  { _id: "65f700000000000000000007", name: "Patient Lift", icon: "arrow-up" },
  { _id: "65f700000000000000000008", name: "Others", icon: "box" },
];

const listings = [
  { _id: "65f200000000000000000001", seller_id: "65f100000000000000000001", category_id: "65f700000000000000000001", title: "เตียงผู้ป่วยไฟฟ้า 3 ไกร์", description: "สภาพดี ใช้งาน 1 ปี ปรับระดับได้ครบ พร้อมที่นอนหุ้มหนังพีวีซี", price: 9500, item_condition: "used_good", status: "active", images: ["bed_electric_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-01T08:00:00Z") },
  { _id: "65f200000000000000000002", seller_id: "65f100000000000000000002", category_id: "65f700000000000000000002", title: "วีลแชร์อลูมิเนียมพับได้ น้ำหนักเบา", description: "น้ำหนักเพียง 9 กก. พับใส่ท้ายรถเก๋งได้ ล้อใหม่ พร้อมเบรกมือ", price: 3200, item_condition: "used_like_new", status: "active", images: ["wheelchair_alum_01.jpg"], location: "ขอนแก่น", created_at: new Date("2026-07-02T09:00:00Z") },
  { _id: "65f200000000000000000003", seller_id: "65f100000000000000000003", category_id: "65f700000000000000000004", title: "เครื่องผลิตออกซิเจน 5 ลิตร", description: "ใช้งานไปเพียง 20 ชั่วโมง ยังอยู่ในประกันศูนย์ไทย", price: 12500, item_condition: "used_like_new", status: "active", images: ["oxygen_conc_01.jpg"], location: "เชียงใหม่", created_at: new Date("2026-07-03T10:30:00Z") },
  { _id: "65f200000000000000000004", seller_id: "65f100000000000000000004", category_id: "65f700000000000000000001", title: "ที่นอนลมป้องกันแผลกดทับ แบบรังผึ้ง", description: "มอเตอร์ทำงานปกติ มีรอยเปื้อนเล็กน้อยซักออกได้ ใช้งานได้ปกติ", price: 1800, item_condition: "used_fair", status: "reserved", images: ["mattress_air_01.jpg"], location: "นนทบุรี", created_at: new Date("2026-07-04T14:15:00Z") },
  { _id: "65f200000000000000000005", seller_id: "65f100000000000000000001", category_id: "65f700000000000000000005", title: "เครื่องวัดความดันโลหิตดิจิตอล Omron", description: "พร้อมผ้าพันแขนขนาด L แบตเตอรี่เพิ่งเปลี่ยนใหม่ แถมอแดปเตอร์", price: 950, item_condition: "used_good", status: "sold", images: ["bp_monitor_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-05T08:45:00Z") },
  { _id: "65f200000000000000000006", seller_id: "65f100000000000000000005", category_id: "65f700000000000000000003", title: "ไม้เท้า 4 ขา อลูมิเนียมอัลลอย", description: "ปรับระดับความสูงได้ จุกยางยังไม่สึก แข็งแรงทนทาน", price: 250, item_condition: "used_good", status: "active", images: ["cane_4legs_01.jpg"], location: "ชลบุรี", created_at: new Date("2026-07-06T16:20:00Z") },
  { _id: "65f200000000000000000007", seller_id: "65f100000000000000000006", category_id: "65f700000000000000000004", title: "เครื่องพ่นยาขยายหลอดลม (Nebulizer)", description: "ซื้อมาสำรองแทบไม่ได้ใช้ อุปกรณ์ครบกล่อง หน้ากากเด็กและผู้ใหญ่ครบ", price: 1100, item_condition: "used_like_new", status: "active", images: ["nebulizer_01.jpg"], location: "ปทุมธานี", created_at: new Date("2026-07-07T09:10:00Z") },
  { _id: "65f200000000000000000008", seller_id: "65f100000000000000000007", category_id: "65f700000000000000000004", title: "เครื่องดูดเสมหะ (Suction Machine)", description: "แรงดูดดี เสียงไม่ดังมาก แถมสายยางดูดเสมหะของใหม่ 5 เส้น", price: 2500, item_condition: "used_good", status: "active", images: ["suction_01.jpg"], location: "สมุทรปราการ", created_at: new Date("2026-07-08T11:00:00Z") },
  { _id: "65f200000000000000000009", seller_id: "65f100000000000000000008", category_id: "65f700000000000000000003", title: "วอล์คเกอร์พับได้ (Walker)", description: "มีรอยถลอกตามการใช้งาน โครงสร้างยังแข็งแรง พับเก็บง่าย", price: 450, item_condition: "used_fair", status: "sold", images: ["walker_01.jpg"], location: "นครราชสีมา", created_at: new Date("2026-07-09T13:30:00Z") },
  { _id: "65f200000000000000000010", seller_id: "65f100000000000000000009", category_id: "65f700000000000000000006", title: "เก้าอี้นั่งถ่าย คร่อมชักโครกได้", description: "พลาสติกหนาเกรด A ล้างทำความสะอาดฆ่าเชื้อแล้วเรียบร้อย", price: 800, item_condition: "used_like_new", status: "active", images: ["commode_chair_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-10T10:15:00Z") },
  { _id: "65f200000000000000000011", seller_id: "65f100000000000000000010", category_id: "65f700000000000000000004", title: "เครื่อง CPAP แก้นอนกรน ResMed", description: "ใช้งาน 2 ปี เปลี่ยนฟิลเตอร์ตลอด ต้องซื้อหน้ากากใหม่เอง", price: 15000, item_condition: "used_good", status: "reserved", images: ["cpap_resmed_01.jpg"], location: "ภูเก็ต", created_at: new Date("2026-07-10T15:20:00Z") },
  { _id: "65f200000000000000000012", seller_id: "65f100000000000000000002", category_id: "65f700000000000000000005", title: "เครื่องตรวจวัดน้ำตาลในเลือด Accu-Chek", description: "แถมปากกาเจาะเลือด ไม่รวมแผ่นตรวจ", price: 300, item_condition: "used_like_new", status: "active", images: ["glucometer_01.jpg"], location: "ขอนแก่น", created_at: new Date("2026-07-11T09:40:00Z") },
  { _id: "65f200000000000000000013", seller_id: "65f100000000000000000003", category_id: "65f700000000000000000001", title: "โต๊ะคร่อมเตียงผู้ป่วย ลายไม้", description: "ปรับระดับสูงต่ำได้ มีล้อล็อคได้ ใช้งานสะดวก", price: 900, item_condition: "used_good", status: "active", images: ["overbed_table_01.jpg"], location: "เชียงใหม่", created_at: new Date("2026-07-11T12:00:00Z") },
  { _id: "65f200000000000000000014", seller_id: "65f100000000000000000004", category_id: "65f700000000000000000002", title: "รถเข็นผู้ป่วยไฟฟ้า บังคับด้วยจอยสติ๊ก", description: "แบตเตอรี่ยังเก็บไฟได้ดี วิ่งได้ไกล 15 กม.", price: 22000, item_condition: "used_good", status: "active", images: ["electric_wheelchair_01.jpg"], location: "นนทบุรี", created_at: new Date("2026-07-11T16:30:00Z") },
  { _id: "65f200000000000000000015", seller_id: "65f100000000000000000005", category_id: "65f700000000000000000008", title: "เครื่องช่วยฟังแบบทัดหลังหู", description: "มีเสียงซ่าบ้างบางครั้ง แต่ยังขยายเสียงได้ปกติ เหมาะสำหรับผู้เริ่มต้น", price: 1500, item_condition: "used_fair", status: "sold", images: ["hearing_aid_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-12T08:15:00Z") },
  { _id: "65f200000000000000000016", seller_id: "65f100000000000000000006", category_id: "65f700000000000000000008", title: "เสาน้ำเกลือสแตนเลสแบบ 4 แฉก มีล้อ", description: "ปรับความสูงได้ ไม่เป็นสนิม ล้อลื่นเข็นง่าย", price: 500, item_condition: "used_good", status: "active", images: ["iv_pole_01.jpg"], location: "ชลบุรี", created_at: new Date("2026-07-12T10:45:00Z") },
  { _id: "65f200000000000000000017", seller_id: "65f100000000000000000007", category_id: "65f700000000000000000004", title: "ถังออกซิเจน 1.5 คิว พร้อมเกจ์วัด", description: "ซื้อมาสแตนด์บายฉุกเฉิน ออกซิเจนยังเต็มถัง", price: 2000, item_condition: "used_like_new", status: "active", images: ["oxygen_tank_01.jpg"], location: "ปทุมธานี", created_at: new Date("2026-07-12T13:20:00Z") },
  { _id: "65f200000000000000000018", seller_id: "65f100000000000000000008", category_id: "65f700000000000000000003", title: "รถเข็นช่วยเดิน (Rollator) มีเบาะนั่ง", description: "โครงอลูมิเนียมสีแดง มีตะกร้าใส่ของด้านล่างและเบรกมือ", price: 1800, item_condition: "used_good", status: "reserved", images: ["rollator_01.jpg"], location: "สมุทรปราการ", created_at: new Date("2026-07-12T15:50:00Z") },
  { _id: "65f200000000000000000019", seller_id: "65f100000000000000000009", category_id: "65f700000000000000000001", title: "ที่นอนยางพาราสำหรับผู้ป่วยติดเตียง", description: "หนา 4 นิ้ว หุ้มหนังเทียมกันน้ำ เช็ดทำความสะอาดง่าย ไม่ยุบตัว", price: 3500, item_condition: "used_good", status: "active", images: ["latex_mattress_01.jpg"], location: "นครราชสีมา", created_at: new Date("2026-07-13T09:00:00Z") },
  { _id: "65f200000000000000000020", seller_id: "65f100000000000000000010", category_id: "65f700000000000000000008", title: "เครื่องกระตุ้นกล้ามเนื้อไฟฟ้า TENS", description: "แผ่นแปะใหม่ 4 แผ่น ใช้งานง่าย บรรเทาอาการปวดเมื่อย", price: 1200, item_condition: "used_like_new", status: "active", images: ["tens_machine_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-13T10:30:00Z") },
  { _id: "65f200000000000000000021", seller_id: "65f100000000000000000001", category_id: "65f700000000000000000008", title: "รองเท้าเฝือก (Walking Boot) ไซส์ M", description: "ใส่เดินได้ปกติ มีร่องรอยการเดินเล็กน้อย ตีนตุ๊กแกยังติดแน่น", price: 600, item_condition: "used_good", status: "sold", images: ["walking_boot_01.jpg"], location: "ภูเก็ต", created_at: new Date("2026-07-13T11:45:00Z") },
  { _id: "65f200000000000000000022", seller_id: "65f100000000000000000002", category_id: "65f700000000000000000005", title: "เครื่องวัดออกซิเจนปลายนิ้ว (Pulse Oximeter)", description: "จอบางจุดไฟขาดนิดหน่อย แต่อ่านค่าได้แม่นยำปกติ", price: 150, item_condition: "used_fair", status: "active", images: ["oximeter_01.jpg"], location: "ขอนแก่น", created_at: new Date("2026-07-13T13:20:00Z") },
  { _id: "65f200000000000000000023", seller_id: "65f100000000000000000003", category_id: "65f700000000000000000001", title: "เตียงผู้ป่วยมือหมุน 2 ไกร์", description: "เหล็กหนาแข็งแรง หมุนปรับหัวและขาได้ ล้อล็อกได้ 4 ล้อ", price: 5500, item_condition: "used_good", status: "active", images: ["bed_manual_01.jpg"], location: "เชียงใหม่", created_at: new Date("2026-07-13T14:40:00Z") },
  { _id: "65f200000000000000000024", seller_id: "65f100000000000000000004", category_id: "65f700000000000000000008", title: "สายรัดพยุงหลัง (Lumbar Support) ไซส์ L", description: "ผ้ายืดระบายอากาศได้ดี แกนดันหลังอลูมิเนียมดัดได้", price: 250, item_condition: "used_good", status: "active", images: ["lumbar_support_01.jpg"], location: "นนทบุรี", created_at: new Date("2026-07-13T16:15:00Z") },
  { _id: "65f200000000000000000025", seller_id: "65f100000000000000000005", category_id: "65f700000000000000000007", title: "เครื่องยกผู้ป่วย (Patient Lift)", description: "ระบบไฮดรอลิก ช่วยเคลื่อนย้ายผู้ป่วยจากเตียงไปรถเข็น แถมผ้ายกตัว 1 ผืน", price: 18000, item_condition: "used_like_new", status: "reserved", images: ["patient_lift_01.jpg"], location: "กรุงเทพมหานคร", created_at: new Date("2026-07-13T18:00:00Z") },
];

const ratings = [
  { _id: "65f400000000000000000001", listing_id: "65f200000000000000000001", rater_id: "65f100000000000000000002", rated_user_id: "65f100000000000000000001", score: 5, comment: "สินค้าตรงตามที่ประกาศ ส่งไว", created_at: new Date("2026-07-13T11:00:00Z") },
  { _id: "65f400000000000000000002", listing_id: "65f200000000000000000002", rater_id: "65f100000000000000000003", rated_user_id: "65f100000000000000000001", score: 4, comment: "ตอบแชทเร็ว สินค้าสภาพดี", created_at: new Date("2026-07-13T11:10:00Z") },
  { _id: "65f400000000000000000003", listing_id: "65f200000000000000000003", rater_id: "65f100000000000000000005", rated_user_id: "65f100000000000000000002", score: 5, comment: "แนะนำผู้ขายครับ", created_at: new Date("2026-07-13T11:20:00Z") },
  { _id: "65f400000000000000000004", listing_id: "65f200000000000000000004", rater_id: "65f100000000000000000007", rated_user_id: "65f100000000000000000002", score: 4, comment: "ใช้งานได้จริง", created_at: new Date("2026-07-13T11:30:00Z") },
  { _id: "65f400000000000000000005", listing_id: "65f200000000000000000006", rater_id: "65f100000000000000000001", rated_user_id: "65f100000000000000000003", score: 5, comment: "คุยง่าย ส่งของตามเวลา", created_at: new Date("2026-07-13T11:40:00Z") },
  { _id: "65f400000000000000000006", listing_id: "65f200000000000000000007", rater_id: "65f100000000000000000009", rated_user_id: "65f100000000000000000004", score: 4, comment: "บริการดี", created_at: new Date("2026-07-13T11:50:00Z") },
  { _id: "65f400000000000000000007", listing_id: "65f200000000000000000009", rater_id: "65f100000000000000000010", rated_user_id: "65f100000000000000000005", score: 5, comment: "ของตรงปก", created_at: new Date("2026-07-13T12:00:00Z") },
  { _id: "65f400000000000000000008", listing_id: "65f200000000000000000011", rater_id: "65f100000000000000000012", rated_user_id: "65f100000000000000000006", score: 5, comment: "สภาพดีมาก", created_at: new Date("2026-07-13T12:10:00Z") },
  { _id: "65f400000000000000000009", listing_id: "65f200000000000000000012", rater_id: "65f100000000000000000013", rated_user_id: "65f100000000000000000006", score: 4, comment: "แพ็กของดี", created_at: new Date("2026-07-13T12:20:00Z") },
  { _id: "65f400000000000000000010", listing_id: "65f200000000000000000013", rater_id: "65f100000000000000000014", rated_user_id: "65f100000000000000000007", score: 3, comment: "สินค้าตามราคา", created_at: new Date("2026-07-13T12:30:00Z") },
  { _id: "65f400000000000000000011", listing_id: "65f200000000000000000015", rater_id: "65f100000000000000000016", rated_user_id: "65f100000000000000000008", score: 5, comment: "ประทับใจมาก", created_at: new Date("2026-07-13T12:40:00Z") },
  { _id: "65f400000000000000000012", listing_id: "65f200000000000000000016", rater_id: "65f100000000000000000017", rated_user_id: "65f100000000000000000008", score: 4, comment: "ส่งเร็ว", created_at: new Date("2026-07-13T12:50:00Z") },
  { _id: "65f400000000000000000013", listing_id: "65f200000000000000000017", rater_id: "65f100000000000000000018", rated_user_id: "65f100000000000000000009", score: 5, comment: "ผู้ขายสุภาพ", created_at: new Date("2026-07-13T13:00:00Z") },
  { _id: "65f400000000000000000014", listing_id: "65f200000000000000000018", rater_id: "65f100000000000000000019", rated_user_id: "65f100000000000000000009", score: 4, comment: "คุ้มราคา", created_at: new Date("2026-07-13T13:10:00Z") },
  { _id: "65f400000000000000000015", listing_id: "65f200000000000000000019", rater_id: "65f100000000000000000020", rated_user_id: "65f100000000000000000010", score: 5, comment: "ยอดเยี่ยม", created_at: new Date("2026-07-13T13:20:00Z") },
  { _id: "65f400000000000000000016", listing_id: "65f200000000000000000020", rater_id: "65f100000000000000000001", rated_user_id: "65f100000000000000000010", score: 4, comment: "แนะนำครับ", created_at: new Date("2026-07-13T13:30:00Z") },
  { _id: "65f400000000000000000017", listing_id: "65f200000000000000000021", rater_id: "65f100000000000000000004", rated_user_id: "65f100000000000000000011", score: 5, comment: "ได้รับของแล้ว", created_at: new Date("2026-07-13T13:40:00Z") },
  { _id: "65f400000000000000000018", listing_id: "65f200000000000000000022", rater_id: "65f100000000000000000006", rated_user_id: "65f100000000000000000011", score: 4, comment: "ตรงตามรูป", created_at: new Date("2026-07-13T13:50:00Z") },
  { _id: "65f400000000000000000019", listing_id: "65f200000000000000000023", rater_id: "65f100000000000000000008", rated_user_id: "65f100000000000000000012", score: 5, comment: "แนะนำผู้ขาย", created_at: new Date("2026-07-13T14:00:00Z") },
  { _id: "65f400000000000000000020", listing_id: "65f200000000000000000024", rater_id: "65f100000000000000000015", rated_user_id: "65f100000000000000000012", score: 4, comment: "ตอบไวมาก", created_at: new Date("2026-07-13T14:10:00Z") },
];

const reports = [
  { _id: "65f500000000000000000001", listing_id: "65f200000000000000000002", reporter_id: "65f100000000000000000001", reason: "สินค้าไม่ตรงตามคำอธิบาย", status: "pending", created_at: new Date("2026-07-13T12:00:00Z") },
  { _id: "65f500000000000000000002", listing_id: "65f200000000000000000004", reporter_id: "65f100000000000000000003", reason: "รูปภาพไม่ตรงกับสินค้าจริง", status: "reviewing", created_at: new Date("2026-07-13T12:10:00Z") },
  { _id: "65f500000000000000000003", listing_id: "65f200000000000000000006", reporter_id: "65f100000000000000000005", reason: "ราคาหลอกลวง", status: "resolved", created_at: new Date("2026-07-13T12:20:00Z") },
  { _id: "65f500000000000000000004", listing_id: "65f200000000000000000009", reporter_id: "65f100000000000000000007", reason: "สินค้าชำรุดแต่ไม่ได้แจ้ง", status: "pending", created_at: new Date("2026-07-13T12:30:00Z") },
  { _id: "65f500000000000000000005", listing_id: "65f200000000000000000011", reporter_id: "65f100000000000000000009", reason: "ข้อมูลสินค้าไม่ครบ", status: "reviewing", created_at: new Date("2026-07-13T12:40:00Z") },
  { _id: "65f500000000000000000006", listing_id: "65f200000000000000000014", reporter_id: "65f100000000000000000010", reason: "ลงประกาศซ้ำ", status: "resolved", created_at: new Date("2026-07-13T12:50:00Z") },
  { _id: "65f500000000000000000007", listing_id: "65f200000000000000000018", reporter_id: "65f100000000000000000012", reason: "สงสัยว่าเป็นสินค้าปลอม", status: "reviewing", created_at: new Date("2026-07-13T13:00:00Z") },
  { _id: "65f500000000000000000008", listing_id: "65f200000000000000000020", reporter_id: "65f100000000000000000014", reason: "ติดต่อผู้ขายไม่ได้", status: "rejected", created_at: new Date("2026-07-13T13:10:00Z") },
  { _id: "65f500000000000000000009", listing_id: "65f200000000000000000023", reporter_id: "65f100000000000000000016", reason: "ข้อมูลคลาดเคลื่อน", status: "pending", created_at: new Date("2026-07-13T13:20:00Z") },
  { _id: "65f500000000000000000010", listing_id: "65f200000000000000000026", reporter_id: "65f100000000000000000018", reason: "ขายสินค้าเสียหาย", status: "resolved", created_at: new Date("2026-07-13T13:30:00Z") },
];

const searchLogs = [
  { _id: "65f800000000000000000001", user_id: "65f100000000000000000001", keyword: "wheelchair", searched_at: new Date("2026-07-12T09:00:00Z") },
  { _id: "65f800000000000000000002", user_id: "65f100000000000000000002", keyword: "hospital bed", searched_at: new Date("2026-07-12T09:05:00Z") },
  { _id: "65f800000000000000000003", user_id: "65f100000000000000000003", keyword: "walker", searched_at: new Date("2026-07-12T09:15:00Z") },
  { _id: "65f800000000000000000004", user_id: "65f100000000000000000004", keyword: "oxygen concentrator", searched_at: new Date("2026-07-12T10:00:00Z") },
  { _id: "65f800000000000000000005", user_id: "65f100000000000000000005", keyword: "blood pressure monitor", searched_at: new Date("2026-07-12T10:15:00Z") },
  { _id: "65f800000000000000000006", user_id: "65f100000000000000000006", keyword: "patient bed", searched_at: new Date("2026-07-12T10:20:00Z") },
  { _id: "65f800000000000000000007", user_id: "65f100000000000000000007", keyword: "wheelchair", searched_at: new Date("2026-07-12T11:00:00Z") },
  { _id: "65f800000000000000000008", user_id: "65f100000000000000000008", keyword: "walker", searched_at: new Date("2026-07-12T11:10:00Z") },
  { _id: "65f800000000000000000009", user_id: "65f100000000000000000009", keyword: "suction machine", searched_at: new Date("2026-07-12T12:00:00Z") },
  { _id: "65f800000000000000000010", user_id: "65f100000000000000000010", keyword: "oxygen machine", searched_at: new Date("2026-07-12T13:00:00Z") },
];

const orders = [
  {
    _id: "65f900000000000000000001",
    buyer_id: "65f100000000000000000003",
    items: [
      { listing_id: "65f200000000000000000001", title: "เตียงผู้ป่วยไฟฟ้า 3 ไกร์", price: 9500, image: "https://images.pexels.com/photos/263404/pexels-photo-263404.jpeg?w=600&h=400&fit=crop", quantity: 1 },
    ],
    total_amount: 9500,
    status: "completed",
    shipping_address: "123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
    phone: "082-333-3333",
    created_at: new Date("2026-07-10T09:00:00Z"),
  },
  {
    _id: "65f900000000000000000002",
    buyer_id: "65f100000000000000000005",
    items: [
      { listing_id: "65f200000000000000000002", title: "วีลแชร์อลูมิเนียมพับได้ น้ำหนักเบา", price: 3200, image: "https://images.pexels.com/photos/8415827/pexels-photo-8415827.jpeg?w=600&h=400&fit=crop", quantity: 1 },
      { listing_id: "65f200000000000000000006", title: "ไม้เท้า 4 ขา อลูมิเนียมอัลลอย", price: 250, image: "https://images.pexels.com/photos/3874155/pexels-photo-3874155.jpeg?w=600&h=400&fit=crop", quantity: 2 },
    ],
    total_amount: 3700,
    status: "paid",
    shipping_address: "456 ถ.รัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานคร 10400",
    phone: "084-555-5555",
    created_at: new Date("2026-07-12T14:00:00Z"),
  },
  {
    _id: "65f900000000000000000003",
    buyer_id: "65f100000000000000000007",
    items: [
      { listing_id: "65f200000000000000000007", title: "เครื่องพ่นยาขยายหลอดลม (Nebulizer)", price: 1100, image: "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?w=600&h=400&fit=crop", quantity: 1 },
      { listing_id: "65f200000000000000000008", title: "เครื่องดูดเสมหะ (Suction Machine)", price: 2500, image: "https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg?w=600&h=400&fit=crop", quantity: 1 },
    ],
    total_amount: 3600,
    status: "pending_payment",
    shipping_address: "789 ถ.ลาดพร้าว แขวงจันทร์หลง เขตบึงกุ่ม กรุงเทพมหานคร 10240",
    phone: "086-777-7777",
    created_at: new Date("2026-07-13T10:00:00Z"),
  },
  {
    _id: "65f900000000000000000004",
    buyer_id: "65f100000000000000000012",
    items: [
      { listing_id: "65f200000000000000000010", title: "เก้าอี้นั่งถ่าย คร่อมชักโครกได้", price: 800, image: "https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?w=600&h=400&fit=crop", quantity: 1 },
    ],
    total_amount: 800,
    status: "shipped",
    shipping_address: "321 ถ.พระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110",
    phone: "083-303-3030",
    created_at: new Date("2026-07-11T16:00:00Z"),
  },
  {
    _id: "65f900000000000000000005",
    buyer_id: "65f100000000000000000018",
    items: [
      { listing_id: "65f200000000000000000012", title: "เครื่องตรวจวัดน้ำตาลในเลือด Accu-Chek", price: 300, image: "https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?w=600&h=400&fit=crop", quantity: 1 },
      { listing_id: "65f200000000000000000022", title: "เครื่องวัดออกซิเจนปลายนิ้ว (Pulse Oximeter)", price: 150, image: "https://images.pexels.com/photos/4386526/pexels-photo-4386526.jpeg?w=600&h=400&fit=crop", quantity: 1 },
      { listing_id: "65f200000000000000000020", title: "เครื่องกระตุ้นกล้ามเนื้อไฟฟ้า TENS", price: 1200, image: "https://images.pexels.com/photos/5726799/pexels-photo-5726799.jpeg?w=600&h=400&fit=crop", quantity: 1 },
    ],
    total_amount: 1650,
    status: "cancelled",
    shipping_address: "654 ถ.เพชรบุรี แขวงมักกะสัน เขตราชเทวี กรุงเทพมหานคร 10400",
    phone: "089-909-9090",
    created_at: new Date("2026-07-09T11:00:00Z"),
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Listing.deleteMany({}),
      Rating.deleteMany({}),
      Report.deleteMany({}),
      SearchLog.deleteMany({}),
      Order.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    await User.insertMany(users);
    console.log(`Seeded ${users.length} users`);

    await Category.insertMany(categories);
    console.log(`Seeded ${categories.length} categories`);

    await Listing.insertMany(listings);
    console.log(`Seeded ${listings.length} listings`);

    await Rating.insertMany(ratings);
    console.log(`Seeded ${ratings.length} ratings`);

    await Report.insertMany(reports);
    console.log(`Seeded ${reports.length} reports`);

    await SearchLog.insertMany(searchLogs);
    console.log(`Seeded ${searchLogs.length} search logs`);

    await Order.insertMany(orders);
    console.log(`Seeded ${orders.length} orders`);

    console.log("Seed completed!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();

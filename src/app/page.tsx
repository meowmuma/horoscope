"use client";
import { useState } from "react";
import { motion } from "framer-motion"; // ถ้าไม่ได้ลง framer-motion ให้ลบ component <motion.div> ออกและใช้ <div> ธรรมดาแทนได้ครับ

export default function Home() {
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("มกราคม");
  const [year, setYear] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ข้อมูลเดือนภาษาไทย
  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const handleSubmit = async () => {
    if (!year) {
      alert("กรุณากรอกปีเกิดด้วยนะครับ");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          month,
          year,
          message: `ทำนายเนื้อคู่สำหรับคนเกิดวันที่ ${day} เดือน${month} ปี ${year} ขอแบบแม่นๆ ภาษาที่ใช้ขอแบบหมอดูแม่นๆ`
        }),
      });

      const data = await res.json();
      // แก้ไขการดึงข้อมูลตาม structure ที่แก้ใน n8n
      setResult(data.result || "เกิดข้อผิดพลาด ไม่ได้รับคำทำนาย");
    } catch (error) {
      setResult("ระบบขัดข้อง ลองใหม่อีกครั้งนะครับ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl w-full max-w-md shadow-2xl border-4 border-white/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-2">🔮</div>
          <h1 className="text-3xl font-bold text-purple-800">
            เปิดดวงชะตาเนื้อคู่
          </h1>
          <p className="text-gray-500 mt-2">เช็กดวงความรักแม่นๆ ด้วย AI</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* วันที่ */}
            <div className="flex flex-col">
              <label className="text-sm text-purple-700 font-bold mb-1">วันที่เกิด</label>
              <select 
                className="p-3 rounded-xl border border-purple-200 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* เดือน */}
            <div className="flex flex-col">
              <label className="text-sm text-purple-700 font-bold mb-1">เดือนเกิด</label>
              <select 
                className="p-3 rounded-xl border border-purple-200 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ปี */}
          <div className="flex flex-col">
            <label className="text-sm text-purple-700 font-bold mb-1">ปีเกิด (พ.ศ. หรือ ค.ศ.)</label>
            <input
              type="text"
              placeholder="เช่น 2543"
              className="p-3 rounded-xl border border-purple-200 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-95 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังสื่อสารกับดวงดาว...
              </span>
            ) : (
              "🔮 ทำนายดวงเนื้อคู่ เดี๋ยวนี้!"
            )}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div className="mt-8 p-6 bg-purple-50 rounded-2xl border-2 border-purple-100 shadow-inner">
            <h3 className="text-lg font-bold text-purple-800 mb-2">💌 ผลคำนายของคุณ:</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
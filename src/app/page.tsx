'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ข้อมูลไพ่ทาโรต์ - 12 ใบที่เกี่ยวกับความรัก
const tarotCards = [
  {
    id: 1,
    name: 'The Lovers',
    filename: 'the-lovers',
    meaning: 'ความรักที่แท้จริง การเลือกหัวใจ ความสัมพันธ์ที่ลงตัว บ่งบอกถึงความรักที่มีความหมายและการตัดสินใจสำคัญในชีวิตรัก'
  },
  {
    id: 2,
    name: 'Two of Cups',
    filename: 'two-of-cups',
    meaning: 'ความผูกพันทางใจ ความสมดุล พันธมิตรแห่งความรัก แสดงถึงความรักที่เท่าเทียมและการเชื่อมต่อที่ลึกซึ้ง'
  },
  {
    id: 3,
    name: 'Three of Cups',
    filename: 'three-of-cups',
    meaning: 'ความสุขร่วมกัน การเฉลิมฉลอง มิตรภาพที่นำมาสู่ความรัก บ่งบอกถึงช่วงเวลาแห่งความสุขในความสัมพันธ์'
  },
  {
    id: 4,
    name: 'Ten of Cups',
    filename: 'ten-of-cups',
    meaning: 'ความสุขที่สมบูรณ์แบบ ครอบครัวที่อบอุ่น ความรักที่ยั่งยืน แสดงถึงความสำเร็จสูงสุดในเรื่องความรัก'
  },
  {
    id: 5,
    name: 'The Empress',
    filename: 'the-empress',
    meaning: 'ความรักที่บำรุงเลี้ยง ความอุดมสมบูรณ์ ความเป็นแม่ บ่งบอกถึงความรักที่เต็มเปี่ยมและการเติบโต'
  },
  {
    id: 6,
    name: 'The Sun',
    filename: 'the-sun',
    meaning: 'ความสุข ความสำเร็จ พลังบวก แสดงถึงช่วงเวลาที่สดใสและความรักที่เปี่ยมด้วยความสุข'
  },
  {
    id: 7,
    name: 'The Star',
    filename: 'the-star',
    meaning: 'ความหวัง การเยียวยา แรงบันดาลใจ บ่งบอกถึงความรักที่ให้กำลังใจและความหวังใหม่'
  },
  {
    id: 8,
    name: 'Ace of Swords',
    filename: 'ace-of-swords',
    meaning: 'ความชัดเจน ความจริง การสื่อสาร แสดงถึงการเริ่มต้นใหม่ด้วยความเข้าใจที่ชัดเจน'
  },
  {
    id: 9,
    name: 'The Devil',
    filename: 'the-devil',
    meaning: 'ความหลงใหล การยึดติด ความต้องการ บ่งบอกถึงความรักที่เข้มข้นแต่อาจมีการผูกมัด'
  },
  {
    id: 10,
    name: 'Three of Swords',
    filename: 'three-of-swords',
    meaning: 'ความท้าทาย การสื่อสาร ความขัดแย้ง แสดงถึงความรักที่ต้องใช้ปัญญาในการแก้ไข'
  },
  {
    id: 11,
    name: 'The Hermit',
    filename: 'the-hermit',
    meaning: 'การค้นหาตัวเอง ความเงียบสงบ ภูมิปัญญา บ่งบอกถึงการเรียนรู้ความรักจากภายใน'
  },
  {
    id: 12,
    name: 'Justice',
    filename: 'justice',
    meaning: 'ความยุติธรรม ความสมดุล การตัดสินใจ แสดงถึงความรักที่เป็นธรรมและมีเหตุผล'
  }
];

// ข้อมูล 12 ราศี
const zodiacSigns = [
  {
    id: 'aries',
    name: 'ราศีเมษ',
    nameEn: 'ARIES',
    symbol: '♈',
    dates: '21 มี.ค. – 19 เม.ย.',
    traits: ['กล้า ลุย ตรงไปตรงมา', 'ใจร้อนนิดหน่อย แต่จริงใจ', 'เรื่องความรักชอบความชัดเจน ไม่ชอบรอ']
  },
  {
    id: 'taurus',
    name: 'ราศีพฤษภ',
    nameEn: 'TAURUS',
    symbol: '♉',
    dates: '20 เม.ย. – 20 พ.ค.',
    traits: ['มั่นคง รักความสบาย', 'ดื้อเงียบ แต่รักจริง', 'ความรักต้องการความมั่นใจและความซื่อสัตย์']
  },
  {
    id: 'gemini',
    name: 'ราศีเมถุน',
    nameEn: 'GEMINI',
    symbol: '♊',
    dates: '21 พ.ค. – 20 มิ.ย.',
    traits: ['ช่างพูด ฉลาด ปรับตัวเก่ง', 'อารมณ์เปลี่ยนง่าย เบื่อง่าย', 'รักต้องมีการสื่อสาร ไม่ชอบความจำเจ']
  },
  {
    id: 'cancer',
    name: 'ราศีกรกฎ',
    nameEn: 'CANCER',
    symbol: '♋',
    dates: '21 มิ.ย. – 22 ก.ค.',
    traits: ['อ่อนโยน อ่อนไหว', 'ใส่ใจคนรอบข้างมาก', 'รักครอบครัว และต้องการความอบอุ่นทางใจ']
  },
  {
    id: 'leo',
    name: 'ราศีสิงห์',
    nameEn: 'LEO',
    symbol: '♌',
    dates: '23 ก.ค. – 22 ส.ค.',
    traits: ['มั่นใจ ใจใหญ่', 'ชอบเป็นจุดสนใจ', 'รักแล้วทุ่ม รักศักดิ์ศรี และต้องการการยอมรับ']
  },
  {
    id: 'virgo',
    name: 'ราศีกันย์',
    nameEn: 'VIRGO',
    symbol: '♍',
    dates: '23 ส.ค. – 22 ก.ย.',
    traits: ['ละเอียด รอบคอบ', 'คิดเยอะ วิจารณ์ตัวเองเก่ง', 'รักจริงแต่ไม่ค่อยแสดงออก ต้องการความมั่นคง']
  },
  {
    id: 'libra',
    name: 'ราศีตุลย์',
    nameEn: 'LIBRA',
    symbol: '♎',
    dates: '23 ก.ย. – 22 ต.ค.',
    traits: ['รักความยุติธรรม', 'สุภาพ มีเสน่ห์', 'เรื่องความรักให้ความสำคัญกับความสมดุลและความเข้าใจ']
  },
  {
    id: 'scorpio',
    name: 'ราศีพิจิก',
    nameEn: 'SCORPIO',
    symbol: '♏',
    dates: '23 ต.ค. – 21 พ.ย.',
    traits: ['ลึกซึ้ง จริงจัง', 'ขี้หึงนิด ๆ แต่รักจริง', 'ความรักต้องการความซื่อสัตย์แบบสุดใจ']
  },
  {
    id: 'sagittarius',
    name: 'ราศีธนู',
    nameEn: 'SAGITTARIUS',
    symbol: '♐',
    dates: '22 พ.ย. – 21 ธ.ค.',
    traits: ['รักอิสระ มองโลกกว้าง', 'ตรงไปตรงมา', 'ความรักต้องไม่ผูกมัดจนเกินไป']
  },
  {
    id: 'capricorn',
    name: 'ราศีมังกร',
    nameEn: 'CAPRICORN',
    symbol: '♑',
    dates: '22 ธ.ค. – 19 ม.ค.',
    traits: ['จริงจัง มีเป้าหมาย', 'รับผิดชอบสูง', 'รักช้าแต่มั่นคง เน้นอนาคต']
  },
  {
    id: 'aquarius',
    name: 'ราศีกุมภ์',
    nameEn: 'AQUARIUS',
    symbol: '♒',
    dates: '20 ม.ค. – 18 ก.พ.',
    traits: ['คิดไม่เหมือนใคร', 'รักอิสระ ชอบเพื่อน', 'ความรักต้องเป็นตัวของตัวเอง ไม่ชอบถูกบังคับ']
  },
  {
    id: 'pisces',
    name: 'ราศีมีน',
    nameEn: 'PISCES',
    symbol: '♓',
    dates: '19 ก.พ. – 20 มี.ค.',
    traits: ['อ่อนไหว โรแมนติก', 'มีจินตนาการสูง', 'รักแล้วรักจริง ต้องการความเข้าใจทางใจ']
  }
];

// ฟังก์ชันสุ่มตำแหน่งไพ่
const shuffleCards = () => {
  const shuffled = [...Array(12)].map((_, i) => i);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Home() {
  // State สำหรับฟีเจอร์ดวงชะตา
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [horoscopeResult, setHoroscopeResult] = useState('');
  const [isLoadingHoroscope, setIsLoadingHoroscope] = useState(false);

  // State สำหรับไพ่ทาโรต์
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<typeof tarotCards[0] | null>(null);
  const [showCardModal, setShowCardModal] = useState(false);

  // State สำหรับราศี
  const [selectedZodiac, setSelectedZodiac] = useState<typeof zodiacSigns[0] | null>(null);
  const [showZodiacModal, setShowZodiacModal] = useState(false);

  // สุ่มตำแหน่งไพ่เมื่อโหลดหน้าเว็บ
  useEffect(() => {
    setCardPositions(shuffleCards());
  }, []);

  // ฟังก์ชันสำหรับเช็คดวง (เชื่อมกับ n8n)
  const handleCheckHoroscope = async () => {
    if (!day || !month || !year) {
      alert('กรุณากรอกวันเกิดให้ครบถ้วน');
      return;
    }

    setIsLoadingHoroscope(true);
    
    try {
      // TODO: เปลี่ยน URL เป็น n8n webhook ของคุณ
      const response = await fetch('https://sukunafuka.app.n8n.cloud/webhook/horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day,
          month,
          year
        })
      });

      const data = await response.json();
      setHoroscopeResult(data.result || 'ผลการทำนาย: คุณเหมาะกับคนที่มีนิสัยอ่อนโยนและเข้าใจคุณ');
    } catch (error) {
      console.error('Error:', error);
      setHoroscopeResult('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoadingHoroscope(false);
    }
  };

  // ฟังก์ชันสำหรับเปิดไพ่
  const handleCardClick = (positionIndex: number) => {
    // ถ้ายังไม่ได้เปิดไพ่ใดเลย ให้เปิดได้
    if (flippedCardIndex === null) {
      const cardIndex = cardPositions[positionIndex];
      setFlippedCardIndex(positionIndex);
      
      // รอ animation เสร็จแล้วค่อยแสดง modal
      setTimeout(() => {
        setSelectedCard(tarotCards[cardIndex]);
        setShowCardModal(true);
      }, 600);
    }
  };

  // ฟังก์ชันรีเซ็ตไพ่
  const handleResetCards = () => {
    setFlippedCardIndex(null);
    setSelectedCard(null);
    setShowCardModal(false);
    // สุ่มตำแหน่งใหม่
    setCardPositions(shuffleCards());
  };

  // ฟังก์ชันเปิด modal ราศี
  const handleZodiacClick = (zodiac: typeof zodiacSigns[0]) => {
    setSelectedZodiac(zodiac);
    setShowZodiacModal(true);
  };

  // ฟังก์ชันปิด modal ราศี
  const handleCloseZodiacModal = () => {
    setShowZodiacModal(false);
    setTimeout(() => setSelectedZodiac(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8D4F8] via-[#F5CAE8] to-[#FFCDE1]">
      {/* Header */}
      <header className="bg-[#E8D4F8] py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {/* Logo */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
            {/* ใส่รูปโลโก้ของคุณที่ public/logo.png แล้ว uncomment บรรทัดด้านล่าง */}
            {/* <Image src="/logo.png" alt="Destiny of Love" fill className="object-cover" /> */}
            <span className="text-2xl">🔮</span>
          </div>
          <h1 className="text-3xl font-serif text-gray-800">Destiny of Love</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        
        {/* Section 1: เช็คดวงความรักตามราศี */}
        <section className="mb-16">
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🔮</span>
              </div>
              <h2 className="text-2xl font-medium text-gray-800">เช็คดวงความรักตามราศี</h2>
            </div>

            <div className="space-y-4">
              {/* วันเกิด */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">วันเกิด</label>
                <select 
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="">เลือก</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* เดือนเกิด */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">เดือนเกิด</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="">เลือก</option>
                  {['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
                  ].map((m, i) => (
                    <option key={i} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>

              {/* ปีเกิด (พ.ศ.) */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">ปีเกิด (พ.ศ.)</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2548"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              {/* ปุ่มดูดวง */}
              <button
                onClick={handleCheckHoroscope}
                disabled={isLoadingHoroscope}
                className="w-full bg-[#E8B5D8] hover:bg-[#d9a5c8] text-gray-800 font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoadingHoroscope ? 'กำลังดูดวง...' : 'ทํานายดวงชะตา เดี๋ยวนี้'}
              </button>

              {/* แสดงผลการทำนาย */}
              {horoscopeResult && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{horoscopeResult}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Tarot Love Reading */}
        <section className="mb-16">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-8">Tarot Love Reading</h2>
          
          <div className="max-w-6xl mx-auto">
            {/* แสดงไพ่แบบซ้อนกัน */}
            <div className="relative min-h-[400px] flex items-center justify-center mb-8">
              <div className="relative w-full max-w-4xl" style={{ height: '350px' }}>
                {cardPositions.map((cardIndex, positionIndex) => {
                  const isFlipped = flippedCardIndex === positionIndex;
                  const card = tarotCards[cardIndex];
                  
                  // คำนวณตำแหน่งแบบซ้อนกัน (fan layout)
                  const totalCards = 12;
                  const angleStep = 14; // มุมระหว่างไพ่
                  const startAngle = -((totalCards - 1) * angleStep) / 2;
                  const angle = startAngle + (positionIndex * angleStep);
                  const radius = 220; // ระยะห่างจากจุดกลาง
                  
                  const x = Math.sin((angle * Math.PI) / 180) * radius;
                  const y = -Math.abs(Math.cos((angle * Math.PI) / 180) * 70);
                  
                  return (
                    <div
                      key={positionIndex}
                      onClick={() => handleCardClick(positionIndex)}
                      className={`absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ${
                        flippedCardIndex !== null && !isFlipped ? 'opacity-30 pointer-events-none' : 'hover:scale-110 hover:z-50'
                      }`}
                      style={{
                          transform: isFlipped
                            ? 'translate(-50%, -50%) translate(0px, -40px) rotate(0deg)'
                            : `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`,
                          zIndex: isFlipped ? 100 : positionIndex,
                        }}
                    >
                      <div
                          className="relative w-[140px] h-[220px]"
                          style={{
                            perspective: '1000px'
                          }}
                        >
                          <div
                            className="relative w-full h-full transition-transform duration-700 will-change-transform"
                            style={{
                              transformStyle: 'preserve-3d',
                              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',

                            }}
                          >
                      
                        {/* ด้านหลังไพ่ */}
                        <div
                          className="absolute inset-0 rounded-xl shadow-2xl border-4 border-amber-800 overflow-hidden"
                          style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                          }}
                        >
                          <Image
                            src="/images/tarot/back/card-back.png"
                            alt="Card Back"
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* ด้านหน้าไพ่ */}
                        <div
                          className="absolute inset-0 bg-white rounded-xl shadow-2xl border-2 border-gray-300 overflow-hidden"
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                          }}
                        >
                          <Image
                            src={`/images/tarot/front/${card.filename}.png`}
                            alt={card.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ปุ่มรีเซ็ต */}
            {flippedCardIndex !== null && (
              <div className="text-center">
                <button
                  onClick={handleResetCards}
                  className="bg-[#E8B5D8] hover:bg-[#d9a5c8] text-gray-800 font-medium px-8 py-3 rounded-lg transition-colors"
                >
                  เริ่มใหม่อีกครั้ง
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Section 3: 12 ราศี */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {zodiacSigns.map((zodiac) => (
                <div
                  key={zodiac.id}
                  onClick={() => handleZodiacClick(zodiac)}
                  className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:scale-105 transition-transform"
                >
                  <div className="aspect-square bg-pink-50 rounded-xl mb-3 flex items-center justify-center overflow-hidden relative">
                <Image
                  src={`/images/tarot/zodiac/${zodiac.id}.png`}
                  alt={zodiac.nameEn}
                  fill
                  className="object-contain p-4"
                />
              </div>
                      <p className="text-center font-medium text-gray-800">{zodiac.nameEn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600">
        <p className="font-serif">Created by Thirakit Kianlee</p>
      </footer>

      {/* Modal สำหรับแสดงความหมายไพ่ */}
      {showCardModal && selectedCard && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4 animate-fadeIn"
          onClick={() => {
            setShowCardModal(false);
            setTimeout(() => handleResetCards(), 300);
          }}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* รูปไพ่ใหญ่ */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-48 h-72 bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden relative">
                  <Image
                    src={`/images/tarot/front/${selectedCard.filename}.png`}
                    alt={selectedCard.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* ความหมาย */}
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-gray-800 mb-4">{selectedCard.name}</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{selectedCard.meaning}</p>
                
                <button
                  onClick={() => {
                    setShowCardModal(false);
                    setTimeout(() => handleResetCards(), 300);
                  }}
                  className="w-full mt-6 bg-[#E8B5D8] hover:bg-[#d9a5c8] text-gray-800 font-medium py-3 rounded-lg transition-colors"
                >
                  กลับไปหน้าหลัก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal สำหรับแสดงข้อมูลราศี */}
      {showZodiacModal && selectedZodiac && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4 animate-fadeIn"
          onClick={handleCloseZodiacModal}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* รูปราศี */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-48 h-48 bg-pink-50 rounded-2xl border-2 border-pink-200 flex items-center justify-center overflow-hidden relative">
              <Image
                src={`/images/tarot/zodiac/${selectedZodiac.id}.png`}
                alt={selectedZodiac.nameEn}
                fill
                className="object-contain p-6"
              />
            </div>
                <p className="text-center font-medium text-gray-800 mt-4 text-xl">{selectedZodiac.nameEn}</p>
              </div>

              {/* รายละเอียด */}
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-gray-800 mb-2">{selectedZodiac.name}</h3>
                <p className="text-base text-gray-600 mb-6">{selectedZodiac.dates}</p>
                
                <div className="space-y-3">
                  <p className="font-medium text-gray-800 text-lg">นิสัย:</p>
                  {selectedZodiac.traits.map((trait, index) => (
                    <p key={index} className="text-gray-700 text-base leading-relaxed">• {trait}</p>
                  ))}
                </div>

                <button
                  onClick={handleCloseZodiacModal}
                  className="w-full mt-6 bg-[#E8B5D8] hover:bg-[#d9a5c8] text-gray-800 font-medium py-3 rounded-lg transition-colors"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
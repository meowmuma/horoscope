'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ข้อมูลไพ่ทาโรต์ - 12 ใบที่เกี่ยวกับความรัก
const tarotCards = [
  {
    id: 1,
    name: 'The Lovers',
    filename: 'the-lovers',
    meaning: `(ความรักที่แท้จริง)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ มีจิตใจบริสุทธิ์และซื่อสัตย์สูง
✓ ต่อสู้เพื่อสิ่งที่เชื่อ
✓ มองความรักเป็นเรื่องที่สำคัญที่สุด
✓ มีความเข้มข้นทางอารมณ์

คำแนะนำ:
• เปิดใจสื่อสารอย่างจริงใจ
• ตัดสินใจด้วยหัวใจและเหตุผลเท่า ๆ กัน
• รับฟังและพูดจากใจ`
  },
  {
    id: 2,
    name: 'Two of Cups',
    filename: 'two-of-cups',
    meaning: `(ความผูกพันทางใจ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ มีความสมดุลในชีวิต
✓ ไม่ให้อารมณ์ครอบงำทั้งหมด
✓ มีความเอื้ออาทรและจิตใจดี
✓ ต้องการสร้างความสัมพันธ์ที่แข็งแรง

คำแนะนำ:
• ให้กำลังใจซึ่งกันและกัน
• สนทนาเกี่ยวกับสิ่งที่ลึกซึ้ง
• สร้างความเข้าใจร่วมกัน`
  },
  {
    id: 3,
    name: 'Three of Cups',
    filename: 'three-of-cups',
    meaning: `(ความสุขร่วมกัน)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ประเภทคนที่เจอ:
✓ ร่าเริง มีความเป็นหนึ่งเดียวกัน
✓ ชอบการผจญภัยและความสนุกสนาน
✓ อาจเป็นมิตรของเพื่อน หรือมีเพื่อนร่วมกัน
✓ มีความเปิดกว้างและมองโลกในแง่ดี

คำแนะนำ:
• ใช้ความสุขเป็นพื้นฐานของความสัมพันธ์
• สร้างความสนุกสนานอย่างสม่ำเสมอ
• ท่องเที่ยวหรือทำกิจกรรมร่วมกัน`
  },
  {
    id: 4,
    name: 'Ten of Cups',
    filename: 'ten-of-cups',
    meaning: `(ความสุขที่สมบูรณ์แบบ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ มีเป้าหมายคล้ายคลึงกับคุณ
✓ สนใจการสร้างรากฐานครอบครัว
✓ มีค่านิยมร่วมกัน
✓ มีความจริงใจและรับผิดชอบสูง

คำแนะนำ:
• พูดคุยเกี่ยวกับความฝันร่วมกัน
• สร้างรากฐานที่แข็งแรงสำหรับอนาคต
• ตั้งเป้าหมายไปในทิศทางเดียวกัน`
  },
  {
    id: 5,
    name: 'The Empress',
    filename: 'the-empress',
    meaning: `(ความรักที่บำรุงเลี้ยง)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ประเภทคนที่เจอ:
✓ มีจิตใจอบอุ่น ชอบดูแลผู้อื่น
✓ มีศิลปะในการทำให้คนรอบข้างรู้สึกมีค่า
✓ เต็มไปด้วยความคิดสร้างสรรค์
✓ มีความเป็นผู้นำที่อ่อนโยน

คำแนะนำ:
• เปิดใจรับความรักและการดูแลอย่างเต็มที่
• ดูแลตัวเองให้ดีเท่ากับที่ดูแลผู้อื่น
• พัฒนาตัวเองในสิ่งที่หลงใหล`
  },
  {
    id: 6,
    name: 'The Sun',
    filename: 'the-sun',
    meaning: `(ความสุข ความสำเร็จ)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ อัดแน่นไปด้วยพลังบวก
✓ ร่าเริง มั่นใจ และกระตือรือร้น
✓ นำความสุขมาให้คนรอบข้างเสมอ
✓ จริงใจและเปิดเผย

คำแนะนำ:
• ใช้พลังบวกในการเชื่อมต่อกับคู่ของคุณ
• แบ่งปันความสุขให้กันในทุกวัน
• สร้างช่วงเวลาที่สนุกสนานและไร้กังวล`
  },
  {
    id: 7,
    name: 'The Star',
    filename: 'the-star',
    meaning: `(ความหวัง การเยียวยา)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ มีความฝันและมองการณ์ไกล
✓ เข้าใจความเจ็บปวดของผู้อื่นได้ดี
✓ ต้องการสร้างพื้นที่ที่ปลอดภัยและสวยงาม
✓ มีจิตวิญญาณที่อ่อนโยน

คำแนะนำ:
• เชื่อมั่นในสัญชาตญาณของตัวเอง
• ให้ความหวังเป็นตัวนำทางความสัมพันธ์
• เดินเคียงข้างกันอย่างค่อยเป็นค่อยไป`
  },
  {
    id: 8,
    name: 'Ace of Swords',
    filename: 'ace-of-swords',
    meaning: `(ความชัดเจน การสื่อสาร)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ ฉลาด ตรงไปตรงมา มีเหตุผล
✓ ไม่ชอบความคลุมเครือหรือการหลอกลวง
✓ มีหัวใจที่เด็ดเดี่ยวและมั่นคง
✓ สื่อสารเก่งและมีระเบียบวินัย

คำแนะนำ:
• สื่อสารกันด้วยความจริงใจ
• อย่าเก็บความรู้สึกแง่ลบไว้คนเดียว
• ตั้งขอบเขตของความสัมพันธ์ให้ชัดเจน`
  },
  {
    id: 9,
    name: 'The Devil',
    filename: 'the-devil',
    meaning: `(ความหลงใหล การยึดติด)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ มีเสน่ห์ที่ดึงดูดอย่างรุนแรง
✓ มีอารมณ์และความต้องการที่เข้มข้น
✓ อาจมีความขี้หึงหรือยึดติดสูง
✓ ต้องการความรักที่แสดงออกอย่างชัดเจน

คำแนะนำ:
• ดึงความสนใจกลับมาที่การรักตัวเอง
• ตั้งขอบเขตที่ชัดเจนเพื่อความเป็นอิสระ
• หากรู้สึกอึดอัด ควรพูดคุยหรือปรึกษาผู้ที่ไว้ใจ`
  },
  {
    id: 10,
    name: 'Three of Swords',
    filename: 'three-of-swords',
    meaning: `(ความท้าทาย ความขัดแย้ง)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ มีความคิดลึกซึ้งแต่อาจจะคิดมาก
✓ ต้องการความตรงไปตรงมาที่สุด
✓ พร้อมที่จะจัดการปัญหาแม้จะเจ็บปวด
✓ ให้ความสำคัญกับความซื่อสัตย์

คำแนะนำ:
• หันหน้าเข้าหากันและพูดคุยอย่างอ่อนโยน
• พยายามทำความเข้าใจมุมมองของอีกฝ่าย
• เรียนรู้จากอุปสรรคเพื่อสร้างรักที่แข็งแรงกว่าเดิม`
  },
  {
    id: 11,
    name: 'The Hermit',
    filename: 'the-hermit',
    meaning: `(การค้นหาตัวเอง ภูมิปัญญา)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ ชอบใช้เวลาอยู่กับตัวเอง
✓ มีความคิดที่ลึกซึ้งและสุขุม
✓ เข้าใจชีวิตในระดับจิตวิญญาณ
✓ รักความสงบและเรียบง่าย

คำแนะนำ:
• เคารพเวลาและพื้นที่ส่วนตัวของคู่
• ใช้เวลาช่วงนี้ในการพัฒนาจิตใจตัวเอง
• เชื่อว่าความเงียบจะนำมาซึ่งความเข้าใจที่ชัดเจน`
  },
  {
    id: 12,
    name: 'Justice',
    filename: 'justice',
    meaning: `(ความยุติธรรม ความสมดุล)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ประเภทคนที่เจอ:
✓ รักความยุติธรรมและชัดเจน
✓ ไม่ชอบคนโกหกหรือคดเคี้ยว
✓ ให้เกียรติและยอมรับในความเสมอภาค
✓ มั่นคงในคำพูดและกระทำ

คำแนะนำ:
• ตรวจสอบความสมดุลของการให้และการรับ
• ระวังอย่าให้ฝ่ายใดฝ่ายหนึ่งทุ่มเทจนเกินตัว
• อย่าลืมว่าความยุติธรรมรวมถึงการดูแลใจตัวเองด้วย`
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

  // ⭐️ State สำหรับเก็บดาววิบวับพื้นหลัง
  const [stars, setStars] = useState<any[]>([]);

  // สุ่มตำแหน่งไพ่และสร้างดาวเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    setCardPositions(shuffleCards());

    // ⭐️ สร้างดาวแบบสุ่มตำแหน่งและขนาด
    const generatedStars = Array.from({ length: 60 }).map(() => ({
      id: Math.random(),
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      size: `${Math.random() * 3 + 2}px`,
    }));
    setStars(generatedStars);
  }, []);

  // ฟังก์ชันสำหรับเช็คดวง (เชื่อมกับ n8n)
  const handleCheckHoroscope = async () => {
    if (!day || !month || !year) {
      alert('กรุณากรอกวันเกิดให้ครบถ้วน');
      return;
    }

    setIsLoadingHoroscope(true);
    setHoroscopeResult('');
    
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://sukunafuka.app.n8n.cloud/webhook/horoscope';

      const response = await fetch(webhookUrl, {
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

      if (!response.ok) {
        throw new Error(`เซิร์ฟเวอร์ตอบกลับด้วย Status: ${response.status}`);
      }

      const textData = await response.text();
      
      let data: any = {};
      try {
        data = textData ? JSON.parse(textData) : {};
      } catch (e) {
        data = { result: textData || 'เชื่อมต่อสำเร็จ แต่ n8n ไม่ได้ส่งข้อมูลตอบกลับมา' };
      }

      if (data && data.result) {
        setHoroscopeResult(data.result);
      } else if (data && Object.keys(data).length > 0) {
        setHoroscopeResult(JSON.stringify(data, null, 2));
      } else {
        setHoroscopeResult('รอรับคำทำนาย... (กรุณาตั้งค่า Respond ใน n8n ให้ส่ง JSON กลับมา)');
      }

    } catch (error) {
      console.error('Fetch Error:', error);
      const errMsg = error instanceof Error ? error.message : String(error);
      if (errMsg.includes('Failed to fetch')) {
        setHoroscopeResult('❌ เชื่อมต่อล้มเหลว (Failed to fetch)\nสาเหตุที่พบบ่อย: \n1. ลืมเปิด "Respond to Options/CORS" ในโหนด Webhook ของ n8n \n2. ใช้ Webhook Test แต่ลืมกด Listen \n3. n8n ไม่ได้ Active');
      } else {
        setHoroscopeResult(`❌ เกิดข้อผิดพลาด: ${errMsg}\nโปรดตรวจสอบ URL และการตั้งค่า n8n ของคุณ`);
      }
    } finally {
      setIsLoadingHoroscope(false);
    }
  };

  // ฟังก์ชันสำหรับเปิดไพ่
  const handleCardClick = (positionIndex: number) => {
    if (flippedCardIndex === null) {
      const cardIndex = cardPositions[positionIndex];
      setFlippedCardIndex(positionIndex);
      
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
    <div className="min-h-screen bg-gradient-to-b from-[#E8D4F8] via-[#F5CAE8] to-[#FFCDE1] relative">
      
      {/* ⭐️ CSS สำหรับดาววิบวับ */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .bg-star {
          position: absolute;
          background-color: white;
          border-radius: 50%;
          animation: twinkle 4s infinite ease-in-out;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
        }
      `}</style>

      {/* ⭐️ พื้นหลังดาววิบวับ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="bg-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="bg-[#E8D4F8] py-4 px-6 shadow-md relative z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
            {/* ⭐️ เปิดการใช้งานรูปโลโก้ */}
            <Image src="/logo.png" alt="Destiny of Love" fill className="object-cover" />
          </div>
          <h1 className="text-3xl font-serif text-gray-800">Destiny of Love</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 relative z-10">
        
        {/* Section 1: เช็คดวงความรักตามราศี */}
        <section className="mb-16">
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#ebd4f8] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl drop-shadow-md">🔮</span>
              </div>
              <h2 className="text-2xl font-medium text-gray-800">เช็คดวงความรักตามราศี</h2>
              
              {/* คำอธิบาย */}
              <div className="text-gray-500 mt-4 text-sm flex flex-col gap-1">
                <p>ทำนายความรักด้วนAI</p>
              </div>
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
                <div className={`mt-4 p-4 rounded-lg border ${horoscopeResult.includes('❌') ? 'bg-red-50 border-red-200' : 'bg-purple-50 border-purple-200'}`}>
                  <p className={`text-sm whitespace-pre-line ${horoscopeResult.includes('❌') ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                    {horoscopeResult}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Tarot Love Reading */}
        <section className="mb-16 px-4">
          {/* กรอบใหญ่นอกสุด ครอบคลุมไพ่ทั้งหมด */}
          <div className="max-w-5xl mx-auto bg-white/80 rounded-[2.5rem] shadow-lg border border-pink-200 p-8 md:p-12 relative">
            
            {/* กรอบลอยสำหรับหัวข้อ Tarot Love Reading */}
            <div className="flex justify-center mb-16">
              <div className="bg-white border-2 border-pink-100 rounded-xl py-3 px-8 shadow-sm">
                <h2 className="text-3xl md:text-4xl font-serif text-gray-800 text-center">Tarot Love Reading</h2>
              </div>
            </div>
            
            {/* แสดงไพ่แบบซ้อนกัน */}
            <div className="relative min-h-[400px] flex items-center justify-center mb-6">
              <div className="relative w-full max-w-4xl" style={{ height: '350px' }}>
                {cardPositions.map((cardIndex, positionIndex) => {
                  const isFlipped = flippedCardIndex === positionIndex;
                  const card = tarotCards[cardIndex];
                  
                  const totalCards = 12;
                  const angleStep = 14;
                  const startAngle = -((totalCards - 1) * angleStep) / 2;
                  const angle = startAngle + (positionIndex * angleStep);
                  const radius = 220;
                  
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
                      <div className="relative w-[140px] h-[220px]" style={{ perspective: '1000px' }}>
                        <div
                          className="relative w-full h-full transition-transform duration-700 will-change-transform"
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          }}
                        >
                          <div
                            className="absolute inset-0 rounded-xl shadow-2xl border-4 border-amber-800 overflow-hidden"
                            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                          >
                            <Image src="/images/tarot/back/card-back.png" alt="Card Back" fill className="object-cover" />
                          </div>
                          <div
                            className="absolute inset-0 bg-white rounded-xl shadow-2xl border-2 border-gray-300 overflow-hidden"
                            style={{
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)',
                            }}
                          >
                            <Image src={`/images/tarot/front/${card.filename}.png`} alt={card.name} fill className="object-cover" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* คำอธิบายใต้ไพ่ (แสดงเฉพาะตอนที่ยังไม่ได้เปิดไพ่) */}
            {flippedCardIndex === null && (
              <div className="text-center mt-4">
                <p className="text-gray-600 font-medium text-lg animate-pulse">
                  ✨ โปรดตั้งสมาธิ แล้วคลิกเลือกไพ่ 1 ใบเพื่อสุ่มคำทำนาย ✨
                </p>
              </div>
            )}

            {/* ปุ่มรีเซ็ต (แสดงเฉพาะตอนที่เปิดไพ่แล้ว) */}
            {flippedCardIndex !== null && (
              <div className="text-center mt-4">
                <button
                  onClick={handleResetCards}
                  className="bg-[#E8B5D8] hover:bg-[#d9a5c8] text-gray-800 font-medium px-8 py-3 rounded-full transition-colors shadow-sm hover:scale-105"
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
                    <Image src={`/images/tarot/zodiac/${zodiac.id}.png`} alt={zodiac.nameEn} fill className="object-contain p-4" />
                  </div>
                  <p className="text-center font-medium text-gray-800">{zodiac.nameEn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 relative z-10">
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
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-3xl w-full max-h-[85vh] flex flex-col animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
              <div className="flex-shrink-0 mx-auto md:mx-0 flex items-start">
                <div className="w-48 h-72 bg-white rounded-xl shadow-lg border-2 border-gray-300 overflow-hidden relative">
                  <Image src={`/images/tarot/front/${selectedCard.filename}.png`} alt={selectedCard.name} fill className="object-cover" />
                </div>
              </div>
              <div className="flex-1 flex flex-col min-h-0">
                <h3 className="text-3xl font-serif text-gray-800 mb-4 flex-shrink-0">{selectedCard.name}</h3>
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{selectedCard.meaning}</p>
                </div>
                <div className="pt-5 mt-auto flex-shrink-0 bg-white flex justify-center border-t border-gray-100">
                  <button
                    onClick={() => {
                      setShowCardModal(false);
                      setTimeout(() => handleResetCards(), 300);
                    }}
                    className="w-[240px] bg-[#E8B5D8] hover:bg-[#d9a5c8] text-gray-800 font-medium py-3 rounded-full transition-all shadow-sm hover:scale-105"
                  >
                    กลับไปหน้าหลัก
                  </button>
                </div>
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
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-48 h-48 bg-pink-50 rounded-2xl border-2 border-pink-200 flex items-center justify-center overflow-hidden relative">
                  <Image src={`/images/tarot/zodiac/${selectedZodiac.id}.png`} alt={selectedZodiac.nameEn} fill className="object-contain p-6" />
                </div>
                <p className="text-center font-medium text-gray-800 mt-4 text-xl">{selectedZodiac.nameEn}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-serif text-gray-800 mb-2">{selectedZodiac.name}</h3>
                <p className="text-base text-gray-600 mb-6">{selectedZodiac.dates}</p>
                <div className="space-y-3">
                  <p className="font-medium text-gray-800 text-lg">นิสัย:</p>
                  {selectedZodiac.traits.map((trait, index) => (
                    <p key={index} className="text-gray-700 text-base leading-relaxed">• {trait}</p>
                  ))}
                </div>
                <div className="mt-6 flex justify-center border-t border-gray-100 pt-5">
                  <button
                    onClick={handleCloseZodiacModal}
                    className="w-[240px] bg-[#E8B5D8] hover:bg-[#d9a5c8] text-gray-800 font-medium py-3 rounded-full transition-all shadow-sm hover:scale-105"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
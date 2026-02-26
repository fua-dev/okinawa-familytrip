import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Calendar, 
  Wallet as WalletIcon,
  ListCheck, 
  Info, 
  Plane, 
  Car, 
  Utensils, 
  Camera, 
  Bed, 
  MapPin, 
  CloudSun, 
  Cloud, 
  Sun, 
  CloudRain,
  Plus,
  Trash2,
  ChevronRight,
  Navigation,
  X,
  Image as ImageIcon,
  LayoutGrid,
  StretchHorizontal,
  Phone,
  AlertTriangle,
  ExternalLink,
  Smartphone,
  Users,
  CheckCircle2,
  Circle,
  Clock,
  Ticket,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Data Structure ---
const ITINERARY_DATA = [
  { 
    day: 1, 
    date: "2026-07-13", 
    week: "MON", 
    items: [
      { 
        id: '1-1', 
        time: "09:00", 
        type: "transport", 
        title: "桃園機場第一航廈會合", 
        detail: "星宇航空櫃檯集合，檢查護照與日文譯本。", 
        address: "桃園市大園區航站南路15號", 
        content: "各位貴賓早安！我們即將展開期待已久的沖繩之旅。請大家再次確認護照、日文譯本以及最重要的心情都帶齊了嗎？第一站我們先在星宇櫃檯集合辦理登機。",
        links: [
          { label: "機捷路線及時刻表", url: "https://www.tymetro.com.tw/tymetro-new/tw/_pages/travel-guide/timetable.php", icon: "Clock" }
        ]
      },
      { 
        id: '1-2', 
        time: "15:00", 
        type: "flight", 
        title: "抵達那霸空港 & 租車", 
        detail: "預計抵達後分頭行動：租車取車、飯店入住。", 
        address: "那霸機場", 
        content: "抵達後約 15:30 進行租車行程. 請搭乘機場接駁車前往營業所辦理手續。租車資訊：(日後補)。"
      },
      { 
        id: '1-3', 
        time: "16:00", 
        type: "stay", 
        title: "那霸歌町大和Roynet飯店PREMIER", 
        detail: "Check-in 放置行李，稍作休息。", 
        address: "那霸市安里1-1-1", 
        url: "https://maps.app.goo.gl/Y27qpHw8dbWm7Ygc8",
        bookingInfo: {
          hotelName: "Daiwa Roynet Hotel Naha Omoromachi PREMIER",
          checkIn: "2026-07-13",
          checkOut: "2026-07-17"
        },
        content: "飯店位於那霸新都心 Omoromachi，地理位置極佳。對面就有 T-Galleria 免稅店、San-A Naha Main Place 百貨公司，周邊購物與餐飲選擇非常豐富。"
      },
      { 
        id: '1-4', 
        time: "17:00", 
        type: "spot", 
        title: "國際通散策", 
        detail: "探索那霸最熱鬧的街道，購買伴手禮。", 
        address: "那霸市國際通", 
        content: "國際通是那霸的心臟地帶。推薦美食：Pork Tamago Onigiri (飯糰)、Blue Seal 冰淇淋。推薦商店：驚安殿堂唐吉訶德、御菓子御殿。",
        links: [
          { label: "國際通美食地圖", url: "https://kokusaidori.jp/tw/", icon: "ExternalLink" }
        ]
      },
      { 
        id: '1-5', 
        time: "17:30", 
        type: "food", 
        title: "晚餐：暖暮拉麵 國際通店", 
        detail: "品嚐道地九州拉麵。", 
        address: "那霸市牧志2-16-10", 
        content: "雖然是九州體系，但在沖繩可是人氣爆棚。記得點一份芝麻蔥花拉麵，那濃郁的湯頭絕對能洗去飛行的疲勞。"
      }
    ]
  },
  { 
    day: 2, 
    date: "2026-07-14", 
    week: "TUE", 
    items: [
      { id: '2-0', time: "08:00", type: "food", title: "飯店早餐", detail: "享用飯店美味早餐後出發。", content: "飯店早餐提供多樣化的日式與西式料理，開啟活力的一天。" },
      { id: '2-1', time: "08:30", type: "spot", title: "西來院達摩寺", detail: "祈福參拜，欣賞寧靜的寺院。", address: "那霸市首里赤田町1-5-1", content: "西來院是首里著名的寺院，以祈求安產與學業進步聞名。寺內環境清幽，是早晨散步的好地方。" },
      { id: '2-2', time: "10:00", type: "spot", title: "古宇利島", detail: "跨海大橋美景，心形岩拍照。", address: "今歸仁村古宇利", content: "這條橋被稱為『沖繩最美跨海大橋』。兩側的海水顏色會隨著陽光呈現不同的藍。心形岩就在橋的另一端，是著名的戀人聖地。" },
      { id: '2-3', time: "12:00", type: "food", title: "午餐：百年古家 大家", detail: "在百年古宅中享用阿古豬料理。", address: "名護市中山90", content: "這是一座擁有百年歷史的木造建築。我們要在這古色古香的環境中，品嚐沖繩特有的阿古豬（Agu Pork）。肉質鮮甜且油脂不膩。" },
      { id: '2-4', time: "14:00", type: "spot", title: "美麗海水族館", detail: "觀賞黑潮之海，巨大的鯨鯊。", address: "本部町石川424", content: "這裡是世界前三大的水族館。站在『黑潮之海』大水槽前，看著鯨鯊緩緩游過，震撼感十足。記得去看下午的海豚表演！", links: [{ label: "表演秀時刻表", url: "https://churaumi.okinawa/tc/program/", icon: "Clock" }] },
      { id: '2-5', time: "18:00", type: "food", title: "晚餐：燒肉五苑 (訂位)", detail: "吃到飽燒肉，慶祝旅途愉快。", address: "名護市為又479-5", content: "燒肉五苑提供多種價位的吃到飽選擇，肉質優良且服務親切。請務必準時抵達訂位。", links: [{ label: "吃到飽菜單", url: "https://goen.ryukyu/menu/", icon: "ExternalLink" }] }
    ]
  },
  { 
    day: 3, 
    date: "2026-07-15", 
    week: "WED", 
    items: [
      { id: '3-0', time: "08:00", type: "food", title: "飯店早餐", detail: "享用飯店早餐。", content: "悠閒享用早餐，準備今日行程。" },
      { id: '3-1', time: "09:00", type: "spot", title: "東南植物園", detail: "漫步熱帶植物園，與小動物互動。", address: "沖繩市知花2146", content: "東南植物園擁有豐富的熱帶與亞熱帶植物。這裡還有水豚、松鼠猴等可愛動物可以互動，非常適合全家大小。" },
      { id: '3-2', time: "12:00", type: "food", title: "午餐：海族工房", detail: "新鮮海鮮料理。", address: "沖繩市", content: "品嚐當地新鮮捕撈的海鮮，感受海洋的滋味。" },
      { id: '3-3', time: "13:30", type: "spot", title: "沖繩兒童王國", detail: "動物園與科學博物館。", address: "沖繩市胡屋5-7-1", content: "結合了動物園與神奇博物館，是孩子們的天堂。可以看到沖繩特有的動物品種。" },
      { id: '3-4', time: "17:00", type: "spot", title: "永旺夢樂城 (AEON MALL)", detail: "沖繩最大購物中心。", address: "北中城村比嘉", content: "沖繩規模最大的購物中心，擁有超過 200 間店鋪。無論是國際品牌還是當地特色商品應有盡有。", links: [{ label: "店鋪總覽", url: "https://okinawarycom-aeonmall.com/static/detail/translation-zh-tw", icon: "ExternalLink" }] }
    ]
  },
  { 
    day: 4, 
    date: "2026-07-16", 
    week: "THU", 
    items: [
      { id: '4-0', time: "08:00", type: "food", title: "飯店早餐", detail: "享用早餐。", content: "最後一天的全日行程，吃飽再出發。" },
      { id: '4-1', time: "09:00", type: "spot", title: "DMM Kariyushi 水族館", detail: "沉浸式水族館體驗。", address: "豐見城市豐崎3-35", content: "結合影像技術與空間設計的現代水族館。餵食秀時間：10:00/11:00 樹懶；10:30 企鵝。", links: [{ label: "餵食秀時刻表", url: "https://tc.kariyushi-aquarium.com/time-schedule/", icon: "Clock" }] },
      { id: '4-2', time: "12:00", type: "food", title: "午餐：iiAS 沖繩豐崎", detail: "水族館旁的購物中心用餐。", address: "豐見城市豐崎3-35", content: "iiAS 購物中心內有多樣化的美食街與餐廳選擇，用餐後還能繼續逛街。" },
      { id: '4-3', time: "14:00", type: "spot", title: "沖繩世界文化王國", detail: "玉泉洞與傳統文化體驗。", address: "南城市玉城前川1336", content: "擁有日本三大鐘乳石洞之一的『玉泉洞』。園區內還有琉球玻璃製作、傳統舞蹈表演等文化體驗。", links: [{ label: "表演時刻表及體驗項目", url: "https://www.gyokusendo.co.jp.t.aqs.hp.transer.com/okinawaworld/showtime/", icon: "ExternalLink" }] },
      { id: '4-4', time: "17:00", type: "food", title: "晚餐：奧武島中本鮮魚天婦羅", detail: "享用美味天婦羅。", address: "南城市玉城奧武9", phone: "098-948-4307", content: "奧武島上著名的天婦羅店，現炸美味。推薦：鮮魚、花枝、海蘊天婦羅。" }
    ]
  },
  { 
    day: 5, 
    date: "2026-07-17", 
    week: "FRI", 
    items: [
      { id: '5-0', time: "08:00", type: "food", title: "飯店早餐", detail: "最後一次享用飯店早餐。", content: "整理行李，準備退房。" },
      { id: '5-1', time: "08:30", type: "spot", title: "波上宮 & 逛街", detail: "懸崖上的神社，最後採買。", address: "那霸市若狹1-25-11", content: "波上宮是琉球八社之首，建在懸崖之上，俯瞰波之上海灘。參拜後可以進行最後的市區採買。" },
      { id: '5-2', time: "12:00", type: "food", title: "午餐", detail: "簡單午餐。", content: "在前往機場前享用簡單的午餐。" },
      { id: '5-3', time: "12:30", type: "transport", title: "前往機場候機", detail: "辦理登機手續。", address: "那霸機場", content: "請預留充足時間辦理退稅與登機手續。" },
      { id: '5-4', time: "18:00", type: "transport", title: "返家", detail: "抵達台灣，平安回家。", content: "結束愉快的 5 天 4 夜沖繩之旅，帶著滿滿的回憶回家。" }
    ]
  }
];

const EMERGENCY_CONTACTS = [
  { name: "警察局", number: "110", icon: "Police" },
  { name: "救護/火警", number: "119", icon: "Ambulance" },
  { name: "外國人醫療熱線", number: "+81-50-3816-2787", icon: "Phone", sub: "24小時多語支援" },
  { name: "駐日辦事處(那霸)", number: "+81-90-1942-1346", icon: "AlertTriangle", sub: "急難救助專用" }
];

// --- Types ---
type Tab = 'schedule' | 'budget' | 'list' | 'info';
type Category = '藥妝' | '衣物' | '食物' | '伴手禮' | '其他';

interface Expense {
  id: string;
  title: string;
  amount: number;
  time: string;
  image?: string;
}

interface ShoppingItem {
  id: string;
  name: string;
  category: Category;
  note: string;
  image?: string;
}

interface WeatherData {
  time: string;
  temp: number;
  condition: 'sun' | 'cloud' | 'rain' | 'cloud-sun';
}

// --- Components ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('schedule');
  const [currentDay, setCurrentDay] = useState(1);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDeclaration, setShowDeclaration] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [shopLayout, setShopLayout] = useState<'grid' | 'list'>('grid');
  const [exchangeRate, setExchangeRate] = useState(0.21); // JPY to TWD

  // Fetch real-time exchange rate
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/JPY');
        const data = await response.json();
        if (data && data.rates && data.rates.TWD) {
          setExchangeRate(data.rates.TWD);
        }
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      }
    };
    fetchRate();
  }, []);
  const [memo, setMemo] = useState('');
  
  // Load data from LocalStorage
  useEffect(() => {
    const savedExp = localStorage.getItem('okinawa_expenses');
    if (savedExp) setExpenses(JSON.parse(savedExp));
    
    const savedShop = localStorage.getItem('okinawa_shopping');
    if (savedShop) setShoppingList(JSON.parse(savedShop));

    const savedMemo = localStorage.getItem('okinawa_memo');
    if (savedMemo) setMemo(savedMemo);
  }, []);

  // Save data to LocalStorage
  useEffect(() => {
    localStorage.setItem('okinawa_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('okinawa_shopping', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('okinawa_memo', memo);
  }, [memo]);

  // Mock Weather Data (24 hours)
  const weatherForecast = useMemo(() => {
    const data: WeatherData[] = [];
    const conditions: ('sun' | 'cloud' | 'rain' | 'cloud-sun')[] = ['sun', 'cloud-sun', 'cloud', 'rain'];
    for (let i = 0; i < 24; i++) {
      const hour = (new Date().getHours() + i) % 24;
      data.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        temp: 28 + Math.floor(Math.random() * 5), // Warmer for July
        condition: conditions[Math.floor(Math.random() * conditions.length)]
      });
    }
    return data;
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'schedule': return <ScheduleTab 
        currentDay={currentDay} 
        setCurrentDay={setCurrentDay} 
        setSelectedItem={setSelectedItem} 
        weatherForecast={weatherForecast}
      />;
      case 'budget': return <BudgetTab 
        expenses={expenses} 
        setExpenses={setExpenses} 
        rate={exchangeRate} 
      />;
      case 'list': return <ShoppingTab 
        list={shoppingList} 
        setList={setShoppingList} 
        layout={shopLayout} 
        setLayout={setShopLayout}
        memo={memo}
        setMemo={setMemo}
      />;
      case 'info': return <InfoTab />;
      default: return null;
    }
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-morandi-sand relative pb-24">
      {/* Header */}
      <header className="pt-6 pb-4 text-center relative px-6">
        <p className="text-[10px] tracking-[0.4em] text-morandi-dark uppercase mb-2 font-serif">Okinawa Family Trip</p>
        <div className="relative inline-block">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-text-main">
            沖繩之旅 <span className="text-base font-bold opacity-40">2026</span>
          </h1>
        </div>
        {/* Decorative Dots - Stretched to card width */}
        <div className="flex justify-between items-center w-full mt-2 px-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-morandi-blue/30" />
          ))}
        </div>
        <button 
          onClick={() => setShowDeclaration(true)} 
          className="absolute right-20 top-8 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-morandi-blue active:scale-95 transition-all z-10"
        >
          <Users size={20} />
        </button>
      </header>

      {/* Declaration Modal */}
      <AnimatePresence>
        {showDeclaration && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-[360px] bg-white rounded-[40px] p-10 shadow-2xl relative text-center"
            >
              <button onClick={() => setShowDeclaration(false)} className="absolute top-6 right-6 text-gray-200">
                <X size={24} />
              </button>
              <div className="w-16 h-16 bg-morandi-sand rounded-full flex items-center justify-center mx-auto mb-6 text-morandi-blue">
                <Users size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-text-main mb-6">家族旅遊宣言</h3>
              <div className="space-y-4 text-sm text-text-main leading-relaxed">
                <p>「累了就休息，肚子餓了就吃飯，想上廁所馬上說。」</p>
                <p>「每天一張合照：留下 7 人的沖繩記憶。」</p>
                <p>「四大三小，平安出門，快樂回家。」</p>
              </div>
              <button 
                onClick={() => setShowDeclaration(false)}
                className="mt-10 w-full py-4 bg-morandi-blue text-white rounded-2xl font-bold tracking-widest"
              >
                出發！
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="px-6">
        {renderTabContent()}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur-xl border-t border-gray-100 rounded-t-[32px] px-6 py-4 flex justify-around items-center shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-50">
        <NavButton active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={<Calendar size={20} />} label="行程" />
        <NavButton active={activeTab === 'budget'} onClick={() => setActiveTab('budget')} icon={<WalletIcon size={20} />} label="記帳" />
        <NavButton active={activeTab === 'list'} onClick={() => setActiveTab('list')} icon={<ListCheck size={20} />} label="清單" />
        <NavButton active={activeTab === 'info'} onClick={() => setActiveTab('info')} icon={<Info size={20} />} label="資訊" />
      </nav>

      {/* Guide Modal */}
      <AnimatePresence>
        {selectedItem && (
          <GuideModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-Components ---

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'text-morandi-blue' : 'text-text-muted'}`}>
      <motion.div animate={{ y: active ? -4 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        {icon}
      </motion.div>
      <span className={`text-[11px] font-medium tracking-widest ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    </button>
  );
}

function ScheduleTab({ currentDay, setCurrentDay, setSelectedItem, weatherForecast }: any) {
  const itineraryListRef = useRef<HTMLDivElement>(null);

  const handleWeatherScroll = (time: string) => {
    // Basic logic to highlight or scroll to the closest itinerary item
    const hour = parseInt(time.split(':')[0]);
    const items = ITINERARY_DATA.find(d => d.day === currentDay)?.items || [];
    const closest = items.reduce((prev, curr) => {
      const prevHour = parseInt(prev.time.split(':')[0]);
      const currHour = parseInt(curr.time.split(':')[0]);
      return (Math.abs(currHour - hour) < Math.abs(prevHour - hour) ? curr : prev);
    });

    if (closest) {
      const element = document.getElementById(`item-${closest.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-2', 'ring-morandi-blue/30');
        setTimeout(() => element.classList.remove('ring-2', 'ring-morandi-blue/30'), 2000);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Selector */}
      <div className="flex justify-between px-2 py-2 gap-2 hide-scrollbar">
        {ITINERARY_DATA.map(d => (
          <button 
            key={d.day} 
            onClick={() => setCurrentDay(d.day)}
            className="flex flex-col items-center min-w-[60px] group"
          >
            <span className={`text-[10px] font-bold tracking-widest transition-colors font-serif ${currentDay === d.day ? 'text-morandi-blue' : 'text-gray-300'}`}>{d.week}</span>
            <span className={`font-serif text-2xl mt-1 transition-all ${currentDay === d.day ? 'font-bold scale-110 text-text-main' : 'text-gray-300'}`}>{d.date.split('-')[2]}</span>
            <motion.div 
              initial={false}
              animate={{ scale: currentDay === d.day ? 1 : 0 }}
              className="w-1.5 h-1.5 rounded-full bg-morandi-pink mt-2" 
            />
          </button>
        ))}
      </div>

      {/* Weather Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-morandi-dark tracking-widest uppercase flex items-center gap-2">
            <CloudSun size={14} /> 沖繩市 24H 預報
          </h3>
          <span className="text-[10px] text-gray-400">
            {weatherForecast ? '滑動連動行程' : '靠近日期時更新'}
          </span>
        </div>
        
        {weatherForecast ? (
          <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar snap-x">
            {weatherForecast.map((w: WeatherData, i: number) => (
              <button 
                key={i} 
                onClick={() => handleWeatherScroll(w.time)}
                className="flex flex-col items-center gap-2 bg-white/60 backdrop-blur-sm p-3 rounded-2xl min-w-[70px] border border-white/80 shadow-sm snap-start active:scale-95 transition-transform"
              >
                <span className="text-[10px] font-mono text-gray-400">{w.time}</span>
                <WeatherIcon condition={w.condition} size={20} />
                <span className="text-sm font-bold text-text-main">{w.temp}°</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[32px] border border-white/60 text-center">
            <p className="text-xs text-text-muted italic">氣象資訊將於出發前 10 日內更新</p>
          </div>
        )}
      </div>

      {/* Itinerary List */}
      <div className="space-y-4" ref={itineraryListRef}>
        {ITINERARY_DATA.find(d => d.day === currentDay)?.items.map((item) => (
          <motion.div 
            layoutId={`item-${item.id}`}
            id={`item-${item.id}`}
            key={item.id} 
            onClick={() => setSelectedItem(item)}
            className="glass-card p-5 flex items-center gap-5 cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="text-center min-w-[50px]">
              <div className="text-lg font-serif font-bold text-text-main">{item.time}</div>
            </div>
            <div className="h-10 w-px bg-gray-100" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <TypeIcon type={item.type} size={14} className="text-morandi-blue" />
                <h4 className="font-serif font-bold text-text-main truncate">{item.title}</h4>
              </div>
              <p className="text-[11px] text-text-muted truncate">{item.detail}</p>
            </div>
            <ChevronRight size={16} className="text-gray-200" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WeatherIcon({ condition, size, className }: { condition: string, size: number, className?: string }) {
  switch (condition) {
    case 'sun': return <Sun size={size} className={`text-orange-300 ${className}`} />;
    case 'cloud-sun': return <CloudSun size={size} className={`text-blue-300 ${className}`} />;
    case 'cloud': return <Cloud size={size} className={`text-gray-300 ${className}`} />;
    case 'rain': return <CloudRain size={size} className={`text-indigo-300 ${className}`} />;
    default: return <Sun size={size} className={className} />;
  }
}

function TypeIcon({ type, size, className }: { type: string, size: number, className?: string }) {
  switch (type) {
    case 'transport': return <Car size={size} className={className} />;
    case 'flight': return <Plane size={size} className={className} />;
    case 'food': return <Utensils size={size} className={className} />;
    case 'spot': return <Camera size={size} className={className} />;
    case 'stay': return <Bed size={size} className={className} />;
    default: return <MapPin size={size} className={className} />;
  }
}

function GuideModal({ item, onClose }: { item: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-[480px] bg-white rounded-t-[40px] p-8 pb-12 shadow-2xl relative max-h-[90vh] overflow-y-auto hide-scrollbar"
      >
        <button onClick={onClose} className="absolute top-6 right-8 text-gray-200 hover:text-gray-400 transition-colors">
          <X size={28} />
        </button>

        <div className="text-center mb-8">
          <span className="px-3 py-1 bg-morandi-sand text-morandi-blue text-[10px] font-bold tracking-[0.3em] uppercase rounded-full">
            {item.type}
          </span>
          <h2 className="font-serif text-3xl font-bold mt-4 text-text-main">{item.title}</h2>
        </div>

        <div className="space-y-8">
          <div className="bg-morandi-sand/50 p-6 rounded-[32px] space-y-4">
            <div className="flex items-center gap-3 text-sm text-text-main">
              <MapPin size={16} className="text-morandi-blue" />
              <span className="font-medium">{item.address || "詳見地圖"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-main">
              <Clock size={16} className="text-morandi-blue" />
              <span className="font-medium">{item.time}</span>
            </div>
            {item.phone && (
              <div className="flex items-center gap-3 text-sm text-text-main">
                <Phone size={16} className="text-morandi-blue" />
                <span className="font-medium">{item.phone}</span>
              </div>
            )}
            {item.bookingInfo && (
              <div className="pt-4 mt-4 border-t border-white flex flex-col gap-2">
                <p className="text-[10px] font-bold text-morandi-dark uppercase tracking-widest">訂房資訊</p>
                <p className="text-xs font-bold text-text-main">{item.bookingInfo.hotelName}</p>
                <div className="flex justify-between text-[10px] text-text-muted">
                  <span>Check-in: {item.bookingInfo.checkIn}</span>
                  <span>Check-out: {item.bookingInfo.checkOut}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="text-sm leading-relaxed text-text-main bg-white border border-morandi-sand p-6 rounded-[32px] shadow-sm">
              {item.content}
            </div>
          </div>

          {item.links && (
            <div className="grid grid-cols-1 gap-3">
              {item.links.map((link: any, i: number) => (
                <a 
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 bg-morandi-sand/50 text-morandi-blue rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  {link.icon === "Clock" ? <Clock size={14} /> : <ExternalLink size={14} />}
                  {link.label}
                </a>
              ))}
            </div>
          )}

          <button 
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address || item.title)}`)}
            className="w-full py-5 bg-morandi-blue text-white rounded-2xl font-bold tracking-[0.4em] flex items-center justify-center gap-3 shadow-lg shadow-morandi-blue/20"
          >
            <Navigation size={20} /> 開啟導航
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function BudgetTab({ expenses, setExpenses, rate }: { expenses: Expense[], setExpenses: any, rate: number }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [calcInput, setCalcInput] = useState('');

  const totalJPY = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalTWD = Math.round(totalJPY * rate);

  const calcResult = useMemo(() => {
    try {
      const clean = calcInput.replace(/[^0-9+\-*/().]/g, '');
      if (!clean) return 0;
      // eslint-disable-next-line no-eval
      return eval(clean) || 0;
    } catch {
      return 0;
    }
  }, [calcInput]);

  const addExpense = () => {
    if (!title || !amount) return;
    const newExp: Expense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setExpenses([newExp, ...expenses]);
    setTitle('');
    setAmount('');
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="glass-card p-6 space-y-5 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-morandi-blue/10 rounded-xl flex items-center justify-center text-morandi-blue">
            <WalletIcon size={20} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-text-main">旅行帳本</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-white/60 p-5 rounded-[24px] border border-morandi-sand shadow-inner">
            <label className="text-[10px] text-morandi-dark block mb-2 tracking-widest uppercase font-bold">即時換算 (1 JPY ≈ {rate.toFixed(4)} TWD)</label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-mono text-morandi-blue">¥</span>
              <input 
                value={calcInput}
                onChange={(e) => setCalcInput(e.target.value)}
                placeholder="輸入算式 (如 1500+200)..." 
                className="w-full bg-transparent text-xl font-mono outline-none text-text-main"
              />
            </div>
            <div className="text-right text-xs mt-2 text-morandi-dark font-medium bg-morandi-sand/50 inline-block px-3 py-1 rounded-full float-right">
              ≈ $ {Math.round(calcResult * rate).toLocaleString()} TWD
            </div>
            <div className="clear-both" />
          </div>

          <div className="flex flex-col gap-3">
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="項目名稱" 
              className="w-full p-4 bg-morandi-sand/50 rounded-2xl outline-none text-sm border border-transparent focus:border-morandi-blue/30 transition-all"
            />
            <div className="flex gap-3">
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="金額 (JPY)" 
                className="flex-1 p-4 bg-morandi-sand/50 rounded-2xl outline-none text-sm border border-transparent focus:border-morandi-blue/30 transition-all font-mono"
              />
              <button 
                onClick={addExpense}
                className="px-8 bg-morandi-blue text-white rounded-2xl text-sm font-bold tracking-widest shadow-lg shadow-morandi-blue/20 active:scale-95 transition-all flex items-center justify-center"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary & History Card */}
      <div className="glass-card p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-morandi-sand/80 backdrop-blur-sm p-5 rounded-[24px] border border-white/50">
            <p className="text-[10px] text-morandi-dark mb-1 uppercase tracking-widest font-bold">Total JPY</p>
            <p className="text-2xl font-mono font-bold text-text-main">¥{totalJPY.toLocaleString()}</p>
          </div>
          <div className="bg-morandi-pink/10 p-5 rounded-[24px] border border-morandi-pink/10">
            <p className="text-[10px] text-morandi-pink mb-1 uppercase tracking-widest font-bold">Total TWD</p>
            <p className="text-2xl font-mono font-bold text-morandi-pink">${totalTWD.toLocaleString()}</p>
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center justify-between px-2 mb-3">
            <h4 className="text-xs font-bold text-morandi-dark uppercase tracking-widest">支出明細</h4>
            <span className="text-[10px] text-text-muted">{expenses.length} 筆紀錄</span>
          </div>
          
          <div className="bg-[#FFF9E5] rounded-2xl p-4 shadow-sm border border-[#F0E6C0] relative">
            {expenses.length === 0 ? (
              <p className="text-center py-8 text-sm text-[#B0A680] italic">尚無支出紀錄</p>
            ) : (
              <div className="space-y-0">
                {expenses.map((ex, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={ex.id} 
                    className={`flex items-center justify-between py-2.5 ${idx !== expenses.length - 1 ? 'border-b border-[#F0E6C0]/60' : ''}`}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <h5 className="text-sm font-bold text-[#5D5740] truncate leading-tight">{ex.title}</h5>
                      <p className="text-[10px] text-[#A09980] font-mono leading-tight">{ex.time}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-mono text-sm font-bold text-[#5D5740] leading-tight">¥{ex.amount.toLocaleString()}</p>
                        <p className="text-[9px] text-[#A09980] leading-tight">≈ ${Math.round(ex.amount * rate)}</p>
                      </div>
                      <button onClick={() => removeExpense(ex.id)} className="text-[#D0C9B0] hover:text-morandi-pink transition-colors p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingTab({ 
  list, 
  setList, 
  layout, 
  setLayout,
  memo,
  setMemo
}: { 
  list: ShoppingItem[], 
  setList: any, 
  layout: 'grid' | 'list', 
  setLayout: any,
  memo: string,
  setMemo: any
}) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('藥妝');
  const [note, setNote] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [predefinedList, setPredefinedList] = useState([
    { id: 'p1', text: '護照', done: false },
    { id: 'p2', text: 'VJW (Visit Japan Web)', done: false },
    { id: 'p3', text: '網卡 (eSIM) / 漫遊', done: false },
    { id: 'p4', text: '行動電源 & 充電線', done: false },
    { id: 'p5', text: '常備藥品 (腸胃/感冒)', done: false },
    { id: 'p6', text: '衣物', done: false },
    { id: 'p7', text: '牙膏牙刷', done: false },
    { id: 'p8', text: '防曬用品', done: false }
  ]);
  const [customChecklist, setCustomChecklist] = useState<any[]>([]);
  const [newCheckItem, setNewCheckItem] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedPre = localStorage.getItem('okinawa_predefined');
    if (savedPre) setPredefinedList(JSON.parse(savedPre));
    const savedCustom = localStorage.getItem('okinawa_custom_check');
    if (savedCustom) setCustomChecklist(JSON.parse(savedCustom));
  }, []);

  useEffect(() => {
    localStorage.setItem('okinawa_predefined', JSON.stringify(predefinedList));
  }, [predefinedList]);

  useEffect(() => {
    localStorage.setItem('okinawa_custom_check', JSON.stringify(customChecklist));
  }, [customChecklist]);

  const togglePredefined = (id: string) => {
    setPredefinedList(predefinedList.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const toggleCustom = (id: string) => {
    setCustomChecklist(customChecklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const addCheckItem = () => {
    if (!newCheckItem) return;
    setCustomChecklist([...customChecklist, { id: Date.now().toString(), text: newCheckItem, done: false }]);
    setNewCheckItem('');
  };

  const removeCustomItem = (id: string) => {
    setCustomChecklist(customChecklist.filter(item => item.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL('image/jpeg', 0.7);
          setImage(base64);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    if (!name) return;
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      category,
      note,
      image
    };
    setList([newItem, ...list]);
    setName('');
    setNote('');
    setImage(undefined);
  };

  const removeItem = (id: string) => {
    setList(list.filter(i => i.id !== id));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newList = [...list];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newList.length) {
      [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
      setList(newList);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preparation Checklist */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
            <div className="w-8 h-8 bg-morandi-blue/10 rounded-lg flex items-center justify-center text-morandi-blue">
              <ListCheck size={18} />
            </div>
            行前準備
          </h3>
          <span className="text-[10px] text-morandi-dark tracking-widest uppercase font-bold">Preparation</span>
        </div>
        <div className="glass-card p-6 space-y-4">
          <div className="space-y-3">
            {predefinedList.map(item => (
              <div key={item.id} className="flex items-center justify-between group">
                <button 
                  onClick={() => togglePredefined(item.id)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  {item.done ? (
                    <CheckCircle2 size={20} className="text-morandi-blue" />
                  ) : (
                    <Circle size={20} className="text-gray-200" />
                  )}
                  <span className={`text-sm transition-all ${item.done ? 'text-gray-300 line-through' : 'text-text-main font-medium'}`}>
                    {item.text}
                  </span>
                </button>
              </div>
            ))}
            {customChecklist.map(item => (
              <div key={item.id} className="flex items-center justify-between group">
                <button 
                  onClick={() => toggleCustom(item.id)}
                  className="flex items-center gap-3 flex-1 text-left"
                >
                  {item.done ? (
                    <CheckCircle2 size={20} className="text-morandi-blue" />
                  ) : (
                    <Circle size={20} className="text-gray-200" />
                  )}
                  <span className={`text-sm transition-all ${item.done ? 'text-gray-300 line-through' : 'text-text-main font-medium'}`}>
                    {item.text}
                  </span>
                </button>
                <button onClick={() => removeCustomItem(item.id)} className="text-gray-200 hover:text-morandi-pink opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t border-morandi-sand flex gap-2">
            <input 
              value={newCheckItem}
              onChange={(e) => setNewCheckItem(e.target.value)}
              placeholder="新增自定義項目..."
              className="flex-1 bg-morandi-sand/30 p-3 rounded-xl text-xs outline-none"
            />
            <button 
              onClick={addCheckItem}
              className="w-10 h-10 bg-morandi-blue text-white rounded-xl flex items-center justify-center shadow-lg shadow-morandi-blue/20"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Shopping List */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
            <div className="w-8 h-8 bg-morandi-blue/10 rounded-lg flex items-center justify-center text-morandi-blue">
              <ImageIcon size={18} />
            </div>
            購物清單
          </h3>
          <button 
            onClick={() => setLayout(layout === 'grid' ? 'list' : 'grid')}
            className="p-2 bg-morandi-sand rounded-xl text-morandi-blue"
          >
            {layout === 'grid' ? <StretchHorizontal size={18} /> : <LayoutGrid size={18} />}
          </button>
        </div>
        <div className="glass-card p-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="p-4 bg-morandi-sand/50 rounded-2xl outline-none text-sm text-text-main border-none"
              >
                <option value="藥妝">🌸 藥妝</option>
                <option value="衣物">👕 衣物</option>
                <option value="食物">🍪 食物</option>
                <option value="伴手禮">🎁 伴手禮</option>
                <option value="其他">📍 其他</option>
              </select>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="商品名稱" 
                className="p-4 bg-morandi-sand/50 rounded-2xl outline-none text-sm text-text-main"
              />
            </div>
            <input 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="備註 (可不填)" 
              className="w-full p-4 bg-morandi-sand/50 rounded-2xl outline-none text-sm text-text-main"
            />
            
            <div className="flex gap-3">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 p-4 bg-white border-2 border-dashed border-morandi-sand rounded-2xl text-xs text-morandi-dark flex items-center justify-center gap-2"
              >
                <ImageIcon size={16} /> 上傳圖片
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              <button 
                onClick={addItem}
                className="flex-[1.5] btn-action rounded-2xl text-sm font-bold tracking-widest"
              >
                加入清單
              </button>
            </div>
            
            {image && (
              <div className="relative w-24 h-24 mx-auto">
                <img src={image} className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-md" alt="Preview" />
                <button onClick={() => setImage(undefined)} className="absolute -top-2 -right-2 bg-morandi-pink text-white rounded-full p-1">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={layout === 'grid' ? 'grid grid-cols-2 gap-5' : 'space-y-4'}>
          {list.map((item, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={item.id} 
              className={`glass-card relative overflow-hidden ${layout === 'list' ? 'p-4 flex items-center gap-4' : 'p-4'}`}
            >
              {layout === 'grid' && (
                <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
                  <button onClick={() => moveItem(index, 'up')} className="bg-white/80 p-1 rounded-md text-gray-400 hover:text-morandi-blue"><ChevronRight size={12} className="-rotate-90" /></button>
                  <button onClick={() => moveItem(index, 'down')} className="bg-white/80 p-1 rounded-md text-gray-400 hover:text-morandi-blue"><ChevronRight size={12} className="rotate-90" /></button>
                </div>
              )}

              <div className={`${layout === 'grid' ? 'w-full aspect-square mb-3' : 'w-16 h-16'} relative`}>
                {item.image ? (
                  <img src={item.image} className="w-full h-full object-cover rounded-2xl shadow-inner" alt={item.name} />
                ) : (
                  <div className="w-full h-full bg-morandi-sand rounded-2xl flex items-center justify-center text-morandi-dark/20">
                    <ImageIcon size={layout === 'grid' ? 32 : 20} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] font-bold px-1.5 py-0.5 bg-morandi-sand text-morandi-blue rounded-md uppercase tracking-tighter">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-text-main truncate">{item.name}</h4>
                {item.note && <p className="text-[10px] text-text-muted truncate mt-0.5">{item.note}</p>}
              </div>

              <button 
                onClick={() => removeItem(item.id)}
                className={`text-gray-200 hover:text-morandi-pink transition-colors ${layout === 'grid' ? 'absolute bottom-4 right-4' : 'ml-2'}`}
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personal Memo */}
      <section className="space-y-3">
        <div className="flex justify-between items-end px-2">
          <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
            <div className="w-8 h-8 bg-morandi-blue/10 rounded-lg flex items-center justify-center text-morandi-blue">
              <Smartphone size={18} />
            </div>
            個人備忘錄
          </h3>
        </div>
        <div className="glass-card p-6 space-y-4">
          <textarea 
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="輸入個人筆記、連結或重要資訊..."
            className="w-full min-h-[120px] bg-morandi-sand/30 p-4 rounded-2xl text-sm outline-none resize-none text-text-main leading-relaxed"
          />
          {memo && (
            <div className="flex flex-wrap gap-2">
              {memo.split(/\s+/).filter(word => word.startsWith('http')).map((url, i) => (
                <a 
                  key={i} 
                  href={url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-morandi-blue text-white rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all"
                >
                  <ExternalLink size={14} /> 點擊連結 {i + 1}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function InfoTab() {
  const [confirmations, setConfirmations] = useState<{id: string, label: string, code: string}[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [newCode, setNewCode] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('okinawa_confirmations');
    if (saved) setConfirmations(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('okinawa_confirmations', JSON.stringify(confirmations));
  }, [confirmations]);

  const addConfirmation = () => {
    if (!newLabel || !newCode) return;
    setConfirmations([...confirmations, { id: Date.now().toString(), label: newLabel, code: newCode }]);
    setNewLabel('');
    setNewCode('');
  };

  const removeConfirmation = (id: string) => {
    setConfirmations(confirmations.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Map */}
      <div className="glass-card overflow-hidden h-[240px] relative shadow-sm">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114515.65485459317!2d127.6186847432049!3d26.24174363381014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34e5697141879401%3A0x10dba9a8008405e!2z5rKW57iE!5e0!3m2!1szh-TW!2stw!4v1715600000000!5m2!1szh-TW!2stw" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy"
          title="Okinawa Map"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-morandi-blue shadow-sm border border-white">
          <MapPin size={10} className="inline mr-1" /> 全沖繩景點標示
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 gap-4">
        <a 
          href="https://vjw-lp.digital.go.jp/" 
          target="_blank" 
          rel="noreferrer"
          className="relative bg-white p-6 rounded-2xl border border-morandi-sand flex items-center justify-between shadow-sm active:scale-[0.98] transition-all overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-morandi-blue" />
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-serif text-lg font-bold text-text-main">Visit Japan Web</h4>
                <span className="bg-morandi-pink/10 text-morandi-pink text-[10px] px-2 py-0.5 rounded border border-morandi-pink/20 font-bold">必備</span>
              </div>
              <p className="text-xs text-text-muted">入境審查 & 海關申報 (截圖 QR Code)</p>
            </div>
          </div>
          <ExternalLink size={18} className="text-morandi-blue" />
        </a>
      </div>

      {/* Booking Confirmations */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
            <Ticket size={20} className="text-morandi-blue" /> 預約代號
          </h3>
          <span className="text-[10px] text-morandi-dark tracking-widest uppercase">Bookings</span>
        </div>
        
        <div className="space-y-3">
          {confirmations.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4 bg-morandi-sand/30 rounded-xl border border-white group">
              <div>
                <p className="text-[10px] text-morandi-dark uppercase font-bold tracking-tighter mb-0.5">{c.label}</p>
                <p className="font-serif text-base font-bold text-text-main">{c.code}</p>
              </div>
              <button onClick={() => removeConfirmation(c.id)} className="text-gray-200 hover:text-morandi-pink opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          
          <div className="pt-2 flex flex-col gap-2">
            <div className="flex gap-2">
              <input 
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="項目 (如: 租車)"
                className="flex-1 bg-morandi-sand/50 p-3 rounded-xl text-xs outline-none"
              />
              <input 
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="確認號碼"
                className="flex-1 bg-morandi-sand/50 p-3 rounded-xl text-xs outline-none font-serif"
              />
            </div>
            <button 
              onClick={addConfirmation}
              className="w-full py-3 bg-morandi-blue text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Plus size={14} /> 新增預約資訊
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="glass-card p-6 space-y-5">
        <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
          <AlertTriangle size={20} className="text-morandi-pink" /> 緊急聯絡資訊
        </h3>
        <div className="space-y-3">
          {/* Square blocks for Police & Ambulance */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-morandi-sand/50 rounded-xl flex flex-col items-center justify-center text-center">
              <p className="text-[10px] font-bold text-morandi-dark mb-0.5">警察局</p>
              <p className="font-serif text-xl font-bold text-text-main">110</p>
            </div>
            <div className="p-4 bg-morandi-sand/50 rounded-xl flex flex-col items-center justify-center text-center">
              <p className="text-[10px] font-bold text-morandi-dark mb-0.5">救護/火警</p>
              <p className="font-serif text-xl font-bold text-text-main">119</p>
            </div>
          </div>

          {/* Medical Hotline */}
          <div className="p-4 bg-morandi-sand/50 rounded-xl flex flex-col items-center justify-center text-center border-2 border-morandi-pink/20 relative group">
            <p className="text-xs font-bold text-morandi-pink mb-1">訪日外國人醫療熱線 & 急難</p>
            <div className="flex items-center gap-2">
              <p className="font-serif text-2xl font-bold text-text-main">+81-50-3816-2787</p>
              <a 
                href="tel:+815038162787"
                className="w-8 h-8 bg-morandi-blue text-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-all"
              >
                <Phone size={14} />
              </a>
            </div>
            <p className="text-[8px] text-text-muted mt-0.5 uppercase tracking-widest font-serif">24H Multi-language Support</p>
          </div>

          {/* Representative Office */}
          <div className="p-4 bg-morandi-sand/50 rounded-xl flex flex-col items-center justify-center text-center">
            <p className="text-[9px] font-bold text-morandi-dark mb-0.5">外交部 駐日辦事處 (那霸)</p>
            <p className="font-serif text-base font-bold text-text-main">+81-90-1942-1346</p>
          </div>
        </div>
      </div>

      {/* Taboos & Notices */}
      <div className="glass-card p-6 space-y-5 border border-morandi-sand bg-white shadow-sm">
        <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
          <div className="w-8 h-8 bg-morandi-pink/10 rounded-lg flex items-center justify-center text-morandi-pink">
            <AlertTriangle size={18} />
          </div>
          旅遊禁忌與注意事項
        </h3>
        <ul className="space-y-4 text-sm text-text-main leading-relaxed px-2">
          <li className="flex gap-3">
            <span className="text-morandi-pink font-bold">01</span>
            <p><span className="font-bold">出入境違禁品：</span>嚴禁攜帶肉類製品（含泡麵肉塊）、新鮮蔬果進入台灣或日本。</p>
          </li>
          <li className="flex gap-3">
            <span className="text-morandi-pink font-bold">02</span>
            <p><span className="font-bold">自駕規則：</span>沖繩速限較嚴格，一般道路約 40-50km/h，高速公路 80km/h。切勿違規停車。</p>
          </li>
          <li className="flex gap-3">
            <span className="text-morandi-pink font-bold">03</span>
            <p><span className="font-bold">禮儀規範：</span>進入神社參拜前請先洗手；拍照前請確認是否有禁止攝影標誌。</p>
          </li>
        </ul>
      </div>

      {/* Monorail Map */}
      <div className="glass-card p-6 space-y-5 border border-morandi-sand bg-white shadow-sm">
        <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
          <div className="w-8 h-8 bg-morandi-blue/10 rounded-lg flex items-center justify-center text-morandi-blue">
            <Smartphone size={18} />
          </div>
          單軌列車 (Yui Rail)
        </h3>
        <div className="space-y-4">
          <div className="overflow-x-auto overflow-y-hidden hide-scrollbar rounded-2xl border border-morandi-sand">
            <div className="min-w-[600px] relative">
              <img 
                src="https://lh3.googleusercontent.com/d/1vnkzussydV7yR_d5nXTRV8wDW5HMirBQ" 
                alt="Monorail Route Map" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
              {/* Hotel Marker at Station 11 (Omoromachi) */}
              <div className="absolute top-[45%] left-[48%] flex flex-col items-center">
                <div className="bg-morandi-pink text-white text-[8px] px-1.5 py-0.5 rounded-md font-bold shadow-sm animate-bounce">飯店</div>
                <MapPin size={12} className="text-morandi-pink fill-morandi-pink" />
              </div>
            </div>
          </div>
          <div className="bg-morandi-sand/30 p-4 rounded-xl space-y-2">
            <p className="text-xs text-text-main leading-relaxed">
              • 可使用現金購票、IC卡（如 <span className="font-bold">Suica, ICOCA</span> 等）。<br />
              • <span className="font-bold text-morandi-blue">6歲以下兒童免票</span>。<br />
              • 飯店位於 <span className="font-bold">11 歌町站 (Omoromachi)</span>。
            </p>
          </div>
        </div>
      </div>

      {/* Okinawa FunPass */}
      <div className="glass-card p-6 space-y-5 border border-morandi-sand bg-white shadow-sm">
        <h3 className="font-serif text-xl font-bold text-text-main flex items-center gap-2">
          <div className="w-8 h-8 bg-morandi-blue/10 rounded-lg flex items-center justify-center text-morandi-blue">
            <Ticket size={18} />
          </div>
          沖繩 FUNPASS
        </h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs text-text-main leading-relaxed">
              一票玩遍沖繩熱門景點！包含美麗海水族館、東南植物園等，還可兌換美食與購物優惠。
            </p>
          </div>
          <a 
            href="https://okinawa.funpass.app/" 
            target="_blank" 
            rel="noreferrer"
            className="w-12 h-12 bg-morandi-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-morandi-blue/20 active:scale-90 transition-all"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

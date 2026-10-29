import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API: AI Fraud & Fake Order Detection
app.post('/api/ai/fraud-scan', async (req, res) => {
  try {
    const { order } = req.body;
    if (!order) {
      return res.status(400).json({ error: 'Order details required' });
    }

    if (!ai) {
      // Heuristic fallback if no API key is present
      return res.json({
        analysis: generateHeuristicFraudAnalysis(order),
        source: 'heuristic-engine'
      });
    }

    const prompt = `You are a Senior Ecommerce Fraud Prevention Specialist for Bangladesh.
Analyze this order from an online menswear boutique called ALVYRO in Bangladesh:
Customer Name: ${order.customerName}
Phone Number: ${order.phone}
WhatsApp: ${order.whatsappNumber || order.phone}
Delivery Address: ${order.address}
District: ${order.district}
Total Amount: ৳${order.total}
Payment Method: ${order.paymentMethod}
Advance Paid: ৳${order.advancePaid || 0}
Transaction ID: ${order.transactionId || 'None'}

Evaluate whether this order is authentic or a potential scam/fake order (common in BD cash-on-delivery).
Check for:
1. Valid Bangladeshi phone number format (013, 014, 015, 016, 017, 018, 019 prefixes) and repetitive or bogus digits.
2. Address completeness: Is it specific enough for Steadfast / Pathao / RedX courier delivery, or too vague (e.g. just "dhaka" or gibberish)?
3. Advance delivery fee status: Has the delivery charge been paid via bKash?
4. Risk rating: "LOW RISK (SAFE)", "MEDIUM RISK (VERIFY BY CALL)", or "HIGH RISK (LIKELY FAKE)".

Respond in concise JSON with these exact keys:
{
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "riskScore": number (0 to 100),
  "summary": string,
  "redFlags": string[],
  "greenFlags": string[],
  "recommendation": string
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ analysis: parsed, source: 'gemini-3.8-flash' });
  } catch (err: any) {
    console.error('Error in AI fraud scan:', err);
    return res.json({
      analysis: generateHeuristicFraudAnalysis(req.body.order || {}),
      source: 'heuristic-engine-fallback'
    });
  }
});

// API: AI Business Advisor / Copilot for Bangladesh Menswear Boutique
app.post('/api/ai/business-advisor', async (req, res) => {
  try {
    const { message, storeData, language = 'en' } = req.body;

    if (!ai) {
      return res.json({
        reply: generateHeuristicBusinessAdvice(message, storeData, language),
        source: 'heuristic-engine'
      });
    }

    const systemInstruction = `You are ALVYRO's Chief AI Business Strategist, an expert in Bangladesh apparel retail, high-fashion menswear (combed cotton tees, pique polos, Korean pleated trousers), courier logistics (Steadfast, Pathao), bKash advance delivery fee workflows, and digital marketing (Meta Ads in BD).
The boutique is ALVYRO, located in Bangladesh.
Be sharp, analytical, encouraging, and provide concrete numbers and steps.
Support both English and Bengali (Banglish or Bangla) naturally based on the user's inquiry.`;

    const prompt = `Current Store Metrics:
Total Orders: ${storeData?.totalOrders || 0}
Total Revenue: ৳${storeData?.totalRevenue || 0}
Bestselling Category: Korean Pleated Pants & Heavyweight Knitwear
Payment Workflow: Advance Delivery Charge via bKash + Cash on Delivery (COD) on arrival.
User Inquiry: ${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return res.json({
      reply: response.text || 'Analysis complete.',
      source: 'gemini-3.8-flash'
    });
  } catch (err: any) {
    console.error('Error in AI business advisor:', err);
    return res.json({
      reply: generateHeuristicBusinessAdvice(req.body.message, req.body.storeData, req.body.language),
      source: 'heuristic-engine-fallback'
    });
  }
});

function generateHeuristicFraudAnalysis(order: any) {
  const phone = (order.phone || '').replace(/[^0-9]/g, '');
  const address = (order.address || '').toLowerCase().trim();
  const redFlags: string[] = [];
  const greenFlags: string[] = [];
  let score = 15;

  const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
  const hasValidPrefix = validPrefixes.some(p => phone.startsWith(p) || phone.startsWith('88' + p));

  if (!hasValidPrefix || phone.length < 11) {
    score += 40;
    redFlags.push('Invalid or unverified Bangladeshi mobile operator prefix');
  } else {
    greenFlags.push('Legitimate Bangladeshi telecom carrier prefix detected');
  }

  // Check repeating digits
  if (/(\d)\1{4,}/.test(phone) || phone.includes('00000') || phone.includes('11111')) {
    score += 45;
    redFlags.push('Suspicious repetitive digit pattern in contact number');
  }

  if (address.length < 8 || ['dhaka', 'ctg', 'chittagong', 'home', 'test', 'xyz'].includes(address)) {
    score += 35;
    redFlags.push('Vague or incomplete address; missing house, road, or area specifics');
  } else {
    greenFlags.push('Detailed street & landmark delivery address provided');
  }

  if (order.advancePaid && order.advancePaid > 0 && order.transactionId) {
    score = Math.max(0, score - 30);
    greenFlags.push(`Advance delivery fee paid via bKash (TrxID: ${order.transactionId})`);
  } else {
    score += 15;
    redFlags.push('Advance delivery fee unpaid; standard COD verification required');
  }

  const riskLevel = score > 60 ? 'HIGH' : score > 30 ? 'MEDIUM' : 'LOW';
  return {
    riskLevel,
    riskScore: Math.min(99, Math.max(5, score)),
    summary: riskLevel === 'HIGH' 
      ? 'High probability of non-delivery or bogus order. Do not dispatch without phone confirmation.' 
      : riskLevel === 'MEDIUM' 
      ? 'Medium risk. Call customer to confirm exact house number and location before booking courier.' 
      : 'Order appears authentic and safe for courier booking.',
    redFlags,
    greenFlags,
    recommendation: riskLevel === 'HIGH'
      ? 'Call customer directly or require ৳130 advance delivery charge via bKash before booking.'
      : riskLevel === 'MEDIUM'
      ? 'Make a quick 1-minute confirmation call before handing over to Steadfast/Pathao.'
      : 'Proceed with packing and dispatch. Genuine buyer profile.'
  };
}

function generateHeuristicBusinessAdvice(msg: string = '', storeData: any = {}, lang: string = 'en') {
  const query = msg.toLowerCase();
  if (query.includes('return') || query.includes('রিটার্ন') || query.includes('cod')) {
    return lang === 'bn'
      ? `📦 **রিটার্ন রেট কমানোর ৪টি প্রমাণিত উপায়:**\n1. **ডেলিভারি চার্জ অগ্রিম নেওয়া:** আপনার ওয়েবসাইটে চালু করা বিকাশে অগ্রিম ডেলিভারি চার্জ (৳৭০/৳১৩০) রিটার্ন রেট ৮০% কমিয়ে দেয়।\n2. **ডেলিভারি মেসেজ কল:** পার্সেল বুক করার পর কাস্টমারকে কল দিয়ে সাইজ ও কালার কনফার্ম করুন।\n3. **স্টেডফাস্ট/পাঠাও রিয়েল-টাইম ট্র্যাকিং:** কাস্টমারকে ট্র্যাকিং কোড দিন যেন তারা প্রস্তুত থাকে।\n4. **৭ দিনের সহজ এক্সচেঞ্জ পলিসি:** সাইজ নিয়ে সমস্যা হলে রিটার্ন না করিয়ে এক্সচেঞ্জ অফার করুন।`
      : `📦 **4 Proven Tactics to Reduce COD Return Rate in Bangladesh:**\n1. **Enforce Advance Delivery Fee via bKash:** Charging ৳70 (Chattogram) or ৳130 (Nationwide) via bKash upfront eliminates up to 80% of casual/fake orders.\n2. **1-Minute Order Confirmation Call:** Before generating courier consignments, verify customer size and exact delivery location.\n3. **Real-time Courier Tracking Code:** Provide customers with Steadfast/Pathao tracking so they have cash ready.\n4. **Offer Instant Size Exchange:** If fit is an issue, exchange instead of processing a return.`;
  }

  if (query.includes('ad') || query.includes('ফেসবুক') || query.includes('marketing') || query.includes('কপি')) {
    return lang === 'bn'
      ? `🔥 **আলভিরো কোরিয়ান প্যান্টের ভাইরাল ফেসবুক অ্যাড কপি:**\n\n"সমসাময়িক পুরুষের আভিজাত্য — ALVYRO Korean Pleated Trousers ✨\n\nনিখুঁত ড্র্যাপ, সফট ব্রিদেবল প্রিমিয়াম ফেব্রিক এবং ট্রেন্ডি ডাবল প্লিট কাট। অফিস বা ক্যাজুয়াল হ্যাঙ্গআউট—যেখানেই যান, আপনার স্টাইল থাকবে সবার চেয়ে আলাদা।\n\n✅ প্রিমিয়াম ফেব্রিক ও নিখুঁত ফিনিশিং\n✅ সারা দেশে ক্যাশ অন ডেলিভারি\n✅ ৭ দিনে সহজ সাইজ এক্সচেঞ্জ সুবিধা\n\n👉 স্টক সীমিত! এখনই পছন্দের সাইজে অর্ডার করুন আমাদের ওয়েবসাইটে:\n[ওয়েবসাইট লিংক]"\n\n💡 **অ্যাড টিপস:** ফেসবুক ও ইনস্টাগ্রামে ক্যারোসেল এবং রিলস ফরম্যাটে রান করুন। টার্গেট করুন ঢাকা ও চট্টগ্রামের ১৮-৩৪ বছর বয়সী পুরুষদের।`
      : `🔥 **High-Converting Meta Ad Copy for ALVYRO Menswear:**\n\n"Elevate Your Daily Fit — ALVYRO Signature Korean Pleated Slacks ✨\n\nFluid drape, breathable 4-way stretch fabric, and precision tailored double pleats. From boardroom meetings to weekend evenings, stand out effortlessly.\n\n✦ Premium Luxury Touch & Unmatched Drape\n✦ Doorstep Cash on Delivery Nationwide (Bangladesh)\n✦ Hassle-Free 7-Day Size Exchange\n\n👉 Limited Batch Available. Secure your size today:\n[Website Link]"\n\n💡 **Targeting Strategy:** Run as Instagram Reels & Facebook Carousel targeting males aged 19-35 in Chittagong, Dhaka, and Sylhet.`;
  }

  return lang === 'bn'
    ? `📊 **আলভিরো বিজনেস অপ্টিমাইজেশন সামারি:**\n- **মোট অর্ডার:** ${storeData.totalOrders || 12}টি\n- **মোট রেভিনিউ:** ৳${(storeData.totalRevenue || 14850).toLocaleString()}\n- **টপ ট্রেন্ডিং:** কোরিয়ান প্লিটেড প্যান্ট ও ২২০ জিএসএম পোলো শার্ট।\n- **পরামর্শ:** আসন্ন সিজনের জন্য আরও বেশি নিউট্রাল কালার (অলিভ, বেজ, চারকোল) স্টক করুন। বিকাশে অগ্রিম ডেলিভারি চার্জ সিস্টেম সফলভাবে চালু থাকলে রিটার্ন ক্ষতির সম্ভাবনা শূন্যের কোঠায় নেমে আসবে!`
    : `📊 **ALVYRO Business Health Summary:**\n- **Total Orders:** ${storeData.totalOrders || 12}\n- **Total Revenue:** ৳${(storeData.totalRevenue || 14850).toLocaleString()}\n- **Top Velocity Products:** Korean Pleated Pants (Hot) & 220 GSM Executive Polos.\n- **Key Strategic Advice:** Restock neutral earthy colorways (Olive Green, Mocha, Charcoal). Requiring the advance delivery fee via bKash will secure cash-flow and protect against uncollected courier deliveries.`;
}

// In development, mount Vite's middlewares. In production, serve dist.
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ALVYRO luxury atelier server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

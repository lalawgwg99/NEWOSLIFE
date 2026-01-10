import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal, RefreshCw, Lock, Search,
    AlertTriangle, Check, ArrowRight,
    Activity, Database, Cpu, Network, Compass, Layers, Zap,
    BrainCircuit
} from 'lucide-react';

/**
 * ------------------------------------------------------------------
 * LIFEOS AUDIT v7.0 (NVIDIA DeepSeek-R1 Powered)
 * 核心：NVIDIA DeepSeek-R1 - 超強推理引擎 + 社會學逆向工程
 * 風格：Neo-Brutalism (Zen Mode) - 白底黑框綠字
 * ------------------------------------------------------------------
 */

// --- API CONFIGURATION ---
// API Key 現在隱藏於 Cloudflare Functions 中，前端不再需要

const I18N = {
    'zh-TW': {
        ui: {
            title: 'LifeOS Audit',
            subtitle: 'LLaMA 3.1 405B Hyper-Core',
            version: 'v7.0 AI',
            restart: 'REBOOT SYSTEM',
            startBtn: 'RUN DEEP SCAN',
            awaiting: 'WAITING FOR INPUT...',
            privacy: ':: API ENCRYPTED :: NO DATA LOGGING ::',
            error_missing: '[ERROR] 參數缺失 MISSING PARAMS',
            error_api: '[ERROR] API 連線失敗 (已切換至備援模式)',
            sections: {
                kernel: 'KERNEL SPECS 核心參數',
                social: 'SOCIAL VARS 社會變數',
                status: 'RUNTIME STATUS 當前狀態',
                action: 'ACTION PATCH 行動補丁',
                console: 'SYSTEM CONSOLE 系統終端'
            },
            loading: {
                main: 'DEEPSEEK-R1 IS REASONING...',
                logs: [
                    '> Initializing DeepSeek Reasoning Engine...',
                    '> Processing Sociological Parameters...',
                    '> Running Multi-Dimensional Analysis...',
                    '> Synthesizing Strategic Insights...'
                ]
            },
            console: {
                placeholder: '輸入指令或是詢問系統 Bug (e.g., 如何修復感情內耗?)',
                send: 'EXECUTE'
            }
        },
        options: {
            gender: ['男性', '女性', '多元性別'],
            sibling: ['排行老大', '中間排行', '排行老么', '獨生子女'],
            class: ['勞工階級 (Scarcity)', '中產階級 (Stability)', '富裕階級 (Abundance)'],
            energy: [
                { label: '獨處充電 (I)', value: 'Introvert' },
                { label: '社交充電 (E)', value: 'Extrovert' }
            ],
            logic: [
                { label: '邏輯優先 (T)', value: 'Thinker' },
                { label: '感受優先 (F)', value: 'Feeler' },
                { label: '兩者兼具/視情況', value: 'Balanced' }
            ],
            bottleneck: [
                { label: '職涯卡關', value: 'Career Stagnation' },
                { label: '感情內耗', value: 'Relationship Conflict' },
                { label: '金錢焦慮', value: 'Financial Anxiety' },
                { label: '人生迷惘', value: 'Existential Crisis' },
                { label: '多重困境同時發生', value: 'Multiple Issues' },
                { label: '沒有明確瓶頸/一切還好', value: 'No Major Issue' },
                { label: '時間管理/效率問題', value: 'Time Management' },
                { label: '人際關係/社交困擾', value: 'Social Issues' }
            ],
            education: ['高中以下', '大學 (學士)', '碩士', '博士', '自學成才'],
            salary: ['50萬以下/年', '50-100萬/年', '100-200萬/年', '200-500萬/年', '500萬以上/年'],
            yearInJob: ['1年以下', '1-3年', '3-5年', '5-10年', '10年以上'],
            parentalStyle: ['權威型 (高要求/更回應)', '專制型 (高要求/不回應)', '放任型 (低要求/更回應)', '忽視型 (低要求/不回應)', '混合型/不一致', '記不清楚/不確定', '單親家庭', '隔代教養'],
            pastRelationship: ['穩定長久', '頻繁更換', '焦慮依賴', '逃避疏離', '母胎單身'],
            screenTime: ['2小時以下', '2-4小時', '4-6小時', '6-8小時', '8小時以上'],
            grandparentHistory: ['平穩安康', '經歷戰爭', '經歷飢荒/貧窮', '曾經歷迫害/逃難', '普通家庭/平凡生活', '創業或經商背景', '公教人員/穩定職業', '不清楚/沒接觸過'],
            labels: {
                birthDate: '出生日期',
                birthLocation: '出生城市',
                gender: '生理性別',
                sibling: '家中排行',
                class: '家庭階級',
                edu: '學歷/科系',
                currLoc: '現居城市',
                currRole: '當前職業',
                salary: '年收入 (Optional)',
                yearInJob: '現職年資 (Optional)',
                parentalStyle: '父母教養風格 (Optional)',
                pastRelationship: '過去感情模式 (Optional)',
                screenTime: '每日螢幕時間 (Optional)',
                grandparentHistory: '祖父母歷史 (Optional)',
                bottleneck: '當前瓶頸',
                criticalEvent: '重大轉折點 (Optional)'
            }
        }
    },
    'en-US': {
        ui: {
            title: 'LifeOS Audit',
            subtitle: 'LLaMA 3.1 405B Hyper-Core',
            version: 'v7.0 AI',
            restart: 'REBOOT SYSTEM',
            startBtn: 'RUN DEEP SCAN',
            awaiting: 'WAITING FOR INPUT...',
            privacy: ':: API ENCRYPTED :: NO DATA LOGGING ::',
            error_missing: '[ERROR] MISSING PARAMS',
            error_api: '[ERROR] API Connection Failed (Fallback Mode)',
            sections: {
                kernel: 'KERNEL SPECS',
                social: 'SOCIAL VARS',
                status: 'RUNTIME STATUS',
                action: 'ACTION PATCH',
                console: 'SYSTEM CONSOLE'
            },
            loading: {
                main: 'DEEPSEEK-R1 IS REASONING...',
                logs: [
                    '> Initializing DeepSeek Reasoning Engine...',
                    '> Processing Sociological Parameters...',
                    '> Running Multi-Dimensional Analysis...',
                    '> Synthesizing Strategic Insights...'
                ]
            },
            console: {
                placeholder: 'Enter command or ask about bugs (e.g., How to fix relationship anxiety?)',
                send: 'EXECUTE'
            }
        },
        options: {
            gender: ['Male', 'Female', 'Non-binary'],
            sibling: ['Eldest', 'Middle', 'Youngest', 'Only Child'],
            class: ['Working Class (Scarcity)', 'Middle Class (Stability)', 'Wealthy (Abundance)'],
            energy: [
                { label: 'Recharge Alone (I)', value: 'Introvert' },
                { label: 'Recharge Socially (E)', value: 'Extrovert' }
            ],
            logic: [
                { label: 'Logic First (T)', value: 'Thinker' },
                { label: 'Feelings First (F)', value: 'Feeler' },
                { label: 'Both/Context-Based', value: 'Balanced' }
            ],
            bottleneck: [
                { label: 'Career Stuck', value: 'Career Stagnation' },
                { label: 'Relationship Drain', value: 'Relationship Conflict' },
                { label: 'Money Anxiety', value: 'Financial Anxiety' },
                { label: 'Life Confusion', value: 'Existential Crisis' }
            ],
            education: ['High School or below', 'Bachelor Degree', 'Master Degree', 'PhD', 'Self-Taught'],
            salary: ['Under 500k/yr', '500k-1M/yr', '1M-2M/yr', '2M-5M/yr', 'Over 5M/yr'],
            yearInJob: ['Under 1 yr', '1-3 yrs', '3-5 yrs', '5-10 yrs', 'Over 10 yrs'],
            parentalStyle: ['Authoritative', 'Authoritarian', 'Permissive', 'Neglectful'],
            pastRelationship: ['Stable & Long-term', 'Frequent Changes', 'Anxious/Dependent', 'Avoidant/Distant', 'Never in Relationship'],
            screenTime: ['Under 2 hrs', '2-4 hrs', '4-6 hrs', '6-8 hrs', 'Over 8 hrs'],
            grandparentHistory: ['Stable/Peaceful', 'War Experience', 'Famine/Poverty', 'Persecution/Refugee', 'Unknown'],
            labels: {
                birthDate: 'Birth Date',
                birthLocation: 'Birth City',
                gender: 'Gender',
                sibling: 'Birth Order',
                class: 'Family Class',
                edu: 'Education/Major',
                currLoc: 'Current City',
                currRole: 'Current Job',
                salary: 'Annual Salary (Optional)',
                yearInJob: 'Years in Job (Optional)',
                parentalStyle: 'Parental Style (Optional)',
                pastRelationship: 'Past Relationship Pattern (Optional)',
                screenTime: 'Daily Screen Time (Optional)',
                grandparentHistory: 'Grandparent History (Optional)',
                bottleneck: 'Current Bottleneck',
                criticalEvent: 'Critical Life Event (Optional)'
            }
        }
    }
};

// --- MOCK FALLBACK ---
const mockFallback = (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                childhood_audit: { title: "LEGACY SYSTEM (童年設定)", content: "由於無法連線 AI 核心，正在調用備用數據庫... 檢測到您的童年可能受限於資源匱乏協定 (Scarcity Protocol)，導致現在即使有能力，仍難以安心享受成果。" },
                personality_kernel: { title: "CORE KERNEL (真實性格)", content: "備用分析：您可能運行著「責任過載」的驅動程式。習慣照顧他人，卻忽略了自己的系統維護需求。" },
                career_throughput: { title: "PROCESS OPTIMIZATION (職業天賦)", content: "建議將運算資源從「執行」轉移至「架構」。您的價值在於整合而非單點輸出。" },
                wealth_algorithm: { title: "WEALTH MATRIX (金錢觀)", content: "金錢焦慮源於對未來的不可控預測。建議建立自動化投資模組以釋放腦力。" },
                relationship_api: { title: "CONNECTIVITY (感情模式)", content: "請檢查您的「示弱接口 (Vulnerability Port)」。防火牆開得太高,導致親密關係封包無法進入。" },
                energy_protocol: { title: "ENERGY PROTOCOL (能量管理)", content: "警告：背景程式過多。請每日執行一次「飛航模式」進行系統冷卻。" },
                security_vulnerabilities: { title: "HIDDEN BUG (內心隱憂)", content: "雖然表面穩定，但內核深處存在「冒牌者症候群 (Imposter Syndrome)」的 Bug。" },
                the_north_star: { title: "THE NORTH STAR (人生意義)", content: "尋找那個能讓您進入「心流 (Flow State)」的專案，那才是您的主程式。" },
                version_roadmap: { title: "VERSION ROADMAP (未來建議)", content: "1. 停止自我攻擊。\n2. 建立小規模成功循環。\n3. 重構人際邊界。" },
                hotfix_protocol: [
                    { id: 1, type: "COGNITIVE", text: "備用任務：每天對鏡子稱讚自己一次。" },
                    { id: 2, type: "BEHAVIORAL", text: "備用任務：拒絕一個不合理的請求。" },
                    { id: 3, type: "SYSTEM", text: "備用任務：睡前遠離藍光。" }
                ]
            });
        }, 2000);
    });
};

/**
 * ------------------------------------------------------------------
 * NVIDIA DeepSeek-R1 ANALYSIS ENGINE
 * 使用 NVIDIA API 調用 DeepSeek-R1 進行分析
 * ------------------------------------------------------------------
 */
const runDeepSeekAnalysis = async (formData) => {
    if (!nvidiaApiKey) {
        console.warn("No NVIDIA API Key. Switching to Mock Mode.");
        return mockFallback(formData);
    }

    try {
        // 溫暖長輩風格 Prompt - 深度分析
        const prompt = `你是一位智慧深厚、經驗豐富的人生導師，擁有社會學、心理學與生命教練的專業背景。
你像一位慈祥的長輩，用溫暖而誠懇的語氣，深入理解每個人的生命故事，並給予真摯的建議。

以下是這位求助者的基本資料：
- 出生資訊：${formData.birthDate} 出生於 ${formData.birthLocation}
- 性別與家庭排行：${formData.gender}，${formData.siblingOrder}
- 家庭背景：${formData.familyBackground}
- 學歷：${formData.education || '未提供'}
- 當前職業：${formData.currentRole || '未提供'}
- 年收入：${formData.salary || '未提供'}
- 現職年資：${formData.yearInJob || '未提供'}
- 個性特質：能量來源為 ${formData.energySource}，決策模式為 ${formData.decisionModel}
- 父母教養風格：${formData.parentalStyle || '未提供'}
- 過去感情模式：${formData.pastRelationship || '未提供'}
- 每日螢幕時間：${formData.screenTime || '未提供'}
- 祖父母歷史：${formData.grandparentHistory || '未提供'}
- 當前遇到的瓶頸：${formData.currentBottleneck}
- 重大人生轉折：${formData.criticalEvent || '未提供'}

**時代背景分析（康波週期整合）**：
請根據出生年份（${formData.birthDate}）分析這個人所處的時代背景：
1. **成長過程經歷的重大經濟事件**：例如金融海嘯（2008）、互聯網泡沫（2000）、疫情（2020）、AI革命（2023-）
2. **錯過與抓住的時代機會**：
   - 例如：1970年代生 = 抓住房地產黃金期
   - 1980年代生 = 互聯網第一波紅利
   - 1990年代生 = 移動互聯網原生代
   - 2000年代生 = AI與Web3的完美年齡
3. **未來10年的財富趨勢**：根據年齡和時代位置，給予具體的財富累積策略
4. **個人 × 時代 的交叉分析**：不只分析性格，更要分析「這個性格在這個時代能發揮什麼優勢」

將這些時代背景分析**自然融入**「職涯天賦與方向」和「金錢觀與財務心態」的內容中，不要單獨列出「康波週期」這種學術名詞。

**孫子兵法戰略智慧融入**：
在給予建議時，請融入孫子兵法的核心思維（但不要直接引用原文，而是用現代語言表達）：
1. **知己知彼**：深度自我覺察 + 理解環境與他人
2. **避實擊虛**：不要在紅海硬碰硬，找到自己的藍海優勢
3. **因勢利導**：順應性格與時代趨勢，而非對抗天性
4. **先勝而後求戰**：先建立不敗之地（穩定基本盤），再主動出擊
5. **以正合，以奇勝**：穩固基礎 + 創造差異化優勢
6. **兵貴神速**：該放手的沉沒成本要果斷放手
7. **上兵伐謀**：從根源解決問題，而非頭痛醫頭

將這些智慧**自然融入**各個建議中，不要說「根據孫子兵法...」，而是用生活化的語言表達戰略思維。

請你以一位有智慧的長輩身份，深入分析這位求助者的生命狀態，並給予溫暖、具體、有深度的建議。

**重要要求**：
1. 每個分析區塊請至少寫 **300字以上**，要有足夠的深度和細節
2. 語氣要**自然、真誠、像朋友或有經驗的導師**，避免以下刻意的用語：
   - ❌ 不要用「孩子啊」「你知道嗎」「親愛的」這類刻意的稱呼
   - ❌ 不要每句開頭都重複「學會如何」「你需要學會」
   - ✅ 直接、真誠、像在與朋友深度對話
   - ✅ 可以用「我發現...」「其實...」「值得注意的是...」等自然的開場
3. 用**生活化的比喻和具體例子**來說明，而不是抽象的理論
4. 給予**具體可行的建議**，而不是空泛的鼓勵
5. 所有內容（包括title欄位）**必須100%使用繁體中文**，絕對不要有任何英文
6. 輸出**純粹的JSON格式**，不要有markdown的\`\`\`json標記

請按照以下JSON結構輸出（注意title也要是繁體中文）：
{
  "life_os_score": {
    "total": 750,
    "emotional_stability": 720,
    "relationship_quality": 650,
    "career_alignment": 780,
    "financial_mindset": 690,
    "energy_management": 710,
    "percentile": 68,
    "grade": "良好"
  },
  "childhood_audit": {
    "title": "童年根源分析",
    "content": "從你的家庭背景來看...（至少300字，自然真誠的語氣，不要用「孩子啊」等稱呼）"
  },
  "personality_kernel": {
    "title": "性格核心解析",
    "content": "從你的個性特質來看...（深入分析優勢與挑戰，語氣自然像朋友對話）"
  },
  "sunk_cost_scanner": {
    "title": "沉沒成本覺察",
    "content": "（至少300字）很多時候，我們會因為過去的投入而難以放手...分析可能存在的沉沒成本陷阱（工作、感情、學習），並溫柔地引導如何釋懷。"
  },
  "relationship_debugger": {
    "title": "關係模式透視",
    "content": "（至少300字）從你的依附風格和過往感情經驗來看...深入分析關係中的重複模式，用理解和同理心來說明，並給予修復建議。"
  },
  "dopamine_leak": {
    "title": "注意力與成癮分析",
    "content": "（至少300字）現代人最大的挑戰之一就是專注力的流失...從螢幕時間和時代背景分析多巴胺成癮，給予溫暖的覺察引導和實用方法。"
  },
  "generational_trauma": {
    "title": "世代傳承的傷痕",
    "content": "（至少300字）你知道嗎？很多時候我們承受的，其實是上一代甚至上上一代的傷痛...從祖父母的歷史分析代間創傷，用理解和釋懷的語氣幫助覺察。"
  },
  "career_throughput": {
    "title": "職涯天賦與方向",
    "content": "（至少300字）從你的工作經歷和個性特質來看...深入分析職業生涯的優勢、挑戰和發展方向，給予具體的建議和鼓勵。"
  },
  "wealth_algorithm": {
    "title": "金錢觀與財務心態",
    "content": "（至少300字）金錢焦慮往往源自於童年的匱乏感或不安全感...從家庭背景和當前財務狀況分析金錢觀，給予溫暖的理解和實用建議。"
  },
  "energy_protocol": {
    "title": "能量管理與自我照顧",
    "content": "（至少300字）照顧好自己，才有能力照顧別人...根據內向/外向特質分析充電方式，給予具體的日常生活建議和提醒。"
  },
  "security_vulnerabilities": {
    "title": "內心深處的不安",
    "content": "（至少300字）每個人心中都有一些說不出口的恐懼...用溫柔的語氣探討深層的不安全感、冒牌者症候群等，給予理解和支持。"
  },
  "the_north_star": {
    "title": "人生意義的追尋",
    "content": "（至少300字）在這個忙碌的世界裡，我們很容易忘記什麼才是真正重要的...引導反思人生意義和核心價值，用溫暖的話語鼓勵追尋內心的聲音。"
  },
  "version_roadmap": {
    "title": "未來成長藍圖",
    "content": "（至少300字）孩子，改變不是一蹴可幾的...給予分階段的具體建議，像長輩一樣耐心地規劃成長路徑，每個階段都有可執行的步驟。"
  },
  "hotfix_protocol": [
    {"id": 1, "type": "認知轉換", "text": "（至少80字）一個具體的認知轉換練習或肯定語句，溫暖而具體，像長輩給的智慧小語。"},
    {"id": 2, "type": "行為改變", "text": "（至少80字）一個本週可以立即實踐的小行動，具體、可行、溫柔地鼓勵。"},
    {"id": 3, "type": "生活習慣", "text": "（至少80字）一個日常生活習慣的建議，像長輩叮嚀一樣，充滿關心。"}
  ]
}

記得：
- 每個content至少300字，hotfix每條至少80字
- 語氣溫暖如長輩，不要太學術或冰冷
- 舉生活化的例子和比喻
- 給予具體可行的建議
- **所有文字（包括title）100%繁體中文**
- 純JSON輸出，不要markdown標記`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 min timeout

        const response = await fetch(NVIDIA_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${nvidiaApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "meta/llama-3.1-405b-instruct",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 8192,
                top_p: 0.9
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        const aiText = data.choices[0].message.content;

        // 增強型 JSON 提取器：尋找最外層的 JSON 物件
        // 應對 DeepSeek <think> 標籤，尋找最後一個 } 結尾
        const jsonMatch = aiText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            console.error("No JSON structure found in response:", aiText);
            throw new Error("Invalid API Response Format: No JSON found");
        }

        const cleanJson = jsonMatch[0];

        try {
            return JSON.parse(cleanJson);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, cleanJson);
            throw new Error(`JSON Parse Error: ${parseError.message}`);
        }

    } catch (error) {
        console.error("DeepSeek API Error:", error);
        // 將錯誤訊息注入到 Mock Data 中以便 Debug
        const fallback = await mockFallback(formData);
        fallback.childhood_audit.content = `[SYSTEM ERROR] ${error.message} (Showing Fallback Data)`;
        return fallback;
    }
};


/**
 * ------------------------------------------------------------------
 * DeepSeek-R1 CHAT ENGINE (SYSTEM CONSOLE)
 * ------------------------------------------------------------------
 */
const runDeepSeekChat = async (history, userQuery, userContext) => {
    if (!nvidiaApiKey) {
        return "System Error: API Key missing. Terminal offline. (Mock Mode)";
    }

    try {
        const historyStr = history.map(h => `${h.role}: ${h.content}`).join('\n');
        const contextStr = JSON.stringify(userContext);

        const prompt = `
      Role: You are the OS Kernel of the user. 
      System Context: ${contextStr}
      Chat History: ${historyStr}
      Task: Answer the user's query as a System Administrator.
      Style: CLI terminal style, brief, tech metaphors, strict but helpful.
      Language: Traditional Chinese (Taiwan).
      
      User Query: ${userQuery}
    `;

        const response = await fetch(NVIDIA_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${nvidiaApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "meta/llama-3.1-405b-instruct",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("DeepSeek Chat Error:", error);
        return "Error: Connection timeout. Packet lost.";
    }
};

// --- UI COMPONENTS ---

const InputField = ({ label, type = "text", value, onChange, options = null, placeholder = "" }) => (
    <div className="flex flex-col gap-2 w-full group">
        <label className="text-xs font-bold text-black uppercase tracking-wider group-hover:text-green-700 transition-colors">{label}</label>
        {options ? (
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full bg-white border-2 border-black rounded-none px-4 py-3 text-base font-medium focus:outline-none focus:bg-green-50 focus:border-green-700 transition-colors appearance-none cursor-pointer"
                >
                    <option value="" disabled>--- SELECT ---</option>
                    {options.map((opt, i) => {
                        const val = typeof opt === 'object' ? opt.value : opt;
                        const lbl = typeof opt === 'object' ? opt.label : opt;
                        return <option key={val || i} value={val}>{lbl}</option>;
                    })}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black font-bold">▼</div>
            </div>
        ) : (
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-white border-2 border-black rounded-none px-4 py-3 text-base font-medium placeholder-gray-400 focus:outline-none focus:bg-green-50 focus:border-green-700 transition-colors"
            />
        )}
    </div>
);

const TypewriterText = ({ text, speed = 20, delay = 0 }) => {
    const [displayedText, setDisplayedText] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (!text) return;

        // 初始延遲
        const initialTimer = setTimeout(() => {
            setCurrentIndex(0);
            setDisplayedText('');
        }, delay);

        return () => clearTimeout(initialTimer);
    }, [text, delay]);

    React.useEffect(() => {
        if (!text || currentIndex >= text.length) return;

        const timer = setTimeout(() => {
            setDisplayedText(prev => prev + text[currentIndex]);
            setCurrentIndex(prev => prev + 1);
        }, speed);

        return () => clearTimeout(timer);
    }, [currentIndex, text, speed]);

    return <span>{displayedText}</span>;
};

const ResultCard = ({ title, content, icon: Icon, delay }) => (
    <div
        className="bg-white border-2 border-black p-5 h-full flex flex-col hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300"
        style={{ animation: `fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`, animationDelay: `${delay}ms`, opacity: 0 }}
    >
        <h3 className="font-black text-xs uppercase tracking-widest mb-4 pb-2 border-b-2 border-black/10 flex items-center gap-2 text-black">
            {Icon && <Icon size={14} className="text-green-700" />}
            {title}
        </h3>
        <p className="text-sm font-medium leading-6 text-black whitespace-pre-line text-justify flex-grow opacity-90">
            <TypewriterText text={content} speed={15} delay={delay + 300} />
        </p>
    </div>
);

const ScoreCard = ({ scoreData }) => {
    const getGradeColor = (grade) => {
        if (grade === 'Excellent') return 'bg-green-600';
        if (grade === 'Good') return 'bg-green-500';
        if (grade === 'Fair') return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div
            className="bg-black text-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(22,163,74,1)]"
            style={{ animation: `fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`, animationDelay: `0ms`, opacity: 0 }}
        >
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-white/20">
                <div>
                    <h2 className="font-black text-2xl uppercase tracking-tighter text-green-400">LIFE OS HEALTH SCORE</h2>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">人生系統健康評分 (Credit Score Style)</p>
                </div>
                <div className="text-right">
                    <div className="text-5xl font-black text-green-400">{scoreData?.total || 750}</div>
                    <span className={`text-xs font-bold ${getGradeColor(scoreData?.grade || 'Good')} text-black px-3 py-1 mt-2 inline-block`}>
                        {scoreData?.grade || 'GOOD'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div className="border-l-4 border-green-500 pl-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">EMOTIONAL STABILITY</p>
                    <p className="text-[9px] text-gray-500 mb-1">情緒穩定度</p>
                    <p className="text-2xl font-black text-white">{scoreData?.emotional_stability || 720}</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">RELATIONSHIP QUALITY</p>
                    <p className="text-[9px] text-gray-500 mb-1">關係品質</p>
                    <p className="text-2xl font-black text-white">{scoreData?.relationship_quality || 650}</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">CAREER ALIGNMENT</p>
                    <p className="text-[9px] text-gray-500 mb-1">職涯契合度</p>
                    <p className="text-2xl font-black text-white">{scoreData?.career_alignment || 780}</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">FINANCIAL MINDSET</p>
                    <p className="text-[9px] text-gray-500 mb-1">財務心態</p>
                    <p className="text-2xl font-black text-white">{scoreData?.financial_mindset || 690}</p>
                </div>
                <div className="border-l-4 border-green-500 pl-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ENERGY MANAGEMENT</p>
                    <p className="text-[9px] text-gray-500 mb-1">能量管理</p>
                    <p className="text-2xl font-black text-white">{scoreData?.energy_management || 710}</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">PERCENTILE RANK</p>
                    <p className="text-[9px] text-gray-500 mb-1">百分位排名</p>
                    <p className="text-2xl font-black text-yellow-400">TOP {100 - (scoreData?.percentile || 68)}%</p>
                </div>
            </div>

            <div className="mt-4 p-3 bg-green-900/30 border border-green-700/50">
                <p className="text-xs font-bold text-green-400">
                    🎯 你擊敗了 <span className="text-white text-lg">{scoreData?.percentile || 68}%</span> 的同齡人
                </p>
            </div>
        </div>
    );
};

const HotfixCard = ({ tasks, title }) => (
    <div
        className="bg-black text-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(22,163,74,1)]"
        style={{ animation: `fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`, animationDelay: `900ms`, opacity: 0 }}
    >
        <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-white/20">
            <h3 className="font-black text-sm uppercase tracking-widest text-green-400 flex items-center gap-2">
                <Activity size={16} />
                {title}
            </h3>
            <span className="text-[10px] font-bold bg-green-600 text-black px-2 py-1">PRIORITY: HIGH</span>
        </div>
        <div className="space-y-4">
            {tasks.map((task, index) => (
                <div key={task.id} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 border-2 border-green-500 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-green-500" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider block mb-1">[{task.type}]</span>
                        <p className="text-sm font-bold text-white leading-snug">
                            <TypewriterText text={task.text} speed={12} delay={1200 + index * 400} />
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SystemConsole = ({ title, placeholder, onSend, history }) => {
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    return (
        <div className="bg-gray-100 border-2 border-black p-4 mt-8 font-mono shadow-inner" style={{ animation: `fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`, animationDelay: `1000ms`, opacity: 0 }}>
            <div className="flex items-center gap-2 mb-3 border-b-2 border-black/10 pb-2">
                <Terminal size={16} className="text-black" />
                <h3 className="font-black text-xs uppercase tracking-widest text-black">{title}</h3>
            </div>

            <div className="h-48 overflow-y-auto mb-4 space-y-3 p-2 bg-white border-2 border-black/5">
                {history.length === 0 && <p className="text-xs text-gray-400 italic">System Ready. Awaiting commands...</p>}
                {history.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-2 text-xs font-bold ${msg.role === 'user' ? 'bg-black text-white' : 'bg-green-100 text-black border border-green-200'}`}>
                            <span className="opacity-50 text-[10px] block mb-1 uppercase">{msg.role === 'user' ? 'User' : 'Root'}</span>
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-grow">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600 font-bold">{'>'}</span>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-white border-2 border-black py-2 pl-6 pr-2 text-sm font-medium focus:outline-none focus:bg-green-50 transition-colors"
                    />
                </div>
                <button type="submit" className="bg-black text-white px-4 py-2 text-xs font-bold uppercase hover:bg-green-600 transition-colors flex items-center gap-1">
                    EXECUTE <ArrowRight size={12} />
                </button>
            </form>
        </div>
    );
};

// --- MAIN APP ---

export default function App() {
    const [step, setStep] = useState('input');
    const [language, setLanguage] = useState('zh-TW'); // NEW: Language state
    const [progress, setProgress] = useState(0); // NEW: Progress state
    const [loadingMessage, setLoadingMessage] = useState(''); // NEW: Loading message
    const [formData, setFormData] = useState({
        birthDate: '', birthLocation: '', gender: '', currentLocation: '',
        currentRole: '', siblingOrder: '', education: '', familyBackground: '',
        energySource: '', decisionModel: '', currentBottleneck: '', criticalEvent: '',
        salary: '', yearInJob: '', parentalStyle: '', pastRelationship: '',
        screenTime: '', grandparentHistory: ''
    });
    const [analysis, setAnalysis] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [loadingLogIndex, setLoadingLogIndex] = useState(0);

    const [chatHistory, setChatHistory] = useState([]);

    useEffect(() => {
        let interval;
        if (step === 'loading') {
            interval = setInterval(() => {
                setLoadingLogIndex(prev => (prev + 1) % 4);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [step]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrorMsg('');
    };

    const t = I18N[language].ui;
    const opts = I18N[language].options;

    const startAnalysis = async () => {
        const required = ['birthDate', 'birthLocation', 'gender', 'siblingOrder', 'familyBackground', 'currentBottleneck'];
        if (required.some(f => !formData[f])) {
            setErrorMsg(t.error_missing);
            return;
        }
        setStep('loading');

        // 進度條模擬 - 真實動態更新
        const messages = [
            '正在初始化深度學習模型...',
            '分析童年經歷與性格形成...',
            '計算人生系統健康評分...',
            '整合心理學與社會學數據...',
            '生成個人化成長建議...',
        ];

        let currentProgress = 0;
        setProgress(0);
        setLoadingMessage(messages[0]);

        // 每800ms更新一次進度
        const progressInterval = setInterval(() => {
            currentProgress += Math.random() * 12 + 3; // 每次增加3-15%
            if (currentProgress > 95) currentProgress = 95; // 最多到95%
            setProgress(Math.floor(currentProgress));

            // 根據進度更新訊息
            const messageIndex = Math.min(Math.floor(currentProgress / 20), messages.length - 1);
            setLoadingMessage(messages[messageIndex]);
        }, 800);

        // 執行真實的AI分析
        const result = await runDeepSeekAnalysis(formData);

        // 分析完成，清除計時器並完成進度
        clearInterval(progressInterval);
        setProgress(100);
        setLoadingMessage('分析完成！');

        // 短暫延遲後顯示結果
        setTimeout(() => {
            setAnalysis(result);
            setStep('result');
        }, 500);
    };

    const handleChat = async (msg) => {
        const userMsg = { role: 'user', content: msg };
        setChatHistory(prev => [...prev, userMsg]);

        const loadingMsg = { role: 'ai', content: 'Computing response...' };
        setChatHistory(prev => [...prev, loadingMsg]);

        const responseText = await runDeepSeekChat(chatHistory, msg, { profile: formData, analysis: analysis });

        setChatHistory(prev => {
            const newHist = [...prev];
            newHist.pop();
            return [...newHist, { role: 'ai', content: responseText }];
        });
    };

    return (
        <div className="min-h-screen bg-white text-black font-mono p-6 md:p-12 flex flex-col items-center">
            <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

            {/* HEADER */}
            <header className="w-full max-w-4xl flex justify-between items-end mb-10 border-b-4 border-black pb-4">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase flex items-center gap-3">
                        <Terminal className="text-black" size={32} strokeWidth={3} />
                        {t.title}
                    </h1>
                    <p className="text-xs md:text-sm font-bold mt-2 uppercase tracking-widest text-gray-500">
                        {t.subtitle} <span className="bg-green-600 text-white px-2 py-0.5 ml-2">{t.version}</span>
                    </p>
                </div>

                {/* LANGUAGE SWITCHER */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setLanguage('zh-TW')}
                        className={`px-3 py-2 text-xs font-bold uppercase border-2 transition-all ${language === 'zh-TW' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
                    >
                        繁中
                    </button>
                    <button
                        onClick={() => setLanguage('en-US')}
                        className={`px-3 py-2 text-xs font-bold uppercase border-2 transition-all ${language === 'en-US' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
                    >
                        EN
                    </button>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="w-full max-w-4xl">

                {/* INPUT VIEW */}
                {step === 'input' && (
                    <div className="animate-[fadeIn_0.5s_ease-out]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">

                            {/* KERNEL SPECS */}
                            <div className="md:col-span-1 space-y-8">
                                <h3 className="text-sm font-black bg-black text-white inline-block px-2 py-1 mb-2">{t.sections.kernel}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label={opts.labels.birthDate} type="date" value={formData.birthDate} onChange={e => handleInputChange('birthDate', e.target.value)} />
                                    <InputField label={opts.labels.birthLocation} value={formData.birthLocation} onChange={e => handleInputChange('birthLocation', e.target.value)} />
                                    <InputField label={opts.labels.gender} options={opts.gender} value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} />
                                    <InputField label={opts.labels.sibling} options={opts.sibling} value={formData.siblingOrder} onChange={e => handleInputChange('siblingOrder', e.target.value)} />
                                </div>
                            </div>

                            {/* SOCIAL VARS & ECONOMICS */}
                            <div className="md:col-span-1 space-y-8">
                                <h3 className="text-sm font-black bg-black text-white inline-block px-2 py-1 mb-2">{t.sections.social}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label={opts.labels.class} options={opts.class} value={formData.familyBackground} onChange={e => handleInputChange('familyBackground', e.target.value)} />
                                    <InputField label={opts.labels.edu} options={opts.education} value={formData.education} onChange={e => handleInputChange('education', e.target.value)} />
                                    <InputField
                                        label={opts.labels.currRole}
                                        value={formData.currentRole}
                                        onChange={e => handleInputChange('currentRole', e.target.value)}
                                        placeholder="E.g. 軟體工程師, 產品經理..."
                                    />
                                    <InputField label={opts.labels.salary} options={opts.salary} value={formData.salary} onChange={e => handleInputChange('salary', e.target.value)} />
                                    <InputField label={opts.labels.yearInJob} options={opts.yearInJob} value={formData.yearInJob} onChange={e => handleInputChange('yearInJob', e.target.value)} />
                                </div>
                            </div>

                            {/* DEEP PSYCHOLOGY & EPIGENETICS */}
                            <div className="md:col-span-2 space-y-8 pt-10 border-t-4 border-black/10">
                                <h3 className="text-sm font-black bg-black text-white inline-block px-2 py-1 mb-2">DEEP PSYCHOLOGY & EPIGENETICS</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <InputField label={opts.labels.parentalStyle} options={opts.parentalStyle} value={formData.parentalStyle} onChange={e => handleInputChange('parentalStyle', e.target.value)} />
                                    <InputField label={opts.labels.pastRelationship} options={opts.pastRelationship} value={formData.pastRelationship} onChange={e => handleInputChange('pastRelationship', e.target.value)} />
                                    <InputField label={opts.labels.screenTime} options={opts.screenTime} value={formData.screenTime} onChange={e => handleInputChange('screenTime', e.target.value)} />
                                    <InputField label={opts.labels.grandparentHistory} options={opts.grandparentHistory} value={formData.grandparentHistory} onChange={e => handleInputChange('grandparentHistory', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <InputField label="能量來源 (Energy)" options={opts.energy} value={formData.energySource} onChange={e => handleInputChange('energySource', e.target.value)} />
                                    <InputField label="決策模式 (Logic)" options={opts.logic} value={formData.decisionModel} onChange={e => handleInputChange('decisionModel', e.target.value)} />
                                </div>
                            </div>

                            {/* RUNTIME STATUS */}
                            <div className="md:col-span-2 space-y-8 pt-10 border-t-4 border-black/10">
                                <h3 className="text-sm font-black bg-black text-white inline-block px-2 py-1 mb-2">{t.sections.status}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label={opts.labels.currLoc}
                                        value={formData.currentLocation}
                                        onChange={e => handleInputChange('currentLocation', e.target.value)}
                                        placeholder="E.g. 台北市, Tech Hub..."
                                    />
                                    <InputField label={opts.labels.bottleneck} options={opts.bottleneck} value={formData.currentBottleneck} onChange={e => handleInputChange('currentBottleneck', e.target.value)} />
                                </div>
                                <div className="mt-4 p-4 bg-green-50 border-2 border-green-200">
                                    <label className="text-[10px] font-bold text-green-800 uppercase tracking-wider block mb-2">
                                        💡 {opts.labels.criticalEvent}
                                    </label>
                                    <textarea
                                        value={formData.criticalEvent}
                                        onChange={e => handleInputChange('criticalEvent', e.target.value)}
                                        placeholder="例如：出國留學、創業失敗、親人離世、重大獲獎... (提供此資訊可大幅提升分析精度)"
                                        className="w-full bg-white border-2 border-black rounded-none px-3 py-3 text-sm font-medium placeholder-gray-400 focus:outline-none focus:bg-white focus:border-green-700 transition-colors resize-none"
                                        rows="3"
                                    />
                                    <p className="text-[10px] text-green-700 mt-2 font-bold">
                                        ⚡ GIGO 原則：輸入的數據顆粒度越細，輸出的模型精確度越高
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            {errorMsg && (
                                <div className="mb-4 text-red-600 font-bold text-sm flex items-center gap-2 border-2 border-red-600 p-2 bg-red-50">
                                    <AlertTriangle size={16} /> {errorMsg}
                                </div>
                            )}
                            <button
                                onClick={startAnalysis}
                                className="w-full bg-black text-white font-black text-lg py-4 border-2 border-black hover:bg-green-600 hover:border-green-600 transition-colors uppercase tracking-widest flex justify-center items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            >
                                {t.startBtn} <ArrowRight size={20} />
                            </button>
                            <p className="text-center text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
                                {t.privacy}
                            </p>
                        </div>
                    </div>
                )}

                {/* LOADING VIEW - 優化版 */}
                {step === 'loading' && (
                    <div className="w-full min-h-96 flex flex-col items-center justify-center border-2 border-black border-dashed bg-gray-50 p-8 animate-[fadeIn_0.5s_ease-out]">
                        <BrainCircuit size={64} className="text-black mb-8 animate-[spin_3s_linear_infinite]" />
                        <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter animate-pulse">分析中</h2>
                        <p className="text-sm font-bold text-gray-500 mb-6">AI 正在深度思考...</p>

                        {/* 動態訊息 */}
                        <div className="text-sm font-bold text-green-700 mb-6 h-6 text-center">
                            {loadingMessage}
                        </div>

                        {/* 真實進度條 */}
                        <div className="w-full max-w-md">
                            <div className="flex justify-between text-xs font-bold text-gray-600 mb-2">
                                <span>處理進度</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 border-2 border-black overflow-hidden">
                                <div
                                    className="h-full bg-green-600 transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2 text-center">
                                💡 系統運作正常，請耐心等待...
                            </p>
                        </div>
                    </div>
                )}

                {/* RESULT VIEW */}
                {step === 'result' && analysis && (
                    <div className="animate-[fadeIn_0.8s_ease-out] pb-20 space-y-8">

                        {/* SCORE CARD - NEW! */}
                        {analysis.life_os_score && <ScoreCard scoreData={analysis.life_os_score} />}

                        {/* ROW 1: CORE SPECS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <ResultCard delay={0} icon={Database} title={analysis.childhood_audit?.title} content={analysis.childhood_audit?.content} />
                            <ResultCard delay={100} icon={Cpu} title={analysis.personality_kernel?.title} content={analysis.personality_kernel?.content} />
                            <ResultCard delay={200} icon={Compass} title={analysis.career_throughput?.title} content={analysis.career_throughput?.content} />
                        </div>

                        {/* ROW 2: 5 NEW STRATEGY MODULES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {analysis.sunk_cost_scanner && <ResultCard delay={250} icon={AlertTriangle} title={analysis.sunk_cost_scanner.title} content={analysis.sunk_cost_scanner.content} />}
                            {analysis.relationship_debugger && <ResultCard delay={300} icon={Network} title={analysis.relationship_debugger.title} content={analysis.relationship_debugger.content} />}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {analysis.dopamine_leak && <ResultCard delay={350} icon={Zap} title={analysis.dopamine_leak.title} content={analysis.dopamine_leak.content} />}
                            {analysis.generational_trauma && <ResultCard delay={400} icon={Layers} title={analysis.generational_trauma.title} content={analysis.generational_trauma.content} />}
                            {analysis.wealth_algorithm && <ResultCard delay={450} icon={Database} title={analysis.wealth_algorithm.title} content={analysis.wealth_algorithm.content} />}
                        </div>

                        {/* ROW 3: DEEP INSIGHTS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {analysis.energy_protocol && <ResultCard delay={500} icon={Activity} title={analysis.energy_protocol.title} content={analysis.energy_protocol.content} />}
                            {analysis.security_vulnerabilities && <ResultCard delay={550} icon={Lock} title={analysis.security_vulnerabilities.title} content={analysis.security_vulnerabilities.content} />}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {analysis.the_north_star && <ResultCard delay={600} icon={Search} title={analysis.the_north_star.title} content={analysis.the_north_star.content} />}
                            {analysis.version_roadmap && <ResultCard delay={650} icon={Compass} title={analysis.version_roadmap.title} content={analysis.version_roadmap.content} />}
                        </div>

                        {/* HOTFIX MODULE */}
                        <div className="mt-8">
                            <HotfixCard delay={700} tasks={analysis.hotfix_protocol || []} title={t.sections.action} />
                        </div>

                        {/* SYSTEM CONSOLE */}
                        <SystemConsole
                            title={t.sections.console}
                            placeholder={t.console.placeholder}
                            onSend={handleChat}
                            history={chatHistory}
                        />

                        <button
                            onClick={() => { setStep('input'); setAnalysis(null); setErrorMsg(''); setChatHistory([]); }}
                            className="mt-12 mx-auto flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest border-b-2 border-transparent hover:border-black pb-1 transition-all"
                        >
                            <RefreshCw size={12} /> {t.restart}
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
}

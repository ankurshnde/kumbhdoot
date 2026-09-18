export interface EventHost {
  name: string;
  avatarText?: string;
  avatarColor?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  lumaUrl: string;
  title: {
    en: string;
    mr: string;
  };
  subtitle: {
    en: string;
    mr: string;
  };
  description: {
    en: string;
    mr: string;
  };
  timelineTag: {
    en: string;
    mr: string;
  };
  timeDisplay: {
    en: string;
    mr: string;
  };
  timeSubtext?: {
    en: string;
    mr: string;
  };
  dateDisplay: {
    en: string;
    mr: string;
  };
  startDate: string;
  endDate?: string;
  location: {
    en: string;
    mr: string;
    city: string;
  };
  image: string;
  status: "upcoming" | "past";
  category: "sprint" | "summit" | "workshop" | "launch";
  badge: {
    en: string;
    mr: string;
  };
  hosts: {
    en: string;
    mr: string;
    list: EventHost[];
  };
  highlights: {
    en: string[];
    mr: string[];
  };
  featured?: boolean;
  isLive?: boolean;
}

export const EVENTS: EventItem[] = [
  {
    id: "nanda-sprint",
    slug: "nanda-sprint-2026",
    lumaUrl: "https://luma.com/umtvs1uk",
    title: {
      en: "Kumbhathon Innovation S.P.R.I.N.T. 2026 × Project NANDA and Prof Ramesh Raskar, MIT, September 5–7, 2026 | Nashik",
      mr: "कुंभथॉन इनोव्हेशन S.P.R.I.N.T. २०२६ × प्रोजेक्ट नांदा आणि प्रा. रमेश रास्कर, MIT, ५–७ सप्टेंबर २०२६ | नाशिक",
    },
    subtitle: {
      en: "3-Day Living Lab Innovation Sprint with Prof. Ramesh Raskar (MIT) at Nashik",
      mr: "नाशिक येथे प्रा. रमेश रास्कर (MIT) यांच्या समवेत ३ दिवसीय लिव्हिंग लॅब इनोव्हेशन स्प्रिंट",
    },
    description: {
      en: "Kumbhathon Innovation S.P.R.I.N.T. 2026 brought together innovators, startups, researchers, designers, and AI technologists to build transformative solutions for challenges emerging at Kumbh scale — spanning mobility, health, public information, payments, and citizen services.",
      mr: "कुंभथॉन इनोव्हेशन S.P.R.I.N.T. २०२६ ने कुंभमेळ्याच्या प्रचंड प्रमाणावर येणाऱ्या आव्हानांवर — वाहतूक, आरोग्य, माहिती, देयके आणि नागरिक सेवांवर — नाविन्यपूर्ण उपाय विकसित करण्यासाठी तंत्रज्ञान तज्ज्ञ, स्टार्टअप्स आणि संशोधकांना एकत्र आणले.",
    },
    timelineTag: {
      en: "Sep 5 Friday",
      mr: "५ सप्टेंबर शुक्रवार",
    },
    timeDisplay: {
      en: "Sep 5–7, 2026 · 3-Day Sprint",
      mr: "५–७ सप्टेंबर २०२६ · ३ दिवसीय स्प्रिंट",
    },
    dateDisplay: {
      en: "September 5–7, 2026",
      mr: "५–७ सप्टेंबर २०२६",
    },
    startDate: "2026-09-05T09:00:00.000+05:30",
    endDate: "2026-09-07T22:00:00.000+05:30",
    location: {
      en: "Nashik, Maharashtra",
      mr: "नाशिक, महाराष्ट्र",
      city: "Nashik",
    },
    image: "/assets/events/nanda-sprint.png",
    status: "past",
    category: "sprint",
    badge: {
      en: "Innovation Sprint",
      mr: "इनोव्हेशन स्प्रिंट",
    },
    hosts: {
      en: "By Ramesh Raskar & Rishabh",
      mr: "रमेश रास्कर आणि ऋषभ यांच्या वतीने",
      list: [
        { name: "Ramesh Raskar", avatarText: "RR", avatarColor: "#f59e0b" },
        { name: "Rishabh", avatarText: "R", avatarColor: "#ec4899" },
      ],
    },
    highlights: {
      en: [
        "Hands-on mentorship by Prof. Ramesh Raskar (MIT Media Lab) & KIF leadership",
        "Focus on AI agents, edge devices, and Open Agentic Web protocols for mass gatherings",
        "Direct pathways toward pilot deployments at Nashik Kumbh Mela 2027",
        "Tracks: AI & Software, Health, Mobility, Infrastructure, and Agentic Commerce",
      ],
      mr: [
        "प्रा. रमेश रास्कर (MIT Media Lab) आणि KIF कडून प्रत्यक्ष मार्गदर्शन",
        "सामूहिक मेळाव्यांसाठी AI एजंट्स आणि ओपन एजंटिक वेब प्रोटोकॉलवर विशेष भर",
        "नाशिक कुंभमेळा २०२७ मध्ये प्रत्यक्ष प्रायोगिक अंमलबजावणीची संधी",
        "ट्रॅक्स: AI सॉफ्टवेअर, आरोग्य, वाहतूक व्यवस्था आणि एजंटिक कॉमर्स",
      ],
    },
    featured: true,
  },
  {
    id: "agentic-commerce",
    slug: "agentic-commerce-mumbai",
    lumaUrl: "https://luma.com/n8byo20y",
    title: {
      en: "Agentic Commerce: Towards Agentic Kumbh Mela (MySellerCentral)",
      mr: "एजंटिक कॉमर्स: कुंभमेळ्यातील डिजिटल व्यापार क्रांती (मायसेलरसेंट्रल)",
    },
    subtitle: {
      en: "Deep Dive into the Commerce Layer of Kumbh Mela with MySellerCentral & Industry Leaders",
      mr: "मायसेलरसेंट्रल आणि उद्योग तज्ज्ञांच्या सहभागाने कुंभमेळ्याच्या कॉमर्स लेयरवर विशेष चर्चा",
    },
    description: {
      en: "A dedicated executive session with MySellerCentral and Project NANDA focusing on the commerce side of Kumbh Mela — exploring how autonomous merchant agents, consumer agents, and marketplaces can seamlessly transact and empower local businesses at population scale.",
      mr: "मायसेलरसेंट्रल आणि प्रोजेक्ट नांदा यांच्या संयुक्त विद्यमाने कुंभमेळ्याच्या व्यापारी व वाणिज्य घटकांवर (Commerce Layer) आधारित विशेष सत्र — स्थानिक व्यापारी आणि ग्राहकांसाठी AI एजंट्सद्वारे व्यवहार सुलभ करणे.",
    },
    timelineTag: {
      en: "Sep 1 Tuesday",
      mr: "१ सप्टेंबर मंगळवार",
    },
    timeDisplay: {
      en: "10:00 AM – 2:00 PM IST",
      mr: "सकाळी १०:०० ते दुपारी २:०० IST",
    },
    dateDisplay: {
      en: "September 1, 2026",
      mr: "१ सप्टेंबर २०२६",
    },
    startDate: "2026-09-01T10:00:00.000+05:30",
    endDate: "2026-09-01T14:00:00.000+05:30",
    location: {
      en: "The Orchid Hotel, Mumbai Vile Parle",
      mr: "द ऑर्किड हॉटेल, मुंबई विलेपार्ले",
      city: "Mumbai",
    },
    image: "/assets/events/agentic-commerce.jpg",
    status: "past",
    category: "workshop",
    badge: {
      en: "Executive Workshop",
      mr: "कार्यकारी कार्यशाळा",
    },
    hosts: {
      en: "By Ramesh Raskar & KumbhDoot Team",
      mr: "रमेश रास्कर आणि कुंभदूत चमू",
      list: [
        { name: "Ramesh Raskar", avatarText: "RR", avatarColor: "#f59e0b" },
        { name: "KumbhDoot Team", avatarText: "KD", avatarColor: "#3b82f6" },
      ],
    },
    highlights: {
      en: [
        "Defining open protocols for agent discovery, payments, and consent",
        "Collaboration with ONDC, marketplaces, logistics, and retail ecosystems",
        "Preview of early KumbhDoot commerce and dharamshala booking prototypes",
      ],
      mr: [
        "एजंट शोध, देयके आणि संमतीसाठी खुल्या मानकांची आखणी",
        "ONDC, बाजारपेठा, वाहतूक आणि किरकोळ विक्रेत्यांशी सहकार्य",
        "कुंभदूत कॉमर्स आणि धर्मशाळा बुकिंगच्या प्रारूपांचे प्रात्यक्षिक",
      ],
    },
    featured: true,
  },
  {
    id: "nanda-summit",
    slug: "nanda-summit-mit",
    lumaUrl: "https://luma.com/vu7509m2",
    title: {
      en: "NANDA Summit: Presenting KumbhDoot & Agentic Web at MIT Media Lab",
      mr: "नांदा शिखर परिषद: MIT मीडिया लॅबमध्ये कुंभदूत संकल्पनेचे जागतिक सादरीकरण",
    },
    subtitle: {
      en: "Presenting the KumbhDoot Concept at Global Scale in MIT Media Lab during NANDA Summit",
      mr: "नांदा समिटदरम्यान MIT मीडिया लॅबमध्ये कुंभदूत संकल्पनेचे जागतिक स्तरावर सादरीकरण",
    },
    description: {
      en: "The landmark NANDA Summit at MIT Media Lab where the KumbhDoot framework and the Internet of AI Agents vision were demonstrated at a global scale to international researchers, technology pioneers, and civic leaders.",
      mr: "MIT मीडिया लॅब येथील नांदा समिटमध्ये कुंभदूत प्रणाली आणि AI एजंट्सच्या इंटरनेटची संकल्पना जागतिक संशोधक, तंत्रज्ञान प्रणेते आणि प्रशासकीय नेतृत्वासमोर आंतरराष्ट्रीय स्तरावर सादर करण्यात आली.",
    },
    timelineTag: {
      en: "Apr 11 Saturday",
      mr: "११ एप्रिल शनिवार",
    },
    timeDisplay: {
      en: "9:00 AM – 5:00 PM EDT",
      mr: "सकाळी ९:०० ते संध्याकाळी ५:०० EDT",
    },
    dateDisplay: {
      en: "April 11, 2026",
      mr: "११ एप्रिल २०२६",
    },
    startDate: "2026-04-11T09:00:00.000-04:00",
    endDate: "2026-04-11T17:00:00.000-04:00",
    location: {
      en: "MIT Media Lab, Cambridge, Massachusetts, USA",
      mr: "MIT मीडिया लॅब, केंब्रिज, मॅसॅच्युसेट्स, अमेरिका",
      city: "Cambridge, USA",
    },
    image: "/assets/events/nanda-summit-mit.jpg",
    status: "past",
    category: "summit",
    badge: {
      en: "Global MIT Summit",
      mr: "जागतिक MIT परिषद",
    },
    hosts: {
      en: "By Prof. Ramesh Raskar & Rod Beckstrom",
      mr: "प्रा. रमेश रास्कर आणि रॉड बेकस्ट्रॉम",
      list: [
        { name: "Ramesh Raskar", avatarText: "RR", avatarColor: "#f59e0b" },
        { name: "Rod Beckstrom", avatarText: "RB", avatarColor: "#10b981" },
      ],
    },
    highlights: {
      en: [
        "Keynotes by Prof. Ramesh Raskar (MIT) & Rod Beckstrom (Former President & CEO, ICANN)",
        "Launch of NandaHack in partnership with HCLTech, OpenClaw & MIT",
        "Unveiling NANDA NEST — planetary-scale testbed for autonomous multi-agent coordination",
        "Participation from Google, AWS, Cisco, Nutanix, TCS, IBM, and ARM",
      ],
      mr: [
        "प्रा. रमेश रास्कर आणि रॉड बेकस्ट्रॉम (माजी अध्यक्ष, ICANN) यांची प्रमुख भाषणे",
        "HCLTech आणि MIT च्या सहकार्याने नांदाहॅक स्पर्धेची घोषणा",
        "नांदा नेस्ट (NEST) प्लॅनेटरी-स्केल टेस्टबेडचे अनावरण",
        "Google, AWS, Cisco, TCS आणि IBM यांसारख्या संस्थांचा सक्रिय सहभाग",
      ],
    },
    featured: true,
  },
  {
    id: "iitd-kumbh",
    slug: "iitd-ai-kumbh-mela",
    lumaUrl: "https://luma.com/fsqtg0yp",
    title: {
      en: "AI + Kumbh Mela: Innovation & Business Roundtable at IIT Delhi",
      mr: "AI आणि कुंभमेळा: IIT दिल्ली येथे नाशिक प्रशासन व उद्योग परिषद",
    },
    subtitle: {
      en: "Strategic Dialogue with Nashik Administration & Business Leaders on Kumbh Opportunities",
      mr: "नाशिक प्रशासन आणि उद्योजकांशी कुंभमेळा संधी व नावीन्यपूर्ण उपायांवर धोरणात्मक चर्चा",
    },
    description: {
      en: "A high-level roundtable hosted at IIT Delhi with FITT, engaging the Nashik administration, business fellows, technology architects, and entrepreneurs eager to contribute transformative innovations and business solutions for Kumbh Mela 2027.",
      mr: "IIT दिल्ली येथे आयोजित विशेष परिषद, ज्यामध्ये नाशिक प्रशासन आणि कुंभमेळा संधींमध्ये योगदान देण्यास उत्सुक असणारे उद्योजक, संशोधक व तंत्रज्ञान तज्ज्ञ एकत्र आले.",
    },
    timelineTag: {
      en: "Feb 21 Saturday",
      mr: "२१ फेब्रुवारी शनिवार",
    },
    timeDisplay: {
      en: "9:00 AM – 2:00 PM IST",
      mr: "सकाळी ९:०० ते दुपारी २:०० IST",
    },
    dateDisplay: {
      en: "February 21, 2026",
      mr: "२१ फेब्रुवारी २०२६",
    },
    startDate: "2026-02-21T09:00:00.000+05:30",
    endDate: "2026-02-21T14:00:00.000+05:30",
    location: {
      en: "IIT Delhi, New Delhi, India",
      mr: "IIT दिल्ली, नवी दिल्ली, भारत",
      city: "New Delhi",
    },
    image: "/assets/events/iitd-kumbh.webp",
    status: "past",
    category: "summit",
    badge: {
      en: "Academic Roundtable",
      mr: "शैक्षणिक गोलमेज परिषद",
    },
    hosts: {
      en: "By IIT Delhi (FITT) & Project NANDA",
      mr: "IIT दिल्ली (FITT) आणि प्रोजेक्ट नांदा",
      list: [
        { name: "IIT Delhi", avatarText: "IIT", avatarColor: "#6366f1" },
        { name: "Project NANDA", avatarText: "PN", avatarColor: "#f59e0b" },
      ],
    },
    highlights: {
      en: [
        "Hosted with Foundation for Innovation and Technology Transfer (FITT) at IIT Delhi",
        "Engaged Nashik administration leaders and business fellows on Kumbh opportunities",
        "Framework integration between KumbhDoot and national digital public infrastructure",
      ],
      mr: [
        "IIT दिल्लीच्या FITT संस्थेच्या सहकार्याने आयोजन",
        "नाशिक प्रशासन आणि उद्योजकांसोबत कुंभमेळा विकास संधींवर सखोल चर्चा",
        "कुंभदूत आणि राष्ट्रीय डिजिटल पायाभूत सुविधांचे एकत्रीकरण",
      ],
    },
  },
  {
    id: "kumbhdoot-summit",
    slug: "indiaai-summit-kumbhdoot",
    lumaUrl: "https://luma.com/gske7f7j",
    title: {
      en: "Official Launch of KumbhDoot by Hon. Devendra Fadnavis at IndiaAI Summit",
      mr: "मा. देवेंद्र फडणवीस यांच्या हस्ते इंडिया AI समिटमध्ये कुंभदूतचा अधिकृत शुभारंभ",
    },
    subtitle: {
      en: "Official Launch of KumbhDoot by Hon. Devendra Fadnavis during the National AI Summit in New Delhi",
      mr: "नवी दिल्ली येथील राष्ट्रीय AI समिटमध्ये मा. देवेंद्र फडणवीस यांच्या हस्ते कुंभदूतचे अधिकृत अनावरण",
    },
    description: {
      en: "The official launch and unveil of KumbhDoot by Hon. Devendra Fadnavis at the IndiaAI Summit at Bharat Mandapam, New Delhi, presenting the sovereign AI Agent framework to national policymakers and technology leaders.",
      mr: "भारत मंडपम, नवी दिल्ली येथील इंडिया AI समिटमध्ये मा. देवेंद्र फडणवीस यांच्या हस्ते कुंभदूतचे अधिकृत अनावरण करण्यात आले आणि राष्ट्रीय धोरणकर्त्यांसमोर ही AI प्रणाली मांडण्यात आली.",
    },
    timelineTag: {
      en: "Feb 16 Sunday",
      mr: "१६ फेब्रुवारी रविवार",
    },
    timeDisplay: {
      en: "Multi-Session Week · Bharat Mandapam",
      mr: "सप्ताहभर विविध सत्रे · भारत मंडपम",
    },
    dateDisplay: {
      en: "February 16–21, 2026",
      mr: "१६–२१ फेब्रुवारी २०२६",
    },
    startDate: "2026-02-16T09:30:00.000+05:30",
    endDate: "2026-02-21T21:30:00.000+05:30",
    location: {
      en: "Bharat Mandapam, New Delhi, India",
      mr: "भारत मंडपम, नवी दिल्ली, भारत",
      city: "New Delhi",
    },
    image: "/assets/launch_delhi.jfif",
    status: "past",
    category: "launch",
    badge: {
      en: "National AI Summit",
      mr: "राष्ट्रीय AI परिषद",
    },
    hosts: {
      en: "By Govt of Maharashtra & IndiaAI",
      mr: "महाराष्ट्र शासन आणि इंडिया AI",
      list: [
        { name: "Govt of Maharashtra", avatarText: "GoM", avatarColor: "#ea580c" },
        { name: "IndiaAI", avatarText: "AI", avatarColor: "#0284c7" },
      ],
    },
    highlights: {
      en: [
        "Official unveiling of KumbhDoot by Hon. Devendra Fadnavis",
        "Presentation of Sovereign Collective Intelligence and the KumbhDoot Agentic Framework",
        "Multi-agent trust infrastructure and decentralized services alignment with national policymakers",
      ],
      mr: [
        "मा. देवेंद्र फडणवीस यांच्या हस्ते कुंभदूतचे अधिकृत अनावरण",
        "सार्वभौम सामूहिक बुद्धिमत्ता आणि कुंभदूत AI एजंट रचनेचे सादरीकरण",
        "मल्टी-एजंट विश्वास प्रणाली आणि विकेंद्रित सेवांवर राष्ट्रीय धोरणकर्त्यांसोबत समन्वय",
      ],
    },
  },
  {
    id: "davos",
    slug: "agentic-web-davos",
    lumaUrl: "https://luma.com/bcqun14f",
    title: {
      en: "KumbhDoot & Agentic Web at Davos (World Economic Forum)",
      mr: "दावोस (DAVOS) येथे कुंभदूत व एजंटिक वेब परिषद (WEF)",
    },
    subtitle: {
      en: "Discussed with the Government of Maharashtra & Hon. Devendra Fadnavis at WEF Davos",
      mr: "वर्ल्ड इकॉनॉमिक फोरम दावोस येथे महाराष्ट्र शासन आणि मा. देवेंद्र फडणवीस यांच्यासोबत चर्चा",
    },
    description: {
      en: "High-level strategic discussion held during World Economic Forum week in Davos with the Government of Maharashtra leadership, including Hon. Devendra Fadnavis and Prof. Ramesh Raskar, establishing global collaboration and open-source standards for mass-gathering AI infrastructure.",
      mr: "दावोस येथील वर्ल्ड इकॉनॉमिक फोरमदरम्यान महाराष्ट्र शासनाचे नेतृत्व, मा. देवेंद्र फडणवीस आणि प्रा. रमेश रास्कर यांच्या उपस्थितीत कुंभदूत व सामूहिक मेळाव्यांसाठीच्या AI प्रणालीवर जागतिक स्तरावर चर्चा झाली.",
    },
    timelineTag: {
      en: "Jan 20 Tuesday",
      mr: "२० जानेवारी मंगळवार",
    },
    timeDisplay: {
      en: "9:30 AM – 10:30 AM CET",
      mr: "सकाळी ९:३० ते १०:३० CET",
    },
    dateDisplay: {
      en: "January 20–22, 2026",
      mr: "२०–२२ जानेवारी २०२६",
    },
    startDate: "2026-01-20T09:30:00.000+01:00",
    endDate: "2026-01-22T17:00:00.000+01:00",
    location: {
      en: "Davos, Switzerland",
      mr: "दावोस, स्वित्झर्लंड",
      city: "Davos, Switzerland",
    },
    image: "/assets/events/davos-wef.jpg",
    status: "past",
    category: "summit",
    badge: {
      en: "Davos WEF Session",
      mr: "दावोस जागतिक सत्र",
    },
    hosts: {
      en: "By Govt of Maharashtra & NANDA Consortium",
      mr: "महाराष्ट्र शासन आणि नांदा कन्सोर्टियम",
      list: [
        { name: "Govt of Maharashtra", avatarText: "GoM", avatarColor: "#ea580c" },
        { name: "WEF Delegates", avatarText: "WEF", avatarColor: "#475569" },
      ],
    },
    highlights: {
      en: [
        "Strategic briefing with Hon. Devendra Fadnavis and Maharashtra Government delegates",
        "Presented open-source infrastructure preventing proprietary agentic monopolies",
        "Global academic-industry alignment on large-scale AI deployment for mass gatherings",
      ],
      mr: [
        "मा. देवेंद्र फडणवीस आणि महाराष्ट्र शासनाच्या प्रतिनिधींसोबत धोरणात्मक चर्चा",
        "सामूहिक मेळाव्यांसाठी खुल्या मानकांवर आधारित AI प्रणालीची मांडणी",
        "जागतिक शैक्षणिक आणि उद्योग क्षेत्रासोबत कुंभमेळा AI सहकार्याची आखणी",
      ],
    },
  },
  {
    id: "mumbai-chapter",
    slug: "mumbai-chapter-launch",
    lumaUrl: "https://luma.com/diri6635",
    title: {
      en: "Project NANDA Mumbai Chapter: Formally Announcing KumbhDoot Vision & Roadmap",
      mr: "प्रोजेक्ट नांदा मुंबई चॅप्टर: कुंभदूत संकल्पना आणि पायाभूत कार्याची अधिकृत घोषणा",
    },
    subtitle: {
      en: "Formally Stating KumbhDoot, its Background Vision, and Foundational Work at Somaiya Vidyavihar",
      mr: "सोमैय्या विद्याविहार येथे कुंभदूत, त्याची पार्श्वभूमी, दृष्टी आणि पायाभूत कार्याची औपचारिक घोषणा",
    },
    description: {
      en: "The historic inaugural Mumbai Chapter gathering where KumbhDoot was formally announced alongside its foundational vision, architectural roadmap, and multi-agent coordination framework with academia, industry, and civic administrators.",
      mr: "प्रोजेक्ट नांदाच्या मुंबई चॅप्टरच्या या ऐतिहासिक मेळाव्यात कुंभदूतची संकल्पना, तिची पार्श्वभूमी, उद्दिष्टे आणि प्रत्यक्ष पायाभूत कार्याची औपचारिक घोषणा करण्यात आली.",
    },
    timelineTag: {
      en: "Nov 1 Saturday",
      mr: "१ नोव्हेंबर शनिवार",
    },
    timeDisplay: {
      en: "3:00 PM – 5:15 PM IST",
      mr: "दुपारी ३:०० ते संध्याकाळी ५:१५ IST",
    },
    dateDisplay: {
      en: "November 1, 2025",
      mr: "१ नोव्हेंबर २०२५",
    },
    startDate: "2025-11-01T15:00:00.000+05:30",
    endDate: "2025-11-01T17:15:00.000+05:30",
    location: {
      en: "Somaiya Vidyavihar University (riidl), Mumbai",
      mr: "सोमैय्या विद्याविहार विद्यापीठ (riidl), मुंबई",
      city: "Mumbai",
    },
    image: "/assets/events/mumbai-chapter.jpg",
    status: "past",
    category: "launch",
    badge: {
      en: "Chapter Launch",
      mr: "चॅप्टर शुभारंभ",
    },
    hosts: {
      en: "By Ashishkumar Chauhan & Shekhar Singh",
      mr: "आशिषकुमार चौहान आणि शेखर सिंग",
      list: [
        { name: "NSE", avatarText: "NSE", avatarColor: "#2563eb" },
        { name: "riidl", avatarText: "rd", avatarColor: "#d97706" },
      ],
    },
    highlights: {
      en: [
        "Formal announcement of KumbhDoot and its overarching population-scale vision",
        "Keynote addresses by Shri Ashishkumar Chauhan (MD & CEO, NSE) and Prof. Ramesh Raskar (MIT)",
        "Presentation of foundational research, open agentic protocols, and ecosystem roadmap",
      ],
      mr: [
        "कुंभदूतची संकल्पना, उद्दिष्टे आणि व्यापक दृष्टीकोनाची औपचारिक घोषणा",
        "श्री आशिषकुमार चौहान (MD आणि CEO, NSE) आणि प्रा. रमेश रास्कर (MIT) यांचे व्याख्यान",
        "पायाभूत संशोधन, ओपन एजंटिक प्रोटोकॉल आणि परिसंस्था विकासाचा आराखडा",
      ],
    },
  },
];

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'app.name': 'RasoiMitra',
    'app.subtitle': 'Your Kitchen Partner',
    'nav.dashboard': 'Dashboard',
    'nav.startup': 'Startup Mitra',
    'nav.community': 'Community Hub',
    'nav.signout': 'Sign Out',
    
    // Landing Page
    'landing.hero.title': 'Empowering Small Businesses with Intelligence',
    'landing.hero.subtitle': 'Smarter Decisions. Less Waste. More Profit.',
    'landing.cta.start': 'Get Started',
    'landing.cta.learn': 'Learn More',
    'landing.features.title': 'Why Choose RasoiMitra?',
    'landing.feature1.title': 'Smart Insights for Business Growth',
    'landing.feature1.desc': 'Get personalized recommendations powered by data analytics',
    'landing.feature2.title': 'Reduce Waste. Increase Profit',
    'landing.feature2.desc': 'Smart inventory management to minimize waste',
    'landing.feature3.title': 'Real-Time Customer Feedback',
    'landing.feature3.desc': 'Understand what your customers love',
    'landing.feature4.title': 'Tourism & Seasonal Trends',
    'landing.feature4.desc': 'Capitalize on tourist demand and festivals',
    
    // Dashboard
    'dashboard.title': 'Business Overview',
    'dashboard.sales': 'Daily Sales',
    'dashboard.waste': 'Waste %',
    'dashboard.topItem': 'Top Item',
    'dashboard.nextEvent': 'Next Event',
    'dashboard.aiAssistant': 'Smart Assistant',
    'dashboard.aiDesc': 'Get personalized advice',
    'dashboard.inventory': 'Inventory',
    'dashboard.inventoryDesc': 'Manage stock',
    'dashboard.reviews': 'Reviews',
    'dashboard.reviewsDesc': 'Customer feedback',
    'dashboard.community': 'Community',
    'dashboard.communityDesc': 'Connect with vendors',
    'dashboard.offers': 'Offers',
    'dashboard.offersDesc': 'Dynamic promotions',
    'dashboard.tourism': 'Tourism',
    'dashboard.tourismDesc': 'Location insights',
    
    // Startup Mitra
    'startup.title': 'Startup Mitra - Your Business Advisor',
    'startup.subtitle': 'Your 24x7 Growth Partner',
    'startup.menuSuggestions': 'Menu Suggestions',
    'startup.locationAdvice': 'Location Advice',
    'startup.supplierConnections': 'Supplier Connections',
    'startup.businessBasics': 'Business Basics',
    'startup.askQuestion': 'Ask anything about starting your business...',
    'startup.example1': 'What dishes should I sell in this area?',
    'startup.example2': 'Where should I set up my stall?',
    'startup.example3': 'How do I price my menu items?',
    
    // Community Hub
    'community.title': 'Community Hub',
    'community.subtitle': 'Exchange Ingredients & Build Connections',
    'community.requests': 'Ingredient Requests',
    'community.offers': 'Available Supplies',
    'community.postRequest': 'Post Request',
    'community.postOffer': 'Post Offer',
    'community.urgent': 'Urgent',
    'community.verified': 'Verified Seller',
    'community.contact': 'Contact Seller',
    'community.distance': 'km away',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.close': 'Close',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.loading': 'Loading...',
  },
  hi: {
    // Header
    'app.name': 'रसोईमित्र',
    'app.subtitle': 'आपका रसोई साथी',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.startup': 'स्टार्टअप मित्र',
    'nav.community': 'समुदाय केंद्र',
    'nav.signout': 'साइन आउट',
    
    // Landing Page
    'landing.hero.title': 'बुद्धिमत्ता से सशक्त छोटे व्यवसाय',
    'landing.hero.subtitle': 'स्मार्ट निर्णय। कम बर्बादी। अधिक लाभ।',
    'landing.cta.start': 'शुरू करें',
    'landing.cta.learn': 'और जानें',
    'landing.features.title': 'रसोईमित्र क्यों चुनें?',
    'landing.feature1.title': 'व्यवसाय विकास के लिए स्मार्ट अंतर्दृष्टि',
    'landing.feature1.desc': 'डेटा विश्लेषण द्वारा संचालित व्यक्तिगत सिफारिशें प्राप्त करें',
    'landing.feature2.title': 'बर्बादी कम करें। लाभ बढ़ाएं',
    'landing.feature2.desc': 'बर्बादी को कम करने के लिए स्मार्ट इन्वेंटरी प्रबंधन',
    'landing.feature3.title': 'रियल-टाइम ग्राहक प्रतिक्रिया',
    'landing.feature3.desc': 'समझें कि आपके ग्राहक क्या पसंद करते हैं',
    'landing.feature4.title': 'पर्यटन और मौसमी रुझान',
    'landing.feature4.desc': 'पर्यटक मांग और त्योहारों का लाभ उठाएं',
    
    // Dashboard
    'dashboard.title': 'व्यवसाय अवलोकन',
    'dashboard.sales': 'दैनिक बिक्री',
    'dashboard.waste': 'अपशिष्ट %',
    'dashboard.topItem': 'शीर्ष वस्तु',
    'dashboard.nextEvent': 'अगला कार्यक्रम',
    'dashboard.aiAssistant': 'स्मार्ट सहायक',
    'dashboard.aiDesc': 'व्यक्तिगत सलाह पाएं',
    'dashboard.inventory': 'इन्वेंटरी',
    'dashboard.inventoryDesc': 'स्टॉक प्रबंधित करें',
    'dashboard.reviews': 'समीक्षाएं',
    'dashboard.reviewsDesc': 'ग्राहक प्रतिक्रिया',
    'dashboard.community': 'समुदाय',
    'dashboard.communityDesc': 'विक्रेताओं से जुड़ें',
    'dashboard.offers': 'ऑफ़र',
    'dashboard.offersDesc': 'गतिशील प्रचार',
    'dashboard.tourism': 'पर्यटन',
    'dashboard.tourismDesc': 'स्थान अंतर्दृष्टि',
    
    // Startup Mitra
    'startup.title': 'स्टार्टअप मित्र - आपका व्यवसाय सलाहकार',
    'startup.subtitle': 'आपका 24x7 विकास साथी',
    'startup.menuSuggestions': 'मेनू सुझाव',
    'startup.locationAdvice': 'स्थान सलाह',
    'startup.supplierConnections': 'आपूर्तिकर्ता कनेक्शन',
    'startup.businessBasics': 'व्यवसाय मूल बातें',
    'startup.askQuestion': 'अपने व्यवसाय के बारे में कुछ भी पूछें...',
    'startup.example1': 'इस क्षेत्र में मुझे कौन से व्यंजन बेचने चाहिए?',
    'startup.example2': 'मुझे अपनी दुकान कहाँ स्थापित करनी चाहिए?',
    'startup.example3': 'मैं अपने मेनू आइटम की कीमत कैसे निर्धारित करूं?',
    
    // Community Hub
    'community.title': 'समुदाय केंद्र',
    'community.subtitle': 'सामग्री का आदान-प्रदान करें और संबंध बनाएं',
    'community.requests': 'सामग्री अनुरोध',
    'community.offers': 'उपलब्ध आपूर्ति',
    'community.postRequest': 'अनुरोध पोस्ट करें',
    'community.postOffer': 'ऑफर पोस्ट करें',
    'community.urgent': 'जरूरी',
    'community.verified': 'सत्यापित विक्रेता',
    'community.contact': 'विक्रेता से संपर्क करें',
    'community.distance': 'किमी दूर',
    
    // Common
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.submit': 'जमा करें',
    'common.close': 'बंद करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.loading': 'लोड हो रहा है...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

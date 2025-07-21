// Multilingual support for 16 Indian languages

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🔤' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🔤' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🔤' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🅰️' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🔤' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🔤' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🔤' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🔤' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', rtl: true },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🔤' },
  { code: 'raj', name: 'Rajasthani', nativeName: 'राजस्थानी', flag: '🔤' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', flag: '🔤' },
  { code: 'ha', name: 'Haryanvi', nativeName: 'हरियाणवी', flag: '🔤' },
];

// Translation keys for common UI elements
export const translations = {
  // Navigation
  home: {
    hi: 'होम',
    en: 'Home',
    mr: 'होम',
    gu: 'હોમ',
    pa: 'ਘਰ',
    bn: 'হোম',
    ta: 'முகப்பு',
    te: 'హోమ్',
    kn: 'ಮನೆ',
    ml: 'ഹോം',
    or: 'ହୋମ',
    ur: 'ہوم',
    as: 'ঘৰ',
    raj: 'घर',
    bho: 'घर',
    ha: 'घर'
  },
  cropDiagnosis: {
    hi: 'फसल निदान',
    en: 'Crop Diagnosis',
    mr: 'पिक निदान',
    gu: 'પાક નિદાન',
    pa: 'ਫਸਲ ਨਿਦਾਨ',
    bn: 'ফসল নির্ণয়',
    ta: 'பயிர் நோய் கண்டறிதல்',
    te: 'పంట నిర్ధారణ',
    kn: 'ಬೆಳೆ ನಿರ್ಣಯ',
    ml: 'വിള രോഗനിർണയം',
    or: 'ଫସଲ ନିର୍ଣ୍ଣୟ',
    ur: 'فصل کی تشخیص',
    as: 'শস্য নিৰ্ণয়',
    raj: 'फसल पहचान',
    bho: 'फसल पहचान',
    ha: 'फसल जांच'
  },
  market: {
    hi: 'बाजार',
    en: 'Market',
    mr: 'बाजार',
    gu: 'બજાર',
    pa: 'ਬਾਜ਼ਾਰ',
    bn: 'বাজার',
    ta: 'சந்தை',
    te: 'మార్కెట్',
    kn: 'ಮಾರುಕಟ್ಟೆ',
    ml: 'മാർക്കറ്റ്',
    or: 'ବଜାର',
    ur: 'بازار',
    as: 'বজাৰ',
    raj: 'बाजार',
    bho: 'बाजार',
    ha: 'बाजार'
  },
  soil: {
    hi: 'मिट्टी',
    en: 'Soil',
    mr: 'माती',
    gu: 'માટી',
    pa: 'ਮਿੱਟੀ',
    bn: 'মাটি',
    ta: 'மண்',
    te: 'మట్టి',
    kn: 'ಮಣ್ಣು',
    ml: 'മണ്ണ്',
    or: 'ମାଟି',
    ur: 'مٹی',
    as: 'মাটি',
    raj: 'माटी',
    bho: 'माटी',
    ha: 'मिट्टी'
  },
  community: {
    hi: 'समुदाय',
    en: 'Community',
    mr: 'समुदाय',
    gu: 'સમુદાય',
    pa: 'ਕਮਿਊਨਿਟੀ',
    bn: 'কমিউনিটি',
    ta: 'சமூகம்',
    te: 'కమ్యూనిటీ',
    kn: 'ಸಮುದಾಯ',
    ml: 'കമ്മ്യൂണിറ്റി',
    or: 'ସମ୍ପ୍ରଦାୟ',
    ur: 'کمیونٹی',
    as: 'সম্প্ৰদায়',
    raj: 'समुदाय',
    bho: 'समुदाय',
    ha: 'समुदाय'
  },
  cattle: {
    hi: 'पशुधन',
    en: 'Cattle',
    mr: 'गुरेढोरे',
    gu: 'પશુઓ',
    pa: 'ਪਸ਼ੂ',
    bn: 'গবাদি পশু',
    ta: 'கால்நடை',
    te: 'పశువులు',
    kn: 'ಪಶು',
    ml: 'കന്നുകാലി',
    or: 'ଗୋରୁ',
    ur: 'مویشی',
    as: 'গৰু',
    raj: 'गाय',
    bho: 'गाय',
    ha: 'गाय'
  },
  loans: {
    hi: 'ऋण',
    en: 'Loans',
    mr: 'कर्ज',
    gu: 'લોન',
    pa: 'ਲੋਨ',
    bn: 'ঋণ',
    ta: 'கடன்',
    te: 'రుణాలు',
    kn: 'ಸಾಲ',
    ml: 'വായ്പകൾ',
    or: 'ଋଣ',
    ur: 'قرض',
    as: 'ঋণ',
    raj: 'कर्जा',
    bho: 'कर्जा',
    ha: 'कर्जा'
  },
  // Common actions
  upload: {
    hi: 'अपलोड करें',
    en: 'Upload',
    mr: 'अपलोड करा',
    gu: 'અપલોડ કરો',
    pa: 'ਅੱਪਲੋਡ ਕਰੋ',
    bn: 'আপলোড করুন',
    ta: 'பதிவேற்றம்',
    te: 'అప్‌లోడ్',
    kn: 'ಅಪ್‌ಲೋಡ್',
    ml: 'അപ്‌ലോഡ്',
    or: 'ଅପଲୋଡ୍',
    ur: 'اپ لوڈ',
    as: 'আপলোড',
    raj: 'अपलोड',
    bho: 'अपलोड',
    ha: 'अपलोड'
  },
  camera: {
    hi: 'कैमरा',
    en: 'Camera',
    mr: 'कॅमेरा',
    gu: 'કૅમેરા',
    pa: 'ਕੈਮਰਾ',
    bn: 'ক্যামেরা',
    ta: 'கேமரா',
    te: 'కేమేరా',
    kn: 'ಕ್ಯಾಮೆರಾ',
    ml: 'ക്യാമറ',
    or: 'କ୍ୟାମେରା',
    ur: 'کیمرہ',
    as: 'কেমেৰা',
    raj: 'कैमरा',
    bho: 'कैमरा',
    ha: 'कैमरा'
  },
  gallery: {
    hi: 'गैलरी',
    en: 'Gallery',
    mr: 'गॅलरी',
    gu: 'ગૅલેરી',
    pa: 'ਗੈਲਰੀ',
    bn: 'গ্যালারি',
    ta: 'கேலரி',
    te: 'గ్యాలరీ',
    kn: 'ಗ್ಯಾಲರಿ',
    ml: 'ഗാലറി',
    or: 'ଗ୍ୟାଲେରୀ',
    ur: 'گیلری',
    as: 'গেলাৰী',
    raj: 'गैलरी',
    bho: 'गैलरी',
    ha: 'गैलरी'
  },
  selectLanguage: {
    hi: 'भाषा चुनें',
    en: 'Select Language',
    mr: 'भाषा निवडा',
    gu: 'ભાષા પસંદ કરો',
    pa: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    bn: 'ভাষা নির্বাচন করুন',
    ta: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    te: 'భాషను ఎంచుకోండి',
    kn: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    ml: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    or: 'ଭାଷା ବାଛନ୍ତୁ',
    ur: 'زبان منتخب کریں',
    as: 'ভাষা বাছক',
    raj: 'भाषा चुनो',
    bho: 'भाषा चुनीं',
    ha: 'भाषा चुनो'
  }
};

// Helper function to get translation
export const getTranslation = (key: keyof typeof translations, language: string): string => {
  const translationObj = translations[key];
  if (!translationObj) return key;
  
  return translationObj[language as keyof typeof translationObj] || translationObj.en || key;
};
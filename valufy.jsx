import { useState, useMemo, useEffect, useRef } from "react";
import {
  ChefHat, Check, ChevronLeft, Home, Camera, History as HistoryIcon,
  Settings as SettingsIcon, Sun, Moon, Globe, User, Flame, Clock, Sparkles, Activity,
} from "lucide-react";

/* ============================================================
   TRANSLATIONS
   ============================================================ */
const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
];

const DICT = {
  en: {
    appName: "ChefAI",
    nameTitle: "Welcome to ChefAI! What is your name?",
    nameSubtitle: "We'll use this to personalize your experience.",
    namePlaceholder: "Your name",
    continue: "Continue",
    languageTitle: "What is your language?",
    languageSubtitle: "We'll tailor the entire experience for you.",
    genderTitle: "What is your sex?",
    genderSubtitle: "Used only to personalize your nutrition.",
    male: "Male", female: "Female", other: "Other",
    acquisitionTitle: "Where did you hear about us?",
    acquisitionSubtitle: "Select 1 or 2 options.",
    src_youtube: "YouTube", src_instagram: "Instagram", src_tiktok: "TikTok",
    src_x: "X", src_google: "Google", src_facebook: "Facebook",
    src_friend: "Family or Friend", src_other: "Other",
    pastAppsTitle: "Have you tried other cooking apps?",
    yes: "Yes", no: "No",
    heightTitle: "What is your height?",
    weightTitle: "What is your weight?",
    dobTitle: "When were you born?",
    dobSubtitle: "Helps us calculate your ideal calories.",
    month: "Month", day: "Day", year: "Year",
    goalsTitle: "What is your goal?",
    goalsSubtitle: "This helps our AI match your desires. Select 1 to 3.",
    goal_loseWeight: "Lose Weight", goal_gainWeight: "Gain Weight",
    goal_maintain: "Maintain", goal_learnToCook: "Learn how to cook",
    goal_beHealthier: "Be healthier",
    dietTitle: "Do you have a diet?",
    diet_vegetarian: "Vegetarian", diet_pescatarian: "Pescatarian",
    diet_fastFood: "Fast Food", diet_carnivore: "Carnivore",
    diet_fruitarian: "Fruitarian", diet_none: "None",
    thankYouTitle: "Thank you for trusting us!",
    thankYouSubtitle: "Getting everything ready for you...",
    loaderTitle: "Customizing your info...",
    loaderSubtitle: "Our AI is crafting your personal nutrition plan.",
    briefTitle: "Your Daily Plan",
    briefSubtitle: "Based on your profile",
    caloriesPerDay: "Calories / day",
    protein: "Protein", carbs: "Carbs", fat: "Fat",
    heightLabel: "Height", weightLabel: "Weight", goalLabel: "Goal", dietLabel: "Diet",
    suggestedMeals: "Suggested Meals",
    authTitle: "You're all set!",
    authSubtitle: "Create an account to save your recipes and progress across devices.",
    signInGoogle: "Sign in with Google",
    skipForNow: "Skip for now",
    pricingTitle: "Choose your plan",
    pricingSubtitle: "Start cooking smarter today. Upgrade anytime.",
    noCreditCard: "No credit card required · Cancel anytime",
    tryFree: "Try for free", comingSoon: "Coming Soon",
    tab_home: "Home", tab_scan: "Scan", tab_history: "History", tab_settings: "Settings",
    welcomeBack: "Welcome back, {name}!",
    todaysRecipes: "Today's Recipes",
    calorieTracker: "Calorie Tracker",
    remaining: "remaining",
    of: "of",
    recentRecipes: "Recent Recipes",
    noRecipesYet: "No recipes yet — scan your fridge to get started.",
    today: "Today at",
    yesterday: "Yesterday at",
    scanTitle: "Show us your fridge",
    scanSubtitle: "Snap a photo or upload one from your gallery. We'll find the magic inside.",
    takePhoto: "Tap to scan or drop a photo",
    scanHelper: "Make sure the ingredients are well-lit and clearly visible for the best recipe ideas.",
    analyzing: "Our AI Chef is looking...",
    scanLoadingHelper: "Identifying every tomato, herb, and mystery jar in your fridge.",
    ingredientsFound: "Ingredients found",
    generateRecipe: "Generate my recipe",
    generating: "Cooking up your recipe...",
    ingredientsUsed: "Ingredients used",
    totalCalories: "Total calories",
    goodFor: "Good for your goal:",
    stepsLabel: "Steps",
    tipLabel: "Chef's tip",
    newScan: "Scan again",
    historyTitle: "Your Kitchen History",
    historySubtitle: "Every masterpiece you've created.",
    newRecipe: "New Recipe",
    statTotal: "Total Recipes",
    statCompleted: "Completed",
    statAvgPrep: "Avg Prep",
    statAvgCals: "Avg Cals",
    historyEmptyTitle: "No recipes yet",
    historyEmpty: "Scan your fridge to generate your first AI culinary masterpiece.",
    startCooking: "Start Cooking",
    cooked: "Cooked",
    settingsTitle: "Settings",
    languageLabel: "Language",
    nameLabel: "Name",
    themeLabel: "Theme",
    light: "Light", dark: "Dark",
    save: "Save changes",
    saved: "Saved",
  },
  fr: {
    appName: "ChefAI",
    nameTitle: "Bienvenue sur ChefAI ! Quel est votre prénom ?",
    nameSubtitle: "Nous l'utiliserons pour personnaliser votre expérience.",
    namePlaceholder: "Votre prénom",
    continue: "Continuer",
    languageTitle: "Quelle est votre langue ?",
    languageSubtitle: "Nous allons adapter toute l'expérience pour vous.",
    genderTitle: "Quel est votre sexe ?",
    genderSubtitle: "Utilisé uniquement pour personnaliser votre nutrition.",
    male: "Homme", female: "Femme", other: "Autre",
    acquisitionTitle: "Comment avez-vous entendu parler de nous ?",
    acquisitionSubtitle: "Sélectionnez 1 ou 2 options.",
    src_youtube: "YouTube", src_instagram: "Instagram", src_tiktok: "TikTok",
    src_x: "X", src_google: "Google", src_facebook: "Facebook",
    src_friend: "Famille ou ami", src_other: "Autre",
    pastAppsTitle: "Avez-vous déjà essayé d'autres applis de cuisine ?",
    yes: "Oui", no: "Non",
    heightTitle: "Quelle est votre taille ?",
    weightTitle: "Quel est votre poids ?",
    dobTitle: "Quelle est votre date de naissance ?",
    dobSubtitle: "Nous aide à calculer vos calories idéales.",
    month: "Mois", day: "Jour", year: "Année",
    goalsTitle: "Quel est votre objectif ?",
    goalsSubtitle: "Cela aide notre IA à répondre à vos envies. Sélectionnez 1 à 3.",
    goal_loseWeight: "Perdre du poids", goal_gainWeight: "Prendre du poids",
    goal_maintain: "Maintenir", goal_learnToCook: "Apprendre à cuisiner",
    goal_beHealthier: "Être en meilleure santé",
    dietTitle: "Suivez-vous un régime ?",
    diet_vegetarian: "Végétarien", diet_pescatarian: "Pescétarien",
    diet_fastFood: "Fast Food", diet_carnivore: "Carnivore",
    diet_fruitarian: "Fruitarien", diet_none: "Aucun",
    thankYouTitle: "Merci de votre confiance !",
    thankYouSubtitle: "Nous préparons tout pour vous...",
    loaderTitle: "Personnalisation en cours...",
    loaderSubtitle: "Notre IA crée votre plan nutritionnel personnel.",
    briefTitle: "Votre plan quotidien",
    briefSubtitle: "Basé sur votre profil",
    caloriesPerDay: "Calories / jour",
    protein: "Protéines", carbs: "Glucides", fat: "Lipides",
    heightLabel: "Taille", weightLabel: "Poids", goalLabel: "Objectif", dietLabel: "Régime",
    suggestedMeals: "Repas suggérés",
    authTitle: "Tout est prêt !",
    authSubtitle: "Créez un compte pour sauvegarder vos recettes sur tous vos appareils.",
    signInGoogle: "Se connecter avec Google",
    skipForNow: "Passer pour l'instant",
    pricingTitle: "Choisissez votre offre",
    pricingSubtitle: "Cuisinez plus intelligemment dès aujourd'hui. Changez d'offre à tout moment.",
    noCreditCard: "Aucune carte bancaire requise · Annulez à tout moment",
    tryFree: "Essayer gratuitement", comingSoon: "Bientôt disponible",
    tab_home: "Accueil", tab_scan: "Scanner", tab_history: "Historique", tab_settings: "Réglages",
    welcomeBack: "Content de vous revoir, {name} !",
    todaysRecipes: "Recettes du jour",
    calorieTracker: "Suivi des calories",
    remaining: "restantes",
    of: "sur",
    recentRecipes: "Recettes récentes",
    noRecipesYet: "Pas encore de recette — scannez votre frigo pour commencer.",
    today: "Aujourd'hui à",
    yesterday: "Hier à",
    scanTitle: "Montrez-nous votre frigo",
    scanSubtitle: "Prenez une photo ou importez-en une depuis votre galerie. On trouve la magie à l'intérieur.",
    takePhoto: "Touchez pour scanner ou déposer une photo",
    scanHelper: "Assurez-vous que les ingrédients sont bien éclairés et visibles pour de meilleures idées de recettes.",
    analyzing: "Notre chef IA observe...",
    scanLoadingHelper: "Identification de chaque tomate, herbe et pot mystère de votre frigo.",
    ingredientsFound: "Ingrédients détectés",
    generateRecipe: "Générer ma recette",
    generating: "Préparation de votre recette...",
    ingredientsUsed: "Ingrédients utilisés",
    totalCalories: "Calories totales",
    goodFor: "Idéal pour votre objectif :",
    stepsLabel: "Étapes",
    tipLabel: "Astuce du chef",
    newScan: "Scanner à nouveau",
    historyTitle: "Votre historique culinaire",
    historySubtitle: "Chaque chef-d'œuvre que vous avez créé.",
    newRecipe: "Nouvelle recette",
    statTotal: "Recettes totales",
    statCompleted: "Terminées",
    statAvgPrep: "Prép. moy.",
    statAvgCals: "Cal. moy.",
    historyEmptyTitle: "Pas encore de recette",
    historyEmpty: "Scannez votre frigo pour générer votre premier chef-d'œuvre culinaire IA.",
    startCooking: "Commencer à cuisiner",
    cooked: "Cuisiné",
    settingsTitle: "Réglages",
    languageLabel: "Langue",
    nameLabel: "Prénom",
    themeLabel: "Thème",
    light: "Clair", dark: "Sombre",
    save: "Enregistrer",
    saved: "Enregistré",
  },
  es: {
    appName: "ChefAI",
    nameTitle: "¡Bienvenido a ChefAI! ¿Cómo te llamas?",
    nameSubtitle: "Lo usaremos para personalizar tu experiencia.",
    namePlaceholder: "Tu nombre",
    continue: "Continuar",
    languageTitle: "¿Cuál es tu idioma?",
    languageSubtitle: "Adaptaremos toda la experiencia para ti.",
    genderTitle: "¿Cuál es tu sexo?",
    genderSubtitle: "Se usa solo para personalizar tu nutrición.",
    male: "Hombre", female: "Mujer", other: "Otro",
    acquisitionTitle: "¿Dónde oíste hablar de nosotros?",
    acquisitionSubtitle: "Selecciona 1 o 2 opciones.",
    src_youtube: "YouTube", src_instagram: "Instagram", src_tiktok: "TikTok",
    src_x: "X", src_google: "Google", src_facebook: "Facebook",
    src_friend: "Familia o amigo", src_other: "Otro",
    pastAppsTitle: "¿Has probado otras apps de cocina?",
    yes: "Sí", no: "No",
    heightTitle: "¿Cuál es tu estatura?",
    weightTitle: "¿Cuál es tu peso?",
    dobTitle: "¿Cuándo naciste?",
    dobSubtitle: "Nos ayuda a calcular tus calorías ideales.",
    month: "Mes", day: "Día", year: "Año",
    goalsTitle: "¿Cuál es tu objetivo?",
    goalsSubtitle: "Esto ayuda a nuestra IA a adaptarse a ti. Elige de 1 a 3.",
    goal_loseWeight: "Perder peso", goal_gainWeight: "Ganar peso",
    goal_maintain: "Mantener", goal_learnToCook: "Aprender a cocinar",
    goal_beHealthier: "Estar más sano",
    dietTitle: "¿Sigues alguna dieta?",
    diet_vegetarian: "Vegetariano", diet_pescatarian: "Pescetariano",
    diet_fastFood: "Comida rápida", diet_carnivore: "Carnívoro",
    diet_fruitarian: "Frutariano", diet_none: "Ninguna",
    thankYouTitle: "¡Gracias por confiar en nosotros!",
    thankYouSubtitle: "Preparando todo para ti...",
    loaderTitle: "Personalizando tu información...",
    loaderSubtitle: "Nuestra IA está creando tu plan nutricional.",
    briefTitle: "Tu plan diario",
    briefSubtitle: "Basado en tu perfil",
    caloriesPerDay: "Calorías / día",
    protein: "Proteína", carbs: "Carbohidratos", fat: "Grasa",
    heightLabel: "Estatura", weightLabel: "Peso", goalLabel: "Objetivo", dietLabel: "Dieta",
    suggestedMeals: "Comidas sugeridas",
    authTitle: "¡Todo listo!",
    authSubtitle: "Crea una cuenta para guardar tus recetas en todos tus dispositivos.",
    signInGoogle: "Iniciar sesión con Google",
    skipForNow: "Omitir por ahora",
    pricingTitle: "Elige tu plan",
    pricingSubtitle: "Empieza a cocinar de forma más inteligente hoy. Cambia cuando quieras.",
    noCreditCard: "No se requiere tarjeta · Cancela cuando quieras",
    tryFree: "Probar gratis", comingSoon: "Próximamente",
    tab_home: "Inicio", tab_scan: "Escanear", tab_history: "Historial", tab_settings: "Ajustes",
    welcomeBack: "¡Bienvenido de nuevo, {name}!",
    todaysRecipes: "Recetas de hoy",
    calorieTracker: "Control de calorías",
    remaining: "restantes",
    of: "de",
    recentRecipes: "Recetas recientes",
    noRecipesYet: "Aún no hay recetas — escanea tu refrigerador para empezar.",
    today: "Hoy a las",
    yesterday: "Ayer a las",
    scanTitle: "Muéstranos tu refrigerador",
    scanSubtitle: "Toma una foto o sube una desde tu galería. Encontraremos la magia dentro.",
    takePhoto: "Toca para escanear o suelta una foto",
    scanHelper: "Asegúrate de que los ingredientes estén bien iluminados y visibles para mejores ideas de recetas.",
    analyzing: "Nuestro chef IA está observando...",
    scanLoadingHelper: "Identificando cada tomate, hierba y frasco misterioso de tu refrigerador.",
    ingredientsFound: "Ingredientes encontrados",
    generateRecipe: "Generar mi receta",
    generating: "Preparando tu receta...",
    ingredientsUsed: "Ingredientes usados",
    totalCalories: "Calorías totales",
    goodFor: "Ideal para tu objetivo:",
    stepsLabel: "Pasos",
    tipLabel: "Consejo del chef",
    newScan: "Escanear de nuevo",
    historyTitle: "Tu historial culinario",
    historySubtitle: "Cada obra maestra que has creado.",
    newRecipe: "Nueva receta",
    statTotal: "Recetas totales",
    statCompleted: "Completadas",
    statAvgPrep: "Prep. prom.",
    statAvgCals: "Cal. prom.",
    historyEmptyTitle: "Aún no hay recetas",
    historyEmpty: "Escanea tu refrigerador para generar tu primera obra maestra culinaria con IA.",
    startCooking: "Empezar a cocinar",
    cooked: "Cocinado",
    settingsTitle: "Ajustes",
    languageLabel: "Idioma",
    nameLabel: "Nombre",
    themeLabel: "Tema",
    light: "Claro", dark: "Oscuro",
    save: "Guardar cambios",
    saved: "Guardado",
  },
  ko: {
    appName: "ChefAI",
    nameTitle: "ChefAI에 오신 걸 환영합니다! 이름이 무엇인가요?",
    nameSubtitle: "경험을 맞춤화하는 데 사용됩니다.",
    namePlaceholder: "이름",
    continue: "계속하기",
    languageTitle: "사용하시는 언어는 무엇인가요?",
    languageSubtitle: "전체 경험을 맞춤화해 드릴게요.",
    genderTitle: "성별이 어떻게 되나요?",
    genderSubtitle: "영양 정보 맞춤화에만 사용됩니다.",
    male: "남성", female: "여성", other: "기타",
    acquisitionTitle: "저희를 어떻게 알게 되셨나요?",
    acquisitionSubtitle: "1~2개를 선택해 주세요.",
    src_youtube: "유튜브", src_instagram: "인스타그램", src_tiktok: "틱톡",
    src_x: "X", src_google: "구글", src_facebook: "페이스북",
    src_friend: "가족 또는 친구", src_other: "기타",
    pastAppsTitle: "다른 요리 앱을 사용해 보셨나요?",
    yes: "예", no: "아니요",
    heightTitle: "키가 어떻게 되나요?",
    weightTitle: "몸무게가 어떻게 되나요?",
    dobTitle: "생년월일이 어떻게 되나요?",
    dobSubtitle: "적정 칼로리 계산에 도움이 됩니다.",
    month: "월", day: "일", year: "년",
    goalsTitle: "목표가 무엇인가요?",
    goalsSubtitle: "AI가 원하는 것에 맞출 수 있도록 도와줘요. 1~3개 선택.",
    goal_loseWeight: "체중 감량", goal_gainWeight: "체중 증가",
    goal_maintain: "유지", goal_learnToCook: "요리 배우기",
    goal_beHealthier: "더 건강해지기",
    dietTitle: "식단을 따르고 계신가요?",
    diet_vegetarian: "채식", diet_pescatarian: "페스코 채식",
    diet_fastFood: "패스트푸드", diet_carnivore: "육식",
    diet_fruitarian: "과일식", diet_none: "없음",
    thankYouTitle: "신뢰해 주셔서 감사합니다!",
    thankYouSubtitle: "모든 것을 준비하고 있어요...",
    loaderTitle: "정보를 맞춤화하는 중...",
    loaderSubtitle: "AI가 개인 맞춤 영양 플랜을 만들고 있어요.",
    briefTitle: "나의 데일리 플랜",
    briefSubtitle: "프로필을 기반으로 합니다",
    caloriesPerDay: "일일 칼로리",
    protein: "단백질", carbs: "탄수화물", fat: "지방",
    heightLabel: "키", weightLabel: "몸무게", goalLabel: "목표", dietLabel: "식단",
    suggestedMeals: "추천 식사",
    authTitle: "준비가 완료됐어요!",
    authSubtitle: "계정을 만들어 모든 기기에서 레시피와 진행 상황을 저장하세요.",
    signInGoogle: "구글로 로그인",
    skipForNow: "나중에 하기",
    pricingTitle: "요금제를 선택하세요",
    pricingSubtitle: "오늘부터 더 똑똑하게 요리하세요. 언제든 변경 가능해요.",
    noCreditCard: "신용카드 필요 없음 · 언제든 취소 가능",
    tryFree: "무료로 시작하기", comingSoon: "출시 예정",
    tab_home: "홈", tab_scan: "스캔", tab_history: "기록", tab_settings: "설정",
    welcomeBack: "다시 오신 걸 환영해요, {name}님!",
    todaysRecipes: "오늘의 레시피",
    calorieTracker: "칼로리 트래커",
    remaining: "남음",
    of: "/",
    recentRecipes: "최근 레시피",
    noRecipesYet: "아직 레시피가 없어요 — 냉장고를 스캔해 보세요.",
    today: "오늘",
    yesterday: "어제",
    scanTitle: "냉장고를 보여주세요",
    scanSubtitle: "사진을 찍거나 갤러리에서 업로드하세요. 안에 숨은 마법을 찾아드릴게요.",
    takePhoto: "탭해서 스캔하거나 사진을 놓으세요",
    scanHelper: "최고의 레시피 아이디어를 위해 재료가 잘 보이고 밝게 촬영되었는지 확인하세요.",
    analyzing: "AI 셰프가 살펴보는 중...",
    scanLoadingHelper: "냉장고 속 토마토, 허브, 정체불명의 병까지 모두 확인하는 중이에요.",
    ingredientsFound: "발견된 재료",
    generateRecipe: "레시피 생성하기",
    generating: "레시피를 준비하는 중...",
    ingredientsUsed: "사용된 재료",
    totalCalories: "총 칼로리",
    goodFor: "목표에 적합:",
    stepsLabel: "조리 단계",
    tipLabel: "셰프의 팁",
    newScan: "다시 스캔하기",
    historyTitle: "나의 요리 기록",
    historySubtitle: "당신이 만든 모든 걸작들.",
    newRecipe: "새 레시피",
    statTotal: "총 레시피",
    statCompleted: "완료됨",
    statAvgPrep: "평균 준비",
    statAvgCals: "평균 칼로리",
    historyEmptyTitle: "아직 레시피가 없어요",
    historyEmpty: "냉장고를 스캔해서 첫 AI 요리 걸작을 만들어보세요.",
    startCooking: "요리 시작하기",
    cooked: "완료",
    settingsTitle: "설정",
    languageLabel: "언어",
    nameLabel: "이름",
    themeLabel: "테마",
    light: "라이트", dark: "다크",
    save: "변경사항 저장",
    saved: "저장됨",
  },
};

const MONTH_NAMES = {
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  fr: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
  es: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
  ko: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
};

function useT(lang) {
  return useMemo(() => {
    const dict = DICT[lang] || DICT.en;
    return (key, vars) => {
      let str = dict[key] ?? DICT.en[key] ?? key;
      if (vars) Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
      return str;
    };
  }, [lang]);
}

/* ============================================================
   THEME
   ============================================================ */
const THEME = {
  light: {
    bg: "#FBFAF5", card: "#FFFFFF", text: "#2A211A", muted: "#8A7F72",
    border: "#EFE8DA", primary: "#2FA360", primaryText: "#FFFFFF",
    secondary: "#F0A526", chipBg: "#FFFFFF", inputBg: "#FFFFFF",
    trackBg: "#EFE8DA", navBg: "rgba(255,255,255,0.9)",
    accent: "#E8823A", destructive: "#E5484D",
  },
  dark: {
    bg: "#1C1613", card: "#251E19", text: "#F3EDE2", muted: "#B2A497",
    border: "#362C24", primary: "#33B26B", primaryText: "#0F0D0B",
    secondary: "#F2AE3D", chipBg: "#251E19", inputBg: "#251E19",
    trackBg: "#362C24", navBg: "rgba(28,22,19,0.92)",
    accent: "#ED9455", destructive: "#F26B6F",
  },
};

/* ============================================================
   HELPERS
   ============================================================ */
function calcNutrition(d) {
  const age = Math.max(1, 2026 - d.birthYear);
  let bmr = d.gender === "Female"
    ? 10 * d.weightKg + 6.25 * d.heightCm - 5 * age - 161
    : 10 * d.weightKg + 6.25 * d.heightCm - 5 * age + 5;
  let cal = bmr * 1.375;
  if (d.goals.includes("loseWeight")) cal -= 500;
  else if (d.goals.includes("gainWeight")) cal += 300;
  cal = Math.max(1200, Math.round(cal));
  return {
    calories: cal,
    protein: Math.round((cal * 0.3) / 4),
    carbs: Math.round((cal * 0.4) / 4),
    fat: Math.round((cal * 0.3) / 9),
  };
}

function cmToFt(cm) {
  const totalIn = cm / 2.54;
  return `${Math.floor(totalIn / 12)}' ${Math.round(totalIn % 12)}"`;
}
function kgToLbs(kg) { return `${Math.round(kg * 2.205)} lbs`; }

const MEAL_POOLS = {
  vegetarian: [
    { emoji: "🥗", name: "Veggie Buddha Bowl", bg: "#FCE4EC", darkBg: "#3A2530" },
    { emoji: "🍅", name: "Caprese Salad", bg: "#DCF3FA", darkBg: "#1F343A" },
    { emoji: "🍄", name: "Mushroom Risotto", bg: "#FFF6D9", darkBg: "#3A3320" },
    { emoji: "🧆", name: "Falafel Wrap", bg: "#EAE6FB", darkBg: "#2A2540" },
    { emoji: "🥬", name: "Veggie Stir-Fry", bg: "#E4F5E1", darkBg: "#1F3A24" },
  ],
  pescatarian: [
    { emoji: "🐟", name: "Grilled Salmon Bowl", bg: "#DCF3FA", darkBg: "#1F343A" },
    { emoji: "🌮", name: "Shrimp Tacos", bg: "#FFF6D9", darkBg: "#3A3320" },
    { emoji: "🍣", name: "Tuna Poke Bowl", bg: "#FCE4EC", darkBg: "#3A2530" },
    { emoji: "🦐", name: "Garlic Butter Shrimp", bg: "#EAE6FB", darkBg: "#2A2540" },
    { emoji: "🥘", name: "Seafood Paella", bg: "#E4F5E1", darkBg: "#1F3A24" },
  ],
  fastFood: [
    { emoji: "🍔", name: "Loaded Cheeseburger", bg: "#FFF6D9", darkBg: "#3A3320" },
    { emoji: "🍗", name: "Crispy Chicken Sandwich", bg: "#FCE4EC", darkBg: "#3A2530" },
    { emoji: "🍟", name: "Loaded Fries", bg: "#DCF3FA", darkBg: "#1F343A" },
    { emoji: "🍕", name: "Pepperoni Pizza", bg: "#EAE6FB", darkBg: "#2A2540" },
    { emoji: "🌭", name: "Chili Cheese Dog", bg: "#E4F5E1", darkBg: "#1F3A24" },
  ],
  carnivore: [
    { emoji: "🥩", name: "Grilled Ribeye", bg: "#FCE4EC", darkBg: "#3A2530" },
    { emoji: "🍗", name: "BBQ Chicken Thighs", bg: "#FFF6D9", darkBg: "#3A3320" },
    { emoji: "🍢", name: "Beef Skewers", bg: "#DCF3FA", darkBg: "#1F343A" },
    { emoji: "🥓", name: "Bacon-Wrapped Chicken", bg: "#EAE6FB", darkBg: "#2A2540" },
    { emoji: "🐖", name: "Herb-Crusted Pork Chops", bg: "#E4F5E1", darkBg: "#1F3A24" },
  ],
  fruitarian: [
    { emoji: "🍍", name: "Tropical Fruit Bowl", bg: "#FFF6D9", darkBg: "#3A3320" },
    { emoji: "🥭", name: "Mango Smoothie Bowl", bg: "#FCE4EC", darkBg: "#3A2530" },
    { emoji: "🍓", name: "Berry Parfait", bg: "#DCF3FA", darkBg: "#1F343A" },
    { emoji: "🍊", name: "Citrus Salad", bg: "#EAE6FB", darkBg: "#2A2540" },
    { emoji: "🍇", name: "Mixed Berry Bowl", bg: "#E4F5E1", darkBg: "#1F3A24" },
  ],
  none: [
    { emoji: "🥗", name: "Seasonal Salad", bg: "#FCE4EC", darkBg: "#3A2530" },
    { emoji: "🍝", name: "Healthy Pasta", bg: "#FFF6D9", darkBg: "#3A3320" },
    { emoji: "🥦", name: "Grilled Veggies", bg: "#DCF3FA", darkBg: "#1F343A" },
    { emoji: "🍗", name: "Chicken Stir-Fry", bg: "#EAE6FB", darkBg: "#2A2540" },
    { emoji: "🍳", name: "Veggie Omelet", bg: "#E4F5E1", darkBg: "#1F3A24" },
  ],
};
const GOAL_EXTRA_MEALS = {
  loseWeight: [{ emoji: "🥣", name: "Light Broth Soup", bg: "#DCF3FA", darkBg: "#1F343A" }],
  gainWeight: [{ emoji: "🍚", name: "Protein Rice Bowl", bg: "#FFF6D9", darkBg: "#3A3320" }],
  learnToCook: [{ emoji: "👨‍🍳", name: "Beginner's One-Pan Meal", bg: "#EAE6FB", darkBg: "#2A2540" }],
};

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h * 31 + str.charCodeAt(i)) >>> 0; }
  return h;
}

function getSuggestedMeals(diet, goals) {
  const pool = [...(MEAL_POOLS[diet] || MEAL_POOLS.none)];
  const goal = goals && goals[0];
  if (goal && GOAL_EXTRA_MEALS[goal]) pool.push(...GOAL_EXTRA_MEALS[goal]);
  const seed = hashSeed(`${diet}-${(goals || []).join(",")}`);
  // deterministic shuffle based on seed so the same profile always sees the same 3 meals
  const shuffled = pool
    .map((m, i) => ({ m, k: (seed * (i + 7)) % 997 }))
    .sort((a, b) => a.k - b.k)
    .map((x) => x.m);
  return shuffled.slice(0, 3);
}

const MOCK_INGREDIENTS = ["Eggs", "Cheddar cheese", "Bell pepper", "Spinach", "Tomatoes"];

function makeMockRecipe(id, goal) {
  const recipes = [
    { name: "Mediterranean Veggie Frittata", cal: 420, prep: 18, tip: "Let the frittata rest 2 minutes before slicing — it firms up the center." },
    { name: "Spinach & Tomato Skillet Eggs", cal: 360, prep: 14, tip: "Toast your bread while the eggs cook to save time." },
    { name: "Creamy Pepper & Cheddar Omelet", cal: 480, prep: 12, tip: "Low heat keeps eggs soft and prevents rubbery edges." },
  ];
  const r = recipes[id % recipes.length];
  return {
    id,
    name: r.name,
    calories: r.cal,
    prepTime: r.prep,
    tip: r.tip,
    ingredients: MOCK_INGREDIENTS,
    steps: [
      "Whisk the eggs with a splash of water, salt and pepper.",
      "Sauté the chopped vegetables in a hot skillet with olive oil for 3-4 minutes.",
      "Pour the eggs over the vegetables and cook on low heat until just set.",
      "Top with cheddar cheese, cover, and cook 2 more minutes until melted.",
    ],
    goal,
    isCompleted: false,
    createdAt: new Date(),
  };
}

function formatTime(dateStr, t) {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yest = new Date(now); yest.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yest.toDateString();
  const time = date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  if (isToday) return `${t("today")} ${time}`;
  if (isYesterday) return `${t("yesterday")} ${time}`;
  return date.toLocaleDateString();
}

/* ============================================================
   SMALL UI PRIMITIVES
   ============================================================ */
function Chip({ label, selected, onClick, emoji, disabled, theme }) {
  return (
    <button
      className={`hover-outline${selected ? " is-selected" : ""}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        "--accent": theme.primary,
        display: "flex", alignItems: "center", gap: 10, padding: "12px 18px",
        borderRadius: 16, border: `2px solid ${selected ? theme.primary : theme.border}`,
        background: selected ? theme.primary : theme.chipBg,
        color: selected ? theme.primaryText : theme.text,
        fontWeight: 600, fontSize: 14, opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer", transition: "all .15s",
        transform: "scale(1)",
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.95)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {emoji && <span style={{ fontSize: 18 }}>{emoji}</span>}
      <span>{label}</span>
      {selected && <Check style={{ width: 14, height: 14 }} />}
    </button>
  );
}

function BigCard({ label, emoji, selected, onClick, theme }) {
  return (
    <button
      className={`hover-outline${selected ? " is-selected" : ""}`}
      onClick={onClick}
      style={{
        "--accent": theme.primary,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        padding: "26px 12px", borderRadius: 20, width: "100%",
        border: `2px solid ${selected ? theme.primary : theme.border}`,
        background: selected ? theme.primary : theme.card,
        color: selected ? theme.primaryText : theme.text,
        fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all .15s",
        transform: "scale(1)",
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.96)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      <span style={{ fontSize: 34 }}>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}

function AnimatedSlider({ theme, value, min, max, unit, onChange, displayFn }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 52, fontWeight: 700, color: theme.primary, fontVariantNumeric: "tabular-nums" }}>
          {value}<span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 22, opacity: 0.55 }}>{unit}</span>
        </div>
        <div style={{ marginTop: 4, opacity: 0.6, fontWeight: 600, fontSize: 14 }}>{displayFn(value)}</div>
      </div>
      <div style={{ width: "100%", position: "relative" }}>
        <div style={{ height: 12, borderRadius: 99, background: theme.trackBg, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, borderRadius: 99, background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` }} />
        </div>
        <input
          type="range" min={min} max={max} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: "absolute", inset: 0, width: "100%", height: 12, opacity: 0, cursor: "pointer" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: 12, fontWeight: 600, opacity: 0.5 }}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function WheelPicker({ theme, items, selectedIndex, onSelect }) {
  const ref = useRef(null);
  const ITEM_H = 44;
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const rafRef = useRef(null);
  const lastTop = useRef(null);
  const stableFrames = useRef(0);
  const activeIndexRef = useRef(selectedIndex);
  const isPointerDown = useRef(false);
  activeIndexRef.current = activeIndex;

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = selectedIndex * ITEM_H;
    setActiveIndex(selectedIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loop = () => {
      const el = ref.current;
      if (el) {
        const top = el.scrollTop;
        const maxTop = (items.length - 1) * ITEM_H;
        const clamped = Math.max(0, Math.min(maxTop, top));
        const idx = Math.max(0, Math.min(items.length - 1, Math.round(clamped / ITEM_H)));
        if (idx !== activeIndexRef.current) setActiveIndex(idx);

        if (!isPointerDown.current) {
          if (lastTop.current !== null && Math.abs(lastTop.current - top) < 0.4) {
            stableFrames.current += 1;
          } else {
            stableFrames.current = 0;
          }
          if (stableFrames.current === 6) {
            const snapTop = idx * ITEM_H;
            if (Math.abs(top - snapTop) > 0.5) {
              el.scrollTo({ top: snapTop, behavior: "smooth" });
            }
            onSelect(idx);
          }
        } else {
          stableFrames.current = 0;
        }
        lastTop.current = top;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const handleClick = (i) => {
    setActiveIndex(i);
    stableFrames.current = 0;
    onSelect(i);
    ref.current?.scrollTo({ top: i * ITEM_H, behavior: "smooth" });
  };

  const markDown = () => { isPointerDown.current = true; stableFrames.current = 0; };
  const markUp = () => { isPointerDown.current = false; stableFrames.current = 0; };

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, height: 5 * ITEM_H }}>
      <div style={{
        position: "absolute", left: 4, right: 4, top: 2 * ITEM_H, height: ITEM_H,
        background: theme.primary, borderRadius: 12, pointerEvents: "none", zIndex: 1,
        boxShadow: `0 2px 8px ${theme.primary}55`,
      }} />
      <div
        ref={ref}
        onTouchStart={markDown} onTouchEnd={markUp} onTouchCancel={markUp}
        onPointerDown={markDown} onPointerUp={markUp} onPointerCancel={markUp} onPointerLeave={markUp}
        onMouseDown={markDown} onMouseUp={markUp} onMouseLeave={markUp}
        style={{ height: "100%", overflowY: "scroll", scrollSnapType: "y proximity", scrollbarWidth: "none", position: "relative", zIndex: 2, WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
      >
        <div style={{ height: 2 * ITEM_H }} />
        {items.map((item, i) => {
          const dist = Math.abs(i - activeIndex);
          const isActive = dist === 0;
          return (
            <div
              key={i}
              onClick={() => handleClick(i)}
              style={{
                height: ITEM_H, scrollSnapAlign: "center", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", userSelect: "none", fontWeight: isActive ? 700 : 600,
                fontSize: isActive ? 17 : dist === 1 ? 14 : 12,
                color: isActive ? theme.primaryText : theme.text,
                opacity: isActive ? 1 : dist === 1 ? 0.45 : 0.2,
                transition: "color .15s, font-size .15s, opacity .15s",
                position: "relative", zIndex: 3,
              }}
            >
              {item}
            </div>
          );
        })}
        <div style={{ height: 2 * ITEM_H }} />
      </div>
      <div style={{ position: "absolute", top: 0, insetInline: 0, height: 2 * ITEM_H, background: `linear-gradient(${theme.card}, transparent)`, pointerEvents: "none", zIndex: 4 }} />
      <div style={{ position: "absolute", bottom: 0, insetInline: 0, height: 2 * ITEM_H, background: `linear-gradient(${theme.card}00, ${theme.card})`, pointerEvents: "none", zIndex: 4 }} />
    </div>
  );
}

function StepWrapper({ title, subtitle, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, paddingTop: 8 }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: 0, marginBottom: 6 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 14, opacity: 0.65, margin: 0 }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

function ProgressBar({ step, total, theme }) {
  const pct = (step / (total - 1)) * 100;
  return (
    <div style={{ flex: 1, height: 6, borderRadius: 99, background: theme.trackBg, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: theme.primary, borderRadius: 99, transition: "width .3s" }} />
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, theme }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%", padding: "16px", borderRadius: 99, border: "none",
        background: theme.primary, color: theme.primaryText, fontWeight: 700,
        fontSize: 16, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {children}
    </button>
  );
}

/* ============================================================
   ONBOARDING FLOW
   ============================================================ */
const TOTAL_MAIN_STEPS = 10; // steps 0..9 shown in progress bar (Name -> Diet)

function OnboardingFlow({ theme, onFinish }) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const goToStep = (next) => { setDir(next > step ? 1 : -1); setStep(next); };
  const [data, setData] = useState({
    name: "", language: "en", gender: "", acquisition: [], hadOtherApps: "",
    heightCm: 170, weightKg: 70, birthMonth: 5, birthDay: 15, birthYear: 1995,
    goals: [], diet: "",
  });
  const t = useT(data.language);
  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  useEffect(() => {
    if (step === 10) { const timer = setTimeout(() => setStep(11), 1800); return () => clearTimeout(timer); }
    if (step === 11) { const timer = setTimeout(() => setStep(12), 2400); return () => clearTimeout(timer); }
  }, [step]);

  const canContinue = () => {
    switch (step) {
      case 0: return data.name.trim().length > 0;
      case 1: return !!data.language;
      case 2: return !!data.gender;
      case 3: return data.acquisition.length >= 1;
      case 4: return !!data.hadOtherApps;
      case 8: return data.goals.length >= 1;
      case 9: return !!data.diet;
      default: return true;
    }
  };

  const nutrition = calcNutrition(data);
  const months = [1,2,3,4,5,6,7,8,9,10,11,12];
  const monthNames = MONTH_NAMES[data.language] || MONTH_NAMES.en;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 80 }, (_, i) => 2026 - i);

  const selectStyle = {
    padding: "10px 12px", borderRadius: 12, border: `1px solid ${theme.border}`,
    background: theme.inputBg, color: theme.text, fontWeight: 600, fontSize: 14,
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepWrapper title={t("nameTitle")} subtitle={t("nameSubtitle")}>
            <div style={{ width: "100%", maxWidth: 340, display: "flex", alignItems: "center", gap: 10,
              border: `2px solid ${theme.border}`, borderRadius: 16, padding: "14px 18px", background: theme.inputBg }}>
              <User style={{ width: 18, height: 18, opacity: 0.5 }} />
              <input
                autoFocus value={data.name} placeholder={t("namePlaceholder")}
                onChange={(e) => update("name", e.target.value)}
                style={{ border: "none", outline: "none", background: "transparent", color: theme.text, fontSize: 16, fontWeight: 600, width: "100%" }}
              />
            </div>
          </StepWrapper>
        );
      case 1:
        return (
          <StepWrapper title={t("languageTitle")} subtitle={t("languageSubtitle")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {LANGS.map((l) => (
                <Chip key={l.code} label={l.label} emoji={l.flag} theme={theme}
                  selected={data.language === l.code} onClick={() => update("language", l.code)} />
              ))}
            </div>
          </StepWrapper>
        );
      case 2:
        return (
          <StepWrapper title={t("genderTitle")} subtitle={t("genderSubtitle")}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, width: "100%", maxWidth: 340 }}>
              {[["Male","👨",t("male")],["Female","👩",t("female")],["Other","🧑",t("other")]].map(([id,e,label]) => (
                <BigCard key={id} theme={theme} label={label} emoji={e} selected={data.gender===id} onClick={()=>update("gender",id)} />
              ))}
            </div>
          </StepWrapper>
        );
      case 3: {
        const sources = [["youtube","▶️"],["instagram","📸"],["tiktok","🎵"],["x","✖️"],["google","🔍"],["facebook","📘"],["friend","👫"],["other","💬"]];
        return (
          <StepWrapper title={t("acquisitionTitle")} subtitle={t("acquisitionSubtitle")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {sources.map(([id,e]) => (
                <Chip key={id} theme={theme} emoji={e} label={t(`src_${id}`)}
                  selected={data.acquisition.includes(id)}
                  disabled={!data.acquisition.includes(id) && data.acquisition.length>=2}
                  onClick={() => update("acquisition", data.acquisition.includes(id)
                    ? data.acquisition.filter(x=>x!==id)
                    : [...data.acquisition, id].slice(0,2))} />
              ))}
            </div>
          </StepWrapper>
        );
      }
      case 4:
        return (
          <StepWrapper title={t("pastAppsTitle")}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, width: "100%", maxWidth: 300 }}>
              {[["Yes","✅",t("yes")],["No","❌",t("no")]].map(([id,e,label]) => (
                <BigCard key={id} theme={theme} label={label} emoji={e} selected={data.hadOtherApps===id} onClick={()=>update("hadOtherApps",id)} />
              ))}
            </div>
          </StepWrapper>
        );
      case 5:
        return (
          <StepWrapper title={t("heightTitle")}>
            <AnimatedSlider theme={theme} value={data.heightCm} min={120} max={220} unit=" cm"
              onChange={(v)=>update("heightCm", v)} displayFn={cmToFt} />
          </StepWrapper>
        );
      case 6:
        return (
          <StepWrapper title={t("weightTitle")}>
            <AnimatedSlider theme={theme} value={data.weightKg} min={30} max={200} unit=" kg"
              onChange={(v)=>update("weightKg", v)} displayFn={kgToLbs} />
          </StepWrapper>
        );
      case 7:
        return (
          <StepWrapper title={t("dobTitle")} subtitle={t("dobSubtitle")}>
            <div style={{ width: "100%", maxWidth: 320, border: `1px solid ${theme.border}`, borderRadius: 22, padding: "16px 14px", background: theme.card }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 8, marginBottom: 8, textAlign: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.45, letterSpacing: 1 }}>{t("month").toUpperCase()}</span>
                <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.45, letterSpacing: 1 }}>{t("day").toUpperCase()}</span>
                <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.45, letterSpacing: 1 }}>{t("year").toUpperCase()}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 8 }}>
                <WheelPicker theme={theme} items={monthNames} selectedIndex={data.birthMonth - 1}
                  onSelect={(i) => update("birthMonth", i + 1)} />
                <WheelPicker theme={theme} items={days} selectedIndex={data.birthDay - 1}
                  onSelect={(i) => update("birthDay", days[i])} />
                <WheelPicker theme={theme} items={years} selectedIndex={years.indexOf(data.birthYear)}
                  onSelect={(i) => update("birthYear", years[i])} />
              </div>
            </div>
          </StepWrapper>
        );
      case 8: {
        const goals = ["loseWeight","gainWeight","maintain","learnToCook","beHealthier"];
        const emojis = { loseWeight:"🔥", gainWeight:"💪", maintain:"⚖️", learnToCook:"👨‍🍳", beHealthier:"🌿" };
        return (
          <StepWrapper title={t("goalsTitle")} subtitle={t("goalsSubtitle")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {goals.map((g) => (
                <Chip key={g} theme={theme} emoji={emojis[g]} label={t(`goal_${g}`)}
                  selected={data.goals.includes(g)}
                  disabled={!data.goals.includes(g) && data.goals.length>=3}
                  onClick={() => update("goals", data.goals.includes(g) ? data.goals.filter(x=>x!==g) : [...data.goals, g].slice(0,3))} />
              ))}
            </div>
          </StepWrapper>
        );
      }
      case 9: {
        const diets = ["vegetarian","pescatarian","fastFood","carnivore","fruitarian","none"];
        const emojis = { vegetarian:"🥦", pescatarian:"🐟", fastFood:"🍔", carnivore:"🥩", fruitarian:"🍇", none:"🍽️" };
        return (
          <StepWrapper title={t("dietTitle")}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {diets.map((d) => (
                <Chip key={d} theme={theme} emoji={emojis[d]} label={t(`diet_${d}`)}
                  selected={data.diet===d} onClick={()=>update("diet",d)} />
              ))}
            </div>
          </StepWrapper>
        );
      }
      case 10:
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div className="pop-in" style={{ fontSize: 64, marginBottom: 20 }}>🙏</div>
            <h2 className="fade-up-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700, marginBottom: 8 }}>{t("thankYouTitle")}</h2>
            <p className="fade-up-2" style={{ opacity: 0.65 }}>{t("thankYouSubtitle")}</p>
          </div>
        );
      case 11:
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ position: "relative", width: 96, height: 96, marginBottom: 28 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 99, border: `3px solid ${theme.border}` }} />
              <div className="spin-ring" style={{ position: "absolute", inset: 0, borderRadius: 99, border: "3px solid transparent", borderTopColor: theme.primary, borderRightColor: theme.primary }} />
              <div className="pulse-scale" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChefHat style={{ width: 38, height: 38, color: theme.primary }} />
              </div>
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{t("loaderTitle")}</h2>
            <p style={{ opacity: 0.65, marginBottom: 14 }}>{t("loaderSubtitle")}</p>
            <div style={{ display: "flex", gap: 6 }}>
              <span className="bounce-dot" style={{ width: 8, height: 8, borderRadius: 99, background: theme.primary, animationDelay: "0s" }} />
              <span className="bounce-dot" style={{ width: 8, height: 8, borderRadius: 99, background: theme.primary, animationDelay: ".15s" }} />
              <span className="bounce-dot" style={{ width: 8, height: 8, borderRadius: 99, background: theme.primary, animationDelay: ".3s" }} />
            </div>
          </div>
        );
      case 12: {
        const macros = [
          { label: t("protein"), val: nutrition.protein, color: theme.primary },
          { label: t("carbs"), val: nutrition.carbs, color: theme.secondary },
          { label: t("fat"), val: nutrition.fat, color: "#E07A3F" },
        ];
        const meals = getSuggestedMeals(data.diet, data.goals);
        return (
          <div className="fade-up-1" style={{ display: "flex", flexDirection: "column", gap: 26, width: "100%", maxWidth: 380, margin: "0 auto", textAlign: "center" }}>
            <div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{t("briefTitle")}</h2>
              <p style={{ opacity: 0.5, fontSize: 14 }}>{t("briefSubtitle")}</p>
            </div>
            <div style={{ border: `1px solid ${theme.border}`, borderRadius: 22, padding: "22px 16px", background: theme.card }}>
              <div className="count-pop" style={{ fontFamily: "'Fraunces', serif", fontSize: 46, fontWeight: 700, color: theme.primary }}>{nutrition.calories.toLocaleString()}</div>
              <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 2, marginBottom: 18 }}>{t("caloriesPerDay")}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                {macros.map((m) => (
                  <div key={m.label}>
                    <div style={{ height: 3, width: 32, borderRadius: 99, background: m.color, margin: "0 auto 8px" }} />
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{m.val}<span style={{ fontSize: 11, opacity: 0.6 }}>g</span></div>
                    <div style={{ fontSize: 10, opacity: 0.5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13, textAlign: "left" }}>
              <span style={{ opacity: 0.55 }}>{t("heightLabel")}: <strong style={{ opacity: 1, color: theme.text }}>{data.heightCm} cm</strong></span>
              <span style={{ opacity: 0.55 }}>{t("weightLabel")}: <strong style={{ opacity: 1, color: theme.text }}>{data.weightKg} kg</strong></span>
              <span style={{ opacity: 0.55 }}>{t("goalLabel")}: <strong style={{ opacity: 1, color: theme.text }}>{data.goals[0] ? t(`goal_${data.goals[0]}`) : "–"}</strong></span>
              <span style={{ opacity: 0.55 }}>{t("dietLabel")}: <strong style={{ opacity: 1, color: theme.text }}>{data.diet ? t(`diet_${data.diet}`) : "–"}</strong></span>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>{t("suggestedMeals")}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
                {meals.map((m) => (
                  <div key={m.name} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    background: theme.bg === THEME.dark.bg ? m.darkBg : m.bg,
                    borderRadius: 16, padding: "14px 12px", flex: 1,
                  }}>
                    <span style={{ fontSize: 26 }}>{m.emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <PrimaryButton theme={theme} onClick={()=>goToStep(13)}>{t("continue")}</PrimaryButton>
          </div>
        );
      }
      case 13:
        return (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26, textAlign: "center", width: "100%", maxWidth: 340, margin: "0 auto" }}>
            <div className="pop-in">
              <ChefHat style={{ width: 42, height: 42, color: theme.primary }} />
            </div>
            <div className="fade-up-1">
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{t("authTitle")}</h2>
              <p style={{ opacity: 0.55, fontSize: 14, maxWidth: 280, margin: "0 auto" }}>{t("authSubtitle")}</p>
            </div>
            <div className="fade-up-2" style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
              <button onClick={()=>goToStep(14)} className="hover-outline" style={{ "--accent": theme.primary, display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", padding: "8px 4px", fontWeight: 700, fontSize: 15, color: theme.text, cursor: "pointer" }}>
                <span style={{ fontSize: 18 }}>🔍</span>{t("signInGoogle")}
              </button>
              <button onClick={()=>goToStep(14)} style={{ border: "none", background: "transparent", fontWeight: 600, opacity: 0.45, cursor: "pointer", color: theme.text, fontSize: 14 }}>
                {t("skipForNow")}
              </button>
            </div>
          </div>
        );
      case 14:
        return <PricingStep theme={theme} t={t} onSelect={() => onFinish(data)} />;
      default: return null;
    }
  };

  const showNav = step <= 9;
  const showBack = step > 0 && step <= 9;

  return (
    <div style={{ position: "fixed", inset: 0, background: theme.bg, color: theme.text, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', sans-serif", zIndex: 100 }}>
      <div style={{ padding: "20px 24px 12px", display: "flex", alignItems: "center", gap: 14 }}>
        {showBack && (
          <button onClick={()=>goToStep(step-1)} style={{ background: "none", border: "none", cursor: "pointer", color: theme.text, opacity: 0.6, padding: 4 }}>
            <ChevronLeft style={{ width: 22, height: 22 }} />
          </button>
        )}
        {step <= 9 && <ProgressBar step={step} total={TOTAL_MAIN_STEPS} theme={theme} />}
        {step > 0 && step <= 9 && <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, whiteSpace: "nowrap" }}>{step}/9</span>}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px 24px", display: "flex", flexDirection: "column" }}>
        <div key={step} className={dir >= 0 ? "step-anim-next" : "step-anim-prev"} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {renderStep()}
        </div>
      </div>
      {showNav && (
        <div style={{ padding: "0 24px 28px" }}>
          <PrimaryButton theme={theme} disabled={!canContinue()} onClick={()=>goToStep(step+1)}>{t("continue")}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

function PricingStep({ theme, t, onSelect }) {
  const plans = [
    { id: "free", name: "Free", price: "$0", tagline: "Perfect to get started", available: true,
      features: ["5 AI scans / month", "Basic recipe generation", "Step-by-step cooking guide", "Community recipes"] },
    { id: "advanced", name: "Advanced", price: "$4.99", tagline: "For the passionate cook", available: false, badge: "popular",
      features: ["50 AI scans / month", "AI dish photo generation", "Recipe history", "Nutritional tracking"] },
    { id: "premium", name: "Premium", price: "$11.99", tagline: "Unlimited cooking power", available: false, badge: "value",
      features: ["Unlimited AI scans", "Personalized meal plans", "Priority AI processing", "Family mode (up to 4)"] },
    { id: "master", name: "Master", price: "$29.99", tagline: "Pro chef experience", available: false,
      features: ["Everything in Premium", "24/7 Chef AI support", "Custom meal plans", "Early feature access"] },
  ];
  return (
    <div className="fade-up-1" style={{ display: "flex", flexDirection: "column", gap: 22, width: "100%", maxWidth: 380, margin: "0 auto" }}>
      <div style={{ textAlign: "center" }}>
        <div className="pop-in" style={{ fontSize: 36, marginBottom: 6 }}>🎉</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{t("pricingTitle")}</h2>
        <p style={{ fontSize: 13, opacity: 0.5 }}>{t("pricingSubtitle")}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {plans.map((p) => (
          <div key={p.id} style={{ position: "relative" }}>
            {p.badge && (
              <span style={{
                position: "absolute", top: -12, left: 16, zIndex: 2,
                fontSize: 10, fontWeight: 700, color: "#fff", padding: "4px 10px", borderRadius: 99,
                background: p.badge === "popular" ? theme.primary : theme.secondary,
              }}>
                {p.badge === "popular" ? "Most Popular" : "Best Value"}
              </span>
            )}
            <div style={{
              border: `2px solid ${p.badge === "popular" ? theme.primary : theme.border}`,
              borderRadius: 20, padding: 18, opacity: p.available ? 1 : 0.65,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: p.badge === "popular" ? theme.primary : theme.text }}>{p.name}</span>
                    {!p.available && <span style={{ fontSize: 9, fontWeight: 700, opacity: 0.5, letterSpacing: 0.5 }}>SOON</span>}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.5, marginTop: 2 }}>{p.tagline}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{p.price}<span style={{ fontSize: 11, opacity: 0.5, fontWeight: 500 }}>/mo</span></div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, opacity: 0.75, textAlign: "left" }}>
                    <Check style={{ width: 13, height: 13, color: theme.primary, flexShrink: 0 }} /> {f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, textAlign: "right" }}>
                {p.available ? (
                  <button onClick={onSelect} className="hover-outline" style={{
                    "--accent": theme.primary, fontSize: 13, fontWeight: 700, padding: "9px 18px", borderRadius: 99, border: "none",
                    background: theme.primary, color: theme.primaryText, cursor: "pointer",
                  }}>
                    {t("tryFree")}
                  </button>
                ) : (
                  <span style={{ fontSize: 12, fontWeight: 700, opacity: 0.45 }}>{t("comingSoon")}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 11, opacity: 0.45 }}>{t("noCreditCard")}</p>
    </div>
  );
}

/* ============================================================
   MAIN APP (Bottom Tab Navigation)
   ============================================================ */
function MainApp({ theme, profile, language, setLanguage, name, setName, isDark, setIsDark }) {
  const t = useT(language);
  const [tab, setTab] = useState("home");
  const [recipes, setRecipes] = useState([
    { ...makeMockRecipe(1, profile.goals[0]), createdAt: new Date(Date.now() - 1000*60*60*20) },
    { ...makeMockRecipe(2, profile.goals[0]), createdAt: new Date(Date.now() - 1000*60*60*44) },
  ]);
  const nutrition = calcNutrition(profile);
  const consumed = recipes.length ? Math.min(nutrition.calories, recipes[0].calories * 2) : 0;
  const remaining = Math.max(0, nutrition.calories - consumed);
  const pct = Math.min(100, Math.round((consumed / nutrition.calories) * 100));

  const addRecipe = (r) => setRecipes((prev) => [r, ...prev]);

  return (
    <div style={{ position: "fixed", inset: 0, background: theme.bg, color: theme.text, display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 84 }}>
        <div key={tab} className="tab-anim">
          {tab === "home" && <HomeTab theme={theme} t={t} name={name} nutrition={nutrition} consumed={consumed} remaining={remaining} pct={pct} recipes={recipes} profile={profile} />}
          {tab === "scan" && <ScanTab theme={theme} t={t} profile={profile} onNewRecipe={addRecipe} />}
          {tab === "history" && <HistoryTab theme={theme} t={t} recipes={recipes} onGoToScan={() => setTab("scan")} />}
          {tab === "settings" && (
            <SettingsTab theme={theme} t={t} language={language} setLanguage={setLanguage}
              name={name} setName={setName} isDark={isDark} setIsDark={setIsDark} />
          )}
        </div>
      </div>

      <div style={{
        position: "fixed", left: 0, right: 0, bottom: 0, background: theme.navBg,
        backdropFilter: "blur(10px)", borderTop: `1px solid ${theme.border}`,
        display: "flex", justifyContent: "space-around", padding: "10px 8px 16px",
      }}>
        {[
          { id: "home", icon: Home, label: t("tab_home") },
          { id: "scan", icon: Camera, label: t("tab_scan") },
          { id: "history", icon: HistoryIcon, label: t("tab_history") },
          { id: "settings", icon: SettingsIcon, label: t("tab_settings") },
        ].map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            background: "none", border: "none", cursor: "pointer",
            color: tab === id ? theme.primary : theme.muted, minWidth: 64,
          }}>
            <Icon key={tab === id ? id : undefined} className={tab === id ? "pop-in" : ""} style={{ width: 22, height: 22, transform: tab === id ? "translateY(-1px)" : "none" }} />
            <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TopBrand({ theme, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 30, height: 30, borderRadius: 99, background: theme.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ChefHat style={{ width: 16, height: 16, color: theme.primaryText }} />
        </div>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 17 }}>ChefAI</span>
      </div>
      {right}
    </div>
  );
}

function HomeTab({ theme, t, name, nutrition, consumed, remaining, pct, recipes, profile }) {
  return (
    <div style={{ padding: "28px 20px 12px", display: "flex", flexDirection: "column", gap: 24 }}>
      <TopBrand theme={theme} />

      <div className="fade-up-1">
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, margin: 0 }}>{t("welcomeBack", { name: name || "chef" })}</h1>
      </div>

      <div className="fade-up-1" style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 14 }}>
            <Flame style={{ width: 16, height: 16, color: theme.secondary }} /> {t("calorieTracker")}
          </div>
          <span style={{ fontSize: 13, opacity: 0.6 }}>{consumed} {t("of")} {nutrition.calories}</span>
        </div>
        <div style={{ height: 10, borderRadius: 99, background: theme.trackBg, overflow: "hidden" }}>
          <div className="count-pop" style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`, borderRadius: 99, transition: "width .6s cubic-bezier(.22,.68,0,1.01)" }} />
        </div>
        <div style={{ marginTop: 10, fontSize: 13, opacity: 0.65 }}>{remaining.toLocaleString()} kcal {t("remaining")}</div>
      </div>

      <div className="fade-up-2">
        <h3 style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>{t("todaysRecipes")}</h3>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
          {[1,2,3].map((i) => (
            <div key={i} className="hover-outline" style={{ "--accent": theme.primary, minWidth: 150, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, overflow: "hidden", flexShrink: 0, cursor: "pointer" }}>
              <div style={{ height: 90, background: `linear-gradient(135deg, ${theme.primary}33, ${theme.secondary}33)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles style={{ width: 22, height: 22, color: theme.primary }} />
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{makeMockRecipe(i, profile.goals[0]).name}</div>
                <div style={{ fontSize: 11, opacity: 0.55, marginTop: 2 }}>{makeMockRecipe(i, profile.goals[0]).calories} kcal</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fade-up-2">
        <h3 style={{ fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>{t("recentRecipes")}</h3>
        {recipes.length === 0 ? (
          <p style={{ fontSize: 13, opacity: 0.55 }}>{t("noRecipesYet")}</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recipes.slice(0,4).map((r, i) => (
              <div key={r.id + String(r.createdAt)} style={{ display: "flex", alignItems: "center", gap: 12, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 12, animation: `fadeUp .4s ease ${i*0.06}s both` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${theme.primary}33, ${theme.secondary}33)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <ChefHat style={{ width: 18, height: 18, color: theme.primary }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.55, display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock style={{ width: 11, height: 11 }} /> {formatTime(r.createdAt, t)}
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: theme.primary, flexShrink: 0 }}>{r.calories} kcal</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ScanTab({ theme, t, profile, onNewRecipe }) {
  const [phase, setPhase] = useState("idle");
  const [dragActive, setDragActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);

  const takePhoto = () => {
    setPhase("analyzing");
    setTimeout(() => { setIngredients(MOCK_INGREDIENTS); setPhase("found"); }, 1600);
  };
  const generate = () => {
    setPhase("generating");
    setTimeout(() => {
      const r = makeMockRecipe(Math.floor(Math.random()*100), profile.goals[0]);
      setRecipe(r); setPhase("result"); onNewRecipe(r);
    }, 1800);
  };
  const reset = () => { setPhase("idle"); setIngredients([]); setRecipe(null); };
  const highlighted = dragActive || hovering;

  if (phase === "idle") {
    return (
      <div className="fade-up-1" style={{ padding: "24px 20px 20px", display: "flex", flexDirection: "column", minHeight: "70vh" }}>
        <TopBrand theme={theme} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 10 }}>{t("scanTitle")}</h1>
            <p style={{ fontSize: 14.5, opacity: 0.55, maxWidth: 300, margin: "0 auto" }}>{t("scanSubtitle")}</p>
          </div>
          <div
            onClick={takePhoto}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onDragOver={(e)=>{e.preventDefault(); setDragActive(true);}}
            onDragLeave={()=>setDragActive(false)}
            onDrop={(e)=>{e.preventDefault(); setDragActive(false); takePhoto();}}
            style={{
              width: "100%", maxWidth: 340, borderRadius: 40,
              border: `3px dashed ${highlighted ? theme.primary : theme.border}`,
              background: highlighted ? theme.primary+"0D" : theme.card,
              padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center",
              gap: 18, cursor: "pointer", transition: "all .25s", textAlign: "center",
              transform: highlighted ? "scale(1.02)" : "scale(1)",
              boxShadow: highlighted ? `0 0 0 4px ${theme.primary}22` : "none",
            }}
          >
            <div className="pulse-scale" style={{ width: 84, height: 84, borderRadius: 99, background: theme.primary, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 24px ${theme.primary}44` }}>
              <Camera style={{ width: 34, height: 34, color: theme.primaryText }} />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: highlighted ? theme.primary : theme.text, transition: "color .2s" }}>{t("takePhoto")}</h3>
              <p style={{ fontSize: 12.5, opacity: 0.55, maxWidth: 240 }}>{t("scanHelper")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "analyzing" || phase === "generating") {
    return (
      <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", minHeight: "70vh" }}>
        <TopBrand theme={theme} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div style={{ position: "relative", width: 128, height: 128, marginBottom: 32 }}>
            <div className="spin-ring" style={{ position: "absolute", inset: 0, borderRadius: 99, border: `4px dashed ${theme.primary}33`, animationDuration: "8s" }} />
            <div className="spin-ring-rev" style={{ position: "absolute", inset: 16, borderRadius: 99, border: `4px dashed ${theme.secondary}55`, animationDuration: "6s" }} />
            <div className="pulse-scale" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles style={{ width: 40, height: 40, color: theme.primary }} />
            </div>
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            {phase === "analyzing" ? t("analyzing") : t("generating")}
          </h2>
          <p style={{ opacity: 0.55, fontSize: 15, maxWidth: 300 }}>{t("scanLoadingHelper")}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
      <TopBrand theme={theme} />
      <div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, margin: 0 }}>{t("scanTitle")}</h1>
        <p style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>{t("scanSubtitle")}</p>
      </div>

      {phase === "found" && (
        <div className="fade-up-1" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, opacity: 0.7 }}>{t("ingredientsFound")}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {ingredients.map((ing, i) => (
                <span key={ing} style={{ padding: "6px 12px", borderRadius: 99, background: theme.trackBg, fontSize: 12, fontWeight: 600, animation: `popIn .35s cubic-bezier(.34,1.56,.64,1) ${i*0.06}s both` }}>{ing}</span>
              ))}
            </div>
          </div>
          <PrimaryButton theme={theme} onClick={generate}>{t("generateRecipe")}</PrimaryButton>
        </div>
      )}

      {phase === "result" && recipe && (
        <div className="fade-up-1" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="pop-in" style={{ height: 160, borderRadius: 20, background: `linear-gradient(135deg, ${theme.primary}55, ${theme.secondary}55)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles style={{ width: 36, height: 36, color: theme.primary }} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700, margin: 0 }}>{recipe.name}</h2>
            {recipe.goal && (
              <span className="pop-in" style={{ display: "inline-block", marginTop: 8, fontSize: 12, fontWeight: 700, color: theme.primary, background: theme.primary+"18", padding: "4px 10px", borderRadius: 99 }}>
                {t("goodFor")} {t(`goal_${recipe.goal}`)}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 12, textAlign: "center" }}>
              <div className="count-pop" style={{ fontWeight: 700, fontSize: 18 }}>{recipe.calories}</div>
              <div style={{ fontSize: 11, opacity: 0.55 }}>{t("totalCalories")}</div>
            </div>
            <div style={{ flex: 1, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 14, padding: 12, textAlign: "center" }}>
              <div className="count-pop" style={{ fontWeight: 700, fontSize: 18 }}>{recipe.ingredients.length}</div>
              <div style={{ fontSize: 11, opacity: 0.55 }}>{t("ingredientsUsed")}</div>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{t("stepsLabel")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {recipe.steps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, animation: `fadeUp .35s ease ${0.1 + i*0.08}s both` }}>
                  <span style={{ fontWeight: 700, color: theme.primary, flexShrink: 0 }}>{i+1}.</span>
                  <span style={{ opacity: 0.85 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: theme.secondary+"18", borderRadius: 14, padding: 12, fontSize: 13 }}>
            <strong style={{ color: theme.secondary }}>{t("tipLabel")}: </strong>{recipe.tip}
          </div>
          <button onClick={reset} className="hover-outline" style={{ "--accent": theme.primary, padding: "14px", borderRadius: 99, border: `2px solid ${theme.border}`, background: "transparent", fontWeight: 700, color: theme.text, cursor: "pointer" }}>
            {t("newScan")}
          </button>
        </div>
      )}
    </div>
  );
}

function HistoryTab({ theme, t, recipes, onGoToScan }) {
  const total = recipes.length;
  const completed = recipes.filter((r) => r.isCompleted).length;
  const avgPrep = total ? Math.round(recipes.reduce((s, r) => s + (r.prepTime || 0), 0) / total) : 0;
  const avgCals = total ? Math.round(recipes.reduce((s, r) => s + r.calories, 0) / total) : 0;

  const stats = [
    { label: t("statTotal"), value: total, icon: ChefHat, color: theme.primary, bg: theme.primary + "1A" },
    { label: t("statCompleted"), value: completed, icon: Activity, color: theme.secondary, bg: theme.secondary + "1A" },
    { label: t("statAvgPrep"), value: `${avgPrep}m`, icon: Clock, color: theme.accent, bg: theme.accent + "1A" },
    { label: t("statAvgCals"), value: avgCals, icon: Flame, color: theme.destructive, bg: theme.destructive + "1A" },
  ];

  return (
    <div style={{ padding: "24px 20px 12px" }}>
      <TopBrand theme={theme} />
      <div className="fade-up-1" style={{ marginBottom: 20 }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>{t("historyTitle")}</h1>
        <p style={{ fontSize: 13.5, opacity: 0.55, marginBottom: 18 }}>{t("historySubtitle")}</p>
        <button onClick={onGoToScan} className="hover-outline" style={{
          "--accent": theme.primary, display: "inline-flex", alignItems: "center", gap: 8,
          background: theme.primary, color: theme.primaryText, border: "none", borderRadius: 99,
          padding: "12px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer",
        }}>
          <ChefHat style={{ width: 16, height: 16 }} /> {t("newRecipe")}
        </button>
      </div>

      <div className="fade-up-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 26 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 18, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <s.icon style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9.5, opacity: 0.5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 3 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {recipes.length === 0 ? (
        <div className="fade-up-2" style={{
          border: `2px dashed ${theme.border}`, borderRadius: 32, padding: "44px 24px",
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8,
        }}>
          <div style={{ width: 72, height: 72, borderRadius: 99, background: theme.trackBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <ChefHat style={{ width: 30, height: 30, opacity: 0.4 }} />
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 700 }}>{t("historyEmptyTitle")}</h2>
          <p style={{ fontSize: 13, opacity: 0.55, maxWidth: 260 }}>{t("historyEmpty")}</p>
          <button onClick={onGoToScan} className="hover-outline" style={{
            "--accent": theme.primary, marginTop: 10, background: theme.primary, color: theme.primaryText,
            border: "none", borderRadius: 99, padding: "13px 26px", fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}>
            {t("startCooking")}
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recipes.map((r, i) => (
            <div key={r.id + String(r.createdAt)} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, overflow: "hidden", animation: `fadeUp .4s ease ${i*0.06}s both` }}>
              <div style={{ position: "relative", height: 110, background: `linear-gradient(135deg, ${theme.primary}33, ${theme.secondary}33)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChefHat style={{ width: 26, height: 26, color: theme.primary, opacity: 0.6 }} />
                {r.isCompleted && (
                  <span style={{ position: "absolute", top: 10, right: 10, background: theme.primary, color: theme.primaryText, fontSize: 10, fontWeight: 700, padding: "4px 9px", borderRadius: 99 }}>
                    {t("cooked")}
                  </span>
                )}
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, opacity: 0.45, marginBottom: 4 }}>{formatTime(r.createdAt, t)}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{r.name}</div>
                <div style={{ display: "flex", gap: 14, fontSize: 12.5, fontWeight: 600 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: theme.primary }}>
                    <Clock style={{ width: 13, height: 13 }} /> {r.prepTime || 15}m
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, color: theme.destructive }}>
                    <Flame style={{ width: 13, height: 13 }} /> {r.calories} cal
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsTab({ theme, t, language, setLanguage, name, setName, isDark, setIsDark }) {
  const [localName, setLocalName] = useState(name);
  const [savedFlash, setSavedFlash] = useState(false);

  const sectionStyle = { background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 18 };
  const labelStyle = { fontSize: 11, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 };

  return (
    <div style={{ padding: "24px 20px 12px", display: "flex", flexDirection: "column", gap: 18 }}>
      <TopBrand theme={theme} />
      <h1 className="fade-up-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700, margin: 0, marginBottom: 4 }}>{t("settingsTitle")}</h1>

      <div className="fade-up-1" style={sectionStyle}>
        <div style={labelStyle}><User style={{ width: 13, height: 13 }} /> {t("nameLabel")}</div>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={localName} onChange={(e)=>setLocalName(e.target.value)} style={{
            flex: 1, padding: "12px 14px", borderRadius: 14, border: `1px solid ${theme.border}`,
            background: theme.inputBg, color: theme.text, fontSize: 14, fontWeight: 600,
          }} />
          <button onClick={() => { setName(localName); setSavedFlash(true); setTimeout(()=>setSavedFlash(false), 1500); }} className="hover-outline" style={{
            "--accent": theme.primary, padding: "12px 18px", borderRadius: 14, border: "none", background: theme.primary,
            color: theme.primaryText, fontWeight: 700, cursor: "pointer",
          }}>
            {savedFlash ? t("saved") : t("save")}
          </button>
        </div>
      </div>

      <div className="fade-up-2" style={sectionStyle}>
        <div style={labelStyle}><Globe style={{ width: 13, height: 13 }} /> {t("languageLabel")}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {LANGS.map((l) => (
            <button key={l.code} onClick={() => setLanguage(l.code)} className={language===l.code ? "is-selected" : "hover-outline"} style={{
              "--accent": theme.primary,
              padding: "12px", borderRadius: 14, cursor: "pointer",
              border: `2px solid ${language===l.code ? theme.primary : theme.border}`,
              background: language===l.code ? theme.primary+"18" : theme.card,
              color: theme.text, fontWeight: 700, fontSize: 13,
            }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{l.flag}</div>
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="fade-up-2" style={sectionStyle}>
        <div style={labelStyle}>{t("themeLabel")}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setIsDark(false)} className={!isDark ? "is-selected" : "hover-outline"} style={{
            "--accent": theme.primary,
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "12px", borderRadius: 14, cursor: "pointer",
            border: `2px solid ${!isDark ? theme.primary : theme.border}`,
            background: !isDark ? theme.primary+"18" : theme.card, color: theme.text, fontWeight: 700, fontSize: 13,
          }}>
            <Sun style={{ width: 15, height: 15 }} /> {t("light")}
          </button>
          <button onClick={() => setIsDark(true)} className={isDark ? "is-selected" : "hover-outline"} style={{
            "--accent": theme.primary,
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "12px", borderRadius: 14, cursor: "pointer",
            border: `2px solid ${isDark ? theme.primary : theme.border}`,
            background: isDark ? theme.primary+"18" : theme.card, color: theme.text, fontWeight: 700, fontSize: 13,
          }}>
            <Moon style={{ width: 15, height: 15 }} /> {t("dark")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function ChefAIApp() {
  const [screen, setScreen] = useState("onboarding");
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("en");
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? THEME.dark : THEME.light;

  const handleFinish = (data) => {
    setProfile(data);
    setName(data.name);
    setLanguage(data.language);
    setScreen("app");
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", height: 780, position: "relative", borderRadius: 32, overflow: "hidden", boxShadow: "0 0 0 8px #1a1a1a, 0 20px 50px rgba(0,0,0,0.25)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes stepInNext { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes stepInPrev { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes tabFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.4); } 60% { opacity: 1; transform: scale(1.15); } 100% { transform: scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ringSpin { to { transform: rotate(360deg); } }
        @keyframes ringSpinRev { to { transform: rotate(-360deg); } }
        @keyframes pulseScale { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
        @keyframes bounceDot { 0%, 80%, 100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-6px); opacity: 1; } }
        @keyframes countPop { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes pressPop { 0% { transform: scale(1); } 50% { transform: scale(0.94); } 100% { transform: scale(1); } }
        .step-anim-next { animation: stepInNext .32s cubic-bezier(.22,.68,0,1.01); }
        .step-anim-prev { animation: stepInPrev .32s cubic-bezier(.22,.68,0,1.01); }
        .tab-anim { animation: tabFade .28s ease; }
        .pop-in { animation: popIn .5s cubic-bezier(.34,1.56,.64,1) both; }
        .fade-up-1 { animation: fadeUp .45s ease .08s both; }
        .fade-up-2 { animation: fadeUp .45s ease .2s both; }
        .count-pop { animation: countPop .5s cubic-bezier(.34,1.56,.64,1) both; }
        .spin-ring { animation: ringSpin 1.1s linear infinite; }
        .spin-ring-rev { animation: ringSpinRev 1.1s linear infinite; }
        .pulse-scale { animation: pulseScale 1.4s ease-in-out infinite; }
        .bounce-dot { display: inline-block; animation: bounceDot 1s ease-in-out infinite; }
        .hover-outline { outline: 2px solid transparent; outline-offset: 0; transition: transform .15s, border-color .15s; }
        .hover-outline:hover:not(:disabled):not(.is-selected) { border-color: var(--accent) !important; transform: translateY(-1px); }
        .hover-outline:active:not(:disabled) { animation: pressPop .25s ease; }
        button { transition: transform .12s ease; }
        button:active { transform: scale(0.97); }
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
      {screen === "onboarding" && <OnboardingFlow theme={theme} onFinish={handleFinish} />}
      {screen === "app" && profile && (
        <MainApp theme={theme} profile={profile} language={language} setLanguage={setLanguage}
          name={name} setName={setName} isDark={isDark} setIsDark={setIsDark} />
      )}
    </div>
  );
}

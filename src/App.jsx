import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Search, Star, X, CheckCircle, ChevronDown, Users, Clock,
  Mail, Home, Eye, TrendingUp, LogOut, Shield, Flag,
  RefreshCw, BarChart, Video, Building2, AlertTriangle,
  ArrowRight, Camera, Lock, Unlock, SlidersHorizontal,
  MapPin, ChevronUp, Edit2, Settings, Trash2, ToggleLeft, ToggleRight, Save
} from "lucide-react";

// ─── SUPABASE ─────────────────────────────────────────────────────────────────
const supabase = createClient(
  "https://avonnuereepruxwntbmk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2b25udWVyZWVwcnV4d250Ym1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MjY1MTQsImV4cCI6MjA5NzIwMjUxNH0.XqT_Y0rTzD7buqjuUfyDPTkdTtijezCOpYR1DzjjiZg"
);

// ─── BLOCKED TEMP EMAIL DOMAINS ───────────────────────────────────────────────
const TEMP_EMAIL_DOMAINS = [
  "mailinator.com","guerrillamail.com","10minutemail.com","tempmail.com",
  "throwaway.email","yopmail.com","sharklasers.com","guerrillamailblock.com",
  "grr.la","guerrillamail.info","guerrillamail.biz","guerrillamail.de",
  "guerrillamail.net","guerrillamail.org","spam4.me","trashmail.com",
  "trashmail.me","trashmail.net","dispostable.com","mailnull.com",
  "spamgourmet.com","spamgourmet.net","spamgourmet.org","spamherelots.com",
  "tempr.email","discard.email","maildrop.cc","fakeinbox.com","mailcatch.com",
  "tempemail.co","throwam.com","spamfree24.org","mailnew.com","getairmail.com",
  "filzmail.com","throwam.com","zetmail.com","mail-temp.com","tempinbox.co.uk",
  "getnada.com","mohmal.com","owlpic.com","spamgrap.com","discard.email",
  "tempail.com","haltospam.com","spamhere.net","fakemail.net","mailscrap.com"
];

const isTempEmail = (email) => {
  const domain = email.split("@")[1]?.toLowerCase();
  return TEMP_EMAIL_DOMAINS.includes(domain);
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const C = { navy:"#0F172A", indigo:"#4F46E5", indigoLight:"#818CF8" };

// ─── LANGUAGES ────────────────────────────────────────────────────────────────
const LANGS = [
  { code:"EN", name:"English" },
  { code:"RO", name:"Română" },
  { code:"NL", name:"Nederlands" },
];

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  EN: {
    landingTitle:"Direct access to EU talent.",
    landingSub:"A private database of verified workers — local or relocating — for companies in the Netherlands and Germany. No applications. No agency fees.",
    forComp:"For Companies", forWork:"For Workers",
    companyBtn:"Access as Company", workerBtn:"Create Worker Profile",
    compFeatures:["Private database — not a job board","ID Verified + BSN + housing compliance filters","Flat monthly fee. No per-hire charges."],
    workerFeatures:["Free profile, always","Companies contact you directly","Biometric ID badge gives 3x more visibility","Real-time dashboard"],
    search:"Search role, skill, name...", searchBtn:"Search",
    found:"profiles found", now:"Available now", soon:"Available soon", later:"4+ weeks",
    about:"About", skills:"Skills", langs:"Languages",
    sub2:"Subscription required · from €199/month",
    workerTitle:"Create your profile",
    fname:"Full Name", frole:"Job Role", fexp:"Years of experience",
    flangs:"Languages you speak", fsector:"Sector", fbio:"Short bio",
    submit:"Create Profile",
    step1:"Personal Info", step2:"Work Profile", step3:"Languages & Bio",
    availability:"Availability", availNow:"Available now", availSoon:"In 2 weeks", availMonth:"In 1 month",
    openReloc:"Open to relocation?", yes:"Yes", no:"No",
    currentCity:"Current city", currentCountry:"Currently based in",
    needsHousing:"Need employer-provided housing?",
    idVerified:"ID Verified", notVerified:"Unverified",
    dashboard:"Talent Database", logout:"Sign Out",
    profileViews:"Profile Views", searchApp:"Total Searches", active:"Active",
    bumpProfile:"Refresh Visibility", videoPitch:"Video Intro",
    email:"Email Address", phone:"Phone Number", address:"Full Address",
    compName:"Company Name", kvk:"Chamber of Commerce Number",
    compOnboardTitle:"Access the Talent Database",
    compOnboardSub:"Subscribe once and get direct access to verified EU workers. No placement fees.",
    trial:"Start 14-Day Free Trial", cancel:"Cancel anytime. No placement fees.",
    pricingTitle:"Database Access", pricingSub:"Browse all verified worker profiles. Contact directly.",
    starter:"Starter", starterDesc:"Up to 10 direct contacts / month",
    growth:"Growth", growthDesc:"Unlimited access + priority listings",
    browseWorkers:"Browse Database", allCandidates:"All Candidates",
    localRes:"Residents", openReloc2:"Open to Relocate",
    verifiedOnly:"ID Verified Only", noHousing:"No Housing Required", allSectors:"All",
    unlockContact:"Unlock Direct Contact", activatePlan:"Subscribe to Access",
    contactUnlocked:"Contact Unlocked", reportProfile:"Report Profile",
    lastActive:"Active", responseRate:"Responds in",
    disclaimer:"Hirevo is a direct marketplace. No applications, no agency interference. Contact workers directly. All contracts are signed between parties.",
    dbWelcome:"Your Talent Database", dbSub:"Search verified profiles. No job boards, no irrelevant applications.",
    dbOpen:"Open Database", dbProfiles:"Profile Views", dbSearches:"Searches This Month",
    hiringCountry:"Hiring Country", industrySector:"Industry Sector",
    targetCountries:"Target countries", addLanguage:"Add language",
    noResults:"No profiles match your filters.",
    filters:"Filters", candidateType:"Candidate Type", compliance:"Compliance",
    myAccount:"My Account", editProfile:"Edit Profile",
    sPersonal:"Personal Info", sWork:"Work Profile", sLangs:"Languages & Bio",
    sContact:"Contact Details", sAccount:"Account & Security",
    saveChanges:"Save Changes", saved:"Saved",
    profileVisibility:"Profile Visibility",
    visibleDesc:"Your profile is visible to subscribed companies.",
    hiddenDesc:"Your profile is hidden from all companies.",
    makeVisible:"Make Visible", makeHidden:"Hide Profile",
    dangerZone:"Danger Zone", deleteAccount:"Delete Account",
    deleteConfirm:"Are you sure? This cannot be undone.",
    deleteBtn:"Yes, delete my account",
    idVerifStatus:"ID Verification", idPending:"Pending — start scan to get badge",
    idComplete:"Verified — badge active", startVerif:"Start Biometric Scan",
    contactPrivate:"Only shown to companies that unlock your profile.",
    noSkillsYet:"No skills added yet. Go to Work Profile to add some.",
    cancelEdit:"Cancel",
    // Company account & credits
    createFreeAccount:"Create Free Account", freeAccountSub:"Browse all profiles for free. Pay only to unlock contact details.",
    sCompany:"Company Profile", sBilling:"Billing & Credits",
    yourCredits:"Your Credits", creditsBalance:"credits available",
    buyCredits:"Buy Credits", bundleTitle:"Credits Bundle",
    bundleDesc:"30 credits · 5 credits per contact unlock",
    bundlePrice:"€30", buyBundle:"Purchase Bundle",
    unlockCost:"5 credits per unlock",
    useCreditsBtn:"Unlock with Credits (5 credits)",
    notEnoughCredits:"Not enough credits",
    monthlyPlan:"Monthly Plan", monthlyPrice:"€370 / month",
    monthlyDesc:"89 unlocks/month — 15 more than €370 in credits",
    annualPlan:"Annual Plan", annualPrice:"€270 / month",
    annualDesc:"Billed annually (€3,240/yr) · Save 27% vs monthly",
    subscribeTo:"Subscribe",
    currentPlanLabel:"Current Plan", freePlanLabel:"Free — pay per contact",
    activePlan:"Active subscription", creditsAdded:"Credits added!",
    chooseAccess:"How would you like to access this contact?",
    noCreditsHint:"You need 5 credits to unlock. Buy a bundle or subscribe.",
    companyMyAccount:"Company Account",
    deleteCompanyBtn:"Yes, delete company account",
    signOutCompany:"Sign Out",
    // New features
    employmentType:"Employment Type", permanentLabel:"Permanent", seasonalLabel:"Seasonal", allTypes:"All types",
    availableFromLabel:"Available from",
    reviewsTitle:"Company Reviews", reviewsBased:"based on", reviewsUnit:"reviews", noReviewsYet:"No reviews yet — be the first company to leave one.",
    msgTitle:"Message", msgPlaceholder:"Type your message...", msgSend:"Send", msgSentConfirm:"Message sent",
    bulkTitle:"Bulk Pack", bulkDesc:"100 credits · 20 contact unlocks", bulkPrice:"€85", bulkSave:"Save 15% vs single bundles", buyBulk:"Purchase Bulk Pack",
    housingPartnerTitle:"Need housing for this hire?", housingPartnerDesc:"Our accommodation partners arrange employer housing across the Netherlands and Germany.", housingPartnerCta:"Get a Housing Quote",
    rateCompanyTitle:"Rate a Company", rateCompanyDesc:"Help other workers by reviewing companies you've worked with.", companyNameLabel:"Company name", yourRating:"Your rating", yourReview:"Your review", submitReview:"Submit Review", reviewThanks:"Thanks for your feedback!",
    myReviewsTitle:"Companies I've Worked With",
    back:"Back", dashboardLabel:"Dashboard", continueBtn:"Continue", closeBtn:"Close", orDivider:"or", savingLabel:"Saving...",
    welcomeBack:"Welcome back", lastUpdatedJustNow:"Last updated just now", refreshedAt:"Refreshed at ",
    profilePreview:"Profile Preview",
    videoPitchDesc:"Profiles with a 30-second video receive 40% more contact requests.", uploadVideo:"Upload Video",
    completeIdVerifTitle:"Complete ID Verification", completeIdVerifDesc:"Unlock the ID Verified badge and get 3x more company views.",
    idVerificationPending:"ID Verification Pending", idVerifPendingDesc:"Complete scan to get the ID Verified badge",
    deleteAccountDesc:"Permanently delete your account and all associated data.",
    deleteCompanyDesc:"Permanently delete your company account and all data.",
    freeNoCard:"Free — no credit card required", noCardRequired:"No credit card required",
    quickFilterBySector:"Quick Filter by Sector", allSectorsFull:"All Sectors",
    phoneShort:"Phone", emailShort:"Email",
    bestValue:"Best Value", subscriptionsTitle:"Subscriptions — Unlimited Unlocks", cancelSubscription:"Cancel subscription",
    currentLocationLabel:"Current Location", housingLabel:"Housing", needsHousingVal:"Needs housing", ownHousingVal:"Own housing",
    euDocsLabel:"EU Documents", validEuPassport:"Valid EU passport", hasBsnVal:"Has BSN", noBsnVal:"No BSN",
    verifiedProfilesLabel:"Verified Profiles", euLanguagesLabel:"EU Languages", agencyFeeLabel:"Agency Fee",
    yourFullNamePh:"Your full name",
    housingFormTitle:"Housing Request", housingFormCity:"Destination city", housingFormCount:"Number of workers",
    housingFormPeriod:"Period needed (e.g. dates or season)", housingFormSubmit:"Send Request",
    housingFormThanks:"Request sent — a housing partner will follow up by email.",
    heroTagline:"B2B Direct SaaS — Zero Agency Fees",
    contactPerson:"Contact Person",
    cityExamplePh:"e.g. Milan, Warsaw, Cluj-Napoca", roleExamplePh:"e.g. Forklift Operator, CNC Operator",
    bioPh:"Describe your experience...", bioEditPh:"Describe your experience and what you're looking for...",
    emailExamplePh:"you@email.com", kvkExamplePh:"e.g. 12345678", addressExamplePh:"Street, City, Country",
    idScanNotice:"After creating your profile, complete biometric ID scan to receive the ID Verified badge.",
    freeToBrowseDesc:"Free to browse all profiles. Pay only when you unlock contact details.",
    loginTitle:"Sign In", loginEmail:"Email address", loginPassword:"Password",
    loginBtn:"Sign In", loginNoAccount:"No account yet?", loginForgot:"Forgot password?",
    loginResetSent:"Password reset email sent — check your inbox.",
    alreadyHaveAccount:"Already have an account? Sign in",
    createPassword:"Create a password", confirmPassword:"Confirm password",
    passwordMismatch:"Passwords do not match.", passwordTooShort:"Password must be at least 8 characters.",
  },
  RO: {
    landingTitle:"Acces direct la talent european.",
    landingSub:"Baza de date privată de muncitori verificați — locali sau în relocare — pentru companii din Olanda și Germania. Fără aplicații. Fără taxe de agenție.",
    forComp:"Pentru Companii", forWork:"Pentru Muncitori",
    companyBtn:"Accesează ca Companie", workerBtn:"Creează Profil de Muncitor",
    compFeatures:["Bază de date privată — nu un job board","Filtre ID Verificat + BSN + cazare","Taxă lunară fixă. Fără comisioane per angajare."],
    workerFeatures:["Profil gratuit, mereu","Companiile te contactează direct","Badge-ul ID Verified crește vizibilitatea de 3x","Dashboard în timp real"],
    search:"Caută rol, abilitate, nume...", searchBtn:"Caută",
    found:"profiluri găsite", now:"Disponibil acum", soon:"Disponibil curând", later:"4+ săptămâni",
    about:"Despre", skills:"Abilități", langs:"Limbi",
    sub2:"Abonament necesar · de la €199/lună",
    workerTitle:"Creează-ți profilul",
    fname:"Nume Complet", frole:"Funcție", fexp:"Ani de experiență",
    flangs:"Limbi vorbite", fsector:"Sector", fbio:"Scurtă biografie",
    submit:"Creează Profilul",
    step1:"Info Personale", step2:"Profil Profesional", step3:"Limbi si Bio",
    availability:"Disponibilitate", availNow:"Disponibil acum", availSoon:"În 2 săptămâni", availMonth:"În 1 lună",
    openReloc:"Disponibil pentru relocare?", yes:"Da", no:"Nu",
    currentCity:"Orașul curent", currentCountry:"Unde ești în prezent",
    needsHousing:"Ai nevoie de cazare din partea angajatorului?",
    idVerified:"ID Verificat", notVerified:"Neverificat",
    dashboard:"Baza de Date", logout:"Deconectare",
    profileViews:"Vizualizări", searchApp:"Total Căutări", active:"Activ",
    bumpProfile:"Reîmprospătează Vizibilitatea", videoPitch:"Video Intro",
    email:"Adresă Email", phone:"Telefon", address:"Adresă Completă",
    compName:"Numele Companiei", kvk:"Număr Cameră de Comerț",
    compOnboardTitle:"Accesează Baza de Date",
    compOnboardSub:"Abonează-te și obții acces direct la muncitori verificați. Fără comisioane.",
    trial:"Începe Proba Gratuită 14 Zile", cancel:"Anulare oricând. Fără comisioane.",
    pricingTitle:"Acces Bază de Date", pricingSub:"Accesează toate profilurile. Contactează direct.",
    starter:"Starter", starterDesc:"Până la 10 contacte directe / lună",
    growth:"Creștere", growthDesc:"Acces nelimitat + prioritate",
    browseWorkers:"Accesează Baza de Date", allCandidates:"Toți Candidații",
    localRes:"Rezidenți", openReloc2:"Dispuși să se reloce",
    verifiedOnly:"Doar ID Verificat", noHousing:"Fără nevoie de cazare", allSectors:"Toate",
    unlockContact:"Deblochează Contactul Direct", activatePlan:"Abonează-te pentru Acces",
    contactUnlocked:"Contact Deblocat", reportProfile:"Raportează Profilul",
    lastActive:"Activ", responseRate:"Răspunde în",
    disclaimer:"Hirevo este un marketplace direct. Fără aplicații, fără interferențe de agenție. Contactează muncitorii direct. Contractele se semnează direct între părți.",
    dbWelcome:"Baza Ta de Date Talent", dbSub:"Caută profiluri verificate. Fără boarduri de joburi.",
    dbOpen:"Deschide Baza de Date", dbProfiles:"Vizualizări Profil", dbSearches:"Căutări Luna Aceasta",
    hiringCountry:"Țara de angajare", industrySector:"Sector Industrie",
    targetCountries:"Țări țintă", addLanguage:"Adaugă limbă",
    noResults:"Niciun profil nu corespunde filtrelor.",
    filters:"Filtre", candidateType:"Tip Candidat", compliance:"Conformitate",
    myAccount:"Contul Meu", editProfile:"Editează Profilul",
    sPersonal:"Info Personale", sWork:"Profil Profesional", sLangs:"Limbi & Bio",
    sContact:"Date de Contact", sAccount:"Cont & Securitate",
    saveChanges:"Salvează Modificările", saved:"Salvat",
    profileVisibility:"Vizibilitate Profil",
    visibleDesc:"Profilul tău este vizibil companiilor cu abonament.",
    hiddenDesc:"Profilul tău este ascuns de toate companiile.",
    makeVisible:"Fă Vizibil", makeHidden:"Ascunde Profilul",
    dangerZone:"Zonă Periculoasă", deleteAccount:"Șterge Contul",
    deleteConfirm:"Ești sigur? Această acțiune nu poate fi anulată.",
    deleteBtn:"Da, șterge contul meu",
    idVerifStatus:"Verificare ID", idPending:"În așteptare — pornește scanarea",
    idComplete:"Verificat — badge activ", startVerif:"Pornește Scanarea Biometrică",
    contactPrivate:"Afișate doar companiilor care deblochează profilul tău.",
    noSkillsYet:"Nicio abilitate adăugată. Mergi la Profil Profesional.",
    cancelEdit:"Anulează",
    // Company account & credits
    createFreeAccount:"Creează Cont Gratuit", freeAccountSub:"Răsfoiești toate profilurile gratuit. Plătești doar pentru datele de contact.",
    sCompany:"Profil Companie", sBilling:"Facturare & Credite",
    yourCredits:"Creditele Tale", creditsBalance:"credite disponibile",
    buyCredits:"Cumpără Credite", bundleTitle:"Pachet Credite",
    bundleDesc:"30 credite · 5 credite per deblocare contact",
    bundlePrice:"€30", buyBundle:"Cumpără Pachetul",
    unlockCost:"5 credite per deblocare",
    useCreditsBtn:"Deblochează cu Credite (5 credite)",
    notEnoughCredits:"Credite insuficiente",
    monthlyPlan:"Plan Lunar", monthlyPrice:"€370 / lună",
    monthlyDesc:"89 deblocări/lună — cu 15 mai mult decât €370 în credite",
    annualPlan:"Plan Anual", annualPrice:"€270 / lună",
    annualDesc:"Facturat anual (€3.240/an) · Economisești 27% față de lunar",
    subscribeTo:"Abonează-te",
    currentPlanLabel:"Plan Curent", freePlanLabel:"Gratuit — plătești per contact",
    activePlan:"Abonament activ", creditsAdded:"Credite adăugate!",
    chooseAccess:"Cum dorești să accesezi acest contact?",
    noCreditsHint:"Ai nevoie de 5 credite pentru a debloca. Cumpără un pachet sau abonează-te.",
    companyMyAccount:"Contul Companiei",
    deleteCompanyBtn:"Da, șterge contul companiei",
    signOutCompany:"Deconectare",
    // New features
    employmentType:"Tip Angajare", permanentLabel:"Permanent", seasonalLabel:"Sezonier", allTypes:"Toate tipurile",
    availableFromLabel:"Disponibil din",
    reviewsTitle:"Recenzii de la Companii", reviewsBased:"bazat pe", reviewsUnit:"recenzii", noReviewsYet:"Niciun review încă — fii prima companie care lasă unul.",
    msgTitle:"Mesaj", msgPlaceholder:"Scrie mesajul tău...", msgSend:"Trimite", msgSentConfirm:"Mesaj trimis",
    bulkTitle:"Pachet Bulk", bulkDesc:"100 credite · 20 deblocări contact", bulkPrice:"€85", bulkSave:"Economisești 15% față de pachete individuale", buyBulk:"Cumpără Pachetul Bulk",
    housingPartnerTitle:"Ai nevoie de cazare pentru acest muncitor?", housingPartnerDesc:"Partenerii noștri de cazare aranjează locuințe oferite de angajator în Olanda și Germania.", housingPartnerCta:"Cere o Ofertă de Cazare",
    rateCompanyTitle:"Evaluează o Companie", rateCompanyDesc:"Ajută alți muncitori evaluând companiile cu care ai lucrat.", companyNameLabel:"Numele companiei", yourRating:"Evaluarea ta", yourReview:"Recenzia ta", submitReview:"Trimite Recenzia", reviewThanks:"Mulțumim pentru feedback!",
    myReviewsTitle:"Companii cu care am lucrat",
    back:"Înapoi", dashboardLabel:"Tablou de bord", continueBtn:"Continuă", closeBtn:"Închide", orDivider:"sau", savingLabel:"Se salvează...",
    welcomeBack:"Bine ai revenit", lastUpdatedJustNow:"Actualizat chiar acum", refreshedAt:"Reîmprospătat la ",
    profilePreview:"Previzualizare Profil",
    videoPitchDesc:"Profilurile cu un video de 30 secunde primesc 40% mai multe cereri de contact.", uploadVideo:"Încarcă Video",
    completeIdVerifTitle:"Completează Verificarea ID", completeIdVerifDesc:"Deblochează badge-ul ID Verificat și obții 3x mai multe vizualizări din partea companiilor.",
    idVerificationPending:"Verificare ID în Așteptare", idVerifPendingDesc:"Finalizează scanarea pentru a obține badge-ul ID Verificat",
    deleteAccountDesc:"Șterge permanent contul tău și toate datele asociate.",
    deleteCompanyDesc:"Șterge permanent contul companiei și toate datele.",
    freeNoCard:"Gratuit — fără card necesar", noCardRequired:"Fără card necesar",
    quickFilterBySector:"Filtru Rapid pe Sector", allSectorsFull:"Toate Sectoarele",
    phoneShort:"Telefon", emailShort:"Email",
    bestValue:"Cea Mai Bună Valoare", subscriptionsTitle:"Abonamente — Deblocări Nelimitate", cancelSubscription:"Anulează abonamentul",
    currentLocationLabel:"Locație Curentă", housingLabel:"Cazare", needsHousingVal:"Are nevoie de cazare", ownHousingVal:"Cazare proprie",
    euDocsLabel:"Documente UE", validEuPassport:"Pașaport UE valid", hasBsnVal:"Are BSN", noBsnVal:"Nu are BSN",
    verifiedProfilesLabel:"Profiluri Verificate", euLanguagesLabel:"Limbi UE", agencyFeeLabel:"Comision Agenție",
    yourFullNamePh:"Numele tău complet",
    housingFormTitle:"Cerere de Cazare", housingFormCity:"Orașul de destinație", housingFormCount:"Numărul de muncitori",
    housingFormPeriod:"Perioada necesară (ex. date sau sezon)", housingFormSubmit:"Trimite Cererea",
    housingFormThanks:"Cerere trimisă — un partener de cazare te va contacta prin email.",
    heroTagline:"SaaS B2B Direct — Zero Comisioane de Agenție",
    contactPerson:"Persoană de Contact",
    cityExamplePh:"ex. Milano, Varșovia, Cluj-Napoca", roleExamplePh:"ex. Operator Stivuitor, Operator CNC",
    bioPh:"Descrie experiența ta...", bioEditPh:"Descrie experiența ta și ce cauți...",
    emailExamplePh:"tu@email.com", kvkExamplePh:"ex. 12345678", addressExamplePh:"Stradă, Oraș, Țară",
    idScanNotice:"După crearea profilului, finalizează scanarea biometrică ID pentru a primi badge-ul ID Verificat.",
    freeToBrowseDesc:"Răsfoiești toate profilurile gratuit. Plătești doar când deblochezi datele de contact.",
    loginTitle:"Conectare", loginEmail:"Adresă de email", loginPassword:"Parolă",
    loginBtn:"Conectare", loginNoAccount:"Nu ai cont?", loginForgot:"Ai uitat parola?",
    loginResetSent:"Email de resetare trimis — verifică inbox-ul.",
    alreadyHaveAccount:"Ai deja cont? Conectează-te",
    createPassword:"Creează o parolă", confirmPassword:"Confirmă parola",
    passwordMismatch:"Parolele nu se potrivesc.", passwordTooShort:"Parola trebuie să aibă cel puțin 8 caractere.",
  },
  NL: {
    landingTitle:"Directe toegang tot EU-talent.",
    landingSub:"Een privédatabase van geverifieerde werknemers — lokaal of in relocatie — voor bedrijven in Nederland en Duitsland. Geen sollicitaties. Geen bureaukosten.",
    forComp:"Voor Bedrijven", forWork:"Voor Werknemers",
    companyBtn:"Toegang als Bedrijf", workerBtn:"Maak Werknemersprofiel",
    compFeatures:["Privédatabase — geen vacaturebank","ID-gecontroleerd + BSN + huisvestingsfilters","Vast maandtarief. Geen kosten per aanwerving."],
    workerFeatures:["Altijd gratis profiel","Bedrijven nemen direct contact op","ID-badge geeft 3x meer zichtbaarheid","Realtime dashboard"],
    search:"Zoek functie, vaardigheid, naam...", searchBtn:"Zoeken",
    found:"profielen gevonden", now:"Nu beschikbaar", soon:"Binnenkort beschikbaar", later:"4+ weken",
    about:"Over", skills:"Vaardigheden", langs:"Talen",
    sub2:"Abonnement vereist · vanaf €370/maand",
    workerTitle:"Maak je profiel",
    fname:"Volledige naam", frole:"Functie", fexp:"Jaren ervaring",
    flangs:"Talen die je spreekt", fsector:"Sector", fbio:"Korte bio",
    submit:"Profiel Aanmaken",
    step1:"Persoonlijke Info", step2:"Werkprofiel", step3:"Talen & Bio",
    availability:"Beschikbaarheid", availNow:"Nu beschikbaar", availSoon:"Over 2 weken", availMonth:"Over 1 maand",
    openReloc:"Open voor verhuizing?", yes:"Ja", no:"Nee",
    currentCity:"Huidige stad", currentCountry:"Momenteel woonachtig in",
    needsHousing:"Huisvesting van werkgever nodig?",
    idVerified:"ID Gecontroleerd", notVerified:"Niet gecontroleerd",
    dashboard:"Talentendatabase", logout:"Uitloggen",
    profileViews:"Profielweergaven", searchApp:"Totaal Zoekopdrachten", active:"Actief",
    bumpProfile:"Zichtbaarheid Vernieuwen", videoPitch:"Video-intro",
    email:"E-mailadres", phone:"Telefoonnummer", address:"Volledig adres",
    compName:"Bedrijfsnaam", kvk:"KVK-nummer",
    compOnboardTitle:"Toegang tot de Talentendatabase",
    compOnboardSub:"Abonneer je eenmalig en krijg directe toegang tot geverifieerde EU-werknemers. Geen plaatsingskosten.",
    trial:"Start 14-dagen Gratis Proefperiode", cancel:"Altijd opzegbaar. Geen plaatsingskosten.",
    pricingTitle:"Databasetoegang", pricingSub:"Bekijk alle geverifieerde profielen. Neem direct contact op.",
    starter:"Starter", starterDesc:"Tot 10 directe contacten / maand",
    growth:"Groei", growthDesc:"Onbeperkte toegang + prioriteitsvermeldingen",
    browseWorkers:"Database Doorzoeken", allCandidates:"Alle Kandidaten",
    localRes:"Inwoners", openReloc2:"Open voor Verhuizing",
    verifiedOnly:"Alleen ID Gecontroleerd", noHousing:"Geen Huisvesting Nodig", allSectors:"Alle",
    unlockContact:"Direct Contact Ontgrendelen", activatePlan:"Abonneren voor Toegang",
    contactUnlocked:"Contact Ontgrendeld", reportProfile:"Profiel Rapporteren",
    lastActive:"Actief", responseRate:"Reageert binnen",
    disclaimer:"Hirevo is een directe marktplaats. Geen sollicitaties, geen bureau-inmenging. Neem direct contact op met werknemers. Alle contracten worden rechtstreeks tussen partijen getekend.",
    dbWelcome:"Jouw Talentendatabase", dbSub:"Doorzoek geverifieerde profielen. Geen vacaturebanken, geen irrelevante sollicitaties.",
    dbOpen:"Database Openen", dbProfiles:"Profielweergaven", dbSearches:"Zoekopdrachten Deze Maand",
    hiringCountry:"Land van Aanwerving", industrySector:"Sector",
    targetCountries:"Doellanden", addLanguage:"Taal toevoegen",
    noResults:"Geen profielen komen overeen met je filters.",
    filters:"Filters", candidateType:"Kandidaattype", compliance:"Naleving",
    myAccount:"Mijn Account", editProfile:"Profiel Bewerken",
    sPersonal:"Persoonlijke Info", sWork:"Werkprofiel", sLangs:"Talen & Bio",
    sContact:"Contactgegevens", sAccount:"Account & Beveiliging",
    saveChanges:"Wijzigingen Opslaan", saved:"Opgeslagen",
    profileVisibility:"Profielzichtbaarheid",
    visibleDesc:"Je profiel is zichtbaar voor geabonneerde bedrijven.",
    hiddenDesc:"Je profiel is verborgen voor alle bedrijven.",
    makeVisible:"Zichtbaar Maken", makeHidden:"Profiel Verbergen",
    dangerZone:"Gevarenzone", deleteAccount:"Account Verwijderen",
    deleteConfirm:"Weet je het zeker? Dit kan niet ongedaan worden gemaakt.",
    deleteBtn:"Ja, verwijder mijn account",
    idVerifStatus:"ID-verificatie", idPending:"In behandeling — start scan voor badge",
    idComplete:"Geverifieerd — badge actief", startVerif:"Start Biometrische Scan",
    contactPrivate:"Alleen getoond aan bedrijven die je profiel ontgrendelen.",
    noSkillsYet:"Nog geen vaardigheden toegevoegd. Ga naar Werkprofiel om toe te voegen.",
    cancelEdit:"Annuleren",
    // Company account & credits
    createFreeAccount:"Gratis Account Aanmaken", freeAccountSub:"Bekijk alle profielen gratis. Betaal alleen om contactgegevens te ontgrendelen.",
    sCompany:"Bedrijfsprofiel", sBilling:"Facturering & Credits",
    yourCredits:"Jouw Credits", creditsBalance:"credits beschikbaar",
    buyCredits:"Credits Kopen", bundleTitle:"Creditsbundel",
    bundleDesc:"30 credits · 5 credits per ontgrendeling",
    bundlePrice:"€30", buyBundle:"Bundel Kopen",
    unlockCost:"5 credits per ontgrendeling",
    useCreditsBtn:"Ontgrendelen met Credits (5 credits)",
    notEnoughCredits:"Niet genoeg credits",
    monthlyPlan:"Maandabonnement", monthlyPrice:"€370 / maand",
    monthlyDesc:"89 ontgrendelingen/maand — 15 meer dan €370 aan credits",
    annualPlan:"Jaarabonnement", annualPrice:"€270 / maand",
    annualDesc:"Jaarlijks gefactureerd (€3.240/jr) · Bespaar 27% t.o.v. maandelijks",
    subscribeTo:"Abonneren",
    currentPlanLabel:"Huidig Abonnement", freePlanLabel:"Gratis — betaal per contact",
    activePlan:"Actief abonnement", creditsAdded:"Credits toegevoegd!",
    chooseAccess:"Hoe wil je dit contact benaderen?",
    noCreditsHint:"Je hebt 5 credits nodig om te ontgrendelen. Koop een bundel of abonneer je.",
    companyMyAccount:"Bedrijfsaccount",
    deleteCompanyBtn:"Ja, verwijder bedrijfsaccount",
    signOutCompany:"Uitloggen",
    // New features
    employmentType:"Type Dienstverband", permanentLabel:"Vast", seasonalLabel:"Seizoensgebonden", allTypes:"Alle types",
    availableFromLabel:"Beschikbaar vanaf",
    reviewsTitle:"Bedrijfsrecensies", reviewsBased:"gebaseerd op", reviewsUnit:"recensies", noReviewsYet:"Nog geen recensies — wees het eerste bedrijf dat er een achterlaat.",
    msgTitle:"Bericht", msgPlaceholder:"Typ je bericht...", msgSend:"Versturen", msgSentConfirm:"Bericht verzonden",
    bulkTitle:"Bulkpakket", bulkDesc:"100 credits · 20 contactontgrendelingen", bulkPrice:"€85", bulkSave:"Bespaar 15% t.o.v. losse bundels", buyBulk:"Bulkpakket Kopen",
    housingPartnerTitle:"Huisvesting nodig voor deze medewerker?", housingPartnerDesc:"Onze huisvestingspartners regelen werkgevershuisvesting in Nederland en Duitsland.", housingPartnerCta:"Vraag een Huisvestingsofferte aan",
    rateCompanyTitle:"Beoordeel een Bedrijf", rateCompanyDesc:"Help andere werknemers door bedrijven te beoordelen waarmee je hebt gewerkt.", companyNameLabel:"Bedrijfsnaam", yourRating:"Jouw beoordeling", yourReview:"Jouw recensie", submitReview:"Recensie Versturen", reviewThanks:"Bedankt voor je feedback!",
    myReviewsTitle:"Bedrijven waarmee ik heb gewerkt",
    back:"Terug", dashboardLabel:"Dashboard", continueBtn:"Doorgaan", closeBtn:"Sluiten", orDivider:"of", savingLabel:"Opslaan...",
    welcomeBack:"Welkom terug", lastUpdatedJustNow:"Net bijgewerkt", refreshedAt:"Vernieuwd om ",
    profilePreview:"Profielvoorbeeld",
    videoPitchDesc:"Profielen met een video van 30 seconden krijgen 40% meer contactaanvragen.", uploadVideo:"Video Uploaden",
    completeIdVerifTitle:"Voltooi ID-verificatie", completeIdVerifDesc:"Ontgrendel de ID-gecontroleerd badge en krijg 3x meer weergaven van bedrijven.",
    idVerificationPending:"ID-verificatie in behandeling", idVerifPendingDesc:"Voltooi de scan om de ID-gecontroleerd badge te krijgen",
    deleteAccountDesc:"Verwijder permanent je account en alle bijbehorende gegevens.",
    deleteCompanyDesc:"Verwijder permanent je bedrijfsaccount en alle gegevens.",
    freeNoCard:"Gratis — geen creditcard nodig", noCardRequired:"Geen creditcard nodig",
    quickFilterBySector:"Snel Filteren op Sector", allSectorsFull:"Alle Sectoren",
    phoneShort:"Telefoon", emailShort:"E-mail",
    bestValue:"Beste Waarde", subscriptionsTitle:"Abonnementen — Onbeperkte Ontgrendelingen", cancelSubscription:"Abonnement opzeggen",
    currentLocationLabel:"Huidige Locatie", housingLabel:"Huisvesting", needsHousingVal:"Huisvesting nodig", ownHousingVal:"Eigen huisvesting",
    euDocsLabel:"EU-documenten", validEuPassport:"Geldig EU-paspoort", hasBsnVal:"Heeft BSN", noBsnVal:"Geen BSN",
    verifiedProfilesLabel:"Geverifieerde Profielen", euLanguagesLabel:"EU-talen", agencyFeeLabel:"Bureaukosten",
    yourFullNamePh:"Je volledige naam",
    housingFormTitle:"Huisvestingsverzoek", housingFormCity:"Bestemmingsstad", housingFormCount:"Aantal werknemers",
    housingFormPeriod:"Benodigde periode (bijv. data of seizoen)", housingFormSubmit:"Verstuur Aanvraag",
    housingFormThanks:"Aanvraag verzonden — een huisvestingspartner neemt per e-mail contact op.",
    heroTagline:"B2B Direct SaaS — Geen Bureaukosten",
    contactPerson:"Contactpersoon",
    cityExamplePh:"bijv. Milaan, Warschau, Cluj-Napoca", roleExamplePh:"bijv. Heftruckchauffeur, CNC-operator",
    bioPh:"Beschrijf je ervaring...", bioEditPh:"Beschrijf je ervaring en wat je zoekt...",
    emailExamplePh:"jij@email.com", kvkExamplePh:"bijv. 12345678", addressExamplePh:"Straat, Stad, Land",
    idScanNotice:"Voltooi na het aanmaken van je profiel de biometrische ID-scan om de ID-gecontroleerd badge te ontvangen.",
    freeToBrowseDesc:"Gratis om alle profielen te bekijken. Betaal alleen wanneer je contactgegevens ontgrendelt.",
    loginTitle:"Inloggen", loginEmail:"E-mailadres", loginPassword:"Wachtwoord",
    loginBtn:"Inloggen", loginNoAccount:"Nog geen account?", loginForgot:"Wachtwoord vergeten?",
    loginResetSent:"Wachtwoord reset e-mail verzonden — controleer je inbox.",
    alreadyHaveAccount:"Al een account? Inloggen",
    createPassword:"Maak een wachtwoord aan", confirmPassword:"Bevestig wachtwoord",
    passwordMismatch:"Wachtwoorden komen niet overeen.", passwordTooShort:"Wachtwoord moet minimaal 8 tekens bevatten.",
  },
};
const getLang = c => T[c] || T.EN;

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const SECTORS = ["All","Logistics","Manufacturing","Hospitality","Construction","Agriculture","Cleaning"];
const DEST_COUNTRIES = ["NL","DE"];
const ORIGIN_COUNTRIES = ["RO","PL","BG","HU","CZ","SK","HR","LT","LV","EE","SI","RS","MK","NL","DE"];
const SKILLS_MAP = {
  Logistics:["Forklift VCA","Order Picking","Warehouse Ops","WMS Software","Heavy Load","Inventory","Route Planning"],
  Manufacturing:["Assembly Line","CNC Machine","Quality Control","Welding","Metal Work","CAD/CAM","Lean Manufacturing"],
  Hospitality:["Room Service","Front Desk","Kitchen Staff","HACCP","Customer Service","Bartending","Cooking"],
  Construction:["Masonry","Carpentry","Tiling","Scaffolding","Plumbing","Electrical","Renovation"],
  Agriculture:["Greenhouse Work","Harvesting","Packaging","Plant Care","Irrigation","Field Work"],
  Cleaning:["Office Cleaning","Industrial Cleaning","Floor Care","BHV Basic","Team Leading","Deep Clean"],
};
const AVAIL_CFG = {
  green:{ cls:"bg-emerald-100 text-emerald-700", dot:"bg-emerald-500" },
  amber:{ cls:"bg-amber-100 text-amber-700", dot:"bg-amber-400" },
  gray:{ cls:"bg-slate-100 text-slate-500", dot:"bg-slate-400" },
};
const WORKERS = [
  { id:1, name:"Marco Rossi", initials:"MR", accent:"#16A34A", role:"CNC Machine Operator", sector:"Manufacturing", exp:"9 yrs", rating:4.9, placed:4, avail:"green", currentLoc:"DE", currentCity:"Stuttgart", openToRelocation:false, targetCountries:["DE"], isIdVerified:true, hasBsn:false, needsHousing:false, langs:["Italian","German","English"], skills:["CNC Machine","CAD/CAM","Quality Control","ISO Standards"], bio:"Senior CNC operator, 9 years precision manufacturing. Local resident in Germany, not relocating. Fully documented EU citizen.", phone:"+49 711 220 4456", email:"marco.rossi@hirevo-talent.eu", lastActive:"2h ago", hasVideo:true, responseRate:"under 1 hr", employmentType:"permanent", availableFrom:"Immediate", reviews:[{company:"Bergmann Fertigungstechnik GmbH",rating:5,text:"Reliable and skilled, exactly as described. Started on the agreed date with no issues."},{company:"NordPack Manufacturing",rating:4.8,text:"Great communication throughout, would hire again."}] },
  { id:2, name:"Elena Marin", initials:"EM", accent:"#7C3AED", role:"Hotel Service Manager", sector:"Hospitality", exp:"5 yrs", rating:4.8, placed:3, avail:"green", currentLoc:"RO", currentCity:"Brașov", openToRelocation:true, targetCountries:["NL","DE"], isIdVerified:true, hasBsn:true, needsHousing:false, langs:["Romanian","German","English"], skills:["Front Desk","Room Service","Team Lead","F&B Service"], bio:"Romanian national. Already has a Dutch BSN from a previous contract — ready to relocate again. Trilingual. Own housing.", phone:"+40 722 889 3312", email:"elena.marin@hirevo-talent.eu", lastActive:"1 day ago", hasVideo:false, responseRate:"3 hrs", employmentType:"permanent", availableFrom:"Immediate", reviews:[{company:"Hotel Aurora Group",rating:4.7,text:"Professional and warm with guests, picked up our systems quickly."}] },
  { id:3, name:"Piotr Kowalski", initials:"PK", accent:"#DC2626", role:"Warehouse Supervisor", sector:"Logistics", exp:"8 yrs", rating:4.9, placed:4, avail:"amber", currentLoc:"PL", currentCity:"Warsaw", openToRelocation:true, targetCountries:["NL","DE"], isIdVerified:true, hasBsn:false, needsHousing:true, langs:["Polish","English","German"], skills:["Order Picking","WMS Software","Team Management","Inventory"], bio:"8 years logistics, last 3 as supervisor. Targeting NL or DE. Needs housing arrangement.", phone:"+48 721 445 8832", email:"piotr.kowalski@hirevo-talent.eu", lastActive:"5h ago", hasVideo:true, responseRate:"under 1 hr", employmentType:"permanent", availableFrom:"2 weeks notice", reviews:[{company:"Rotterdam Distro BV",rating:5,text:"Best warehouse supervisor we've hired through Hirevo so far."},{company:"LogiCore NL",rating:4.8,text:"Strong leadership, zero no-shows on his shifts."}] },
  { id:4, name:"Mihai Popescu", initials:"MP", accent:"#2563EB", role:"Forklift Operator", sector:"Logistics", exp:"4 yrs", rating:4.7, placed:2, avail:"green", currentLoc:"RO", currentCity:"Cluj-Napoca", openToRelocation:true, targetCountries:["NL"], isIdVerified:false, hasBsn:false, needsHousing:true, langs:["Romanian","English"], skills:["Forklift VCA","Warehouse Ops","Heavy Load","Inventory"], bio:"Experienced forklift operator. Valid EU passport. Biometric verification pending. Needs housing.", phone:"+40 722 334 6671", email:"mihai.popescu@hirevo-talent.eu", lastActive:"3 days ago", hasVideo:false, responseRate:"12 hrs", employmentType:"permanent", availableFrom:"Immediate", reviews:[] },
  { id:5, name:"Jana Novák", initials:"JN", accent:"#0891B2", role:"Hotel Receptionist", sector:"Hospitality", exp:"3 yrs", rating:4.8, placed:1, avail:"green", currentLoc:"NL", currentCity:"Amsterdam", openToRelocation:false, targetCountries:["NL"], isIdVerified:true, hasBsn:true, needsHousing:false, langs:["Czech","English","Dutch"], skills:["Front Desk","PMS Systems","Guest Relations","Admin"], bio:"Czech national, settled in Amsterdam 2 years. BSN obtained, own housing. Immediately available.", phone:"+31 6 4512 3378", email:"jana.novak@hirevo-talent.eu", lastActive:"10 min ago", hasVideo:true, responseRate:"under 1 hr", employmentType:"permanent", availableFrom:"Immediate", reviews:[{company:"Amsterdam Canal Hotels",rating:4.9,text:"Excellent receptionist, very dependable and guest-focused."}] },
  { id:6, name:"Ana García", initials:"AG", accent:"#EA580C", role:"Greenhouse Worker", sector:"Agriculture", exp:"3 yrs", rating:4.6, placed:2, avail:"green", currentLoc:"BG", currentCity:"Plovdiv", openToRelocation:true, targetCountries:["NL","DE"], isIdVerified:true, hasBsn:false, needsHousing:true, langs:["Bulgarian","English"], skills:["Greenhouse Work","Harvesting","Packaging","Quality Sorting"], bio:"3 years greenhouse farming experience. Targeting the NL greenhouse sector for the season. Needs accommodation.", phone:"+359 88 612 7782", email:"ana.garcia@hirevo-talent.eu", lastActive:"1 week ago", hasVideo:false, responseRate:"24 hrs", employmentType:"seasonal", availableFrom:"Jun – Oct 2026", reviews:[{company:"Westland Greenhouses",rating:4.6,text:"Hard worker, came back for a second season with us."}] },
];

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function CountryBadge({ code }) {
  return (
    <span className="inline-flex items-center text-[10px] font-black px-1.5 py-0.5 rounded tracking-wider"
      style={{ background:"#E2E8F0", color:"#475569" }}>
      {code}
    </span>
  );
}

function AvailBadge({ avail, t }) {
  const a = AVAIL_CFG[avail] || AVAIL_CFG.gray;
  const label = avail === "green" ? t.now : avail === "amber" ? t.soon : t.later;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold ${a.cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
      {label}
    </span>
  );
}

function VerifiedBadge({ t }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full"
      style={{ background:"#DCFCE7", color:"#166534" }}>
      <Shield className="w-2.5 h-2.5" />
      {t.idVerified}
    </span>
  );
}

function UnverifiedBadge({ t }) {
  return (
    <span className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ background:"#FEF3C7", color:"#92400E" }}>
      {t.notVerified}
    </span>
  );
}

function LangPicker({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const cl = LANGS.find(l => l.code === lang) || LANGS[0];
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors"
        style={{ background:"rgba(255,255,255,0.1)" }}>
        {cl.code} <ChevronDown className="w-3 h-3 opacity-60" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
          style={{ width:180, maxHeight:260, overflowY:"auto" }}>
          {LANGS.map(l => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-slate-50 transition-colors"
              style={{ background:lang===l.code?"#EEF2FF":undefined, color:lang===l.code?C.indigo:"#374151", fontWeight:lang===l.code?"700":"400" }}>
              <span>{l.name}</span>
              <span className="text-xs font-black text-slate-400">{l.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Nav({ lang, setLang, back, backLabel, title, onLogoClick }) {
  return (
    <nav className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-md"
      style={{ background:C.navy, borderBottom:`2px solid ${C.indigo}` }}>
      <div className="flex items-center gap-3 min-w-0">
        {back && (
          <button onClick={back}
            className="text-slate-400 hover:text-white text-xs font-semibold transition-colors whitespace-nowrap flex-shrink-0">
            {backLabel || "Back"}
          </button>
        )}
        <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={onLogoClick}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs"
            style={{ background:C.indigo }}>N</div>
          <span className="font-black text-white tracking-tight text-base">
            Hirevo<span style={{ color:C.indigoLight }}>.</span>
          </span>
        </div>
        {title && <span className="text-slate-500 text-xs truncate hidden sm:inline ml-1">/ {title}</span>}
      </div>
      <LangPicker lang={lang} setLang={setLang} />
    </nav>
  );
}

// ─── COUNTRY → LANGUAGE MAP ──────────────────────────────────────────────────
const COUNTRY_LANG = {
  RO:"RO",
  NL:"NL", BE:"NL",
  GB:"EN", US:"EN", IE:"EN", AU:"EN", CA:"EN", NZ:"EN",
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [lang, setLang] = useState("EN");
  const [geoNotice, setGeoNotice] = useState(null); // { country, langName }
  const t = getLang(lang);

  // Worker
  const [wStep, setWStep] = useState(1);
  const [wForm, setWForm] = useState({
    name:"", currentLoc:"RO", currentCity:"", openToRelocation:false,
    targetCountries:[], sector:"Logistics", role:"", experience:"",
    skills:[], languages:[{ name:"Romanian" }], availability:"now",
    bio:"", needsHousing:false, email:"", phone:"",
    employmentType:"permanent", availableFrom:""
  });
  const [workerProfile, setWorkerProfile] = useState(null);
  const [langInput, setLangInput] = useState("");
  const [bumpStatus, setBumpStatus] = useState(null);

  // ── SUPABASE AUTH STATE ────────────────────────────────────────────────────
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [supaUser, setSupaUser] = useState(null);

  useEffect(() => {
    const loadProfile = async (user) => {
      if (!user) return;
      const role = user.user_metadata?.role;
      if (role === "worker") {
        const { data } = await supabase.from("workers").select("*").eq("user_id", user.id).single();
        if (data) {
          setWorkerProfile({
            name: data.name, email: data.email, role: data.role, sector: data.sector,
            experience: data.experience, currentLoc: data.current_loc, currentCity: data.current_city,
            openToRelocation: data.open_to_relocation, targetCountries: data.target_countries || [],
            needsHousing: data.needs_housing, availability: data.availability,
            employmentType: data.employment_type, availableFrom: data.available_from,
            bio: data.bio, phone: data.phone, skills: data.skills || [],
            languages: (data.languages||[]).map(l=>({name:l})),
          });
          setProfileVisible(data.is_visible ?? true);
          go("workerDash");
        }
      } else if (role === "company") {
        const { data } = await supabase.from("companies").select("*").eq("user_id", user.id).single();
        if (data) {
          setCompanyProfile({
            compName: data.comp_name, email: data.email, kvk: data.kvk,
            phone: data.phone, address: data.address,
            destCountry: data.dest_country, industry: data.industry,
          });
          go("companyDash");
        }
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupaUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupaUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Worker account/edit
  const [editSection, setEditSection] = useState("personal");
  const [editForm, setEditForm] = useState(null);
  const [editLangInput, setEditLangInput] = useState("");
  const [saveStatus, setSaveStatus] = useState(null); // null | "saving" | "saved"
  const [profileVisible, setProfileVisible] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Company
  const [cForm, setCForm] = useState({ compName:"", kvk:"", email:"", phone:"", address:"", destCountry:"NL", industry:"Logistics" });
  const [companyProfile, setCompanyProfile] = useState(null);
  const [credits, setCredits] = useState(0);
  const [companyPlan, setCompanyPlan] = useState(null); // null | "monthly" | "annual"
  const [companyEditSection, setCompanyEditSection] = useState("company");
  const [companyEditForm, setCompanyEditForm] = useState(null);
  const [companySaveStatus, setCompanySaveStatus] = useState(null);
  const [showCompanyDeleteConfirm, setShowCompanyDeleteConfirm] = useState(false);

  // Browse
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");
  const [workerTypeTab, setWorkerTypeTab] = useState("all");
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterNoHousing, setFilterNoHousing] = useState(false);
  const [filterEmployment, setFilterEmployment] = useState("all"); // all | permanent | seasonal
  const [showFilters, setShowFilters] = useState(false);

  // Messaging (post-unlock)
  const [messagesByWorker, setMessagesByWorker] = useState({});
  const [msgInput, setMsgInput] = useState("");

  // Worker-side: rate a company
  const [myReviews, setMyReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ company:"", rating:5, text:"" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Housing partner lead form
  const [showHousingForm, setShowHousingForm] = useState(false);
  const [housingForm, setHousingForm] = useState({ city:"", workerCount:"1", period:"" });
  const [housingRequests, setHousingRequests] = useState([]);
  const [housingSubmitted, setHousingSubmitted] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginResetSent, setLoginResetSent] = useState(false);

  // Registration passwords
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");

  // Modals
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState(new Set()); // tracks unlocked workers
  const [bundleFlash, setBundleFlash] = useState(false);    // feedback after buying bundle
  const [bulkFlash, setBulkFlash] = useState(false);        // feedback after buying bulk pack
  const [creditSpend, setCreditSpend] = useState(null);     // { before, after } shown on success screen

  const wf = (k, v) => setWForm(p => ({ ...p, [k]:v }));
  const cf = (k, v) => setCForm(p => ({ ...p, [k]:v }));
  const ef = (k, v) => setEditForm(p => ({ ...p, [k]:v }));
  const toggleSkill = sk => { const c = wForm.skills; wf("skills", c.includes(sk) ? c.filter(s=>s!==sk) : (c.length<8?[...c,sk]:c)); };
  const toggleEditSkill = sk => { const c = editForm.skills||[]; ef("skills", c.includes(sk)?c.filter(s=>s!==sk):(c.length<8?[...c,sk]:c)); };
  const toggleTarget = c => { const cur = wForm.targetCountries; wf("targetCountries", cur.includes(c)?cur.filter(x=>x!==c):[...cur,c]); };
  const toggleEditTarget = c => { const cur = editForm.targetCountries||[]; ef("targetCountries", cur.includes(c)?cur.filter(x=>x!==c):[...cur,c]); };
  const addLang = () => { if (langInput.trim()&&!wForm.languages.find(l=>l.name===langInput.trim())) { wf("languages",[...wForm.languages,{name:langInput.trim()}]); setLangInput(""); }};
  const addEditLang = () => { if (editLangInput.trim()&&!(editForm.languages||[]).find(l=>l.name===editLangInput.trim())) { ef("languages",[...(editForm.languages||[]),{name:editLangInput.trim()}]); setEditLangInput(""); }};

  const openEdit = (section) => {
    setEditForm({ ...workerProfile });
    setEditSection(section);
    setShowDeleteConfirm(false);
    setSaveStatus(null);
    go("workerAccount");
  };

  const saveEdit = async () => {
    setSaveStatus("saving");
    if (supaUser) {
      await supabase.from("workers").update({
        name: editForm.name, role: editForm.role, sector: editForm.sector,
        experience: editForm.experience, current_loc: editForm.currentLoc,
        current_city: editForm.currentCity, open_to_relocation: editForm.openToRelocation,
        target_countries: editForm.targetCountries, needs_housing: editForm.needsHousing,
        availability: editForm.availability, employment_type: editForm.employmentType,
        available_from: editForm.availableFrom, bio: editForm.bio,
        phone: editForm.phone, skills: editForm.skills,
        languages: (editForm.languages||[]).map(l=>l.name),
        is_visible: profileVisible,
      }).eq("user_id", supaUser.id);
    }
    setWorkerProfile({ ...editForm });
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(null), 2500);
  };

  const openCompanyEdit = (section) => {
    setCompanyEditForm({ ...companyProfile });
    setCompanyEditSection(section);
    setShowCompanyDeleteConfirm(false);
    setCompanySaveStatus(null);
    go("companyAccount");
  };

  const saveCompanyEdit = async () => {
    setCompanySaveStatus("saving");
    if (supaUser) {
      await supabase.from("companies").update({
        comp_name: companyEditForm.compName, phone: companyEditForm.phone,
        address: companyEditForm.address, dest_country: companyEditForm.destCountry,
        industry: companyEditForm.industry,
      }).eq("user_id", supaUser.id);
    }
    setCompanyProfile({ ...companyEditForm });
    setCompanySaveStatus("saved");
    setTimeout(() => setCompanySaveStatus(null), 2500);
  };

  const hasAccess = companyPlan !== null || credits >= 5;

  const doUnlock = () => {
    if (!selectedWorker) return;
    if (companyPlan) {
      setUnlockedIds(prev => new Set(prev).add(selectedWorker.id));
      setCreditSpend(null);
      setContactSent(true);
      return;
    }
    if (credits >= 5) {
      const before = credits;
      const after  = credits - 5;
      setCredits(after);
      setCreditSpend({ before, after });
      setUnlockedIds(prev => new Set(prev).add(selectedWorker.id));
      setContactSent(true);
    }
  };

  const buyBundle = () => {
    setCredits(c => c + 30);
    setBundleFlash(true);
    setTimeout(() => setBundleFlash(false), 3000);
  };

  const buyBulk = () => {
    setCredits(c => c + 100);
    setBulkFlash(true);
    setTimeout(() => setBulkFlash(false), 3000);
  };

  const sendMessage = () => {
    if (!msgInput.trim() || !selectedWorker) return;
    const wid = selectedWorker.id;
    const now = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
    setMessagesByWorker(prev => ({
      ...prev,
      [wid]: [...(prev[wid]||[]), { from:"company", text:msgInput.trim(), time:now }]
    }));
    setMsgInput("");
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });
      setMessagesByWorker(prev => ({
        ...prev,
        [wid]: [...(prev[wid]||[]), { from:"worker", text:"Thanks for reaching out — I'll get back to you shortly.", time:replyTime }]
      }));
    }, 1400);
  };

  const submitMyReview = () => {
    if (!reviewForm.company.trim()) return;
    setMyReviews(prev => [...prev, { ...reviewForm }]);
    setReviewForm({ company:"", rating:5, text:"" });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 2500);
  };

  const submitHousingRequest = () => {
    if (!housingForm.city.trim()) return;
    // TODO(Supabase): insert into `housing_requests` table { company_id, worker_id, city, worker_count, period, created_at }
    setHousingRequests(prev => [...prev, {
      ...housingForm,
      workerId: selectedWorker?.id,
      workerName: selectedWorker?.name,
      companyName: companyProfile?.compName,
      createdAt: new Date().toISOString(),
    }]);
    setHousingForm({ city:"", workerCount:"1", period:"" });
    setShowHousingForm(false);
    setHousingSubmitted(true);
    setTimeout(() => setHousingSubmitted(false), 3000);
  };

  // ── IP GEOLOCATION ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        const cc = data.country_code;
        const detected = COUNTRY_LANG[cc];
        if (detected && LANGS.find(l => l.code === detected)) {
          setLang(detected);
          const langName = LANGS.find(l => l.code === detected)?.name || detected;
          setGeoNotice({ country: data.country_name || cc, langName });
          // Auto-dismiss after 6 seconds
          setTimeout(() => setGeoNotice(null), 6000);
        }
      })
      .catch(() => {}); // Silent fail — keep default EN
  }, []);

  const destCC = companyProfile?.destCountry || "NL";
  const filtered = WORKERS.filter(w => {
    if (!w.targetCountries.includes(destCC) && w.currentLoc !== destCC) return false;
    if (sector !== "All" && w.sector !== sector) return false;
    if (search && ![w.name,w.role,...w.skills].some(s=>s.toLowerCase().includes(search.toLowerCase()))) return false;
    if (workerTypeTab === "local" && w.currentLoc !== destCC) return false;
    if (workerTypeTab === "relocate" && w.currentLoc === destCC) return false;
    if (filterVerified && !w.isIdVerified) return false;
    if (filterNoHousing && w.needsHousing) return false;
    if (filterEmployment !== "all" && w.employmentType !== filterEmployment) return false;
    return true;
  });

  const wi = workerProfile ? workerProfile.name.split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2) : "??";
  const go = (s) => setScreen(s);
  const navProps = { lang, setLang, onLogoClick:()=>go("landing") };

  // ── LANDING ────────────────────────────────────────────────────────────────
  if (screen === "landing") return (
    <div className="min-h-screen" style={{ background:C.navy, fontFamily:"system-ui,sans-serif" }}>
      <Nav {...navProps} />

      {/* Geo-detection notice */}
      {geoNotice && (
        <div className="px-4 py-2 flex items-center justify-between text-xs"
          style={{ background:"rgba(79,70,229,0.15)", borderBottom:"1px solid rgba(79,70,229,0.25)" }}>
          <div className="flex items-center gap-2" style={{ color:C.indigoLight }}>
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              Location detected: <strong>{geoNotice.country}</strong> — interface switched to <strong>{geoNotice.langName}</strong>
            </span>
          </div>
          <button onClick={() => setGeoNotice(null)}
            className="ml-4 flex-shrink-0 hover:opacity-70 transition-opacity"
            style={{ color:C.indigoLight }}>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4 pt-14 pb-20">
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-8"
            style={{ background:"rgba(79,70,229,0.2)", color:C.indigoLight, border:`1px solid rgba(79,70,229,0.3)` }}>
            {t.heroTagline}
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
            {t.landingTitle}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">{t.landingSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-14">
          {/* Company */}
          <div className="rounded-2xl p-6 flex flex-col gap-5"
            style={{ background:"rgba(79,70,229,0.08)", border:`2px solid rgba(79,70,229,0.35)` }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4" style={{ color:C.indigoLight }} />
                <span className="font-black text-white">{t.forComp}</span>
              </div>
              <div className="space-y-2">
                {t.compFeatures.map((f,i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color:C.indigoLight }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => go("companyReg")}
              className="w-full py-3 rounded-xl font-black text-sm text-white hover:opacity-90 transition-opacity"
              style={{ background:C.indigo }}>
              {t.companyBtn}
            </button>
          </div>

          {/* Worker */}
          <div className="rounded-2xl p-6 flex flex-col gap-5"
            style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="font-black text-white">{t.forWork}</span>
              </div>
              <div className="space-y-2">
                {t.workerFeatures.map((f,i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-400" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => go("workerReg")}
              className="w-full py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity"
              style={{ background:"#10B981", color:C.navy }}>
              {t.workerBtn}
            </button>
          </div>
        </div>

        <button onClick={()=>{ setAuthError(""); setAuthSuccess(""); setLoginEmail(""); setLoginPassword(""); setLoginResetSent(false); go("login"); }}
          className="w-full py-2.5 rounded-xl text-sm font-bold border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 transition-colors">
          {t.alreadyHaveAccount}
        </button>

        <div className="flex justify-center gap-12">
          {[{ n:WORKERS.length, l:t.verifiedProfilesLabel },{ n:"25", l:t.euLanguagesLabel },{ n:"0%", l:t.agencyFeeLabel }].map((s,i) => (
            <div key={i} className="text-center">
              <div className="font-black text-3xl text-white">{s.n}</div>
              <div className="text-xs text-slate-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── LOGIN SCREEN ──────────────────────────────────────────────────────────
  if (screen === "login") return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily:"system-ui,sans-serif" }}>
      <Nav {...navProps} back={() => go("landing")} backLabel={t.back} title={t.loginTitle} />
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-black" style={{ color:C.navy }}>{t.loginTitle}</h2>
          {authError && <div className="rounded-xl px-3 py-2.5 text-sm font-bold" style={{ background:"#FEF2F2", color:"#991B1B" }}>{authError}</div>}
          {authSuccess && <div className="rounded-xl px-3 py-2.5 text-sm font-bold" style={{ background:"#F0FDF4", color:"#166534" }}>{authSuccess}</div>}
          {loginResetSent && <div className="rounded-xl px-3 py-2.5 text-sm font-bold" style={{ background:"#EEF2FF", color:C.indigo }}>{t.loginResetSent}</div>}
          <input className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
            type="email" placeholder={t.loginEmail} value={loginEmail}
            onChange={e=>setLoginEmail(e.target.value)} />
          <input className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
            type="password" placeholder={t.loginPassword} value={loginPassword}
            onChange={e=>setLoginPassword(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter") document.getElementById("loginBtn").click(); }} />
          <button id="loginBtn" disabled={authLoading}
            onClick={async()=>{
              setAuthError(""); setAuthSuccess("");
              if (!loginEmail.trim() || !loginPassword.trim()) { setAuthError("Please fill in email and password."); return; }
              setAuthLoading(true);
              const { error } = await supabase.auth.signInWithPassword({
                email: loginEmail.trim().toLowerCase(), password: loginPassword
              });
              setAuthLoading(false);
              if (error) { setAuthError(error.message); }
            }}
            className="w-full py-3 rounded-xl text-white font-black text-sm disabled:opacity-60"
            style={{ background:C.indigo }}>
            {authLoading ? "Signing in..." : t.loginBtn}
          </button>
          <button onClick={async()=>{
            if (!loginEmail.trim()) { setAuthError("Enter your email first."); return; }
            setAuthError("");
            await supabase.auth.resetPasswordForEmail(loginEmail.trim(), { redirectTo:"https://hirevo.nl" });
            setLoginResetSent(true);
          }} className="w-full text-xs text-slate-400 font-semibold py-1">
            {t.loginForgot}
          </button>
          <button onClick={()=>go("landing")} className="w-full text-xs text-slate-400 font-semibold py-1">
            {t.loginNoAccount}
          </button>
        </div>
      </div>
    </div>
  );

  // ── WORKER REGISTRATION ────────────────────────────────────────────────────
  if (screen === "workerReg") return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily:"system-ui,sans-serif" }}>
      <Nav {...navProps} back={() => go("landing")} backLabel={t.back} title={t.workerTitle} />
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Progress */}
        <div className="flex gap-1.5 mb-2">
          {[1,2,3].map(i => (
            <div key={i} className="flex-1 h-1 rounded-full transition-colors"
              style={{ background:i<=wStep?C.indigo:"#E2E8F0" }} />
          ))}
        </div>
        <p className="text-xs font-black mb-1 tracking-widest uppercase" style={{ color:C.indigo }}>
          Step {wStep} of 3
        </p>
        <h2 className="text-xl font-black mb-6" style={{ color:C.navy }}>
          {wStep===1?t.step1:wStep===2?t.step2:t.step3}
        </h2>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">

          {/* Step 1 */}
          {wStep===1 && <>
            <Field label={`${t.fname} *`}>
              <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                value={wForm.name} onChange={e=>wf("name",e.target.value)} placeholder={t.yourFullNamePh} />
            </Field>
            <Field label={`${t.currentCountry} *`}>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white"
                value={wForm.currentLoc} onChange={e=>wf("currentLoc",e.target.value)}>
                {[...ORIGIN_COUNTRIES,...DEST_COUNTRIES].filter((v,i,a)=>a.indexOf(v)===i)
                  .map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label={`${t.currentCity} *`}>
              <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                value={wForm.currentCity} onChange={e=>wf("currentCity",e.target.value)}
                placeholder={t.cityExamplePh} />
            </Field>
            <Field label={t.openReloc}>
              <div className="flex gap-2">
                {[[false,t.no],[true,t.yes]].map(([v,l]) => (
                  <button key={String(v)} onClick={()=>wf("openToRelocation",v)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                    style={{ background:wForm.openToRelocation===v?C.indigo:"#F1F5F9", color:wForm.openToRelocation===v?"white":"#475569" }}>
                    {l}
                  </button>
                ))}
              </div>
            </Field>
            {wForm.openToRelocation && (
              <Field label={t.targetCountries}>
                <div className="flex flex-wrap gap-2">
                  {DEST_COUNTRIES.map(c => (
                    <button key={c} onClick={()=>toggleTarget(c)}
                      className="px-3 py-1.5 rounded-xl text-sm font-bold transition-colors"
                      style={{ background:wForm.targetCountries.includes(c)?C.indigo:"#F1F5F9", color:wForm.targetCountries.includes(c)?"white":"#475569" }}>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
            )}
            <Field label={t.needsHousing}>
              <div className="flex gap-2">
                {[[false,t.no],[true,t.yes]].map(([v,l]) => (
                  <button key={String(v)} onClick={()=>wf("needsHousing",v)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                    style={{ background:wForm.needsHousing===v?"#F59E0B":"#F1F5F9", color:wForm.needsHousing===v?C.navy:"#475569" }}>
                    {l}
                  </button>
                ))}
              </div>
            </Field>
            <button onClick={()=>{if(wForm.name.trim()&&wForm.currentCity.trim())setWStep(2);}}
              className="w-full py-3 rounded-xl text-white font-black text-sm transition-colors"
              style={{ background:wForm.name.trim()&&wForm.currentCity.trim()?C.indigo:"#CBD5E1" }}>
              {t.continueBtn}
            </button>
          </>}

          {/* Step 2 */}
          {wStep===2 && <>
            <Field label={`${t.frole} *`}>
              <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                value={wForm.role} onChange={e=>wf("role",e.target.value)}
                placeholder={t.roleExamplePh} />
            </Field>
            <Field label={t.fsector}>
              <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white"
                value={wForm.sector} onChange={e=>{wf("sector",e.target.value);wf("skills",[]);}}>
                {SECTORS.filter(s=>s!=="All").map(s=><option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label={t.fexp}>
              <div className="flex flex-wrap gap-2">
                {["1","2","3","4-5","6-8","9+"].map(y => (
                  <button key={y} onClick={()=>wf("experience",y)}
                    className="px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                    style={{ background:wForm.experience===y?C.indigo:"#F1F5F9", color:wForm.experience===y?"white":"#475569" }}>
                    {y} yr{y!=="1"?"s":""}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={`${t.skills} (max 8)`}>
              <div className="flex flex-wrap gap-2">
                {(SKILLS_MAP[wForm.sector]||[]).map(sk => (
                  <button key={sk} onClick={()=>toggleSkill(sk)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    style={{ background:wForm.skills.includes(sk)?C.indigo:"#F1F5F9", color:wForm.skills.includes(sk)?"white":"#475569" }}>
                    {wForm.skills.includes(sk) && <CheckCircle className="w-3 h-3" />}
                    {sk}
                  </button>
                ))}
              </div>
            </Field>
            <div className="flex gap-2 pt-1">
              <button onClick={()=>setWStep(1)} className="px-5 py-3 rounded-xl text-sm font-bold text-slate-600 border border-slate-200">{t.back}</button>
              <button onClick={()=>{if(wForm.role.trim())setWStep(3);}}
                className="flex-1 py-3 rounded-xl text-white font-black text-sm"
                style={{ background:wForm.role.trim()?C.indigo:"#CBD5E1" }}>
                {t.continueBtn}
              </button>
            </div>
          </>}

          {/* Step 3 */}
          {wStep===3 && <>
            <Field label={t.availability}>
              <div className="space-y-2">
                {[["now",t.availNow],["2weeks",t.availSoon],["1month",t.availMonth]].map(([val,label]) => (
                  <button key={val} onClick={()=>wf("availability",val)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold text-left transition-all"
                    style={{ background:wForm.availability===val?"#EEF2FF":"#F8F9FA", border:wForm.availability===val?`2px solid ${C.indigo}`:"2px solid transparent", color:wForm.availability===val?C.indigo:"#374151" }}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${wForm.availability===val?"border-indigo-600":"border-slate-300"}`}>
                      {wForm.availability===val && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                    </div>
                    {label}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={t.employmentType}>
              <div className="flex gap-2 mb-2">
                {[["permanent",t.permanentLabel],["seasonal",t.seasonalLabel]].map(([val,label]) => (
                  <button key={val} onClick={()=>wf("employmentType",val)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                    style={{ background:wForm.employmentType===val?C.indigo:"#F1F5F9", color:wForm.employmentType===val?"white":"#475569" }}>
                    {label}
                  </button>
                ))}
              </div>
              {wForm.employmentType==="seasonal" && (
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={wForm.availableFrom} onChange={e=>wf("availableFrom",e.target.value)}
                  placeholder={`${t.availableFromLabel} (e.g. Jun – Oct 2026)`} />
              )}
            </Field>
            <Field label={t.flangs}>
              <div className="flex flex-wrap gap-2 mb-2">
                {wForm.languages.map((l,i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-bold"
                    style={{ background:"#EEF2FF", color:C.indigo }}>
                    {l.name}
                    {i>0 && (
                      <button onClick={()=>wf("languages",wForm.languages.filter((_,j)=>j!==i))}>
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none"
                  placeholder={t.addLanguage} value={langInput}
                  onChange={e=>setLangInput(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&addLang()} />
                <button onClick={addLang} className="px-4 py-2 rounded-xl text-white text-sm font-black"
                  style={{ background:C.indigo }}>+</button>
              </div>
            </Field>
            <Field label={t.fbio}>
              <textarea className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                rows={3} value={wForm.bio} onChange={e=>wf("bio",e.target.value)}
                placeholder={t.bioPh} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t.email}>
                <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none"
                  type="email" value={wForm.email} onChange={e=>wf("email",e.target.value)} placeholder={t.emailExamplePh} />
              </Field>
              <Field label={t.phone}>
                <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none"
                  value={wForm.phone} onChange={e=>wf("phone",e.target.value)} placeholder="+40 7xx..." />
              </Field>
            </div>
            <Field label={t.createPassword}>
              <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-400"
                type="password" value={regPassword} onChange={e=>setRegPassword(e.target.value)}
                placeholder="••••••••" />
            </Field>
            <Field label={t.confirmPassword}>
              <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-400"
                type="password" value={regPasswordConfirm} onChange={e=>setRegPasswordConfirm(e.target.value)}
                placeholder="••••••••" />
            </Field>
            <div className="rounded-xl p-3 flex items-start gap-2" style={{ background:"#EEF2FF" }}>
              <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color:C.indigo }} />
              <p className="text-xs font-semibold" style={{ color:C.indigo }}>
                {t.idScanNotice}
              </p>
            </div>
            {authError && (
              <div className="rounded-xl px-3 py-2.5 text-sm font-bold" style={{ background:"#FEF2F2", color:"#991B1B" }}>
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="rounded-xl px-3 py-2.5 text-sm font-bold" style={{ background:"#F0FDF4", color:"#166534" }}>
                {authSuccess}
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={()=>setWStep(2)} className="px-5 py-3 rounded-xl text-sm font-bold text-slate-600 border border-slate-200">{t.back}</button>
              <button onClick={async ()=>{
                setAuthError(""); setAuthSuccess("");
                if (!wForm.email.trim() || !wForm.name.trim()) { setAuthError("Please fill in your name and email."); return; }
                if (isTempEmail(wForm.email)) { setAuthError("Temporary email addresses are not allowed. Please use a real email."); return; }
                if (regPassword.length < 8) { setAuthError(t.passwordTooShort); return; }
                if (regPassword !== regPasswordConfirm) { setAuthError(t.passwordMismatch); return; }
                setAuthLoading(true);
                const { data, error } = await supabase.auth.signUp({
                  email: wForm.email.trim().toLowerCase(),
                  password: regPassword,
                  options: { data: { role:"worker", name:wForm.name, ...wForm } }
                });
                setAuthLoading(false);
                if (error) { setAuthError(error.message); return; }
                if (data?.user) {
                  await supabase.from("workers").insert([{
                    user_id: data.user.id,
                    name: wForm.name, email: wForm.email.trim().toLowerCase(),
                    role: wForm.role, sector: wForm.sector, experience: wForm.experience,
                    current_loc: wForm.currentLoc, current_city: wForm.currentCity,
                    open_to_relocation: wForm.openToRelocation,
                    target_countries: wForm.targetCountries,
                    needs_housing: wForm.needsHousing,
                    availability: wForm.availability,
                    employment_type: wForm.employmentType,
                    available_from: wForm.availableFrom,
                    bio: wForm.bio, phone: wForm.phone,
                    skills: wForm.skills,
                    languages: wForm.languages.map(l=>l.name),
                    is_visible: true,
                  }]);
                  setWorkerProfile({...wForm});
                  setRegPassword(""); setRegPasswordConfirm("");
                  setAuthSuccess("✓ Check your email to confirm your account, then you're live!");
                  setTimeout(()=>go("workerDash"), 2000);
                }
              }}
                disabled={authLoading}
                className="flex-1 py-3 rounded-xl text-white font-black text-sm disabled:opacity-60"
                style={{ background:C.indigo }}>
                {authLoading ? "Creating account..." : t.submit}
              </button>
            </div>
          </>}
        </div>
      </div>
    </div>
  );

  // ── WORKER DASHBOARD ──────────────────────────────────────────────────────
  if (screen === "workerDash" && workerProfile) return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily:"system-ui,sans-serif" }}>
      <Nav {...navProps} title={t.dashboard} />
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

        {/* Profile card */}
        <div className="rounded-2xl p-5 text-white" style={{ background:C.navy }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-400 text-xs mb-1">{t.welcomeBack}</p>
              <h2 className="text-xl font-black">{workerProfile.name.split(" ")[0]}</h2>
              <p className="text-slate-400 text-sm mt-0.5">
                {workerProfile.role || "—"} — <CountryBadge code={workerProfile.currentLoc} /> {workerProfile.currentCity}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-base relative flex-shrink-0"
              style={{ background:C.indigo }}>
              {wi}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2"
                style={{ background:"#64748B", borderColor:C.navy }}>
                <Shield className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background:"rgba(16,185,129,0.2)", color:"#6EE7B7" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              {t.active}
            </span>
            <span className="text-xs px-2.5 py-1.5 rounded-full font-semibold"
              style={{ background:"rgba(245,158,11,0.15)", color:"#FCD34D" }}>
              {t.idVerificationPending}
            </span>
          </div>
        </div>

        {/* Visibility bump */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-slate-800">{t.profileVisibility}</h3>
            <p className="text-xs text-slate-400 mt-0.5 truncate">{bumpStatus || t.lastUpdatedJustNow}</p>
          </div>
          <button onClick={()=>setBumpStatus(t.refreshedAt+new Date().toLocaleTimeString())}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white hover:opacity-90 transition-opacity flex-shrink-0"
            style={{ background:C.indigo }}>
            <RefreshCw className="w-3.5 h-3.5" />{t.bumpProfile}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon:Eye, n:"24", label:t.profileViews, bg:"#EEF2FF", acc:C.indigo },
            { icon:TrendingUp, n:"18", label:t.searchApp, bg:"#ECFDF5", acc:"#059669" },
            { icon:Shield, n:"—", label:"ID Badge", bg:"#FFFBEB", acc:"#D97706" },
          ].map((s,i) => (
            <div key={i} className="rounded-2xl p-3 text-center" style={{ background:s.bg }}>
              <s.icon className="w-4 h-4 mx-auto mb-1" style={{ color:s.acc }} />
              <div className="font-black text-base" style={{ color:s.acc }}>{s.n}</div>
              <div className="text-xs font-semibold text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Profile preview */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-sm" style={{ color:C.navy }}>{t.profilePreview}</h3>
            <button onClick={() => openEdit("personal")}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
              style={{ background:"#EEF2FF", color:C.indigo }}>
              <Edit2 className="w-3.5 h-3.5" />Edit Profile
            </button>
          </div>
          <div className="border-2 border-slate-100 rounded-xl p-4" style={{ borderLeft:`4px solid ${C.indigo}` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white flex-shrink-0"
                style={{ background:C.indigo }}>{wi}</div>
              <div className="flex-1 min-w-0">
                <div className="font-black text-slate-900 text-sm truncate">{workerProfile.name}</div>
                <div className="text-xs text-slate-500">{workerProfile.role || "—"} · {workerProfile.experience || "0"} yrs</div>
              </div>
              <UnverifiedBadge t={t} />
            </div>
            {workerProfile.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {workerProfile.skills.slice(0,4).map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">{s}</span>
                ))}
              </div>
            )}
          </div>

          {/* Quick-edit section links */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[
              { label:t.sPersonal, section:"personal", icon:"📍" },
              { label:t.sWork, section:"work", icon:"💼" },
              { label:t.sLangs, section:"langs", icon:"💬" },
              { label:t.sContact, section:"contact", icon:"📞" },
            ].map(s => (
              <button key={s.section} onClick={() => openEdit(s.section)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors hover:bg-slate-50 border border-slate-200">
                <span>{s.icon}</span>
                <span className="text-slate-600">{s.label}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-auto -rotate-90" />
              </button>
            ))}
          </div>
        </div>

        {/* Video intro */}
        <div className="rounded-2xl p-5 border-2 border-dashed" style={{ borderColor:"rgba(79,70,229,0.25)" }}>
          <div className="flex items-start gap-3">
            <Video className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color:C.indigo }} />
            <div>
              <p className="font-bold text-sm" style={{ color:C.navy }}>Add a {t.videoPitch}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.videoPitchDesc}</p>
            </div>
          </div>
          <button className="w-full mt-3 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background:"#EEF2FF", color:C.indigo }}>
            {t.uploadVideo}
          </button>
        </div>

        {/* ID Verification */}
        <div className="rounded-2xl p-5 border-2" style={{ background:"rgba(79,70,229,0.03)", borderColor:C.indigo }}>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color:C.indigo }} />
            <div>
              <p className="font-bold text-sm" style={{ color:C.navy }}>{t.completeIdVerifTitle}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.completeIdVerifDesc}</p>
            </div>
          </div>
          <button className="w-full mt-3 py-3 rounded-xl font-black text-sm text-white"
            style={{ background:C.indigo }}>
            <Camera className="w-4 h-4 inline mr-2" />{t.startVerif}
          </button>
        </div>

        {/* Rate a company you've worked with */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-black text-sm mb-1" style={{ color:C.navy }}>{t.rateCompanyTitle}</h3>
          <p className="text-xs text-slate-500 mb-3">{t.rateCompanyDesc}</p>

          {reviewSubmitted && (
            <div className="rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm font-bold mb-3"
              style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0"}}>
              <CheckCircle className="w-4 h-4 flex-shrink-0"/>{t.reviewThanks}
            </div>
          )}

          <div className="space-y-2">
            <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-400"
              placeholder={t.companyNameLabel} value={reviewForm.company}
              onChange={e=>setReviewForm(p=>({...p,company:e.target.value}))} />
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-slate-500 mr-2">{t.yourRating}</span>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={()=>setReviewForm(p=>({...p,rating:n}))}>
                  <Star className={`w-5 h-5 ${n<=reviewForm.rating?"fill-amber-400 text-amber-400":"text-slate-200"}`} />
                </button>
              ))}
            </div>
            <textarea className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none resize-none"
              rows={2} placeholder={t.yourReview} value={reviewForm.text}
              onChange={e=>setReviewForm(p=>({...p,text:e.target.value}))} />
            <button onClick={submitMyReview}
              className="w-full py-2.5 rounded-xl text-sm font-black text-white"
              style={{ background:C.indigo }}>
              {t.submitReview}
            </button>
          </div>

          {myReviews.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.myReviewsTitle}</p>
              {myReviews.map((r,i) => (
                <div key={i} className="rounded-xl p-3 border border-slate-100" style={{ background:"#F8FAFC" }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-xs text-slate-700">{r.company}</p>
                    <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{r.rating}
                    </span>
                  </div>
                  {r.text && <p className="text-xs text-slate-500 leading-relaxed">{r.text}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={() => openEdit("personal")}
            className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 border border-slate-200 bg-white"
            style={{ color:C.indigo }}>
            <Settings className="w-4 h-4" />{t.myAccount}
          </button>
          <button onClick={async()=>{ await supabase.auth.signOut(); setWorkerProfile(null); go("landing"); }}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-slate-500 border border-slate-200 bg-white flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />{t.logout}
          </button>
        </div>
      </div>
    </div>
  );

  // ── WORKER ACCOUNT / EDIT ────────────────────────────────────────────────
  if (screen === "workerAccount" && workerProfile && editForm) {
    const sections = [
      { id:"personal", label:t.sPersonal },
      { id:"work",     label:t.sWork },
      { id:"langs",    label:t.sLangs },
      { id:"contact",  label:t.sContact },
      { id:"account",  label:t.sAccount },
    ];
    const accentMap = {
      personal:C.indigo, work:"#7C3AED", langs:"#0891B2",
      contact:"#059669", account:"#DC2626"
    };
    const sectionAccent = accentMap[editSection] || C.indigo;

    return (
      <div className="min-h-screen bg-slate-50" style={{ fontFamily:"system-ui,sans-serif" }}>
        <Nav {...navProps} back={() => go("workerDash")} backLabel={t.dashboardLabel} title={t.myAccount} />

        {/* Profile header */}
        <div className="px-4 py-5" style={{ background:C.navy }}>
          <div className="max-w-lg mx-auto flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl flex-shrink-0"
              style={{ background:C.indigo }}>{wi}</div>
            <div className="flex-1 min-w-0">
              <h2 className="font-black text-white text-lg">{workerProfile.name || "—"}</h2>
              <p className="text-slate-400 text-sm truncate">{workerProfile.role || "—"} — {workerProfile.currentCity || "—"}</p>
            </div>
            <UnverifiedBadge t={t} />
          </div>
        </div>

        {/* Section tabs */}
        <div className="bg-white border-b border-slate-200 sticky top-14 z-30">
          <div className="flex overflow-x-auto max-w-lg mx-auto" style={{ scrollbarWidth:"none" }}>
            {sections.map(s => (
              <button key={s.id} onClick={() => { setEditSection(s.id); setSaveStatus(null); setShowDeleteConfirm(false); }}
                className="py-3.5 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex-shrink-0"
                style={{
                  borderColor: editSection===s.id ? sectionAccent : "transparent",
                  color: editSection===s.id ? sectionAccent : "#64748B"
                }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

          {/* Save status toast */}
          {saveStatus === "saved" && (
            <div className="rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-bold"
              style={{ background:"#F0FDF4", color:"#166534", border:"1px solid #BBF7D0" }}>
              <CheckCircle className="w-4 h-4" />{t.saved}
            </div>
          )}

          {/* ─ PERSONAL INFO ─ */}
          {editSection === "personal" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-black text-sm" style={{ color:C.navy }}>{t.sPersonal}</h3>
              <Field label={t.fname}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={editForm.name} onChange={e=>ef("name",e.target.value)} />
              </Field>
              <Field label={t.currentCountry}>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white"
                  value={editForm.currentLoc} onChange={e=>ef("currentLoc",e.target.value)}>
                  {[...ORIGIN_COUNTRIES,...DEST_COUNTRIES].filter((v,i,a)=>a.indexOf(v)===i)
                    .map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label={t.currentCity}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={editForm.currentCity} onChange={e=>ef("currentCity",e.target.value)}
                  placeholder={t.cityExamplePh} />
              </Field>
              <Field label={t.openReloc}>
                <div className="flex gap-2">
                  {[[false,t.no],[true,t.yes]].map(([v,l])=>(
                    <button key={String(v)} onClick={()=>ef("openToRelocation",v)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                      style={{ background:editForm.openToRelocation===v?C.indigo:"#F1F5F9", color:editForm.openToRelocation===v?"white":"#475569" }}>
                      {l}
                    </button>
                  ))}
                </div>
              </Field>
              {editForm.openToRelocation && (
                <Field label={t.targetCountries}>
                  <div className="flex flex-wrap gap-2">
                    {DEST_COUNTRIES.map(c=>(
                      <button key={c} onClick={()=>toggleEditTarget(c)}
                        className="px-3 py-1.5 rounded-xl text-sm font-bold transition-colors"
                        style={{ background:(editForm.targetCountries||[]).includes(c)?C.indigo:"#F1F5F9", color:(editForm.targetCountries||[]).includes(c)?"white":"#475569" }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </Field>
              )}
              <Field label={t.needsHousing}>
                <div className="flex gap-2">
                  {[[false,t.no],[true,t.yes]].map(([v,l])=>(
                    <button key={String(v)} onClick={()=>ef("needsHousing",v)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                      style={{ background:editForm.needsHousing===v?"#F59E0B":"#F1F5F9", color:editForm.needsHousing===v?C.navy:"#475569" }}>
                      {l}
                    </button>
                  ))}
                </div>
              </Field>
              <SaveBar t={t} saveStatus={saveStatus} onSave={saveEdit} />
            </div>
          )}

          {/* ─ WORK PROFILE ─ */}
          {editSection === "work" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-black text-sm" style={{ color:C.navy }}>{t.sWork}</h3>
              <Field label={t.frole}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={editForm.role} onChange={e=>ef("role",e.target.value)}
                  placeholder={t.roleExamplePh} />
              </Field>
              <Field label={t.fsector}>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white"
                  value={editForm.sector}
                  onChange={e=>{ ef("sector",e.target.value); ef("skills",[]); }}>
                  {SECTORS.filter(s=>s!=="All").map(s=><option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label={t.fexp}>
                <div className="flex flex-wrap gap-2">
                  {["1","2","3","4-5","6-8","9+"].map(y=>(
                    <button key={y} onClick={()=>ef("experience",y)}
                      className="px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                      style={{ background:editForm.experience===y?C.indigo:"#F1F5F9", color:editForm.experience===y?"white":"#475569" }}>
                      {y} yr{y!=="1"?"s":""}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={`${t.skills} (max 8)`}>
                <div className="flex flex-wrap gap-2">
                  {(SKILLS_MAP[editForm.sector]||[]).map(sk=>(
                    <button key={sk} onClick={()=>toggleEditSkill(sk)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                      style={{ background:(editForm.skills||[]).includes(sk)?C.indigo:"#F1F5F9", color:(editForm.skills||[]).includes(sk)?"white":"#475569" }}>
                      {(editForm.skills||[]).includes(sk)&&<CheckCircle className="w-3 h-3"/>}{sk}
                    </button>
                  ))}
                </div>
                {(editForm.skills||[]).length === 0 && (
                  <p className="text-xs text-slate-400 mt-1">{t.noSkillsYet}</p>
                )}
              </Field>
              <SaveBar t={t} saveStatus={saveStatus} onSave={saveEdit} />
            </div>
          )}

          {/* ─ LANGUAGES & BIO ─ */}
          {editSection === "langs" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-black text-sm" style={{ color:C.navy }}>{t.sLangs}</h3>
              <Field label={t.availability}>
                <div className="space-y-2">
                  {[["now",t.availNow],["2weeks",t.availSoon],["1month",t.availMonth]].map(([val,label])=>(
                    <button key={val} onClick={()=>ef("availability",val)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold text-left transition-all"
                      style={{ background:editForm.availability===val?"#EEF2FF":"#F8F9FA", border:editForm.availability===val?`2px solid ${C.indigo}`:"2px solid transparent", color:editForm.availability===val?C.indigo:"#374151" }}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${editForm.availability===val?"border-indigo-600":"border-slate-300"}`}>
                        {editForm.availability===val&&<div className="w-2 h-2 rounded-full bg-indigo-600"/>}
                      </div>
                      {label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={t.employmentType}>
                <div className="flex gap-2 mb-2">
                  {[["permanent",t.permanentLabel],["seasonal",t.seasonalLabel]].map(([val,label]) => (
                    <button key={val} onClick={()=>ef("employmentType",val)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
                      style={{ background:editForm.employmentType===val?C.indigo:"#F1F5F9", color:editForm.employmentType===val?"white":"#475569" }}>
                      {label}
                    </button>
                  ))}
                </div>
                {editForm.employmentType==="seasonal" && (
                  <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                    value={editForm.availableFrom||""} onChange={e=>ef("availableFrom",e.target.value)}
                    placeholder={`${t.availableFromLabel} (e.g. Jun – Oct 2026)`} />
                )}
              </Field>
              <Field label={t.flangs}>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editForm.languages||[]).map((l,i)=>(
                    <span key={i} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full font-bold"
                      style={{ background:"#EEF2FF", color:C.indigo }}>
                      {l.name}
                      <button onClick={()=>ef("languages",(editForm.languages||[]).filter((_,j)=>j!==i))}>
                        <X className="w-3 h-3"/>
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none"
                    placeholder={t.addLanguage} value={editLangInput}
                    onChange={e=>setEditLangInput(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&addEditLang()} />
                  <button onClick={addEditLang} className="px-4 py-2 rounded-xl text-white text-sm font-black"
                    style={{ background:C.indigo }}>+</button>
                </div>
              </Field>
              <Field label={t.fbio}>
                <textarea className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                  rows={4} value={editForm.bio||""} onChange={e=>ef("bio",e.target.value)}
                  placeholder={t.bioEditPh} />
              </Field>
              <SaveBar t={t} saveStatus={saveStatus} onSave={saveEdit} />
            </div>
          )}

          {/* ─ CONTACT DETAILS ─ */}
          {editSection === "contact" && (
            <div className="space-y-4">
              <div className="rounded-xl px-4 py-3 flex items-start gap-2"
                style={{ background:"#F0FDF4", border:"1px solid #BBF7D0" }}>
                <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"/>
                <p className="text-xs font-semibold text-emerald-700">{t.contactPrivate}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
                <h3 className="font-black text-sm" style={{ color:C.navy }}>{t.sContact}</h3>
                <Field label={t.email}>
                  <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                    type="email" value={editForm.email||""} onChange={e=>ef("email",e.target.value)}
                    placeholder={t.emailExamplePh} />
                </Field>
                <Field label={t.phone}>
                  <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                    value={editForm.phone||""} onChange={e=>ef("phone",e.target.value)}
                    placeholder="+40 7xx xxx xxx" />
                </Field>
                <SaveBar t={t} saveStatus={saveStatus} onSave={saveEdit} />
              </div>
            </div>
          )}

          {/* ─ ACCOUNT & SECURITY ─ */}
          {editSection === "account" && (
            <div className="space-y-4">

              {/* ID Verification */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 className="font-black text-sm mb-3" style={{ color:C.navy }}>{t.idVerifStatus}</h3>
                <div className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background:"#FEF3C7", border:"1px solid #FDE68A" }}>
                  <div>
                    <p className="text-xs font-bold text-amber-800">{t.idPending}</p>
                    <p className="text-xs text-amber-600 mt-0.5">{t.idVerifPendingDesc}</p>
                  </div>
                  <Shield className="w-5 h-5 text-amber-600 flex-shrink-0"/>
                </div>
                <button className="w-full mt-3 py-3 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2"
                  style={{ background:C.indigo }}>
                  <Camera className="w-4 h-4"/>{t.startVerif}
                </button>
              </div>

              {/* Profile Visibility */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-sm" style={{ color:C.navy }}>{t.profileVisibility}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {profileVisible ? t.visibleDesc : t.hiddenDesc}
                    </p>
                  </div>
                  <button onClick={() => setProfileVisible(!profileVisible)}
                    className="flex-shrink-0 ml-4">
                    {profileVisible
                      ? <ToggleRight className="w-10 h-10" style={{ color:C.indigo }}/>
                      : <ToggleLeft className="w-10 h-10 text-slate-300"/>}
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${profileVisible?"bg-emerald-500":"bg-slate-300"}`}/>
                  <span className="text-xs font-semibold" style={{ color:profileVisible?"#059669":"#94A3B8" }}>
                    {profileVisible ? "Profile is visible" : "Profile is hidden"}
                  </span>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border-2" style={{ borderColor:"#FEE2E2" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Trash2 className="w-4 h-4 text-red-500"/>
                  <h3 className="font-black text-sm text-red-600">{t.dangerZone}</h3>
                </div>
                {!showDeleteConfirm ? (
                  <>
                    <p className="text-xs text-slate-500 mb-3">{t.deleteAccountDesc}</p>
                    <button onClick={() => setShowDeleteConfirm(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold transition-colors hover:bg-red-50"
                      style={{ border:"1px solid #FCA5A5", color:"#DC2626" }}>
                      {t.deleteAccount}
                    </button>
                  </>
                ) : (
                  <div className="rounded-xl p-4" style={{ background:"#FEF2F2" }}>
                    <p className="text-sm font-bold text-red-800 mb-3">{t.deleteConfirm}</p>
                    <div className="flex gap-2">
                      <button onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 py-2 rounded-xl text-sm font-bold border border-slate-200 bg-white text-slate-600">
                        {t.cancelEdit}
                      </button>
                      <button onClick={async () => {
                        if (supaUser) {
                          await supabase.from("workers").delete().eq("user_id", supaUser.id);
                          await supabase.functions.invoke("delete-user", { body: { user_id: supaUser.id } });
                          await supabase.auth.signOut();
                        }
                        setWorkerProfile(null); go("landing");
                      }}
                        className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
                        style={{ background:"#DC2626" }}>
                        {t.deleteBtn}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── COMPANY REGISTRATION ──────────────────────────────────────────────────
  if (screen === "companyReg") return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily:"system-ui,sans-serif" }}>
      <Nav {...navProps} back={() => go("landing")} backLabel={t.back} title={t.compOnboardTitle} />
      <div className="max-w-lg mx-auto px-4 py-8">
        <p className="text-xs font-black mb-1 tracking-widest uppercase" style={{ color:C.indigo }}>{t.freeNoCard}</p>
        <h2 className="text-xl font-black mb-2" style={{ color:C.navy }}>{t.compOnboardTitle}</h2>
        <p className="text-slate-500 text-sm mb-6">{t.freeAccountSub}</p>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
          {[
            { label:t.compName, key:"compName", ph:"e.g. TransportCo NL B.V.", type:"text" },
            { label:t.kvk, key:"kvk", ph:"e.g. 12345678", type:"text" },
            { label:t.email, key:"email", ph:"company@email.com", type:"email" },
            { label:t.phone, key:"phone", ph:"+31 6 xxxx xxxx", type:"tel" },
            { label:t.address, key:"address", ph:"Street, City, Country", type:"text" },
          ].map(f => (
            <Field key={f.key} label={`${f.label} *`}>
              <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                type={f.type} placeholder={f.ph} value={cForm[f.key]} onChange={e=>cf(f.key,e.target.value)} />
            </Field>
          ))}
          <Field label={`${t.hiringCountry} *`}>
            <div className="flex flex-wrap gap-2">
              {DEST_COUNTRIES.map(c => (
                <button key={c} onClick={()=>cf("destCountry",c)}
                  className="px-3 py-2 rounded-xl text-sm font-black transition-colors"
                  style={{ background:cForm.destCountry===c?C.indigo:"#F1F5F9", color:cForm.destCountry===c?"white":"#475569" }}>
                  {c}
                </button>
              ))}
            </div>
          </Field>
          <Field label={t.industrySector}>
            <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white"
              value={cForm.industry} onChange={e=>cf("industry",e.target.value)}>
              {SECTORS.filter(s=>s!=="All").map(s=><option key={s}>{s}</option>)}
            </select>
          </Field>
          <div className="rounded-xl p-3 flex items-start gap-2 bg-emerald-50">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-emerald-700">
              {t.freeToBrowseDesc}
            </p>
          </div>
          <Field label={t.createPassword}>
            <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
              type="password" value={regPassword} onChange={e=>setRegPassword(e.target.value)} placeholder="••••••••" />
          </Field>
          <Field label={t.confirmPassword}>
            <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
              type="password" value={regPasswordConfirm} onChange={e=>setRegPasswordConfirm(e.target.value)} placeholder="••••••••" />
          </Field>
          {authError && (
            <div className="rounded-xl px-3 py-2.5 text-sm font-bold" style={{ background:"#FEF2F2", color:"#991B1B" }}>
              {authError}
            </div>
          )}
          {authSuccess && (
            <div className="rounded-xl px-3 py-2.5 text-sm font-bold" style={{ background:"#F0FDF4", color:"#166534" }}>
              {authSuccess}
            </div>
          )}
          <button onClick={async () => {
            setAuthError(""); setAuthSuccess("");
            if (!cForm.compName.trim() || !cForm.email.trim()) return;
            if (isTempEmail(cForm.email)) { setAuthError("Temporary email addresses are not allowed. Please use a real email."); return; }
            if (regPassword.length < 8) { setAuthError(t.passwordTooShort); return; }
            if (regPassword !== regPasswordConfirm) { setAuthError(t.passwordMismatch); return; }
            setAuthLoading(true);
            const { data, error } = await supabase.auth.signUp({
              email: cForm.email.trim().toLowerCase(),
              password: regPassword,
              options: { data: { role:"company", compName:cForm.compName } }
            });
            setAuthLoading(false);
            if (error) { setAuthError(error.message); return; }
            if (data?.user) {
              await supabase.from("companies").insert([{
                user_id: data.user.id,
                comp_name: cForm.compName, email: cForm.email.trim().toLowerCase(),
                kvk: cForm.kvk, phone: cForm.phone, address: cForm.address,
                dest_country: cForm.destCountry, industry: cForm.industry,
              }]);
              setCompanyProfile({...cForm});
              setRegPassword(""); setRegPasswordConfirm("");
              setAuthSuccess("✓ Check your email to confirm your account!");
              setTimeout(()=>go("companyDash"), 2000);
            }
          }}
            disabled={authLoading}
            className="w-full py-4 rounded-xl text-white font-black text-sm transition-colors disabled:opacity-60"
            style={{ background:cForm.compName.trim()&&cForm.email.trim()?C.navy:"#CBD5E1" }}>
            {authLoading ? "Creating account..." : t.createFreeAccount}
          </button>
          <p className="text-center text-xs text-slate-400">{t.noCardRequired}</p>
        </div>
      </div>
    </div>
  );

  // ── COMPANY DASHBOARD ─────────────────────────────────────────────────────
  if (screen === "companyDash" && companyProfile) return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily:"system-ui,sans-serif" }}>
      <Nav {...navProps} title={t.dashboard} />
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-wrap justify-between items-start gap-4">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{companyProfile.compName}</p>
            <h2 className="font-black text-xl" style={{ color:C.navy }}>{t.dbWelcome}</h2>
            <p className="text-slate-500 text-sm mt-1">{t.dbSub}</p>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <button onClick={() => openCompanyEdit("company")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-colors"
              style={{ color:C.indigo }}>
              <Settings className="w-3.5 h-3.5" />{t.companyMyAccount}
            </button>
            <button onClick={async()=>{ await supabase.auth.signOut(); setCompanyProfile(null); go("landing"); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors">
              <LogOut className="w-3.5 h-3.5" />{t.logout}
            </button>
          </div>
        </div>

        {/* Credits + Plan Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl p-4 flex items-center justify-between sm:col-span-2"
            style={{ background: companyPlan ? "#F0FDF4" : "#FFFBEB", border:`1px solid ${companyPlan?"#BBF7D0":"#FDE68A"}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: companyPlan?"#DCFCE7":"#FEF3C7" }}>
                {companyPlan
                  ? <CheckCircle className="w-5 h-5 text-emerald-600"/>
                  : <BarChart className="w-5 h-5 text-amber-600"/>}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500">{t.currentPlanLabel}</p>
                <p className="font-black text-sm" style={{ color: companyPlan?"#059669":"#92400E" }}>
                  {companyPlan ? `${t.activePlan} (${companyPlan})` : t.freePlanLabel}
                </p>
              </div>
            </div>
            {!companyPlan && (
              <button onClick={() => openCompanyEdit("billing")}
                className="text-xs font-black px-3 py-1.5 rounded-lg"
                style={{ background:"#F59E0B", color:C.navy }}>
                {t.subscribeTo}
              </button>
            )}
          </div>
          <div className="rounded-2xl p-4 flex items-center justify-between"
            style={{ background:"#EEF2FF", border:`1px solid #C7D2FE` }}>
            <div>
              <p className="text-xs font-bold text-slate-500">{t.yourCredits}</p>
              <p className="font-black text-2xl" style={{ color:C.indigo }}>{credits}</p>
              <p className="text-xs text-slate-400">{t.creditsBalance}</p>
            </div>
            <button onClick={() => openCompanyEdit("billing")}
              className="text-xs font-black px-3 py-1.5 rounded-lg text-white"
              style={{ background:C.indigo }}>
              {t.buyCredits}
            </button>
          </div>
        </div>

        {/* CTA + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 rounded-2xl p-7 text-white flex flex-col justify-between"
            style={{ background:`linear-gradient(135deg, ${C.indigo}, #7C3AED)` }}>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CountryBadge code={companyProfile.destCountry} />
                <span className="text-indigo-200 text-xs font-bold">{companyProfile.industry}</span>
              </div>
              <h3 className="font-black text-xl mb-1">{t.browseWorkers}</h3>
              <p className="text-indigo-200 text-sm">
                {WORKERS.length} verified profiles — {filtered.length} match current filters
              </p>
              <p className="text-indigo-300 text-xs mt-1">{t.unlockCost} · {credits} credits available</p>
            </div>
            <button onClick={()=>go("companyBrowse")}
              className="mt-6 self-start px-6 py-3 bg-white font-black text-sm rounded-xl hover:bg-slate-50 transition-colors"
              style={{ color:C.indigo }}>
              {t.dbOpen}
            </button>
          </div>
          <div className="space-y-4">
            {[
              { icon:Eye, n:"142", label:t.dbProfiles, bg:"#EEF2FF", acc:C.indigo },
              { icon:BarChart, n:"38", label:t.dbSearches, bg:"#ECFDF5", acc:"#059669" },
            ].map((s,i) => (
              <div key={i} className="rounded-2xl p-4 flex items-center gap-4" style={{ background:s.bg }}>
                <s.icon className="w-7 h-7" style={{ color:s.acc }} />
                <div>
                  <div className="font-black text-xl" style={{ color:s.acc }}>{s.n}</div>
                  <div className="text-xs font-semibold text-slate-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick sector filter */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-black text-sm mb-4" style={{ color:C.navy }}>{t.quickFilterBySector}</h3>
          <div className="flex flex-wrap gap-2">
            {SECTORS.filter(s=>s!=="All").map(s => (
              <button key={s} onClick={()=>{setSector(s);go("companyBrowse");}}
                className="px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ background:C.navy, color:"white" }}>
                {s}
              </button>
            ))}
            <button onClick={()=>{setSector("All");go("companyBrowse");}}
              className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              {t.allSectorsFull}
            </button>
          </div>
        </div>

        <DisclaimerBar t={t} />
      </div>
    </div>
  );

  // ── COMPANY BROWSE ────────────────────────────────────────────────────────
  if (screen === "companyBrowse") return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily:"system-ui,sans-serif" }}>
      <Nav {...navProps} back={() => go("companyDash")} backLabel={t.dashboardLabel} title={t.browseWorkers} />

      {/* Search bar */}
      <div className="px-4 py-4" style={{ background:C.navy }}>
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="bg-white rounded-xl flex gap-2 p-1.5 shadow-xl">
            <div className="flex-1 flex items-center gap-2 px-3">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input className="flex-1 outline-none text-sm text-slate-800 placeholder-slate-400 bg-transparent"
                placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)} />
              {search && (
                <button onClick={()=>setSearch("")} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button className="px-5 py-2 rounded-lg text-white text-sm font-black"
              style={{ background:C.indigo }}>
              {t.searchBtn}
            </button>
          </div>
          {/* Live credits + plan status */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              {companyPlan ? (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background:"rgba(16,185,129,0.2)", color:"#6EE7B7" }}>
                  {companyPlan === "monthly" ? t.monthlyPlan : t.annualPlan} — Unlimited
                </span>
              ) : (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background:"rgba(79,70,229,0.25)", color:C.indigoLight }}>
                  <span className="font-black text-white">{credits}</span> {t.creditsBalance} · 5 per unlock
                </span>
              )}
            </div>
            <button onClick={() => openCompanyEdit("billing")}
              className="text-xs font-bold px-3 py-1 rounded-lg transition-colors hover:opacity-80"
              style={{ background:"rgba(245,158,11,0.2)", color:"#FCD34D" }}>
              + {t.buyCredits}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5">

        {/* Mobile filters toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <p className="text-xs text-slate-400">{filtered.length} {t.found}</p>
          <button onClick={()=>setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white"
            style={{ color:showFilters?C.indigo:"#475569" }}>
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {t.filters}
            {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Mobile filters panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-4 lg:hidden space-y-4">
            <FiltersContent t={t} workerTypeTab={workerTypeTab} setWorkerTypeTab={setWorkerTypeTab}
              sector={sector} setSector={setSector} filterVerified={filterVerified}
              setFilterVerified={setFilterVerified} filterNoHousing={filterNoHousing}
              setFilterNoHousing={setFilterNoHousing} filterEmployment={filterEmployment}
              setFilterEmployment={setFilterEmployment} NAV_BG={C.navy} INDIGO={C.indigo} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop sidebar */}
          <div className="hidden lg:block bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-5 h-fit sticky top-20">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.found}: {filtered.length}</p>
            <FiltersContent t={t} workerTypeTab={workerTypeTab} setWorkerTypeTab={setWorkerTypeTab}
              sector={sector} setSector={setSector} filterVerified={filterVerified}
              setFilterVerified={setFilterVerified} filterNoHousing={filterNoHousing}
              setFilterNoHousing={setFilterNoHousing} filterEmployment={filterEmployment}
              setFilterEmployment={setFilterEmployment} NAV_BG={C.navy} INDIGO={C.indigo} />
          </div>

          {/* Worker cards */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs text-slate-400 hidden lg:block">{filtered.length} {t.found} — <CountryBadge code={destCC} /></p>
            {filtered.length === 0
              ? <p className="text-center text-sm text-slate-400 py-20">{t.noResults}</p>
              : filtered.map(w => {
                const a = AVAIL_CFG[w.avail] || AVAIL_CFG.gray;
                const availLabel = w.avail==="green"?t.now:w.avail==="amber"?t.soon:t.later;
                return (
                  <div key={w.id} onClick={()=>{setSelectedWorker(w); setContactSent(unlockedIds.has(w.id)); setCreditSpend(null); setShowHousingForm(false); setHousingSubmitted(false);}}
                    className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 cursor-pointer transition-all group shadow-sm">
                    <div className="flex gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0 relative"
                        style={{ background:w.accent }}>
                        {w.initials}
                        {w.isIdVerified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-white">
                            <Shield className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">{w.name}</h3>
                            {unlockedIds.has(w.id) && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1"
                                style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0"}}>
                                <Unlock className="w-2.5 h-2.5"/>Unlocked
                              </span>
                            )}
                          {w.hasVideo && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background:"#EEF2FF", color:C.indigo }}>
                              <Video className="w-2.5 h-2.5" />Video
                            </span>
                          )}
                          {w.isIdVerified ? <VerifiedBadge t={t} /> : <UnverifiedBadge t={t} />}
                          {w.hasBsn && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                              style={{ background:"#DBEAFE", color:"#1D4ED8" }}>
                              BSN — NL
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{w.role} · {w.exp}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                          <span className="flex items-center gap-1 text-slate-400">
                            <MapPin className="w-3 h-3" />{w.currentCity} <CountryBadge code={w.currentLoc} />
                          </span>
                          {w.openToRelocation && (
                            <span className="flex items-center gap-1 text-emerald-600 font-bold">
                              <ArrowRight className="w-3 h-3" />
                              {w.targetCountries.join(", ")}
                            </span>
                          )}
                          {w.needsHousing && (
                            <span className="flex items-center gap-1 text-amber-600 font-semibold">
                              <Home className="w-3 h-3" />Housing needed
                            </span>
                          )}
                          {w.employmentType === "seasonal" && (
                            <span className="flex items-center gap-1 text-violet-600 font-semibold">
                              <Clock className="w-3 h-3" />{t.seasonalLabel} · {w.availableFrom}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-slate-400 ml-auto">
                            <Clock className="w-3 h-3" />{t.lastActive} {w.lastActive}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{w.rating}
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full font-semibold ${a.cls}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                          {availLabel}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
                      {w.skills.slice(0,3).map(s => (
                        <span key={s} className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">{s}</span>
                      ))}
                      {w.skills.length > 3 && (
                        <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-400 rounded-md">+{w.skills.length-3}</span>
                      )}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>

        <div className="mt-8"><DisclaimerBar t={t} /></div>
      </div>

      {/* Worker detail modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ background:"rgba(0,0,0,0.5)" }}
          onClick={()=>{setSelectedWorker(null);setContactSent(false);}}>
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg overflow-y-auto relative"
            style={{ maxHeight:"93vh" }}
            onClick={e=>e.stopPropagation()}>
            <div className="flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>
            <button onClick={()=>{setSelectedWorker(null);setContactSent(false);}}
              className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
              <X className="w-4 h-4" />
            </button>

            {/* Modal header */}
            <div className="px-5 pt-4 pb-4 border-b border-slate-100">
              <div className="flex items-start gap-4 pr-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 relative"
                  style={{ background:selectedWorker.accent }}>
                  {selectedWorker.initials}
                  {selectedWorker.isIdVerified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-white">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-black text-lg" style={{ color:C.navy }}>{selectedWorker.name}</h3>
                    {selectedWorker.isIdVerified ? <VerifiedBadge t={t} /> : <UnverifiedBadge t={t} />}
                  </div>
                  <p className="text-slate-500 text-sm">{selectedWorker.role} · {selectedWorker.exp}</p>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{t.lastActive} {selectedWorker.lastActive}</span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold"><Mail className="w-3 h-3" />{t.responseRate} {selectedWorker.responseRate}</span>
                  </div>
                </div>
              </div>

              {selectedWorker.hasVideo && (
                <div className="mt-4 aspect-video rounded-xl flex flex-col items-center justify-center text-white cursor-pointer group overflow-hidden relative"
                  style={{ background:C.navy }}>
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format" alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30 mb-2 z-10 group-hover:scale-105 transition-transform">
                    <Video className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-black text-sm z-10">Play {t.videoPitch} (0:30)</span>
                </div>
              )}
            </div>

            {/* Modal body */}
            <div className="px-5 py-5 space-y-5">
              {/* Compliance grid */}
              <div className="grid grid-cols-2 gap-3 rounded-xl p-4 text-xs" style={{ background:"#F8FAFC", border:"1px solid #E2E8F0" }}>
                {[
                  { label:t.currentLocationLabel, val:`${selectedWorker.currentCity}, ${selectedWorker.currentLoc}`, ok:true },
                  { label:t.housingLabel, val:selectedWorker.needsHousing?t.needsHousingVal:t.ownHousingVal, ok:!selectedWorker.needsHousing },
                  { label:t.euDocsLabel, val:t.validEuPassport, ok:true },
                  ...(selectedWorker.targetCountries.includes("NL")
                    ? [{ label:"BSN (NL)", val:selectedWorker.hasBsn?t.hasBsnVal:t.noBsnVal, ok:selectedWorker.hasBsn }]
                    : []),
                ].map(item => (
                  <div key={item.label}>
                    <span className="text-slate-400 block mb-0.5">{item.label}</span>
                    <span className="font-black" style={{ color:item.ok?"#166534":"#92400E" }}>{item.val}</span>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">{t.about}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedWorker.bio}</p>
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">{t.skills}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedWorker.skills.map(s => (
                    <span key={s} className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">{t.langs}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedWorker.langs.map(l => (
                    <span key={l} className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-lg">{l}</span>
                  ))}
                </div>
              </div>

              {/* Company reviews */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.reviewsTitle}</p>
                  {selectedWorker.reviews && selectedWorker.reviews.length > 0 && (
                    <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {selectedWorker.rating} · {t.reviewsBased} {selectedWorker.reviews.length} {t.reviewsUnit}
                    </span>
                  )}
                </div>
                {selectedWorker.reviews && selectedWorker.reviews.length > 0 ? (
                  <div className="space-y-2">
                    {selectedWorker.reviews.map((r,i) => (
                      <div key={i} className="rounded-xl p-3 border border-slate-100" style={{ background:"#F8FAFC" }}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-xs text-slate-700">{r.company}</p>
                          <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{r.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">{t.noReviewsYet}</p>
                )}
              </div>

              {/* Housing partner CTA */}
              {selectedWorker.needsHousing && (
                <div className="rounded-2xl p-4 border-2 border-dashed" style={{ borderColor:"#FDE68A", background:"#FFFBEB" }}>
                  <div className="flex items-start gap-3">
                    <Home className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-amber-800">{t.housingPartnerTitle}</p>
                      <p className="text-xs text-amber-700 mt-0.5">{t.housingPartnerDesc}</p>

                      {housingSubmitted ? (
                        <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />{t.housingFormThanks}
                        </div>
                      ) : !showHousingForm ? (
                        <button onClick={()=>setShowHousingForm(true)}
                          className="mt-2 text-xs font-black px-3 py-1.5 rounded-lg" style={{ background:"#F59E0B", color:C.navy }}>
                          {t.housingPartnerCta}
                        </button>
                      ) : (
                        <div className="mt-2 space-y-2">
                          <input className="w-full border border-amber-200 rounded-lg px-3 py-1.5 text-xs outline-none bg-white"
                            placeholder={t.housingFormCity} value={housingForm.city}
                            onChange={e=>setHousingForm(p=>({...p,city:e.target.value}))} />
                          <div className="flex gap-2">
                            <select className="flex-1 border border-amber-200 rounded-lg px-3 py-1.5 text-xs outline-none bg-white"
                              value={housingForm.workerCount}
                              onChange={e=>setHousingForm(p=>({...p,workerCount:e.target.value}))}>
                              {["1","2","3-5","6-10","10+"].map(n => <option key={n} value={n}>{n} — {t.housingFormCount}</option>)}
                            </select>
                          </div>
                          <input className="w-full border border-amber-200 rounded-lg px-3 py-1.5 text-xs outline-none bg-white"
                            placeholder={t.housingFormPeriod} value={housingForm.period}
                            onChange={e=>setHousingForm(p=>({...p,period:e.target.value}))} />
                          <button onClick={submitHousingRequest}
                            disabled={!housingForm.city.trim()}
                            className="w-full text-xs font-black px-3 py-2 rounded-lg disabled:opacity-50"
                            style={{ background:"#F59E0B", color:C.navy }}>
                            {t.housingFormSubmit}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal CTA — Credits / Subscribe system */}
            <div className="px-5 pb-8 pt-2">
              {contactSent ? (
                <div className="rounded-2xl p-5" style={{ background:"#F0FDF4" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-black text-emerald-800">{t.contactUnlocked}</h4>
                      {creditSpend && (
                        <p className="text-xs font-bold mt-0.5" style={{ color:"#059669" }}>
                          5 credits used · {creditSpend.before} → <span className="text-lg font-black">{creditSpend.after}</span> remaining
                        </p>
                      )}
                      {companyPlan && (
                        <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                          Included in {companyPlan} plan
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm bg-white rounded-xl p-3 border border-emerald-200 text-left font-mono mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs w-12">{t.phoneShort}</span>
                      <span className="text-indigo-600 font-bold">{selectedWorker.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs w-12">{t.emailShort}</span>
                      <span className="text-indigo-600 font-bold">{selectedWorker.email}</span>
                    </div>
                  </div>

                  {/* In-platform messaging */}
                  <div className="bg-white rounded-xl border border-emerald-200 mb-3 overflow-hidden">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-black text-slate-500 uppercase tracking-wider">{t.msgTitle} — {selectedWorker.name.split(" ")[0]}</p>
                    </div>
                    {(messagesByWorker[selectedWorker.id]||[]).length > 0 && (
                      <div className="px-3 py-2 space-y-2 max-h-40 overflow-y-auto">
                        {(messagesByWorker[selectedWorker.id]||[]).map((m,i) => (
                          <div key={i} className={`flex ${m.from==="company"?"justify-end":"justify-start"}`}>
                            <div className="max-w-[75%] rounded-xl px-3 py-1.5 text-xs"
                              style={{ background:m.from==="company"?C.indigo:"#F1F5F9", color:m.from==="company"?"white":"#374151" }}>
                              {m.text}
                              <div className="text-[10px] opacity-60 mt-0.5">{m.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 p-2 border-t border-slate-100">
                      <input className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-indigo-400"
                        placeholder={t.msgPlaceholder} value={msgInput}
                        onChange={e=>setMsgInput(e.target.value)}
                        onKeyDown={e=>e.key==="Enter"&&sendMessage()} />
                      <button onClick={sendMessage}
                        className="px-3 py-1.5 rounded-lg text-xs font-black text-white" style={{ background:C.indigo }}>
                        {t.msgSend}
                      </button>
                    </div>
                  </div>

                  <button onClick={()=>{setContactSent(false);setSelectedWorker(null);setCreditSpend(null);}}
                    className="w-full py-2.5 rounded-xl text-sm font-bold border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50 transition-colors">
                    {t.closeBtn}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Live credits balance */}
                  <div className="flex items-center justify-between px-1">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-wider">{t.chooseAccess}</p>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black"
                      style={{background:"#EEF2FF",color:C.indigo}}>
                      <span className="text-base font-black">{credits}</span> credits
                    </div>
                  </div>

                  {/* Bundle bought flash */}
                  {bundleFlash && (
                    <div className="rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm font-bold"
                      style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0"}}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0"/>
                      {t.creditsAdded} +30 credits added — balance: {credits}
                    </div>
                  )}

                  {/* Use credits */}
                  {companyPlan || credits>=5 ? (
                    <button onClick={doUnlock}
                      className="w-full py-3.5 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      style={{background:C.indigo}}>
                      <Unlock className="w-4 h-4"/>
                      {companyPlan ? t.unlockContact : `${t.useCreditsBtn} (${credits} remaining)`}
                    </button>
                  ) : (
                    <div className="w-full py-3 rounded-2xl text-center text-sm font-semibold text-slate-400 border-2 border-dashed border-slate-200">
                      <Lock className="w-4 h-4 inline mr-1.5 opacity-50"/>
                      {t.notEnoughCredits} — {credits}/5 credits
                    </div>
                  )}

                  <div className="flex items-center gap-2 my-1">
                    <div className="flex-1 h-px bg-slate-200"/>
                    <span className="text-xs font-bold text-slate-400 uppercase">{t.orDivider}</span>
                    <div className="flex-1 h-px bg-slate-200"/>
                  </div>

                  {/* Buy credits */}
                  <button onClick={buyBundle}
                    className="w-full rounded-2xl p-4 text-left flex items-center justify-between border-2 hover:border-slate-300 transition-colors bg-white"
                    style={{borderColor:bundleFlash?"#86EFAC":"#E2E8F0"}}>
                    <div>
                      <p className="font-black text-sm text-slate-900">{t.bundleTitle}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{t.bundleDesc}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-black text-lg" style={{color:C.navy}}>{t.bundlePrice}</p>
                      <p className="text-[10px] text-slate-400">→ 6 unlocks</p>
                    </div>
                  </button>

                  {/* Bulk pack */}
                  <button onClick={buyBulk}
                    className="w-full rounded-2xl p-4 text-left flex items-center justify-between border-2 hover:border-slate-300 transition-colors bg-white"
                    style={{borderColor:bulkFlash?"#86EFAC":"#E2E8F0"}}>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-black text-sm text-slate-900">{t.bulkTitle}</p>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{background:"#FEF3C7",color:"#92400E"}}>{t.bulkSave}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{t.bulkDesc}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-black text-lg" style={{color:C.navy}}>{t.bulkPrice}</p>
                      <p className="text-[10px] text-slate-400">→ 20 unlocks</p>
                    </div>
                  </button>
                  {bulkFlash && (
                    <div className="rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm font-bold"
                      style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0"}}>
                      <CheckCircle className="w-4 h-4 flex-shrink-0"/>
                      {t.creditsAdded} +100 credits added — balance: {credits}
                    </div>
                  )}

                  {/* Subscribe */}
                  {[
                    {key:"monthly",label:t.monthlyPlan,price:t.monthlyPrice,desc:t.monthlyDesc,hi:false},
                    {key:"annual", label:t.annualPlan, price:t.annualPrice, desc:t.annualDesc, hi:true},
                  ].map(p=>(
                    <button key={p.key}
                      onClick={()=>{setCompanyPlan(p.key);setContactSent(true);}}
                      className="w-full rounded-2xl p-4 text-left flex items-center justify-between transition-all"
                      style={{border:p.hi?`2px solid ${C.indigo}`:"2px solid #E2E8F0",background:p.hi?"#EEF2FF":"white"}}>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-black text-sm text-slate-900">{p.label}</p>
                          {p.hi&&<span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{background:C.indigo}}>{t.bestValue}</span>}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
                      </div>
                      <p className="font-black text-sm flex-shrink-0 ml-4" style={{color:C.navy}}>{p.price}</p>
                    </button>
                  ))}

                  <p className="text-center text-xs text-slate-400">{t.cancel}</p>
                </div>
              )}
              <div className="mt-4 flex justify-center border-t border-slate-100 pt-4">
                <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors">
                  <Flag className="w-3.5 h-3.5"/>{t.reportProfile}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── COMPANY ACCOUNT / EDIT ───────────────────────────────────────────────
  if (screen === "companyAccount" && companyProfile && companyEditForm) {
    const sections = [
      { id:"company",  label:t.sCompany },
      { id:"contact",  label:t.sContact },
      { id:"billing",  label:t.sBilling },
      { id:"account",  label:t.sAccount },
    ];

    return (
      <div className="min-h-screen bg-slate-50" style={{ fontFamily:"system-ui,sans-serif" }}>
        <Nav {...navProps} back={() => go("companyDash")} backLabel={t.dashboardLabel} title={t.companyMyAccount} />

        {/* Header */}
        <div className="px-4 py-5" style={{ background:C.navy }}>
          <div className="max-w-lg mx-auto flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl flex-shrink-0"
              style={{ background:C.indigo }}>
              {companyProfile.compName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-black text-white text-lg truncate">{companyProfile.compName}</h2>
              <p className="text-slate-400 text-sm">{companyProfile.destCountry} · {companyProfile.industry}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: companyPlan?"rgba(16,185,129,0.2)":"rgba(245,158,11,0.2)", color: companyPlan?"#6EE7B7":"#FCD34D" }}>
                  {companyPlan ? t.activePlan : t.freePlanLabel}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background:"rgba(79,70,229,0.2)", color:C.indigoLight }}>
                  {credits} credits
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-slate-200 sticky top-14 z-30">
          <div className="flex overflow-x-auto max-w-lg mx-auto" style={{ scrollbarWidth:"none" }}>
            {sections.map(s => (
              <button key={s.id}
                onClick={() => { setCompanyEditSection(s.id); setCompanySaveStatus(null); setShowCompanyDeleteConfirm(false); }}
                className="py-3.5 px-4 text-xs font-bold whitespace-nowrap border-b-2 transition-all flex-shrink-0"
                style={{ borderColor:companyEditSection===s.id?C.indigo:"transparent", color:companyEditSection===s.id?C.indigo:"#64748B" }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-4">

          {companySaveStatus === "saved" && (
            <div className="rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-bold"
              style={{ background:"#F0FDF4", color:"#166534", border:"1px solid #BBF7D0" }}>
              <CheckCircle className="w-4 h-4"/>{t.saved}
            </div>
          )}

          {/* ─ COMPANY PROFILE ─ */}
          {companyEditSection === "company" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-black text-sm" style={{ color:C.navy }}>{t.sCompany}</h3>
              <Field label={t.compName}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={companyEditForm.compName} onChange={e=>setCompanyEditForm(p=>({...p,compName:e.target.value}))} />
              </Field>
              <Field label={t.kvk}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={companyEditForm.kvk||""} onChange={e=>setCompanyEditForm(p=>({...p,kvk:e.target.value}))}
                  placeholder={t.kvkExamplePh} />
              </Field>
              <Field label={t.address}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={companyEditForm.address||""} onChange={e=>setCompanyEditForm(p=>({...p,address:e.target.value}))}
                  placeholder={t.addressExamplePh} />
              </Field>
              <Field label={t.hiringCountry}>
                <div className="flex flex-wrap gap-2">
                  {DEST_COUNTRIES.map(c => (
                    <button key={c} onClick={()=>setCompanyEditForm(p=>({...p,destCountry:c}))}
                      className="px-3 py-2 rounded-xl text-sm font-black transition-colors"
                      style={{ background:companyEditForm.destCountry===c?C.indigo:"#F1F5F9", color:companyEditForm.destCountry===c?"white":"#475569" }}>
                      {c}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={t.industrySector}>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white"
                  value={companyEditForm.industry}
                  onChange={e=>setCompanyEditForm(p=>({...p,industry:e.target.value}))}>
                  {SECTORS.filter(s=>s!=="All").map(s=><option key={s}>{s}</option>)}
                </select>
              </Field>
              <SaveBar t={t} saveStatus={companySaveStatus} onSave={saveCompanyEdit} />
            </div>
          )}

          {/* ─ CONTACT ─ */}
          {companyEditSection === "contact" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-black text-sm" style={{ color:C.navy }}>{t.sContact}</h3>
              <Field label={t.email}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  type="email" value={companyEditForm.email||""} onChange={e=>setCompanyEditForm(p=>({...p,email:e.target.value}))} />
              </Field>
              <Field label={t.phone}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={companyEditForm.phone||""} onChange={e=>setCompanyEditForm(p=>({...p,phone:e.target.value}))}
                  placeholder="+31 6 xxxx xxxx" />
              </Field>
              <Field label={t.contactPerson}>
                <input className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                  value={companyEditForm.contactPerson||""} onChange={e=>setCompanyEditForm(p=>({...p,contactPerson:e.target.value}))} />
              </Field>
              <SaveBar t={t} saveStatus={companySaveStatus} onSave={saveCompanyEdit} />
            </div>
          )}

          {/* ─ BILLING & CREDITS ─ */}
          {companyEditSection === "billing" && (
            <div className="space-y-4">

              {/* Current status */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 className="font-black text-sm mb-4" style={{ color:C.navy }}>{t.currentPlanLabel}</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl p-3 text-center" style={{ background:"#EEF2FF" }}>
                    <p className="font-black text-3xl" style={{ color:C.indigo }}>{credits}</p>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">{t.creditsBalance}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">5 per unlock = {Math.floor(credits/5)} contacts</p>
                  </div>
                  <div className="rounded-xl p-3 text-center" style={{ background: companyPlan?"#F0FDF4":"#FEF3C7" }}>
                    <p className="font-black text-base" style={{ color: companyPlan?"#059669":"#92400E" }}>
                      {companyPlan ? companyPlan.charAt(0).toUpperCase()+companyPlan.slice(1) : "Free"}
                    </p>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">{t.currentPlanLabel}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">{t.unlockCost} · {t.noCreditsHint}</p>
              </div>

              {/* Buy credits */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 className="font-black text-sm mb-1" style={{ color:C.navy }}>{t.buyCredits}</h3>
                <p className="text-xs text-slate-500 mb-4">{t.bundleDesc}</p>
                <div className="rounded-2xl p-4 flex items-center justify-between border-2 border-slate-200 mb-3">
                  <div>
                    <p className="font-black text-sm text-slate-900">{t.bundleTitle}</p>
                    <p className="text-xs text-slate-500">30 credits — unlock 6 contacts</p>
                  </div>
                  <p className="font-black text-xl" style={{ color:C.navy }}>{t.bundlePrice}</p>
                </div>
                {bundleFlash && (
                  <div className="rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm font-bold mb-2"
                    style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0"}}>
                    <CheckCircle className="w-4 h-4"/>{t.creditsAdded} Balance: {credits} credits
                  </div>
                )}
                <button onClick={()=>{ buyBundle(); setCompanySaveStatus("saved"); setTimeout(()=>setCompanySaveStatus(null),2000); }}
                  className="w-full py-3 rounded-xl text-white font-black text-sm"
                  style={{ background:C.indigo }}>
                  {t.buyBundle} — €30 (+30 credits)
                </button>

                {/* Bulk pack */}
                <div className="rounded-2xl p-4 flex items-center justify-between border-2 border-slate-200 mt-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-black text-sm text-slate-900">{t.bulkTitle}</p>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{background:"#FEF3C7",color:"#92400E"}}>{t.bulkSave}</span>
                    </div>
                    <p className="text-xs text-slate-500">{t.bulkDesc}</p>
                  </div>
                  <p className="font-black text-xl" style={{ color:C.navy }}>{t.bulkPrice}</p>
                </div>
                {bulkFlash && (
                  <div className="rounded-xl px-3 py-2.5 flex items-center gap-2 text-sm font-bold mb-2"
                    style={{background:"#F0FDF4",color:"#166534",border:"1px solid #BBF7D0"}}>
                    <CheckCircle className="w-4 h-4"/>{t.creditsAdded} Balance: {credits} credits
                  </div>
                )}
                <button onClick={()=>{ buyBulk(); setCompanySaveStatus("saved"); setTimeout(()=>setCompanySaveStatus(null),2000); }}
                  className="w-full py-3 rounded-xl text-white font-black text-sm"
                  style={{ background:C.navy }}>
                  {t.buyBulk} — {t.bulkPrice} (+100 credits)
                </button>
              </div>

              {/* Subscribe */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 className="font-black text-sm mb-4" style={{ color:C.navy }}>{t.subscriptionsTitle}</h3>
                <div className="space-y-3">
                  {[
                    { key:"monthly", label:t.monthlyPlan, price:t.monthlyPrice, desc:t.monthlyDesc, hi:false },
                    { key:"annual",  label:t.annualPlan,  price:t.annualPrice,  desc:t.annualDesc,  hi:true  },
                  ].map(p=>(
                    <div key={p.key} className="rounded-2xl p-4 flex items-center justify-between"
                      style={{ border:p.hi?`2px solid ${C.indigo}`:"2px solid #E2E8F0", background:p.hi?"#EEF2FF":"white" }}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-sm text-slate-900">{p.label}</p>
                          {p.hi&&<span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{background:C.indigo}}>{t.bestValue}</span>}
                          {companyPlan===p.key&&<span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{t.active}</span>}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className="font-black text-base" style={{ color:C.navy }}>{p.price}</p>
                        <button
                          onClick={() => { setCompanyPlan(p.key); setCompanySaveStatus("saved"); setTimeout(()=>setCompanySaveStatus(null),2000); }}
                          className="text-xs font-bold mt-1 px-3 py-1 rounded-lg text-white"
                          style={{ background: companyPlan===p.key?"#94A3B8":C.indigo }}>
                          {companyPlan===p.key ? "Active" : t.subscribeTo}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                {companyPlan && (
                  <button onClick={()=>setCompanyPlan(null)}
                    className="mt-3 text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors">
                    {t.cancelSubscription}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ─ ACCOUNT & SECURITY ─ */}
          {companyEditSection === "account" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border-2" style={{ borderColor:"#FEE2E2" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Trash2 className="w-4 h-4 text-red-500"/>
                  <h3 className="font-black text-sm text-red-600">{t.dangerZone}</h3>
                </div>
                {!showCompanyDeleteConfirm ? (
                  <>
                    <p className="text-xs text-slate-500 mb-3">{t.deleteCompanyDesc}</p>
                    <button onClick={()=>setShowCompanyDeleteConfirm(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors"
                      style={{ border:"1px solid #FCA5A5", color:"#DC2626" }}>
                      {t.deleteAccount}
                    </button>
                  </>
                ) : (
                  <div className="rounded-xl p-4" style={{ background:"#FEF2F2" }}>
                    <p className="text-sm font-bold text-red-800 mb-3">{t.deleteConfirm}</p>
                    <div className="flex gap-2">
                      <button onClick={()=>setShowCompanyDeleteConfirm(false)}
                        className="flex-1 py-2 rounded-xl text-sm font-bold border border-slate-200 bg-white text-slate-600">
                        {t.cancelEdit}
                      </button>
                      <button onClick={async ()=>{ 
                        if (supaUser) {
                          await supabase.from("companies").delete().eq("user_id", supaUser.id);
                          await supabase.functions.invoke("delete-user", { body: { user_id: supaUser.id } });
                          await supabase.auth.signOut();
                        }
                        setCompanyProfile(null); go("landing");
                      }}
                        className="flex-1 py-2 rounded-xl text-sm font-bold text-white"
                        style={{ background:"#DC2626" }}>
                        {t.deleteCompanyBtn}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 mb-1">{label}</label>
      {children}
    </div>
  );
}

function SaveBar({ t, saveStatus, onSave }) {
  return (
    <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
      <button onClick={onSave} disabled={saveStatus==="saving"}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background:"#0F172A" }}>
        {saveStatus === "saving"
          ? <><RefreshCw className="w-4 h-4 animate-spin"/>{t.savingLabel}</>
          : <><Save className="w-4 h-4"/>{t.saveChanges}</>}
      </button>
      {saveStatus === "saved" && (
        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
          <CheckCircle className="w-3.5 h-3.5"/>{t.saved}
        </span>
      )}
    </div>
  );
}

function DisclaimerBar({ t }) {
  return (
    <div className="rounded-xl p-4 flex items-start gap-3 border" style={{ background:"#FFFBEB", borderColor:"#FDE68A" }}>
      <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-amber-800 leading-relaxed">{t.disclaimer}</p>
    </div>
  );
}

function FiltersContent({ t, workerTypeTab, setWorkerTypeTab, sector, setSector, filterVerified, setFilterVerified, filterNoHousing, setFilterNoHousing, filterEmployment, setFilterEmployment, NAV_BG, INDIGO }) {
  return (
    <>
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">{t.candidateType}</h4>
        <div className="space-y-1">
          {[["all",t.allCandidates],["local",t.localRes],["relocate",t.openReloc2]].map(([v,label]) => (
            <button key={v} onClick={()=>setWorkerTypeTab(v)}
              className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-colors"
              style={{ background:workerTypeTab===v?INDIGO:"transparent", color:workerTypeTab===v?"white":"#475569" }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">{t.employmentType}</h4>
        <div className="flex flex-wrap gap-1">
          {[["all",t.allTypes],["permanent",t.permanentLabel],["seasonal",t.seasonalLabel]].map(([v,label]) => (
            <button key={v} onClick={()=>setFilterEmployment(v)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
              style={{ background:filterEmployment===v?NAV_BG:"#F1F5F9", color:filterEmployment===v?"white":"#64748B" }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">{t.fsector}</h4>
        <div className="flex flex-wrap gap-1">
          {["All","Logistics","Manufacturing","Hospitality","Construction","Agriculture","Cleaning"].map(s => (
            <button key={s} onClick={()=>setSector(s)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold transition-colors"
              style={{ background:sector===s?NAV_BG:"#F1F5F9", color:sector===s?"white":"#64748B" }}>
              {s==="All"?t.allSectors:s}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-100 pt-4 space-y-3">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">{t.compliance}</h4>
        <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl bg-emerald-50">
          <input type="checkbox" checked={filterVerified} onChange={e=>setFilterVerified(e.target.checked)} className="w-4 h-4 rounded accent-emerald-600" />
          <span className="text-xs font-bold text-emerald-800">{t.verifiedOnly}</span>
        </label>
        <label className="flex items-center gap-2.5 cursor-pointer p-2 rounded-xl bg-blue-50">
          <input type="checkbox" checked={filterNoHousing} onChange={e=>setFilterNoHousing(e.target.checked)} className="w-4 h-4 rounded accent-blue-600" />
          <span className="text-xs font-bold text-blue-800">{t.noHousing}</span>
        </label>
      </div>
    </>
  );
}

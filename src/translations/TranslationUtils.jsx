// TranslationUtils.js
import translations from "../translations/Translations";

export const translate = (language, key) => {
  if (translations[language] && translations[language][key]) {
    return translations[language][key];
  }
  return key; // Вернуть исходный ключ, если перевод не найден
};

export const switchLanguage = (currentLanguage, setLanguage) => {
  const languages = ["en", "uk"];
  const newLanguage = languages[(languages.indexOf(currentLanguage) + 1) % languages.length];
  localStorage.setItem("language", newLanguage);
  setLanguage(newLanguage);
  window.location.reload();
};

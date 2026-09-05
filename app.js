"use strict";

const SVG_NS = "http://www.w3.org/2000/svg";
const STORAGE_KEY = "p16-label-desk-project-v1";
const LANGUAGE_KEY = "p16-label-desk-language";

const PALETTE = [
  "#009b2f", "#2c8498", "#2369c7", "#6f42c1", "#9b159b",
  "#e05200", "#ef1010", "#dca600", "#54606e", "#222222"
];

const FONT_MAP = {
  narrow: '"Arial Narrow", "Helvetica Neue", Arial, sans-serif',
  neutral: 'Arial, "Helvetica Neue", sans-serif',
  humanist: '"Trebuchet MS", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: '"Courier New", monospace',
  display: 'Impact, Haettenschweiler, sans-serif'
};

// Measured on a physical P16-M and verified to fit both P16-M and P16-HQ.
const PRINT_GEOMETRY = {
  label: "P16-HQ / P16-M", fileSlug: "p16",
  stripWidth: 227, stripHeight: 18,
  channelWidth: 12.5, groupGap: 3, sideMargin: 9
};

const TRANSLATIONS = {
  en: {
    "language.label": "Interface language",
    "actions.saveProject": "Save project",
    "actions.openProject": "Open project",
    "actions.downloadSvg": "Download SVG",
    "actions.printA4": "Print A4",
    "actions.reset": "Reset to the default layout",
    "actions.remove": "Remove",
    "actions.search": "Search",
    "actions.clearChannel": "Clear selected channel",
    "aria.editor": "Label editor",
    "aria.channelSelection": "Channel selection",
    "aria.colorPresets": "Color presets",
    "aria.recommendedIcons": "Recommended icons",
    "aria.printPreview": "Print preview",
    "aria.printSheet": "A4 sheet with label strips",
    "channels.heading": "Channels",
    "channels.hint": "Select a channel here or on the strip.",
    "channels.empty": "Empty channel",
    "channels.emptyLower": "empty",
    "channels.one": "Channel {number}",
    "channels.range": "Channels {first}–{last}",
    "channels.linked": "Channel {number}, linked to {owner}",
    "channels.aria": "Channel {number}: {name}",
    "fields.name": "Name",
    "fields.subtitle": "Small caption",
    "fields.optional": "optional",
    "fields.width": "Width",
    "fields.layout": "Layout",
    "fields.fill": "Fill",
    "fields.text": "Text",
    "fields.color": "Color",
    "fields.icon": "Icon",
    "fields.font": "Font",
    "fields.copies": "Copies on A4",
    "fields.titleSize": "Name size",
    "fields.iconSize": "Icon size",
    "fields.uppercase": "Uppercase name",
    "fields.calibration": "50 mm calibration ruler",
    "span.one": "1 channel",
    "span.two": "2 channels",
    "layout.stack": "Icon above",
    "layout.left": "Icon on the left",
    "layout.text": "Text only",
    "layout.icon": "Icon only",
    "fill.top": "Top bar",
    "fill.bottom": "Bottom bar",
    "fill.full": "Full",
    "fill.soft": "Soft background",
    "fill.outline": "Colored outline",
    "fill.icon": "Icon only",
    "text.auto": "Auto contrast",
    "text.dark": "Dark",
    "text.light": "White",
    "text.color": "Match icon color",
    "icons.searchPlaceholder": "Search Iconify: drums, choir…",
    "icons.offline": "Built-in icons work offline.",
    "icons.searching": "Searching Iconify collections…",
    "icons.found": "Found: {count}. Select an icon to use it.",
    "icons.notFound": "Nothing found. Try another search.",
    "icons.loading": "Loading {icon}…",
    "icons.embedded": "{icon} is embedded in the project and will work offline.",
    "icons.loadFailed": "Could not load icon: {error}",
    "icons.searchUnavailable": "Search unavailable: {error}. Built-in icons still work offline.",
    "icon.microphone": "Microphone",
    "icon.talk": "Talk",
    "icon.guitar": "Guitar",
    "icon.keys": "Keys",
    "icon.music": "Music",
    "icon.metronome": "Metronome",
    "icon.drums": "Drums",
    "icon.mixer": "Mixer",
    "sheet.heading": "Whole sheet",
    "sheet.hint": "Settings shared by all labels.",
    "brand.subtitle": "{width} × {height} mm label strip designer",
    "geometry.summary": "{width} × {height} mm · channel {channel} mm · group gap {gap} mm",
    "preview.heading": "A4 sheet · landscape",
    "preview.description": "{model} · {width} × {height} mm label · print at actual size",
    "about.heading": "Printable labels for Behringer P16 personal mixers",
    "about.intro": "Create a 227 × 18 mm channel label strip for Behringer P16-M and P16-HQ personal monitor mixers. Add names, captions, icons and colors, then export SVG or print up to eight strips on one A4 sheet.",
    "about.stepOne": "Choose a channel and enter its name.",
    "about.stepTwo": "Pick an icon, color and layout.",
    "about.stepThree": "Print at 100% / Actual size and verify the 50 mm ruler.",
    "about.russian": "Русская версия",
    "about.source": "Source code on GitHub",
    "about.disclaimer": "Unofficial community tool. Not affiliated with Behringer or Music Tribe.",
    "status.saving": "Saving…",
    "status.saved": "Saved in browser",
    "calibration.label": "50 mm · print at 100% / Actual size",
    "confirm.clear": "Clear channel {number}?",
    "confirm.reset": "Reset to the default layout? Your current changes will be replaced.",
    "toast.reset": "Default layout restored",
    "toast.svgDownloaded": "SVG strip downloaded",
    "toast.projectSaved": "Project saved",
    "toast.projectOpened": "Project opened",
    "toast.openFailed": "Could not open project: {error}",
    "errors.projectChannels": "A project must contain 16 channels"
  },
  ru: {
    "language.label": "Язык интерфейса",
    "actions.saveProject": "Сохранить проект",
    "actions.openProject": "Открыть проект",
    "actions.downloadSvg": "Скачать SVG",
    "actions.printA4": "Печатать A4",
    "actions.reset": "Вернуть исходную раскладку",
    "actions.remove": "Убрать",
    "actions.search": "Найти",
    "actions.clearChannel": "Очистить выбранный канал",
    "aria.editor": "Редактор подписей",
    "aria.channelSelection": "Выбор канала",
    "aria.colorPresets": "Готовые цвета",
    "aria.recommendedIcons": "Рекомендуемые иконки",
    "aria.printPreview": "Предпросмотр печати",
    "aria.printSheet": "Лист A4 с полосами",
    "channels.heading": "Каналы",
    "channels.hint": "Нажмите канал на полосе или здесь.",
    "channels.empty": "Пустой канал",
    "channels.emptyLower": "пустой",
    "channels.one": "Канал {number}",
    "channels.range": "Каналы {first}–{last}",
    "channels.linked": "Канал {number}, объединён с {owner}",
    "channels.aria": "Канал {number}: {name}",
    "fields.name": "Название",
    "fields.subtitle": "Подпись мелким",
    "fields.optional": "необязательно",
    "fields.width": "Ширина",
    "fields.layout": "Композиция",
    "fields.fill": "Заливка",
    "fields.text": "Текст",
    "fields.color": "Цвет",
    "fields.icon": "Иконка",
    "fields.font": "Шрифт",
    "fields.copies": "Копий на A4",
    "fields.titleSize": "Размер названия",
    "fields.iconSize": "Размер иконки",
    "fields.uppercase": "Название прописными",
    "fields.calibration": "Линейка 50 мм",
    "span.one": "1 канал",
    "span.two": "2 канала",
    "layout.stack": "Иконка сверху",
    "layout.left": "Иконка слева",
    "layout.text": "Только текст",
    "layout.icon": "Только иконка",
    "fill.top": "Полоса сверху",
    "fill.bottom": "Полоса снизу",
    "fill.full": "Целиком",
    "fill.soft": "Лёгкий фон",
    "fill.outline": "Цветная рамка",
    "fill.icon": "Только иконка",
    "text.auto": "Автоконтраст",
    "text.dark": "Тёмный",
    "text.light": "Белый",
    "text.color": "В цвет иконки",
    "icons.searchPlaceholder": "Поиск по Iconify: drums, choir…",
    "icons.offline": "Встроенные иконки работают без интернета.",
    "icons.searching": "Ищу в коллекциях Iconify…",
    "icons.found": "Найдено: {count}. Нажмите иконку, чтобы выбрать.",
    "icons.notFound": "Ничего не найдено. Попробуйте запрос по-английски.",
    "icons.loading": "Загружаю {icon}…",
    "icons.embedded": "{icon} встроена в проект и будет работать офлайн.",
    "icons.loadFailed": "Не удалось загрузить иконку: {error}",
    "icons.searchUnavailable": "Поиск недоступен: {error}. Встроенными иконками можно пользоваться офлайн.",
    "icon.microphone": "Микрофон",
    "icon.talk": "Разговор",
    "icon.guitar": "Гитара",
    "icon.keys": "Клавиши",
    "icon.music": "Музыка",
    "icon.metronome": "Метроном",
    "icon.drums": "Барабан",
    "icon.mixer": "Микшер",
    "sheet.heading": "Весь лист",
    "sheet.hint": "Общие параметры всех подписей.",
    "brand.subtitle": "конструктор полос {width} × {height} мм",
    "geometry.summary": "{width} × {height} мм · канал {channel} мм · разрыв групп {gap} мм",
    "preview.heading": "Лист A4 · альбомный",
    "preview.description": "{model} · наклейка {width} × {height} мм · печатать без масштабирования",
    "about.heading": "Печатные подписи для персональных микшеров Behringer P16",
    "about.intro": "Создайте полосу подписей каналов размером 227 × 18 мм для персональных мониторных микшеров Behringer P16-M и P16-HQ. Добавьте названия, мелкие подписи, иконки и цвета, затем скачайте SVG или напечатайте до восьми полос на одном листе A4.",
    "about.stepOne": "Выберите канал и введите его название.",
    "about.stepTwo": "Выберите иконку, цвет и композицию.",
    "about.stepThree": "Печатайте в масштабе 100% / Actual size и проверьте линейку 50 мм.",
    "about.russian": "Русская версия",
    "about.source": "Исходный код на GitHub",
    "about.disclaimer": "Неофициальный инструмент сообщества. Не связан с Behringer или Music Tribe.",
    "status.saving": "Сохраняю…",
    "status.saved": "Сохранено в браузере",
    "calibration.label": "50 мм · печать 100% / Actual size",
    "confirm.clear": "Очистить канал {number}?",
    "confirm.reset": "Вернуть исходную раскладку? Текущие изменения будут заменены.",
    "toast.reset": "Исходная раскладка восстановлена",
    "toast.svgDownloaded": "SVG-полоса скачана",
    "toast.projectSaved": "Проект сохранён",
    "toast.projectOpened": "Проект открыт",
    "toast.openFailed": "Не удалось открыть проект: {error}",
    "errors.projectChannels": "В проекте должно быть 16 каналов"
  }
};

// SVG paths are embedded so the default project remains printable offline.
// Phosphor Icons 2.1.1 — MIT. Font Awesome Free 6 — CC BY 4.0.
const BUILTIN_ICONS = {
  "ph:microphone-fill": {
    labelKey: "icon.microphone", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M80 128V64a48 48 0 0 1 96 0v64a48 48 0 0 1-96 0m128 0a8 8 0 0 0-16 0a64 64 0 0 1-128 0a8 8 0 0 0-16 0a80.11 80.11 0 0 0 72 79.6V240a8 8 0 0 0 16 0v-32.4a80.11 80.11 0 0 0 72-79.6"/>'
  },
  "ph:chat-circle-dots-fill": {
    labelKey: "icon.talk", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M128 24a104 104 0 0 0-91.82 152.88l-11.35 34.05a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24M84 140a12 12 0 1 1 12-12a12 12 0 0 1-12 12m44 0a12 12 0 1 1 12-12a12 12 0 0 1-12 12m44 0a12 12 0 1 1 12-12a12 12 0 0 1-12 12"/>'
  },
  "ph:guitar-fill": {
    labelKey: "icon.guitar", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="m249.66 46.34l-40-40a8 8 0 0 0-11.32 11.32l2.35 2.34l-60.17 60.16c-22.79-11.86-48.31-10.87-63.77 4.58a42.3 42.3 0 0 0-9.39 14.37a8.24 8.24 0 0 1-7.55 4.89c-14.59.49-27.26 5.72-36.65 15.11C11.08 131.22 6 148.6 8.74 168.07C11.4 186.7 21.07 205.15 36 220s33.34 24.56 52 27.22a71 71 0 0 0 10.1.78c15.32 0 28.83-5.23 38.76-15.16c9.39-9.39 14.62-22.06 15.11-36.65a8.24 8.24 0 0 1 4.92-7.55a42.2 42.2 0 0 0 14.37-9.39c15.45-15.46 16.44-41 4.58-63.77L236 55.31l2.34 2.35a8 8 0 0 0 11.32-11.32m-156 159.31a8 8 0 0 1-11.31 0l-32-32a8 8 0 0 1 11.32-11.31l32 32a8 8 0 0 1-.01 11.31m42.14-45.86a28 28 0 1 1 0-39.59a28 28 0 0 1 0 39.59m31.06-58a87 87 0 0 0-6-6.68a85 85 0 0 0-6.69-6L176 67.31L188.69 80ZM200 68.68L187.32 56L212 31.31L224.69 44Z"/>'
  },
  "ph:piano-keys-fill": {
    labelKey: "icon.keys", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16M88 208H48V48h24v96a8 8 0 0 0 8 8h8Zm64 0h-48v-56h8a8 8 0 0 0 8-8V48h16v96a8 8 0 0 0 8 8h8Zm56 0h-40v-56h8a8 8 0 0 0 8-8V48h24z"/>'
  },
  "ph:music-notes-fill": {
    labelKey: "icon.music", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M212.92 17.71a7.89 7.89 0 0 0-6.86-1.46l-128 32A8 8 0 0 0 72 56v110.1A36 36 0 1 0 88 196v-93.75l112-28v59.85a36 36 0 1 0 16 29.9V24a8 8 0 0 0-3.08-6.29"/>'
  },
  "ph:metronome-fill": {
    labelKey: "icon.metronome", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="m187.14 114.84l26.78-29.46a8 8 0 0 0-11.84-10.76l-20.55 22.6l-17.2-54.07A15.94 15.94 0 0 0 149.08 32h-42.17a15.94 15.94 0 0 0-15.25 11.15l-50.91 160A16 16 0 0 0 56 224h144a16 16 0 0 0 15.25-20.85ZM71.27 160l35.64-112h42.17l20 62.9l-44.62 49.1Zm74.81 0l28.62-31.48l10 31.48Z"/>'
  },
  "fa6-solid:drum": {
    labelKey: "icon.drums", viewBox: "0 0 512 512",
    body: '<path fill="currentColor" d="M501.2 76.1c11.1-7.3 14.2-22.1 6.9-33.2S486 28.7 474.9 36l-104.7 68.5C335.8 98.7 297 96 256 96C114.6 96 0 128 0 208v160c0 31.3 27.4 58.8 72 78.7V344c0-13.3 10.7-24 24-24s24 10.7 24 24v119.4c33 8.9 71.1 14.5 112 16.1V376c0-13.3 10.7-24 24-24s24 10.7 24 24v103.5c40.9-1.6 79-7.2 112-16.1V344c0-13.3 10.7-24 24-24s24 10.7 24 24v102.7c44.6-19.9 72-47.4 72-78.7V208c0-41.1-30.2-69.5-78.8-87.4l67.9-44.5zm-193.8 69.5l-64.6 42.3c-11.1 7.3-14.2 22.1-6.9 33.2s22.1 14.2 33.2 6.9l111.1-72.8c14.7 3.2 27.9 7 39.4 11.5c38.8 15.1 44.4 30.7 44.4 41.3c0 .8-2.7 17.2-46 35.9c-38.9 16.8-96 28.1-162 28.1s-123.1-11.3-162-28.1c-43.3-18.7-46-35.1-46-35.9c0-10.6 5.6-26.2 44.4-41.3C130.6 151.9 187.8 144 256 144c18 0 35.1.5 51.4 1.6"/>'
  },
  "ph:faders-fill": {
    labelKey: "icon.mixer", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M136 120v96a8 8 0 0 1-16 0v-96a8 8 0 0 1 16 0m64 72a8 8 0 0 0-8 8v16a8 8 0 0 0 16 0v-16a8 8 0 0 0-8-8m24-48h-16V40a8 8 0 0 0-16 0v104h-16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8M56 160a8 8 0 0 0-8 8v48a8 8 0 0 0 16 0v-48a8 8 0 0 0-8-8m24-48H64V40a8 8 0 0 0-16 0v72H32a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8m72-48h-16V40a8 8 0 0 0-16 0v24h-16a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8"/>'
  }
};

const defaultChannel = () => ({
  name: "", subtitle: "", icon: "", color: "#54606e",
  fill: "top", layout: "stack", textColor: "auto", span: 1
});

function makeDefaultState() {
  const channels = Array.from({ length: 16 }, defaultChannel);
  const set = (index, values) => Object.assign(channels[index], values);
  set(0, { name: "VOC1", icon: "ph:microphone-fill", color: "#009b2f" });
  set(1, { name: "VOC2", icon: "ph:microphone-fill", color: "#00a020" });
  set(2, { color: "#c7c9cc" });
  set(3, { name: "TALK", icon: "ph:chat-circle-dots-fill", color: "#222222" });
  set(4, { name: "GUITAR", icon: "ph:guitar-fill", color: "#dca600", span: 2 });
  set(6, { name: "KEYS", icon: "ph:piano-keys-fill", color: "#2c8498", span: 2 });
  set(8, { name: "MUSIC", icon: "ph:music-notes-fill", color: "#e05200", span: 2 });
  set(10, { name: "BASS", icon: "ph:guitar-fill", color: "#9b159b" });
  set(11, { name: "CLICK", icon: "ph:metronome-fill", color: "#222222" });
  set(12, { name: "DRUMS", icon: "fa6-solid:drum", color: "#ef1010", span: 2 });
  set(14, { name: "FULL MIX", icon: "ph:faders-fill", color: "#2369c7", span: 2 });
  return {
    version: 2,
    settings: { font: "narrow", copies: 8, titleSize: 2.55, iconSize: 8.2, uppercase: true, showCalibration: true },
    channels,
    icons: {}
  };
}

let state = loadState();
let selectedChannel = 0;
let toastTimer = 0;
let currentLanguage = loadLanguage();
let searchStatusState = { key: "icons.offline", params: {} };

const $ = (selector) => document.querySelector(selector);
const el = (tag, className = "") => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  return node;
};
const svgEl = (tag, attrs = {}) => {
  const node = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
  return node;
};

function loadLanguage() {
  if (document.documentElement.dataset.pageLanguage === "ru") return "ru";
  try {
    return localStorage.getItem(LANGUAGE_KEY) === "ru" ? "ru" : "en";
  } catch (error) {
    return "en";
  }
}

function t(key, params = {}) {
  const template = TRANSLATIONS[currentLanguage][key] || TRANSLATIONS.en[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
}

function localNumber(value) {
  const shown = String(value);
  return currentLanguage === "ru" ? shown.replace(".", ",") : shown;
}

function iconLabel(icon) {
  return icon.labelKey ? t(icon.labelKey) : icon.label;
}

function setSearchStatus(key, params = {}) {
  searchStatusState = { key, params };
  $("#searchStatus").textContent = t(key, params);
}

function applyLanguage(language) {
  currentLanguage = language === "ru" ? "ru" : "en";
  document.documentElement.lang = currentLanguage;
  try { localStorage.setItem(LANGUAGE_KEY, currentLanguage); } catch (error) { /* Language still works for this tab. */ }

  document.querySelectorAll("[data-i18n]").forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach(node => {
    node.title = t(node.dataset.i18nTitle);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(node => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-language]").forEach(button => {
    const active = button.dataset.language === currentLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  $("#saveStateText").textContent = t("status.saved");
  setSearchStatus(searchStatusState.key, searchStatusState.params);
  render();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.channels) && saved.channels.length === 16) return normalizeState(saved);
  } catch (error) {
    console.warn("Saved project could not be loaded", error);
  }
  return makeDefaultState();
}

function normalizeState(input) {
  const base = makeDefaultState();
  const settings = { ...base.settings, ...(input.settings || {}) };
  delete settings.model;
  return {
    version: 2,
    settings,
    channels: Array.from({ length: 16 }, (_, index) => ({ ...defaultChannel(), ...(input.channels[index] || {}) })),
    icons: input.icons && typeof input.icons === "object" ? input.icons : {}
  };
}

function saveState() {
  const indicator = $("#saveState");
  indicator.classList.add("saving");
  $("#saveStateText").textContent = t("status.saving");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.setTimeout(() => {
    indicator.classList.remove("saving");
    $("#saveStateText").textContent = t("status.saved");
  }, 180);
}

function commit(mutator) {
  mutator();
  saveState();
  render();
}

function ownerOf(index) {
  const local = index % 4;
  if (local > 0 && Number(state.channels[index - 1].span) === 2) return index - 1;
  return index;
}

function validSpan(channel, index) {
  return Number(channel.span) === 2 && index % 4 < 3 ? 2 : 1;
}

function getIcon(iconId) {
  return BUILTIN_ICONS[iconId] || state.icons[iconId] || null;
}

function makeIconSvg(icon, color = "currentColor") {
  const node = svgEl("svg", { viewBox: icon.viewBox, "aria-hidden": "true" });
  node.style.color = color;
  node.innerHTML = icon.body;
  return node;
}

function contrastColor(hex) {
  const clean = String(hex).replace("#", "");
  const value = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean.padEnd(6, "0");
  const rgb = [0, 2, 4].map(pos => parseInt(value.slice(pos, pos + 2), 16) / 255)
    .map(component => component <= .03928 ? component / 12.92 : ((component + .055) / 1.055) ** 2.4);
  const luminance = .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
  return luminance > .42 ? "#111111" : "#ffffff";
}

function labelColors(channel) {
  const automatic = channel.fill === "full" ? contrastColor(channel.color) : "#111111";
  const text = channel.textColor === "dark" ? "#111111"
    : channel.textColor === "light" ? "#ffffff"
    : channel.textColor === "color" ? channel.color : automatic;
  const icon = channel.fill === "full" ? contrastColor(channel.color) : channel.color;
  return { text, icon };
}

function appendRect(parent, attrs) { parent.append(svgEl("rect", attrs)); }

function appendLabelText(group, value, x, y, width, baseSize, color, anchor = "middle", weight = 800) {
  if (!value) return;
  const shown = state.settings.uppercase ? value.toLocaleUpperCase(currentLanguage === "ru" ? "ru-RU" : "en-US") : value;
  const familyFactor = state.settings.font === "narrow" || state.settings.font === "display" ? .48 : .56;
  const fitted = Math.max(1.35, Math.min(baseSize, (width - .9) / Math.max(1, shown.length * familyFactor)));
  const text = svgEl("text", {
    x, y, fill: color, "font-size": fitted, "font-family": FONT_MAP[state.settings.font],
    "font-weight": weight, "text-anchor": anchor, "dominant-baseline": "auto"
  });
  text.textContent = shown;
  group.append(text);
}

function appendIcon(group, channel, x, y, width, height, color) {
  const icon = getIcon(channel.icon);
  if (!icon) return;
  const nested = makeIconSvg(icon, color);
  nested.setAttribute("x", x);
  nested.setAttribute("y", y);
  nested.setAttribute("width", width);
  nested.setAttribute("height", height);
  nested.setAttribute("preserveAspectRatio", "xMidYMid meet");
  group.append(nested);
}

function renderLabel(group, channel, x, width) {
  const y = .25;
  const height = 17.5;
  const { text, icon } = labelColors(channel);

  appendRect(group, { class: "label-frame", x, y, width, height, fill: channel.fill === "full" ? channel.color : "#ffffff", stroke: "#8a8a8a", "stroke-width": .18 });
  if (channel.fill === "top") appendRect(group, { x, y, width, height: 1.15, fill: channel.color });
  if (channel.fill === "bottom") appendRect(group, { x, y: 16.6, width, height: 1.15, fill: channel.color });
  if (channel.fill === "soft") appendRect(group, { x, y, width, height, fill: channel.color, "fill-opacity": .14 });
  if (channel.fill === "outline") appendRect(group, { x: x + .45, y: y + .45, width: width - .9, height: height - .9, fill: "none", stroke: channel.color, "stroke-width": .65 });

  const title = channel.name || "";
  const subtitle = channel.subtitle || "";
  const iconSize = Math.min(Number(state.settings.iconSize), width - 2.2, 10.5);
  const center = x + width / 2;

  if (channel.layout === "icon") {
    const size = Math.min(11.1, width - 2, 14.2);
    appendIcon(group, channel, center - size / 2, 3.25, size, 11.1, icon);
    return;
  }

  if (channel.layout === "text") {
    const titleY = subtitle ? 9.1 : 10.7;
    appendLabelText(group, title, center, titleY, width, Number(state.settings.titleSize) + .35, text);
    appendLabelText(group, subtitle, center, 12.7, width, 1.55, text, "middle", 500);
    return;
  }

  if (channel.layout === "left") {
    const size = Math.min(7.4, width * .34);
    const iconX = x + .8;
    appendIcon(group, channel, iconX, 5.25, size, 7.4, icon);
    const textX = iconX + size + .8;
    const textWidth = width - size - 2;
    appendLabelText(group, title, textX, subtitle ? 8.2 : 10.2, textWidth, Number(state.settings.titleSize), text, "start");
    appendLabelText(group, subtitle, textX, 11.2, textWidth, 1.45, text, "start", 500);
    return;
  }

  const iconY = channel.fill === "top" ? 2.05 : 1.45;
  appendIcon(group, channel, center - iconSize / 2, iconY, iconSize, 8.8, icon);
  appendLabelText(group, title, center, subtitle ? 13.1 : 15.05, width, Number(state.settings.titleSize), text);
  appendLabelText(group, subtitle, center, 15.75, width, 1.45, text, "middle", 500);
}

function buildStripSvg(interactive = false) {
  const profile = PRINT_GEOMETRY;
  const { stripWidth, stripHeight, channelWidth, groupGap, sideMargin } = profile;
  const root = svgEl("svg", {
    class: "label-strip",
    width: `${stripWidth}mm`, height: `${stripHeight}mm`,
    viewBox: `0 0 ${stripWidth} ${stripHeight}`,
    xmlns: SVG_NS,
    "data-geometry": "measured"
  });
  appendRect(root, { x: 0, y: 0, width: stripWidth, height: stripHeight, fill: "#ffffff" });
  appendRect(root, { x: .125, y: .125, width: stripWidth - .25, height: stripHeight - .25, fill: "none", stroke: "#222222", "stroke-width": .25 });

  for (let groupIndex = 0; groupIndex < 4; groupIndex += 1) {
    let local = 0;
    while (local < 4) {
      const index = groupIndex * 4 + local;
      const channel = state.channels[index];
      const span = validSpan(channel, index);
      const groupWidth = 4 * channelWidth;
      const x = sideMargin + groupIndex * (groupWidth + groupGap) + local * channelWidth;
      const width = span * channelWidth;
      const group = svgEl("g", {
        class: "label-hit", "data-channel": index, tabindex: interactive ? 0 : -1,
        role: interactive ? "button" : "img",
        "aria-label": t("channels.aria", { number: index + 1, name: channel.name || t("channels.emptyLower") })
      });
      if (interactive && selectedChannel === index) group.classList.add("selected");
      renderLabel(group, channel, x, width);
      if (interactive) {
        group.addEventListener("click", () => selectChannel(index));
        group.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectChannel(index); }
        });
      }
      root.append(group);
      local += span;
    }
  }
  return root;
}

function buildCropSvg() {
  const { stripWidth, stripHeight } = PRINT_GEOMETRY;
  const cutWidth = stripWidth + 4;
  const cutHeight = stripHeight + 4;
  const right = stripWidth + 2;
  const bottom = stripHeight + 2;
  const root = svgEl("svg", { class: "crop-layer", width: `${cutWidth}mm`, height: `${cutHeight}mm`, viewBox: `0 0 ${cutWidth} ${cutHeight}`, "aria-hidden": "true" });
  root.append(svgEl("path", { d: `M0 2H2M2 0V2M${right} 0V2M${right} 2h2M0 ${bottom}H2M2 ${bottom}v2M${right} ${bottom}v2M${right} ${bottom}h2`, fill: "none", stroke: "#777777", "stroke-width": .18 }));
  return root;
}

function renderSheet() {
  const sheet = $("#printSheetPreview");
  sheet.replaceChildren();
  const profile = PRINT_GEOMETRY;
  const copies = Math.max(1, Math.min(8, Number(state.settings.copies)));
  for (let index = 0; index < copies; index += 1) {
    const wrapper = el("div", "strip-cut");
    wrapper.style.setProperty("--strip-width", `${profile.stripWidth}mm`);
    wrapper.style.setProperty("--strip-height", `${profile.stripHeight}mm`);
    wrapper.style.setProperty("--cut-width", `${profile.stripWidth + 4}mm`);
    wrapper.style.setProperty("--cut-height", `${profile.stripHeight + 4}mm`);
    wrapper.append(buildStripSvg(true), buildCropSvg());
    sheet.append(wrapper);
  }
  if (state.settings.showCalibration) {
    const calibration = el("div", "calibration");
    calibration.append(el("span", "calibration-line"), Object.assign(el("span"), { textContent: t("calibration.label") }));
    sheet.append(calibration);
  }
}

function renderChannelGrid() {
  const grid = $("#channelGrid");
  grid.replaceChildren();
  for (let index = 0; index < 16; index += 1) {
    const owner = ownerOf(index);
    const button = el("button", "channel-button");
    button.type = "button";
    button.textContent = index + 1;
    button.dataset.testid = `channel-${index + 1}`;
    button.style.setProperty("--channel-color", state.channels[owner].color);
    if (owner !== index) button.classList.add("consumed");
    if (validSpan(state.channels[index], index) === 2) button.classList.add("linked");
    if (selectedChannel === owner) button.classList.add("active");
    button.title = owner === index
      ? t("channels.one", { number: index + 1 })
      : t("channels.linked", { number: index + 1, owner: owner + 1 });
    button.addEventListener("click", () => selectChannel(owner));
    grid.append(button);
  }
}

function renderSwatches() {
  const container = $("#colorSwatches");
  container.replaceChildren();
  PALETTE.forEach(color => {
    const button = el("button", "swatch");
    button.type = "button";
    button.title = color;
    button.style.setProperty("--swatch", color);
    if (state.channels[selectedChannel].color.toLowerCase() === color.toLowerCase()) button.classList.add("active");
    button.addEventListener("click", () => commit(() => { state.channels[selectedChannel].color = color; }));
    container.append(button);
  });
}

function renderBuiltinIcons() {
  const container = $("#builtinIcons");
  container.replaceChildren();
  Object.entries(BUILTIN_ICONS).forEach(([id, icon]) => {
    const button = el("button", "icon-choice");
    button.type = "button";
    button.title = iconLabel(icon);
    button.dataset.icon = id;
    if (state.channels[selectedChannel].icon === id) button.classList.add("active");
    button.append(makeIconSvg(icon));
    button.addEventListener("click", () => commit(() => { state.channels[selectedChannel].icon = id; }));
    container.append(button);
  });
}

function syncEditor() {
  const channel = state.channels[selectedChannel];
  const profile = PRINT_GEOMETRY;
  const span = validSpan(channel, selectedChannel);
  $("#selectedNumber").textContent = selectedChannel + 1;
  $("#selectedTitle").textContent = channel.name || t("channels.empty");
  $("#selectedRange").textContent = span === 2
    ? t("channels.range", { first: selectedChannel + 1, last: selectedChannel + 2 })
    : t("channels.one", { number: selectedChannel + 1 });
  $("#channelName").value = channel.name;
  $("#channelSubtitle").value = channel.subtitle;
  $("#channelSpan").value = String(span);
  $("#channelSpan").disabled = selectedChannel % 4 === 3;
  $("#channelLayout").value = channel.layout;
  $("#channelFill").value = channel.fill;
  $("#channelTextColor").value = channel.textColor;
  $("#channelColor").value = channel.color;
  $("#fontFamily").value = state.settings.font;
  $("#copies").value = String(state.settings.copies);
  $("#titleSize").value = state.settings.titleSize;
  $("#iconSize").value = state.settings.iconSize;
  $("#titleSizeValue").textContent = `${localNumber(Number(state.settings.titleSize).toFixed(2))} ${currentLanguage === "ru" ? "мм" : "mm"}`;
  $("#iconSizeValue").textContent = `${localNumber(Number(state.settings.iconSize).toFixed(1))} ${currentLanguage === "ru" ? "мм" : "mm"}`;
  $("#uppercase").checked = Boolean(state.settings.uppercase);
  $("#showCalibration").checked = Boolean(state.settings.showCalibration);
  $("#brandSubtitle").textContent = t("brand.subtitle", { width: profile.stripWidth, height: profile.stripHeight });
  $("#geometrySummary").textContent = t("geometry.summary", {
    width: profile.stripWidth, height: profile.stripHeight,
    channel: localNumber(profile.channelWidth), gap: localNumber(profile.groupGap)
  });
  $("#stripDescription").textContent = t("preview.description", {
    model: profile.label, width: profile.stripWidth, height: profile.stripHeight
  });
  renderSwatches();
  renderBuiltinIcons();
}

function render() {
  renderChannelGrid();
  syncEditor();
  renderSheet();
}

function selectChannel(index) {
  selectedChannel = ownerOf(Number(index));
  render();
}

function bindChannelField(selector, key, eventName = "change", transform = value => value) {
  $(selector).addEventListener(eventName, event => commit(() => {
    state.channels[selectedChannel][key] = transform(event.target.value);
  }));
}

function bindSetting(selector, key, eventName = "change", transform = value => value) {
  $(selector).addEventListener(eventName, event => commit(() => {
    state.settings[key] = transform(event.target.type === "checkbox" ? event.target.checked : event.target.value);
  }));
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function downloadBlob(filename, body, type) {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function sanitizeRemoteSvg(raw) {
  const documentNode = new DOMParser().parseFromString(raw, "image/svg+xml");
  const root = documentNode.documentElement;
  if (root.nodeName.toLowerCase() !== "svg" || root.querySelector("parsererror")) throw new Error("Iconify returned invalid SVG");
  root.querySelectorAll("script, foreignObject, image, use, style").forEach(node => node.remove());
  root.querySelectorAll("*").forEach(node => {
    [...node.attributes].forEach(attribute => {
      if (/^on/i.test(attribute.name) || /href/i.test(attribute.name)) node.removeAttribute(attribute.name);
    });
  });
  return { viewBox: root.getAttribute("viewBox") || "0 0 24 24", body: root.innerHTML };
}

async function fetchIcon(iconId) {
  const existing = getIcon(iconId);
  if (existing) return existing;
  const [prefix, ...nameParts] = iconId.split(":");
  const name = nameParts.join(":");
  if (!prefix || !name) throw new Error("Invalid icon id");
  const response = await fetch(`https://api.iconify.design/${encodeURIComponent(prefix)}/${encodeURIComponent(name)}.svg`);
  if (!response.ok) throw new Error(`Iconify: HTTP ${response.status}`);
  const parsed = sanitizeRemoteSvg(await response.text());
  state.icons[iconId] = { label: name.replaceAll("-", " "), ...parsed };
  return state.icons[iconId];
}

async function searchIcons(query) {
  const results = $("#iconResults");
  setSearchStatus("icons.searching");
  results.replaceChildren();
  try {
    const response = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=32`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const icons = Array.isArray(data.icons) ? data.icons : [];
    setSearchStatus(icons.length ? "icons.found" : "icons.notFound", { count: icons.length });
    icons.forEach(iconId => {
      const [prefix, name] = iconId.split(":");
      const button = el("button", "icon-choice");
      button.type = "button";
      button.title = iconId;
      const image = document.createElement("img");
      image.alt = name.replaceAll("-", " ");
      image.loading = "lazy";
      image.src = `https://api.iconify.design/${encodeURIComponent(prefix)}/${encodeURIComponent(name)}.svg?color=%23e7e9ec`;
      button.append(image);
      button.addEventListener("click", async () => {
        setSearchStatus("icons.loading", { icon: iconId });
        try {
          await fetchIcon(iconId);
          commit(() => { state.channels[selectedChannel].icon = iconId; });
          setSearchStatus("icons.embedded", { icon: iconId });
        } catch (error) {
          setSearchStatus("icons.loadFailed", { error: error.message });
        }
      });
      results.append(button);
    });
  } catch (error) {
    setSearchStatus("icons.searchUnavailable", { error: error.message });
  }
}

bindChannelField("#channelName", "name", "input");
bindChannelField("#channelSubtitle", "subtitle", "input");
bindChannelField("#channelSpan", "span", "change", Number);
bindChannelField("#channelLayout", "layout");
bindChannelField("#channelFill", "fill");
bindChannelField("#channelTextColor", "textColor");
bindChannelField("#channelColor", "color", "input");

bindSetting("#fontFamily", "font");
bindSetting("#copies", "copies", "change", Number);
bindSetting("#titleSize", "titleSize", "input", Number);
bindSetting("#iconSize", "iconSize", "input", Number);
bindSetting("#uppercase", "uppercase");
bindSetting("#showCalibration", "showCalibration");

$("#removeIcon").addEventListener("click", () => commit(() => { state.channels[selectedChannel].icon = ""; }));
$("#clearChannel").addEventListener("click", () => {
  if (!window.confirm(t("confirm.clear", { number: selectedChannel + 1 }))) return;
  commit(() => { state.channels[selectedChannel] = defaultChannel(); });
});

$("#resetProject").addEventListener("click", () => {
  if (!window.confirm(t("confirm.reset"))) return;
  state = makeDefaultState();
  selectedChannel = 0;
  saveState();
  render();
  showToast(t("toast.reset"));
});

document.querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
});

$("#iconSearchForm").addEventListener("submit", event => {
  event.preventDefault();
  const query = $("#iconSearch").value.trim();
  if (query) searchIcons(query);
});

$("#downloadSvg").addEventListener("click", () => {
  const profile = PRINT_GEOMETRY;
  const strip = buildStripSvg(false);
  strip.removeAttribute("class");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(strip)}`;
  downloadBlob(`${profile.fileSlug}-label-strip.svg`, body, "image/svg+xml;charset=utf-8");
  showToast(t("toast.svgDownloaded"));
});

$("#exportJson").addEventListener("click", () => {
  downloadBlob(`${PRINT_GEOMETRY.fileSlug}-label-project.json`, JSON.stringify(state, null, 2), "application/json;charset=utf-8");
  showToast(t("toast.projectSaved"));
});

$("#importJson").addEventListener("change", async event => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported.channels) || imported.channels.length !== 16) throw new Error(t("errors.projectChannels"));
    state = normalizeState(imported);
    selectedChannel = 0;
    saveState();
    render();
    showToast(t("toast.projectOpened"));
  } catch (error) {
    showToast(t("toast.openFailed", { error: error.message }));
  } finally {
    event.target.value = "";
  }
});

$("#printSheet").addEventListener("click", () => window.print());
window.addEventListener("beforeprint", renderSheet);

applyLanguage(currentLanguage);

"use strict";

const SVG_NS = "http://www.w3.org/2000/svg";
const STORAGE_KEY = "p16-label-desk-project-v1";

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

// SVG paths are embedded so the default project remains printable offline.
// Phosphor Icons 2.1.1 — MIT. Font Awesome Free 6 — CC BY 4.0.
const BUILTIN_ICONS = {
  "ph:microphone-fill": {
    label: "Микрофон", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M80 128V64a48 48 0 0 1 96 0v64a48 48 0 0 1-96 0m128 0a8 8 0 0 0-16 0a64 64 0 0 1-128 0a8 8 0 0 0-16 0a80.11 80.11 0 0 0 72 79.6V240a8 8 0 0 0 16 0v-32.4a80.11 80.11 0 0 0 72-79.6"/>'
  },
  "ph:chat-circle-dots-fill": {
    label: "Разговор", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M128 24a104 104 0 0 0-91.82 152.88l-11.35 34.05a16 16 0 0 0 20.24 20.24l34.05-11.35A104 104 0 1 0 128 24M84 140a12 12 0 1 1 12-12a12 12 0 0 1-12 12m44 0a12 12 0 1 1 12-12a12 12 0 0 1-12 12m44 0a12 12 0 1 1 12-12a12 12 0 0 1-12 12"/>'
  },
  "ph:guitar-fill": {
    label: "Гитара", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="m249.66 46.34l-40-40a8 8 0 0 0-11.32 11.32l2.35 2.34l-60.17 60.16c-22.79-11.86-48.31-10.87-63.77 4.58a42.3 42.3 0 0 0-9.39 14.37a8.24 8.24 0 0 1-7.55 4.89c-14.59.49-27.26 5.72-36.65 15.11C11.08 131.22 6 148.6 8.74 168.07C11.4 186.7 21.07 205.15 36 220s33.34 24.56 52 27.22a71 71 0 0 0 10.1.78c15.32 0 28.83-5.23 38.76-15.16c9.39-9.39 14.62-22.06 15.11-36.65a8.24 8.24 0 0 1 4.92-7.55a42.2 42.2 0 0 0 14.37-9.39c15.45-15.46 16.44-41 4.58-63.77L236 55.31l2.34 2.35a8 8 0 0 0 11.32-11.32m-156 159.31a8 8 0 0 1-11.31 0l-32-32a8 8 0 0 1 11.32-11.31l32 32a8 8 0 0 1-.01 11.31m42.14-45.86a28 28 0 1 1 0-39.59a28 28 0 0 1 0 39.59m31.06-58a87 87 0 0 0-6-6.68a85 85 0 0 0-6.69-6L176 67.31L188.69 80ZM200 68.68L187.32 56L212 31.31L224.69 44Z"/>'
  },
  "ph:piano-keys-fill": {
    label: "Клавиши", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16M88 208H48V48h24v96a8 8 0 0 0 8 8h8Zm64 0h-48v-56h8a8 8 0 0 0 8-8V48h16v96a8 8 0 0 0 8 8h8Zm56 0h-40v-56h8a8 8 0 0 0 8-8V48h24z"/>'
  },
  "ph:music-notes-fill": {
    label: "Музыка", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="M212.92 17.71a7.89 7.89 0 0 0-6.86-1.46l-128 32A8 8 0 0 0 72 56v110.1A36 36 0 1 0 88 196v-93.75l112-28v59.85a36 36 0 1 0 16 29.9V24a8 8 0 0 0-3.08-6.29"/>'
  },
  "ph:metronome-fill": {
    label: "Метроном", viewBox: "0 0 256 256",
    body: '<path fill="currentColor" d="m187.14 114.84l26.78-29.46a8 8 0 0 0-11.84-10.76l-20.55 22.6l-17.2-54.07A15.94 15.94 0 0 0 149.08 32h-42.17a15.94 15.94 0 0 0-15.25 11.15l-50.91 160A16 16 0 0 0 56 224h144a16 16 0 0 0 15.25-20.85ZM71.27 160l35.64-112h42.17l20 62.9l-44.62 49.1Zm74.81 0l28.62-31.48l10 31.48Z"/>'
  },
  "fa6-solid:drum": {
    label: "Барабан", viewBox: "0 0 512 512",
    body: '<path fill="currentColor" d="M501.2 76.1c11.1-7.3 14.2-22.1 6.9-33.2S486 28.7 474.9 36l-104.7 68.5C335.8 98.7 297 96 256 96C114.6 96 0 128 0 208v160c0 31.3 27.4 58.8 72 78.7V344c0-13.3 10.7-24 24-24s24 10.7 24 24v119.4c33 8.9 71.1 14.5 112 16.1V376c0-13.3 10.7-24 24-24s24 10.7 24 24v103.5c40.9-1.6 79-7.2 112-16.1V344c0-13.3 10.7-24 24-24s24 10.7 24 24v102.7c44.6-19.9 72-47.4 72-78.7V208c0-41.1-30.2-69.5-78.8-87.4l67.9-44.5zm-193.8 69.5l-64.6 42.3c-11.1 7.3-14.2 22.1-6.9 33.2s22.1 14.2 33.2 6.9l111.1-72.8c14.7 3.2 27.9 7 39.4 11.5c38.8 15.1 44.4 30.7 44.4 41.3c0 .8-2.7 17.2-46 35.9c-38.9 16.8-96 28.1-162 28.1s-123.1-11.3-162-28.1c-43.3-18.7-46-35.1-46-35.9c0-10.6 5.6-26.2 44.4-41.3C130.6 151.9 187.8 144 256 144c18 0 35.1.5 51.4 1.6"/>'
  },
  "ph:faders-fill": {
    label: "Микшер", viewBox: "0 0 256 256",
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
    version: 1,
    settings: { font: "narrow", copies: 8, titleSize: 2.55, iconSize: 8.2, uppercase: true, showCalibration: true },
    channels,
    icons: {}
  };
}

let state = loadState();
let selectedChannel = 0;
let toastTimer = 0;

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
  return {
    version: 1,
    settings: { ...base.settings, ...(input.settings || {}) },
    channels: Array.from({ length: 16 }, (_, index) => ({ ...defaultChannel(), ...(input.channels[index] || {}) })),
    icons: input.icons && typeof input.icons === "object" ? input.icons : {}
  };
}

function saveState() {
  const indicator = $("#saveState");
  indicator.classList.add("saving");
  indicator.lastChild.textContent = "Сохраняю…";
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.setTimeout(() => {
    indicator.classList.remove("saving");
    indicator.lastChild.textContent = "Сохранено в браузере";
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
  const shown = state.settings.uppercase ? value.toLocaleUpperCase("ru-RU") : value;
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
  const root = svgEl("svg", { class: "label-strip", width: "228mm", height: "18mm", viewBox: "0 0 228 18", xmlns: SVG_NS });
  appendRect(root, { x: 0, y: 0, width: 228, height: 18, fill: "#ffffff" });
  appendRect(root, { x: .125, y: .125, width: 227.75, height: 17.75, fill: "none", stroke: "#222222", "stroke-width": .25 });

  for (let groupIndex = 0; groupIndex < 4; groupIndex += 1) {
    let local = 0;
    while (local < 4) {
      const index = groupIndex * 4 + local;
      const channel = state.channels[index];
      const span = validSpan(channel, index);
      const x = 5.5 + groupIndex * 55 + local * 13;
      const width = span * 13;
      const group = svgEl("g", { class: "label-hit", "data-channel": index, tabindex: interactive ? 0 : -1, role: interactive ? "button" : "img", "aria-label": `Канал ${index + 1}: ${channel.name || "пустой"}` });
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
  const root = svgEl("svg", { class: "crop-layer", width: "232mm", height: "22mm", viewBox: "0 0 232 22", "aria-hidden": "true" });
  root.append(svgEl("path", { d: "M0 2H2M2 0V2M230 0V2M230 2h2M0 20H2M2 20v2M230 20v2M230 20h2", fill: "none", stroke: "#777777", "stroke-width": .18 }));
  return root;
}

function renderSheet() {
  const sheet = $("#printSheetPreview");
  sheet.replaceChildren();
  const copies = Math.max(1, Math.min(8, Number(state.settings.copies)));
  for (let index = 0; index < copies; index += 1) {
    const wrapper = el("div", "strip-cut");
    wrapper.append(buildStripSvg(true), buildCropSvg());
    sheet.append(wrapper);
  }
  if (state.settings.showCalibration) {
    const calibration = el("div", "calibration");
    calibration.innerHTML = '<span class="calibration-line"></span><span>50 мм · печать 100% / Actual size</span>';
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
    button.title = owner === index ? `Канал ${index + 1}` : `Канал ${index + 1} объединён с ${owner + 1}`;
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
    button.title = icon.label;
    button.dataset.icon = id;
    if (state.channels[selectedChannel].icon === id) button.classList.add("active");
    button.append(makeIconSvg(icon));
    button.addEventListener("click", () => commit(() => { state.channels[selectedChannel].icon = id; }));
    container.append(button);
  });
}

function syncEditor() {
  const channel = state.channels[selectedChannel];
  const span = validSpan(channel, selectedChannel);
  $("#selectedNumber").textContent = selectedChannel + 1;
  $("#selectedTitle").textContent = channel.name || "Пустой канал";
  $("#selectedRange").textContent = span === 2 ? `Каналы ${selectedChannel + 1}–${selectedChannel + 2}` : `Канал ${selectedChannel + 1}`;
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
  $("#titleSizeValue").textContent = `${Number(state.settings.titleSize).toFixed(2)} мм`;
  $("#iconSizeValue").textContent = `${Number(state.settings.iconSize).toFixed(1)} мм`;
  $("#uppercase").checked = Boolean(state.settings.uppercase);
  $("#showCalibration").checked = Boolean(state.settings.showCalibration);
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
  const status = $("#searchStatus");
  const results = $("#iconResults");
  status.textContent = "Ищу в коллекциях Iconify…";
  results.replaceChildren();
  try {
    const response = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=32`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const icons = Array.isArray(data.icons) ? data.icons : [];
    status.textContent = icons.length ? `Найдено: ${icons.length}. Нажмите иконку, чтобы выбрать.` : "Ничего не найдено. Попробуйте запрос по-английски.";
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
        status.textContent = `Загружаю ${iconId}…`;
        try {
          await fetchIcon(iconId);
          commit(() => { state.channels[selectedChannel].icon = iconId; });
          status.textContent = `${iconId} встроена в проект и будет работать офлайн.`;
        } catch (error) {
          status.textContent = `Не удалось загрузить иконку: ${error.message}`;
        }
      });
      results.append(button);
    });
  } catch (error) {
    status.textContent = `Поиск недоступен: ${error.message}. Встроенными иконками можно пользоваться офлайн.`;
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
  if (!window.confirm(`Очистить канал ${selectedChannel + 1}?`)) return;
  commit(() => { state.channels[selectedChannel] = defaultChannel(); });
});

$("#resetProject").addEventListener("click", () => {
  if (!window.confirm("Вернуть исходную раскладку? Текущие изменения будут заменены.")) return;
  state = makeDefaultState();
  selectedChannel = 0;
  saveState();
  render();
  showToast("Исходная раскладка восстановлена");
});

$("#iconSearchForm").addEventListener("submit", event => {
  event.preventDefault();
  const query = $("#iconSearch").value.trim();
  if (query) searchIcons(query);
});

$("#downloadSvg").addEventListener("click", () => {
  const strip = buildStripSvg(false);
  strip.removeAttribute("class");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(strip)}`;
  downloadBlob("p16hq-label-strip.svg", body, "image/svg+xml;charset=utf-8");
  showToast("SVG-полоса скачана");
});

$("#exportJson").addEventListener("click", () => {
  downloadBlob("p16hq-label-project.json", JSON.stringify(state, null, 2), "application/json;charset=utf-8");
  showToast("Проект JSON скачан");
});

$("#importJson").addEventListener("change", async event => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported.channels) || imported.channels.length !== 16) throw new Error("В проекте должно быть 16 каналов");
    state = normalizeState(imported);
    selectedChannel = 0;
    saveState();
    render();
    showToast("Проект открыт");
  } catch (error) {
    showToast(`Не удалось открыть JSON: ${error.message}`);
  } finally {
    event.target.value = "";
  }
});

$("#printSheet").addEventListener("click", () => window.print());
window.addEventListener("beforeprint", renderSheet);

render();

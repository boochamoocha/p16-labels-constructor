const appUrl = process.env.P16_TEST_URL || "http://127.0.0.1:8765/";
const debuggingUrl = process.env.P16_CDP_URL || "http://127.0.0.1:9223";
const rootUrl = new URL("/", appUrl).href;
const russianUrl = new URL("/ru/", appUrl).href;

const [englishHtml, russianHtml, robots, sitemap] = await Promise.all([
  fetch(rootUrl).then(response => response.text()),
  fetch(russianUrl).then(response => response.text()),
  fetch(new URL("/robots.txt", appUrl)).then(response => response.text()),
  fetch(new URL("/sitemap.xml", appUrl)).then(response => response.text())
]);

if (!englishHtml.includes('<link rel="canonical" href="https://p16-labels-constructor.pages.dev/">') ||
    !englishHtml.includes('hreflang="ru"') ||
    !englishHtml.includes('type="application/ld+json"') ||
    !englishHtml.includes("Printable labels for Behringer P16 personal mixers")) {
  throw new Error("English SEO metadata or visible content is incomplete");
}
if (!russianHtml.includes('<html lang="ru" data-page-language="ru">') ||
    !russianHtml.includes('<link rel="canonical" href="https://p16-labels-constructor.pages.dev/ru/">') ||
    !russianHtml.includes("Печатные подписи для персональных микшеров Behringer P16")) {
  throw new Error("Russian indexable page is incomplete");
}
if (!robots.includes("User-agent: *") || !robots.includes("Sitemap: https://p16-labels-constructor.pages.dev/sitemap.xml")) throw new Error("robots.txt is invalid");
if (!sitemap.includes("<urlset") || !sitemap.includes("https://p16-labels-constructor.pages.dev/ru/")) throw new Error("sitemap.xml is invalid");

const targets = await fetch(`${debuggingUrl}/json/list`).then(response => response.json());
const target = targets.find(item => item.type === "page" && item.url === appUrl);
if (!target?.webSocketDebuggerUrl) throw new Error("Chrome debugging target was not found");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 0;
const pending = new Map();
socket.addEventListener("message", event => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

function command(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression, awaitPromise = false) {
  const result = await command("Runtime.evaluate", { expression, awaitPromise, returnByValue: true });
  if (result.exceptionDetails) {
    const description = result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Page evaluation failed";
    throw new Error(description);
  }
  return result.result.value;
}

await command("Runtime.enable");
await command("Page.enable");
await command("Emulation.setDeviceMetricsOverride", { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false });

await evaluate(`(() => {
  localStorage.removeItem('p16-label-desk-language');
  localStorage.removeItem('p16-label-desk-project-v1');
  location.reload();
  return true;
})()`);
await new Promise(resolve => setTimeout(resolve, 500));

const initial = await evaluate(`({
  title: document.title,
  language: document.documentElement.lang,
  saveProject: document.querySelector('#exportJson').textContent,
  openProject: document.querySelector('label[for="importJson"]').textContent,
  versionedAssets: document.querySelector('script[src*="?v="]') !== null && document.querySelector('link[href*="?v="]') !== null,
  strips: document.querySelectorAll('.strip-cut').length,
  svgLabels: document.querySelectorAll('.label-strip').length,
  selected: document.querySelector('#channelName').value,
  hasGeometryChoice: Boolean(document.querySelector('#consoleModel')),
  builtinIcons: document.querySelectorAll('#builtinIcons .icon-choice').length,
  sheetSize: [getComputedStyle(document.querySelector('.sheet')).width, getComputedStyle(document.querySelector('.sheet')).height],
  canonical: document.querySelector('link[rel="canonical"]').href,
  description: document.querySelector('meta[name="description"]').content,
  about: document.querySelector('#aboutHeading').textContent,
  strip: (() => {
    const svg = document.querySelector('.label-strip');
    const crop = document.querySelector('.crop-layer');
    const frames = svg.querySelectorAll('.label-frame');
    return {
      width: svg.getAttribute('width'),
      viewBox: svg.getAttribute('viewBox'),
      geometry: svg.dataset.geometry,
      cropWidth: crop.getAttribute('width'),
      cropViewBox: crop.getAttribute('viewBox'),
      cropPath: crop.querySelector('path').getAttribute('d'),
      first: [frames[0].getAttribute('x'), frames[0].getAttribute('width')],
      fifth: [svg.querySelector('[data-channel="4"] .label-frame').getAttribute('x'), svg.querySelector('[data-channel="4"] .label-frame').getAttribute('width')],
      last: [frames[frames.length - 1].getAttribute('x'), frames[frames.length - 1].getAttribute('width')]
    };
  })()
})`);

if (initial.title !== "Behringer P16-M / P16-HQ Label Strip Designer | P16 Label Desk") throw new Error("Unexpected page title");
if (initial.language !== "en" || initial.saveProject !== "Save project" || initial.openProject !== "Open project") throw new Error("English is not the default interface language");
if (initial.canonical !== "https://p16-labels-constructor.pages.dev/" || !initial.description.includes("P16-M") || !initial.about.includes("Behringer P16")) throw new Error("Rendered SEO content is incorrect");
if (!initial.versionedAssets) throw new Error("Local assets are not cache-busted");
if (initial.strips !== 8 || initial.svgLabels !== 8) throw new Error("A4 preview must contain eight strips");
if (initial.selected !== "VOC1") throw new Error("Default project did not load");
if (initial.hasGeometryChoice) throw new Error("Obsolete geometry selector is still visible");
if (initial.builtinIcons < 8) throw new Error("Built-in icon library is incomplete");
if (initial.strip.width !== "227mm" || initial.strip.viewBox !== "0 0 227 18") throw new Error("Measured strip size is incorrect");
if (initial.strip.geometry !== "measured") throw new Error("Measured geometry is not the default");
if (initial.strip.cropWidth !== "231mm" || initial.strip.cropViewBox !== "0 0 231 22" || !initial.strip.cropPath.includes("M229 0V2")) throw new Error("Crop marks do not match the strip size");
if (initial.strip.first.join(",") !== "9,12.5" || initial.strip.fifth.join(",") !== "62,25" || initial.strip.last.join(",") !== "193,25") throw new Error("Measured channel geometry is incorrect");

const russian = await evaluate(`(() => {
  document.querySelector('[data-language="ru"]').click();
  return {
    language: document.documentElement.lang,
    saveProject: document.querySelector('#exportJson').textContent,
    openProject: document.querySelector('label[for="importJson"]').textContent,
    channels: document.querySelector('.channel-section h2').textContent,
    selectedRange: document.querySelector('#selectedRange').textContent,
    stored: localStorage.getItem('p16-label-desk-language'),
    headerFits: document.querySelector('.topbar').scrollWidth <= document.querySelector('.topbar').clientWidth
  };
})()`);
if (russian.language !== "ru" || russian.saveProject !== "Сохранить проект" || russian.openProject !== "Открыть проект" || russian.channels !== "Каналы" || russian.selectedRange !== "Канал 1" || russian.stored !== "ru" || !russian.headerFits) throw new Error("Russian localization failed");

await evaluate(`(() => { location.reload(); return true; })()`);
await new Promise(resolve => setTimeout(resolve, 500));
const persistedLanguage = await evaluate(`({
  language: document.documentElement.lang,
  saveProject: document.querySelector('#exportJson').textContent,
  active: document.querySelector('[data-language="ru"]').getAttribute('aria-pressed')
})`);
if (persistedLanguage.language !== "ru" || persistedLanguage.saveProject !== "Сохранить проект" || persistedLanguage.active !== "true") throw new Error("Language preference was not restored after reload");

const english = await evaluate(`(() => {
  document.querySelector('[data-language="en"]').click();
  return {
    language: document.documentElement.lang,
    channels: document.querySelector('.channel-section h2').textContent,
    selectedRange: document.querySelector('#selectedRange').textContent,
    stored: localStorage.getItem('p16-label-desk-language')
  };
})()`);
if (english.language !== "en" || english.channels !== "Channels" || english.selectedRange !== "Channel 1" || english.stored !== "en") throw new Error("English localization failed");

const interaction = await evaluate(`(() => {
  document.querySelector('[data-testid="channel-5"]').click();
  const fill = document.querySelector('#channelFill');
  fill.value = 'full';
  fill.dispatchEvent(new Event('change', { bubbles: true }));
  const name = document.querySelector('#channelName');
  name.value = 'GTR TEST';
  name.dispatchEvent(new Event('input', { bubbles: true }));
  const firstStrip = document.querySelector('.label-strip');
  const label = firstStrip.querySelector('[data-channel="4"]');
  return {
    selectedNumber: document.querySelector('#selectedNumber').textContent,
    selectedRange: document.querySelector('#selectedRange').textContent,
    frameFill: label.querySelector('.label-frame').getAttribute('fill'),
    text: label.textContent,
    exported: new XMLSerializer().serializeToString(buildStripSvg(false)).includes('GTR TEST')
  };
})()`);

if (interaction.selectedNumber !== "5" || !interaction.selectedRange.includes("5–6")) throw new Error("Stereo channel selection failed");
if (interaction.frameFill.toLowerCase() !== "#dca600") throw new Error("Full fill style failed");
if (!interaction.text.includes("GTR TEST") || !interaction.exported) throw new Error("Text update or SVG export failed");

const importedProject = await evaluate(`(async () => {
  const project = JSON.parse(JSON.stringify(state));
  project.channels[0].name = 'IMPORTED';
  const transfer = new DataTransfer();
  transfer.items.add(new File([JSON.stringify(project)], 'test-project.json', { type: 'application/json' }));
  const input = document.querySelector('#importJson');
  input.files = transfer.files;
  input.dispatchEvent(new Event('change', { bubbles: true }));
  await new Promise(resolve => setTimeout(resolve, 80));
  return {
    name: document.querySelector('#channelName').value,
    title: document.querySelector('#selectedTitle').textContent,
    toast: document.querySelector('#toast').textContent
  };
})()`, true);
if (importedProject.name !== "IMPORTED" || importedProject.title !== "IMPORTED" || importedProject.toast !== "Project opened") throw new Error("Project import failed");

await evaluate(`(() => {
  document.querySelector('#iconSearch').value = 'drum kit';
  document.querySelector('#iconSearchForm').requestSubmit();
})()`);
await new Promise(resolve => setTimeout(resolve, 1800));
const search = await evaluate(`({
  results: document.querySelectorAll('#iconResults .icon-choice').length,
  status: document.querySelector('#searchStatus').textContent
})`);
if (search.results < 1) throw new Error(`Iconify search failed: ${search.status}`);

await command("Emulation.setEmulatedMedia", { media: "print" });
const print = await evaluate(`({
  topbar: getComputedStyle(document.querySelector('.topbar')).display,
  sheetDisplay: getComputedStyle(document.querySelector('.sheet')).display,
  sheetOverflow: getComputedStyle(document.querySelector('.sheet')).overflow,
  sheetZoom: getComputedStyle(document.querySelector('.sheet')).zoom,
  stripMarginBottom: getComputedStyle(document.querySelector('.strip-cut')).marginBottom
})`);
if (print.topbar !== "none" || print.sheetDisplay !== "block" || print.sheetOverflow !== "hidden" || Number(print.sheetZoom) !== 1 || print.stripMarginBottom === "0px") throw new Error("Print stylesheet failed");

await command("Emulation.setEmulatedMedia", { media: "screen" });
await command("Page.navigate", { url: russianUrl });
await new Promise(resolve => setTimeout(resolve, 700));
const russianPage = await evaluate(`({
  language: document.documentElement.lang,
  pageLanguage: document.documentElement.dataset.pageLanguage,
  title: document.title,
  saveProject: document.querySelector('#exportJson').textContent,
  canonical: document.querySelector('link[rel="canonical"]').href,
  about: document.querySelector('#aboutHeading').textContent
})`);
if (russianPage.language !== "ru" || russianPage.pageLanguage !== "ru" || russianPage.saveProject !== "Сохранить проект" || russianPage.canonical !== "https://p16-labels-constructor.pages.dev/ru/" || !russianPage.about.includes("Behringer P16")) throw new Error("Russian page runtime failed");

await command("Page.navigate", { url: appUrl });
await new Promise(resolve => setTimeout(resolve, 500));
console.log(JSON.stringify({ initial, russian, persistedLanguage, english, interaction, importedProject, search, print, russianPage }, null, 2));
socket.close();

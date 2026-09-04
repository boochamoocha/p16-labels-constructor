const targets = await fetch("http://127.0.0.1:9223/json/list").then(response => response.json());
const target = targets.find(item => item.type === "page" && item.url === "http://127.0.0.1:8765/");
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

const initial = await evaluate(`({
  title: document.title,
  strips: document.querySelectorAll('.strip-cut').length,
  svgLabels: document.querySelectorAll('.label-strip').length,
  selected: document.querySelector('#channelName').value,
  builtinIcons: document.querySelectorAll('#builtinIcons .icon-choice').length,
  sheetSize: [getComputedStyle(document.querySelector('.sheet')).width, getComputedStyle(document.querySelector('.sheet')).height]
})`);

if (initial.title !== "P16 Label Desk") throw new Error("Unexpected page title");
if (initial.strips !== 8 || initial.svgLabels !== 8) throw new Error("A4 preview must contain eight strips");
if (initial.selected !== "VOC1") throw new Error("Default project did not load");
if (initial.builtinIcons < 8) throw new Error("Built-in icon library is incomplete");

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
  sheetZoom: getComputedStyle(document.querySelector('.sheet')).zoom
})`);
if (print.topbar !== "none" || Number(print.sheetZoom) !== 1) throw new Error("Print stylesheet failed");

console.log(JSON.stringify({ initial, interaction, search, print }, null, 2));
socket.close();

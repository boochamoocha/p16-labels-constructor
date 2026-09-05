# P16 Label Desk — Behringer P16-M / P16-HQ label strip designer

Free browser-based designer for printable channel label strips for **Behringer P16-M** and **Behringer P16-HQ** personal monitor mixers.

## [Open the live app →](https://p16-labels-constructor.pages.dev/)

Create a 227 × 18 mm strip, add channel names, captions, icons and colors, export it as SVG, or print up to eight copies on a landscape A4 sheet. The measured geometry has been tested on physical P16-M and P16-HQ units.

No account, backend or installation is required. Projects are stored locally in the browser and can be saved or opened as JSON files.

## Features

- measured 227 × 18 mm geometry for P16-M and P16-HQ;
- 16 channels with optional stereo pairs;
- channel names and smaller captions;
- built-in SVG icons plus Iconify search;
- top bar, bottom bar, full fill, soft background and outline styles;
- automatic text contrast, several fonts and adjustable sizes;
- SVG export and project import/export in JSON;
- up to eight strips per A4 sheet with crop marks and a 50 mm calibration ruler;
- English and Russian interface;
- automatic deployment to Cloudflare Pages from `main`.

## Printing

Select **100% / Actual size** in the system print dialog and disable **Fit to page**. The calibration ruler on paper must measure exactly 50 mm.

## Run locally

The project is plain HTML, CSS and JavaScript with no build step. Open `index.html` directly, or start a local server if the browser restricts Iconify requests from local files:

```bash
cd ~/dev/p16-labels-constructor
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8765/>.

## По-русски

[Открыть русскую версию конструктора →](https://p16-labels-constructor.pages.dev/ru/)

P16 Label Desk — бесплатный конструктор печатных полос подписей каналов для персональных мониторных микшеров Behringer P16-M и P16-HQ. Можно настроить названия, иконки, цвета и стереопары, скачать SVG или напечатать до восьми полос на листе A4.

При печати выберите масштаб **100% / Actual size** и отключите **Fit to page**. Контрольная линейка должна иметь длину ровно 50 мм.

## Icons and licenses

The built-in set uses [Phosphor Icons](https://phosphoricons.com/) 2.1.1 (MIT) and Font Awesome Free 6 (CC BY 4.0). Icons loaded through Iconify retain the license of their respective icon set.

P16 Label Desk is an unofficial community project and is not affiliated with Behringer or Music Tribe.

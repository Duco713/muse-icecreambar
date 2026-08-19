# Plan n.a.v. feedback eigenaren — Muse Ice Cream Bar

> Opgesteld: 19 augustus 2026
> Bron: e-mail eigenaren + ChatGPT-mockup (uitgesprokener kleurgebruik)

---

## Samenvatting

De feedback valt uiteen in twee stapels:

- **Nu te doen (geen input nodig):** kleursysteem + tweede palet + kleurschakelaar,
  quotes terugbrengen, wisselsmaken-blok vereenvoudigen, smaken/menu-pagina
  klaarzetten en live-hangen in navigatie.
- **Wachten op eigenaren:** definitieve smakenlijst + prijzen, foto's van de salon,
  foto + tekst voor 'Over ons', keuze definitief palet, telefoon/e-mail.

Niets in de "wachten"-stapel blokkeert de "nu"-stapel. We kunnen dus meteen door.

---

## Fase 1 — Kleursysteem + schakelaar (nu, geen input nodig)

### 1.1 Kleuren losweken uit de HTML

Nu staan kleuren op drie plekken door elkaar:

| Plek | Voorbeeld | Aantal |
|---|---|---|
| Tailwind-config in `index.html` | `"primary": "#84532c"` | ~50 tokens |
| Hardcoded arbitrary values | `text-[#84532c]`, `bg-[#D4EFDF]`, `bg-[#FF9F8C]/20` | ~20x in index.html |
| Losse `<style>`-regels | `.nav-link.active { color: #84532c }`, diamond-pattern | ~8x |
| Subpagina's | `smaken.html` (40x), `faq.html` (13x), `privacy.html` (13x), `voorwaarden.html` (14x) | 80x |

**Aanpak:** één set CSS-variabelen op `:root`, en de Tailwind-config wijst
daarnaar. RGB-triplets zodat transparantie (`bg-primary/95`, `bg-[#FF9F8C]/20`)
blijft werken:

```html
<style>
  :root {                       /* Palet A — huidig ("Warm") */
    --c-primary:        132 83 44;
    --c-primary-container: 244 179 132;
    --c-background:     255 248 245;
    --c-accent-mint:    212 239 223;
    --c-accent-peach:   255 159 140;
    /* ... */
  }
  [data-theme="bold"] {         /* Palet B — nieuw ("Bold") */
    --c-primary:        14 77 46;
    --c-primary-container: 240 83 143;
    --c-background:     220 239 219;
    /* ... */
  }
</style>
<script>
  tailwind.config = { theme: { extend: { colors: {
    "primary": "rgb(var(--c-primary) / <alpha-value>)",
    /* ... */
  }}}}
</script>
```

Alle `text-[#84532c]` en `bg-[#D4EFDF]` worden vervangen door tokens
(`text-primary`, `bg-accent-mint`). Dat is de grootste klus van fase 1 — puur
zoek-en-vervang, geen risico voor de layout.

### 1.2 Palet B: "Bold" op basis van de mockup

Startwaarden afgeleid uit het voorbeeld (fijnslijpen kan later):

| Rol | Warm (huidig) | Bold (nieuw) |
|---|---|---|
| Achtergrond | `#fff8f5` crème | `#DCEFDB` mint |
| Primair / koppen | `#84532c` bruin | `#0E4D2E` diepgroen |
| Accent / knoppen | `#f4b384` zacht oranje | `#F0538F` hot pink |
| Tweede accent | `#8dcad9` lichtblauw | `#F4762A` oranje |
| Kaarten / vlakken | `#fff` wit | `#FBF3E4` crème |

Dit palet sluit ook beter aan bij de salon zelf: op de sfeerfoto's zit al het
roze/groene ruitpatroon, het roze neonbord en de oranje/roze huisstijl van het
logo. Het bruin was altijd al de vreemde eend.

**Aandachtspunt:** roze tekst op mint haalt de WCAG-contrastnorm niet altijd.
Bij het uitwerken checken we elke tekst/achtergrond-combinatie; waar nodig
gebruiken we diepgroen voor tekst en houden we roze voor vlakken en knoppen.

### 1.3 De schakelknop

- Klein knopje in de header (of rechtsonder), icoon + label "Kleur".
- Onthoudt de keuze in `localStorage`, plus `?theme=bold` in de URL zodat je
  een directe link naar één variant kunt sturen — handig om aan de eigenaren
  te laten zien zonder uitleg.
- Inline mini-script in de `<head>` zodat er geen kleurflits bij het laden is.
- Werkt op alle pagina's (index, smaken, faq, privacy, voorwaarden).
- `<meta name="theme-color">` schakelt mee.

**Belangrijk:** de knop is bedoeld als *keuzehulp*. Zodra de eigenaren kiezen,
raad ik aan de knop te verwijderen (of te verbergen achter `?theme=`) — een
publieke site die van huisstijl kan wisselen komt onaf over. De code voor beide
paletten blijft dan gewoon staan, dus terugschakelen kost een regel.

---

## Fase 2 — Quotes en content (nu, geen input nodig)

### 2.1 Quotes

| Quote | Status | Plek |
|---|---|---|
| "Licked it so it's mine" | staat er al | Sfeer-sectie (regel 466) — blijft |
| "Life is short, make it sweet" | toevoegen | Hero, als grote kop in het scriptlettertype |
| "Ice Ice Baby" | toevoegen | Bij de sfeerfoto's — sluit aan op het neonbord dat al op de foto staat |

De hero-kop wordt dan "Life is short. Make it sweet." met de huidige zin
("het zoetste geheim van Valkenswaard") eronder als ondertitel — die is
SEO-technisch waardevol (bevat 'Valkenswaard') dus die houden we, alleen kleiner.

### 2.2 Wisselsmaken vereenvoudigen

Zoals gevraagd: geen wekelijkse bijhoudverplichting. Het blok op `smaken.html`
wordt één rustig kaartje:

> **Altijd drie wisselsmaken**
> Welke? Dat verklappen we niet. Kom langs en ontdek wat er deze week in de
> vitrine staat.

De TODO-comment over "smaak van de week invullen" en de belofte van *wekelijks
nieuwe smaken* halen we weg — die staat nu ook nog in de meta-description en in
de tekst op de homepage, dus die passen we mee aan.

### 2.3 Smaken- en menupagina live zetten

`smaken.html` bestaat al maar staat als **concept** (gele balk, niet in het menu,
niet in de sitemap). Wat we nu al doen:

- Structuur klaarzetten voor: vaste smaken, sorbets, en een **menukaart**
  (hoorntje/bakje, cannoli, milkshakes, koffie) met ruimte voor prijzen.
- Opmaak zo dat er later per smaak een foto bij kan — dan is het volgend seizoen
  alleen foto's aanleveren, geen herbouw.
- Zodra de lijst binnen is: concept-balk eruit, link in menu + footer, toevoegen
  aan `sitemap.xml`, en de Product-JSON-LD uitbreiden van 3 naar alle smaken
  (goed voor vindbaarheid in Google en in AI-antwoorden).

---

## Fase 3 — Wachten op de eigenaren

| Wat | Waarvoor nodig | Blokkeert |
|---|---|---|
| Vaste smakenlijst | `smaken.html` definitief maken | pagina live zetten |
| Menukaart + prijzen | menu-sectie | menu-sectie |
| Foto's salon, hoge kwaliteit | vervangen van de huidige beelden | niets — huidige foto's blijven zolang staan |
| Recente foto Daan & Daymi | 'Over ons' | niets |
| Tekst 'Over ons' | 'Over ons' — nu staat er een door mij geschreven tekst | niets |
| Keuze palet A of B | knop eruit, definitieve huisstijl | alleen de laatste stap |
| Telefoonnummer + e-mail | contactsectie, `BUSINESS-INFO.md` staat op [INVULLEN] | contact-uitbreiding |
| Foto per smaak | volgend seizoen, al ingepland door hen | niets |

Alles hier kan later ingeschoven worden zonder de rest opnieuw aan te raken.

---

## Punten om even bij de eigenaren te checken

1. **Hoe letterlijk nemen we de mockup over?** Het voorbeeld verandert meer dan
   kleur alleen: een ander lettertype voor de koppen (schreefletter), stickers,
   ruitpatronen, en een andere menu-indeling. Mijn voorstel: eerst alleen de
   kleuren omzetten, dat bekijken, en daarna eventueel de rest.
2. **In de mockup staat "LOCATIES" (meervoud)** en een knop "Vind een locatie".
   Muse heeft één zaak aan de Eindhovenseweg — dat neem ik niet over, tenzij er
   uitbreidingsplannen zijn.
3. **De foto's in de mockup zijn AI-gegenereerd.** We gebruiken hun eigen foto's;
   de mockup is puur richtlijn voor de sfeer en kleur.
4. **De teksten in de mockup zijn ook AI** ("Ambachtelijk ijs, verrassende smaken
   en een flinke dosis good vibes") — leuk als startpunt, maar hun eigen
   'Over ons'-tekst komt nog, dus daar wachten we op.

---

## Volgorde

1. Kleuren omzetten naar variabelen + tokens (grootste klus, geen zichtbare wijziging)
2. Palet Bold toevoegen + schakelknop → **link doorsturen zodat zij kunnen vergelijken**
3. Quotes toevoegen, wisselsmaken vereenvoudigen
4. Menu-/smakenstructuur klaarzetten
5. *(wachten)* content invullen zodra die binnen is
6. Palet vastzetten, knop eruit, live

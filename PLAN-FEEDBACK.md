# Plan n.a.v. feedback eigenaren — Muse Ice Cream Bar

> Opgesteld 19 augustus 2026, bijgewerkt na uitvoering van fase 1 en 2
> Bron: e-mail eigenaren + hun ChatGPT-voorbeeld voor het kleurgebruik

---

## Stand van zaken

| | |
|---|---|
| **Klaar** | kleursysteem, tweede palet + schakelknop, quotes, wisselsmaken, menustructuur |
| **Wacht op Muse** | smakenlijst, prijzen, foto's, 'Over ons'-tekst, keuze palet, telefoon/e-mail |
| **Terugdraaien** | `git checkout v1-warm` zet de hele site terug zoals hij bij hen lag |

---

## Klaar — fase 1: kleursysteem en schakelaar

### Eén bron voor alle kleuren

Kleuren stonden verspreid over vijf bestanden: `#84532c` alleen al op 47 plekken.
Nu staan ze één keer in `assets/theme.css`, als RGB-triplets zodat Tailwind
transparantie (`bg-primary/95`) blijft ondersteunen. De Tailwind-config verhuisde
naar `assets/tailwind-config.js` en wijst naar die variabelen, zodat alle vijf
pagina's dezelfde kleurnamen spreken.

### Rolkleuren — de les uit de eerste poging

De eerste versie zette diepgroen op `primary`. Op deze site stuurt dat token
zowel de koppen als de knoppen als de links aan, dus werd de hele site groen.
In hun voorbeeld is dat juist gesplitst: **groen draagt de tekst, roze doet het
werk**. Daarom drie rollen bovenop het palet:

| Rol | Waarvoor | Warm | Bold |
|---|---|---|---|
| `action` | knoppen, links, actieve nav | `#84532c` | `#c01356` |
| `emphasis` | scriptkoppen, wordmark, klemtoon | `#84532c` | `#e5407f` |
| `decor` | sterren, iconen, patroon | `#f4b384` | `#c44d0a` |

### Drie tinten roze, niet één

De roze uit hun voorbeeld (`#f0538f`) is te licht voor tekst: wit erop haalt 3,3
waar 4,5 nodig is. Dat is geen muggenzifterij — een ijssalon wordt op een telefoon
in de zon bekeken. Daarom per gebruik een andere tint van dezelfde kleur:

- `#c01356` — knopvlakken en kleine tekst (wit erop 6,1)
- `#e5407f` — koppen vanaf 24px (op mint 3,3)
- `#f0538f` — hun exacte roze, alleen nog als vlak zonder tekst erop: de blob
  achter de hero-foto, het streepje onder de kop, de wash over de cannoli-sectie

**Bold haalt nu overal de contrastnorm.** Warm heeft nog vier plekken die het niet
halen (de sterrenrijen bij de reviews, 1,6 waar 3,0 nodig is). Die stonden er al
vóór dit werk en zijn bewust gelaten, omdat warm exact moet blijven zoals het bij
hen ligt. Los te trekken zodra zij een palet kiezen.

### De schakelknop

Knopje rechtsonder, keuze onthouden in `localStorage`, plus `?theme=bold` in de
URL voor een directe link. Geen kleurflits bij laden. Werkt op alle vijf pagina's.

`assets/theme-switch.js` bevat bovenaan de instructie om hem in één stap te
verwijderen zodra de keuze gemaakt is. Beide paletten blijven daarna gewoon in
`theme.css` staan.

---

## Klaar — fase 2: quotes en content

### Quotes

| Quote | Plek |
|---|---|
| "Life is short. Make it sweet." | hero-kop, groen aanlopend en roze landend |
| "Licked it so it's mine" | sfeer-sectie, stond er al |
| "Ice Ice Baby" | onderschrift bij de polaroid van het neonbord |

De tweekleurige kop is bewust maar twee keer gebruikt — de hero en de
cannoli-sectie — precies zoals hun voorbeeld het doet. Roze is daar geen
kopkleur maar een klemtoon binnen één kop; zodra elke kop het doet is het
geen klemtoon meer.

**Let op, dit is een afweging:** de oude hero-kop bevatte "Valkenswaard", wat
voor vindbaarheid het zwaarste weegt van de hele pagina. Die zin staat nu als
ondertitel direct eronder ("Ambachtelijk gelato in Valkenswaard"), samen met de
paginatitel en de meta-description. Weegt vindbaarheid zwaarder dan de quote,
dan draaien we het om.

### Wisselsmaken

Zoals gevraagd geen bijhoudverplichting. Eén blok met drie gestippelde
vraagteken-kaartjes en de regel dat er altijd drie wisselsmaken staan. De vorm
vertelt het verhaal: drie plekken, geen namen, kan niet verouderen.

De opmaak om ze wél aan te kondigen staat er als commentaarblok onder, met
uitleg hoe je hem aanzet. Zij gaven aan dat later misschien te willen.

De belofte van *wekelijks* nieuwe smaken is overal weggehaald: homepage,
smakenpagina, FAQ (zichtbare tekst én de JSON-LD voor Google) en
`BUSINESS-INFO.md`.

### Menukaart

Structuur staat klaar op `smaken.html`: ijs per formaat, cannoli, milkshakes,
koffie. Prijzen als `—` met een zichtbare notitie dat Muse ze nog aanlevert.
De smaakkaarten zijn voorbereid op een foto per smaak (`.flavor-photo`), met
één voorbeeld in commentaar — volgend seizoen is dat plakwerk, geen herbouw.

---

## Wacht op Muse

| Wat | Blokkeert |
|---|---|
| Vaste smakenlijst | smakenpagina definitief live zetten |
| Prijzen menukaart | de `—` in de menukaart |
| Foto's salon, hoge kwaliteit | niets — huidige foto's blijven staan |
| Recente foto Daan & Daymi | niets |
| Tekst 'Over ons' | niets — er staat nu een door mij geschreven tekst |
| Keuze palet warm of bold | de knop weghalen, definitief live |
| Telefoonnummer + e-mail | staat op [INVULLEN] in BUSINESS-INFO.md |
| Foto per smaak | volgend seizoen, door hen zelf ingepland |

Zodra de smakenlijst en prijzen binnen zijn: concept-balk weg, link in menu en
footer, toevoegen aan `sitemap.xml`, en de Product-JSON-LD uitbreiden van drie
naar alle smaken.

---

## Te vragen bij de eigenaren

1. **Een handjevol smaken die jullie ooit gemaakt hebben**, in verleden tijd —
   "eerder in de vitrine: limoncello, aardbei-basilicum, stroopwafel". Verleden
   tijd belooft niets, dus het kan nooit teleurstellen, maar het beantwoordt wel
   de vraag die de bezoeker echt heeft: *wat voor soort smaken maken jullie?*
   "Drie wisselsmaken" zegt daar niets over, "mango-chili" wel. Eenmalig
   aanleveren, daarna nooit meer aanraken.
2. **Welk palet wordt het?** Stuur ze de link met de knop erin.
3. **Hun voorbeeld verandert alleen kleur, verder niets** — dat is bevestigd.
   Een schreefletter voor de koppen, stickers en ruitpatronen zaten er ook in,
   maar die laten we staan tenzij zij erom vragen.
4. **In het voorbeeld staat "LOCATIES" (meervoud)** met een "Vind een
   locatie"-knop. Muse heeft één zaak; niet overgenomen.

---

## Nog te doen wanneer de keuze valt

- [ ] Palet vastzetten: `data-theme="bold"` op de `<html>`-tag, of niets voor warm
- [ ] `assets/theme-switch.js` en het mini-scriptje uit de `<head>` verwijderen
- [ ] Favicon-set, logo en `assets/og-image.jpg` opnieuw maken — dat zijn platte
      beeldbestanden in de huidige kleuren, die volgen de knop niet
- [ ] Sterrenrijen in warm: contrast oplossen als warm wint

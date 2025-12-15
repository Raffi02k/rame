# Autopilot Planner – Schemasystem {Rame} (Demo)

Detta är ett prototyp­projekt för ett digitalt schemasystem anpassat för kommunal vård och omsorg  
(t.ex. SÄBO och LSS). Fokus ligger på:

- tydlig **bemanning per enhet och dag**
- strukturerade **arbetsuppgifter (Brukarnära / HSL / Praktisk / Administrativ)**
- koppling mellan **personal, pass, färgteam (Röd/Blå/Lila/Vit) och sida (Norr/Söder)**
- en kodstruktur som är lätt att bygga vidare på med riktig backend senare

Projektet är byggt i **React + TypeScript + Vite**, med **Tailwind CSS** för UI och en tydlig mappstruktur för sidor, komponenter, data och kontext.

---

## Funktioner (i prototypen just nu)

- 🔐 **Login med roll-val**
  - Inloggningssida med val av roll: **Admin**, **Personal**, **Brukare**
  - Rollen styr vilken sida man hamnar på (`/admin`, `/staff`, `/user`)

- 🧩 **Admin – Schema & bemanning**
  - Välj **enhet** (t.ex. *SÄBO Källstorp* eller *Daglig verksamhet Kronan*)
  - Se **bemanning idag**:
    - personal på enheten
    - deras pass (tider)
    - ev. färgteam: Röd / Blå / Lila / Vit
    - ev. sida: Norr / Söder
  - Se **dagens uppgifter** per kategori:
    - Brukarnära, HSL, Praktisk, Administrativ
    - start– och sluttid
    - kopplad brukare
    - om signering krävs (HSL)
    - om uppgiften kräver två personal

- 🧪 **Demo-data (ingen riktig backend ännu)**
  - Allt data (enheter, personal, brukare, pass, uppgifter, assignment-status) ligger i `src/lib/demo-data.ts`
  - Struktur inspirerad av verklig verksamhet:
    - enheter: LSS, SÄBO
    - rum, våningsplan, Norr/Söder, färgteam
    - uppgifter med kategorier och signeringskrav

- 👷 **Förberett för framtida backend**
  - Kod och typer (`src/lib/types.tsx`) är designade så att demo-data senare kan bytas ut mot API-anrop / databas.
  - React Router används för att enkelt kunna lägga på auth och skyddade routes senare.

---

## Tech stack

- **Vite** – byggverktyg & dev-server
- **React** + **TypeScript**
- **React Router DOM** – routing mellan sidor
- **Tailwind CSS** – utility-baserad styling
- **lucide-react** – ikoner
- Egen **Schedule-context** (`src/context/schedule-context.tsx`) för att centralt hantera schema-data längre fram

---

## Komma igång

### 1. Klona repot

```bash
git clone https://github.com/Raffi02k/rame.git
cd rame

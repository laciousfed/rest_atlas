# Rest Atlas — Global Hotel Sleep, Comfort & Relaxation Review Platform

> **"Find a stay that helps you truly rest."**

Rest Atlas is an independent global hotel discovery and review platform engineered around sleep quality, acoustic quietness, bedding ergonomics, circadian lighting, and bedroom wellness architecture.

Unlike conventional hotel guides that award stars for lobby chandeliers or valet parking, Rest Atlas evaluates what happens when the bedroom door closes and the lights go out.

---

## Architecture & Technology Stack

- **Frontend:** Next.js 14+ (App Router), React 18, TypeScript.
- **Styling:** Tailwind CSS with a boutique editorial palette (warm sand, deep forest green, sage, olive, and gold accents).
- **Icons:** Lucide React.
- **Database & Backend:** Firebase Cloud Firestore with composite multi-field indexes and strict role-based Firestore Security Rules (`firestore.rules`).
- **Authentication:** Firebase Authentication with role-based claims (`super_admin`, `sleep_assessor`, `hotel_editor`).
- **Server Operations:** Firebase Admin SDK in server routes (`src/lib/firebase/admin.ts`).
- **Storage:** Firebase Storage rules (`storage.rules`) with MIME-type and image size validation.
- **Video Embeds:** Privacy-enhanced YouTube player (`youtube-nocookie.com`) with robust URL parser and thumbnail fallbacks.
- **Third-Party Guest Reviews:** Server-side Google Maps Platform Places API integration adhering to Google attribution policies.
- **Testing:** Vitest automated test suite covering the 4-pillar scoring algorithm, boundary validation, YouTube parser, and filter queries.

---

## The 4-Pillar Rest Score Methodology

Every property is assessed on a 0.0 to 10.0 scale across four weighted environmental dimensions:

$$\text{Rest Score} = (\text{Bed Comfort} \times 0.30) + (\text{Quietness} \times 0.20) + (\text{Lighting \& Climate} \times 0.20) + (\text{Design \& Wellness} \times 0.30)$$

1. **Bed and Linen Comfort (30%):** Mattress construction (natural latex, horsehair, pocket springs), linen quality (400+ TC breathable natural fibers), pillow menu density options, and motion isolation.
2. **Quiet and Sound Environment (20%):** Structural soundproofing (STC), acoustic vestibule buffer doors, triple-glazed windows, and ambient midnight decibel readings.
3. **Lighting and Climate (20%):** 100% zero-light blackout blinds with side track seals, circadian amber illumination, whisper-quiet HVAC (<25 dB), and clean airflow.
4. **Interior Design and Wellness (30%):** Biophilic architecture, visual tranquility, nature views, hydrotherapy/thermal spas, and evening turn-down sleep rituals.

Final scores are rounded to exactly one decimal place and categorized under editorial descriptors (e.g. *Transcendent Sanctuary*, *Exceptional Sleep Quality*).

---

## Project Structure

```
rest_atlas/
├── firestore.rules          # Production Firestore security rules
├── storage.rules            # Production Firebase Storage security rules
├── firestore.indexes.json   # Multi-field composite query indexes
├── .env.example             # Configuration template with all environment variables
├── package.json             # Scripts & dependencies
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Editorial Homepage with dynamic curations
│   │   ├── layout.tsx       # Root layout with metadata & fonts
│   │   ├── sitemap.ts       # Dynamic SEO XML sitemap generator
│   │   ├── robots.ts        # Search engine crawler directives
│   │   ├── hotels/          # Directory & Hotel Detail pages
│   │   │   ├── page.tsx     # Faceted search directory with sleep filters
│   │   │   └── [slug]/page.tsx # Hotel detail page with scorecard & video
│   │   ├── admin/           # Authenticated Assessor Dashboard
│   │   │   ├── page.tsx     # Metrics overview
│   │   │   ├── login/       # Login & Assessor Preview mode
│   │   │   ├── hotels/      # Hotel management & editor
│   │   │   ├── audit/       # Score audit trail
│   │   │   └── bootstrap/   # Privileged admin setup tool
│   │   ├── methodology/     # Mathematical scoring methodology page
│   │   ├── about/           # Mission and medical disclaimers
│   │   ├── contact/         # Server-validated contact & correction form
│   │   ├── privacy/         # Privacy policy
│   │   ├── terms/           # Terms of service
│   │   ├── editorial-policy/# Affiliate & independent review disclosure
│   │   └── api/             # API routes (/hotels, /score, /contact, /integrations)
│   ├── components/
│   │   ├── layout/          # Navbar, Footer
│   │   ├── hotels/          # HotelCard, ScoreBreakdownView, YouTubePlayer, GoogleReviewsCard, HotelSearchFilters
│   │   └── admin/           # HotelEditorForm
│   ├── data/
│   │   └── seed-hotels.ts   # 12 realistic verified global hotel sanctuaries
│   ├── lib/
│   │   ├── scoring.ts       # Mathematical scoring formula & validation
│   │   ├── youtube.ts       # YouTube URL parser & privacy embed builder
│   │   ├── seo.ts           # Schema.org JSON-LD structured data generator
│   │   ├── auth-context.tsx # Firebase Auth & local assessor session provider
│   │   ├── firebase/        # Client SDK & Admin SDK initializers
│   │   └── db/              # Repository layer with Firestore and in-memory engine
│   └── types/               # TypeScript interfaces (Hotel, Score, Admin)
└── tests/                   # Automated Vitest test suite
```

---

## Getting Started Locally

### 1. Prerequisites
- Node.js 18.17+ or 20+ (tested on Node v22.11.0)
- npm 10+

### 2. Installation
```powershell
# Clone or navigate to the repository directory
cd c:\Users\Anthony\Desktop\rest_atlas

# Install all dependencies
npm install
```

### 3. Environment Configuration
Copy the template to `.env.local`:
```powershell
cp .env.example .env.local
```

The application is built with a resilient zero-crash fallback engine. If Firebase credentials or Google Places API keys are not yet provided in `.env.local`, the complete public directory, filters, hotel detail views, and Assessor Preview mode function seamlessly using the built-in seed dataset of 12 verified hotels across 5 continents.

### 4. Running the Development Server
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Automated Tests
```powershell
npm test
```

### 6. Building for Production
```powershell
npm run build
```

---

## Firebase Configuration & Deployment

### 1. Firebase Project Setup
1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password provider).
3. Enable **Cloud Firestore** in production mode.
4. Enable **Firebase Storage** for media uploads.
5. Create a Web App under Project Settings and copy the configuration keys into `.env.local`:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

### 2. Service Account for Firebase Admin SDK
1. Go to **Project Settings > Service Accounts**.
2. Click **Generate new private key** and download the JSON keyfile.
3. Populate `.env.local` server-side variables:
   ```bash
   FIREBASE_PROJECT_ID=your-project
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

### 3. Deploying Security Rules & Indexes
Install the Firebase CLI and deploy the included configuration:
```powershell
npm install -g firebase-tools
firebase login
firebase use your-project-id
firebase deploy --only firestore:rules,storage,firestore:indexes
```

---

## Google Maps Platform Integration

To display Google Place ratings and direct guest review links:
1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Places API (New)** and **Maps Embed API**.
3. Create an API Key and restrict it by API service.
4. Add the key to `.env.local`:
   ```bash
   GOOGLE_MAPS_SERVER_API_KEY=AIzaSy...
   ```
*If unconfigured, the application gracefully provides direct search links to Google Maps without breaking.*

---

## Assessor & Administrator Access

- Public URL: `/admin`
- Login URL: `/admin/login`
- One-Time Bootstrap: `/admin/bootstrap`

In development, click **Super Admin** or **Sleep Assessor** on the login screen to simulate authenticated assessor sessions and evaluate the live scoring sliders, YouTube previewers, and audit log.

---

## Medical & Legal Disclaimer

Rest Atlas provides independent architectural reviews and hotel assessments. The scoring system evaluates documented physical features associated with restful environments. Rest Atlas does not offer medical advice, diagnose clinical sleep disorders, or guarantee individual physiological responses.

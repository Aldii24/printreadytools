# DESIGN.md — PrintReadyTools Design Reference

## Product

**PrintReadyTools** is a US-focused printable generator website for parents, families, caregivers, teachers, and household organizers.

The website helps users quickly create clean, printable PDFs such as chore charts, meal planners, medication trackers, cleaning schedules, pet feeding schedules, homework planners, and family checklists.

The visual direction should feel **human, calm, useful, and trustworthy** — not like a generic AI-generated SaaS landing page.

---

## Core Design Goal

The site should feel like:

> “A calm, practical family organization website that helps busy parents make useful printables in under one minute.”

It should **not** feel like:

- a crypto/AI startup
- a shiny SaaS dashboard
- a generic Tailwind template
- a loud ad-heavy content farm
- a children’s toy website
- an overdesigned productivity app

The user should immediately feel:

- this is simple
- this is safe
- this is made for real families
- I can use this quickly
- the printable will look good on paper

---

## Design Personality

Use these adjectives as the main reference:

- Warm
- Practical
- Calm
- Clean
- Family-friendly
- Soft
- Trustworthy
- Printable-first
- Slightly editorial
- Lightly playful, but not childish

Avoid:

- neon gradients
- glassmorphism
- dark mode as default
- futuristic AI visuals
- robot icons
- excessive emojis
- overly rounded bubble UI
- generic “AI tool” layouts
- purple-blue gradient hero sections

---

## Target Audience

Primary audience:

- US parents
- busy moms and dads
- homeschool parents
- teachers
- caregivers
- pet owners
- household managers

They are likely visiting from:

- Google Search
- Pinterest
- Facebook groups
- mobile devices

They want a tool that works fast. Many users may not care about the brand at first. They care about getting a good-looking printable quickly.

---

## Brand Feeling

The brand should feel closer to:

- a clean home organization blog
- a printable stationery shop
- a family planner
- a calm Notion-style resource hub
- a friendly teacher resource site

Not like:

- Canva clone
- ChatGPT wrapper
- corporate B2B SaaS
- aggressive affiliate blog
- coupon website
- cluttered ad network page

---

## Layout Principles

### 1. Tool-first

On tool pages, the generator should appear high on the page.

A user should not need to scroll through 1,500 words before using the tool.

Recommended page structure:

1. Header
2. Short hero/introduction
3. Generator form
4. Printable preview
5. Download button
6. Helpful examples
7. Tips
8. FAQ
9. Related tools

### 2. Mobile-first

Most users will likely come from mobile search or Pinterest.

Design everything to work beautifully on mobile:

- large tap targets
- simple forms
- sticky or obvious download action
- no cramped two-column layouts on small screens
- preview can stack below the form

### 3. Print-first

The final PDF matters more than flashy UI.

The preview should clearly show:

- US Letter paper shape
- clean margins
- readable text
- simple table/grid structure
- pleasant but ink-friendly design

### 4. Calm ad placement

Ad slots are allowed, but the page should not look spammy.

Use reserved ad containers with calm labels like:

> Advertisement

Ad slots should not break the flow of the generator.

Recommended ad placements:

- one below the intro/hero
- one after the generator or preview
- one inside lower informational content

Avoid:

- ads inside the form
- ads between form input and download button
- aggressive popups during PDF creation
- layout shift caused by unloaded ads

---

## Color Palette

Use a warm neutral palette with soft accent colors.

### Base Colors

- Background: `#FAF7F2` — warm off-white
- Surface: `#FFFFFF` — clean white cards
- Soft surface: `#F3EEE7` — subtle beige
- Text primary: `#2F2A25` — warm charcoal
- Text secondary: `#6F665C` — soft brown-gray
- Border: `#E6DED3` — warm light border

### Accent Colors

Primary accent:

- Sage green: `#6F8F72`

Secondary accents:

- Dusty blue: `#7E9CAF`
- Muted terracotta: `#C9825B`
- Soft yellow: `#E8C872`
- Blush: `#D9A6A1`

### Usage

Use accent colors sparingly.

- Primary buttons: sage green
- Hover state: darker sage
- Tags/badges: soft beige or very light accent background
- PDF themes may use accent colors as borders or section headers

Avoid full-page gradients.

---

## Typography

The typography should feel editorial and readable.

Recommended font direction:

### Headings

Use a warm serif or humanist display font.

Good options:

- `Lora`
- `Merriweather`
- `Fraunces`
- `Libre Baskerville`

### Body

Use a clean, readable sans-serif.

Good options:

- `Inter`
- `Source Sans 3`
- `Nunito Sans`
- `Atkinson Hyperlegible`

### Suggested Pairing

- Headings: `Lora`
- Body: `Inter`

### Type Scale

- Hero heading: 44–56px desktop, 34–40px mobile
- H1 tool pages: 38–48px desktop, 30–36px mobile
- H2: 26–32px
- H3: 20–24px
- Body: 16–18px
- Form labels: 14–15px
- Small helper text: 13–14px

Headings should not feel too techy. Avoid all-caps except for small labels.

---

## Logo Direction

The logo should be simple and text-based.

Possible logo styles:

- Wordmark with small paper icon
- Wordmark with checklist icon
- Wordmark with subtle folded-corner document
- Wordmark with small home/paper symbol

Avoid:

- robot logo
- sparkles-heavy AI logo
- generic lightning bolt
- complex illustration
- overly childish icon

Logo text:

**PrintReadyTools**

Possible tagline:

> Simple printable tools for busy families.

---

## UI Components

### Header

Desktop:

- Logo left
- Navigation right
- Links:
  - Printables
  - For Parents
  - For Teachers
  - Pet Tools
  - Blog or Guides

Mobile:

- Logo left
- Menu button right
- Keep menu minimal

Header should be sticky only if it does not feel intrusive.

### Buttons

Primary button:

- sage green background
- white text
- medium radius
- clear label

Examples:

- Download PDF
- Create Printable
- Preview Chart
- Start Generator

Secondary button:

- white or transparent
- warm border
- charcoal text

Avoid overly shiny buttons.

### Cards

Cards should use:

- white background
- warm border
- subtle shadow
- 16–24px padding
- 16–20px border radius

Cards should feel like paper sheets, not SaaS dashboard blocks.

### Forms

Forms should be extremely clear.

Use:

- visible labels
- short helper text
- large inputs
- simple select fields
- checkboxes for repeated options
- optional “Add another item” controls

Avoid:

- overly complex multi-step flows
- hidden labels
- tiny placeholder-only inputs

### Printable Preview

The preview should look like a real piece of paper.

Use:

- white page
- US Letter ratio
- subtle paper shadow
- clean borders
- zoom-safe readable layout

On mobile, show a scaled preview with option to expand.

---

## Homepage Structure

Recommended homepage sections:

### 1. Hero

Headline example:

> Free printable generators for busy families

Subheadline:

> Create chore charts, meal planners, cleaning schedules, pet care logs, and more — customized and ready to download as PDFs.

Primary CTA:

> Browse Printable Tools

Secondary CTA:

> Make a Chore Chart

Hero visual:

- preview stack of 2–3 printable pages
- not an abstract illustration
- show real printable examples

### 2. Popular Tools

Grid of tool cards:

- Chore Chart Generator
- Weekly Meal Planner
- Medication Tracker
- Cleaning Schedule
- Pet Feeding Schedule
- Homework Planner

Each card should include:

- short title
- one-sentence benefit
- small icon
- CTA: Create

### 3. Why People Use It

Use simple benefits:

- No sign-up required
- Customizable
- US Letter PDF
- Mobile friendly
- Free to use
- Made for home, school, and family routines

### 4. Categories

Categories:

- Family & Home
- Kids & Chores
- Meal Planning
- Health & Medication
- Pets
- School & Homeschool

### 5. Simple Example

Show a before/after:

- “Enter your child’s name and chores”
- “Download a clean printable chart”

### 6. Footer

Footer links:

- About
- Contact
- Privacy Policy
- Terms
- All Tools

---

## Tool Page Structure

Each tool page should follow a consistent structure.

Example: Chore Chart Generator

### 1. H1

> Free Chore Chart Generator

### 2. Short intro

Keep it short:

> Create a personalized chore chart for kids, teens, or the whole family. Choose the chores, days, rewards, and style, then download a printable PDF.

### 3. Generator

Form and preview should appear early.

Desktop:

- left: form
- right: live preview

Mobile:

- form first
- preview second

### 4. Download CTA

Button should be visible after preview:

> Download Chore Chart PDF

### 5. Helpful presets

Examples:

- Chore chart for ages 4–6
- Chore chart for ages 7–9
- Chore chart for teens
- Family chore chart

### 6. Tips

Short practical tips for using the printable.

### 7. FAQ

Answer real search questions.

### 8. Related tools

Link to:

- Reward Chart Generator
- Daily Routine Chart
- Cleaning Schedule
- Homework Planner

---

## PDF Design Direction

The generated PDFs should look clean and useful, not overdecorated.

PDF requirements:

- US Letter size
- printable in black and white
- optional accent theme
- readable on paper
- not too much ink usage
- clear title
- date or week area when relevant
- simple tables/checklists
- enough writing space
- subtle border or section dividers

PDF theme examples:

### Minimal

- black/charcoal text
- thin borders
- no heavy color

### Soft Family

- sage headers
- beige section backgrounds
- rounded boxes

### Kid Friendly

- soft yellow or blush highlights
- simple icons
- not too childish

### Teacher Clean

- clean grid
- high readability
- minimal decoration

---

## Icon Style

Use simple line icons.

Recommended icon direction:

- document
- checklist
- calendar
- home
- heart
- paw
- apple
- pencil
- medicine
- broom

Avoid:

- 3D icons
- glossy icons
- AI sparkles everywhere
- overly cute cartoon illustrations

Lucide icons are acceptable if used subtly.

---

## Illustration Style

Illustrations are optional.

If used, choose:

- simple flat illustrations
- warm neutral colors
- family/home objects
- paper sheets
- calendars
- kitchen table
- school supplies

Avoid:

- fake AI-generated people
- overly polished stock characters
- futuristic robot assistants

Real UI previews are better than illustrations.

---

## Voice and Copy

The copy should sound helpful and human.

Use:

- short sentences
- plain English
- practical benefits
- calm guidance

Avoid:

- hype
- “revolutionary”
- “AI-powered” as the main selling point
- corporate buzzwords
- guilt-based parenting copy

Good copy examples:

> Make a printable chore chart in minutes.

> Customize the tasks, days, and rewards, then download a clean PDF.

> No sign-up needed.

> Designed for US Letter paper.

Bad copy examples:

> Revolutionize your family productivity with our cutting-edge AI workflow.

> Transform your household management forever.

---

## SEO Design Requirements

Each tool page should include:

- one clear H1
- descriptive intro text
- generator above the fold or near the top
- FAQ section
- related internal links
- unique meta title
- unique meta description
- clean URL slug

Example URLs:

- `/chore-chart-generator`
- `/weekly-meal-planner`
- `/medication-tracker-printable`
- `/cleaning-schedule-generator`
- `/pet-feeding-schedule-printable`

Avoid thin pages. Each page should be genuinely useful.

---

## Accessibility

The site should be accessible and easy to use.

Requirements:

- high contrast text
- visible focus states
- labels for every input
- keyboard-friendly forms
- alt text for meaningful images
- no tiny touch targets
- no text over busy images
- error messages should be clear

---

## Performance

The site must be fast.

Requirements:

- minimal JavaScript
- optimized images
- no heavy animation libraries unless necessary
- no layout shift from ads
- lazy-load non-critical content
- PDF generation should feel quick

---

## Ad Slot Design

Use calm ad placeholders during development.

Recommended placeholder style:

- light beige background
- dashed warm border
- small centered text: Advertisement
- fixed height to prevent layout shift

Example ad slot sizes:

- top banner: 728x90 desktop, responsive mobile
- in-content rectangle: 300x250
- post-generator banner: responsive

Do not let ads interrupt the generator flow.

---

## Anti-AI-Generated Look Rules

The website must not look like a generic AI-generated template.

Avoid these patterns:

- blue/purple gradient hero
- floating glass cards
- fake dashboard screenshots with random charts
- generic “boost productivity” headline
- massive rounded gradient buttons
- robot/sparkle icons
- dark futuristic backgrounds
- excessive animation
- repetitive card layouts without personality

Instead, use:

- real printable previews
- warm neutral colors
- editorial spacing
- useful microcopy
- simple paper-inspired UI
- practical examples
- human-centered categories

---

## Example Visual References

The design should take inspiration from the feeling of:

- printable stationery shops
- clean family organization blogs
- teacher resource sites
- simple recipe websites
- calm Notion-like resource hubs
- modern editorial lifestyle sites

But the final design should be original and lightweight.

---

## Homepage Wireframe

```text
[Header]
Logo                                         Printables | Parents | Teachers | Pets

[Hero]
Free printable generators for busy families
Create chore charts, meal planners, cleaning schedules, pet care logs, and more.

[CTA] Browse Tools     [CTA Secondary] Make a Chore Chart

[Visual]
Stack of real printable previews

[Ad Slot]

[Popular Tools]
Card | Card | Card
Card | Card | Card

[Why Use PrintReadyTools]
No sign-up | Custom PDFs | US Letter | Mobile Friendly

[Categories]
Family & Home | Kids & Chores | Meal Planning | Health | Pets | School

[Example Section]
1. Fill out a simple form
2. Preview your printable
3. Download your PDF

[Ad Slot]

[Footer]
About | Contact | Privacy | Terms | All Tools
```

---

## Tool Page Wireframe

```text
[Header]

[Tool Hero]
Free Chore Chart Generator
Create a custom chore chart for kids or the whole family.

[Ad Slot]

[Generator Section]
Left: Form inputs
Right: Live printable preview

[Download PDF Button]

[Presets]
Ages 4–6 | Ages 7–9 | Teens | Family

[Tips]
Short helpful content

[FAQ]
Question 1
Question 2
Question 3

[Related Tools]
Reward Chart | Routine Chart | Cleaning Schedule

[Footer]
```

---

## Final Design Reminder

The website should feel like a useful printable tool that a parent would trust, bookmark, and return to.

The main design test:

> Would a busy parent understand what this site does in 5 seconds and feel comfortable downloading a printable from it?

If yes, the design is working.

export type RoutineId = "morning" | "night" | "extra" | "pimples"

type ProductId =
  | "water"
  | "toner"
  | "txa"
  | "hyalu"
  | "aqua"
  | "face"
  | "olay"
  | "aze"
  | "pim"

export type RoutineStep = {
  productId: ProductId
  action: string
}

export type Product = {
  name: string
  image?: string
  short: string
  ingredients?: string[]
  help: string
  tip?: string
}

export type Routine = {
  id: RoutineId
  tabLabel: string
  kicker: string
  title: string
  intro: string
  steps: RoutineStep[]
  overviewNote: string
  note?: string[]
}

export type QuickReferenceRow = {
  step: string
  morning: string
  night: string
  extra: string
  pimples: string
}

export const PRODUCTS: Record<ProductId, Product> = {
  water: {
    name: "Wash with water",
    short: "A gentle morning rinse. No heavy cleanse is needed.",
    help: "Rinsing with plain water keeps your natural moisture intact, so the products after it can go onto soft, comfortable skin instead of tight, over-cleansed skin.",
  },
  toner: {
    name: "Celeteque DermoScience Hydration Alcohol-Free Toner",
    image: "/products/toner.jpg",
    short: "Alcohol-free toner with witch hazel that soothes and preps skin.",
    ingredients: ["Witch Hazel Extract", "Panthenol (Pro-Vitamin B5)", "Glycerin", "Sodium PCA"],
    help: "An alcohol-free toner made for sensitive to dry skin. It picks up the last traces of dirt without drying you out, and leaves skin damp, soft and ready to drink up your serum.",
  },
  txa: {
    name: "The Originote TXA 377 Dark Spot Serum",
    image: "/products/txa.jpg",
    short: "A brightening serum for the look of dark spots and uneven tone.",
    ingredients: ["Tranexamic Acid", "Niacinamide (Vitamin B3)", "Vitamin E", "Ceramides", "Peony Extract"],
    help: "Your brightening step. Tranexamic acid helps fade dark spots and discoloration, while niacinamide evens tone and refines pores. Ceramides and vitamin E help keep skin from feeling dry.",
  },
  hyalu: {
    name: "The Originote Hyalucera Moisturizer",
    image: "/products/hyalucera.jpg",
    short: "A lightweight gel moisturizer that seals in serum and supports the skin barrier.",
    ingredients: ["Hyaluronic Acid", "Ceramide", "Chlorella and Spirulina", "Panthenol", "Allantoin"],
    help: "A lightweight gel moisturizer that seals in your serum, keeps skin bouncy and hydrated, and supports a healthy skin barrier without feeling greasy.",
  },
  aqua: {
    name: "Skin Aqua UV Super Moisture Gel SPF 50+ PA++++",
    image: "/products/aqua.jpg",
    short: "A lightweight, broad-spectrum SPF 50+ gel sunscreen.",
    ingredients: ["Super Hyaluronic Acid", "Sodium Hyaluronate", "Hydrolyzed Sodium Hyaluronate", "Broad-spectrum UV filters"],
    help: "This is your sunscreen, and the most important morning step. Sun is a leading cause of dark spots and early aging. The gel feels like a moisturizer, leaves no white cast, and protects the results of your serum.",
    tip: "Reapply every 2 to 3 hours if you are outdoors.",
  },
  face: {
    name: "The Face Shop Herb Day 365 Master Blending Foaming Cleanser (Aloe & Green Tea)",
    image: "/products/faceshop.jpg",
    short: "Creamy aloe and green tea foam that cleanses without stripping.",
    ingredients: ["Aloe Leaf Extract", "Green Tea", "Glycerin"],
    help: "Removes the day's oil, dirt and sunscreen with a thick, creamy foam. Aloe and green tea help skin feel soft and refreshed instead of squeaky and tight.",
  },
  olay: {
    name: "Olay Regenerist Vitamin C + Peptide 24 Hydrating Moisturizer",
    image: "/products/olay.jpg",
    short: "A brightening gel-cream with vitamin C, niacinamide and peptides.",
    ingredients: ["Vitamin C (3-O-Ethyl Ascorbic Acid)", "Niacinamide", "Peptides (Matrixyl)", "Panthenol"],
    help: "A hydrating gel-cream that works while you sleep to brighten dullness, plump the look of fine lines, and wake you up with soft, rested-looking skin.",
  },
  aze: {
    name: "SkinFX Azelaic Acid 20% Cream with Ceramide",
    image: "/products/azelaic.jpg",
    short: "A 20% azelaic acid cream cushioned with barrier-supporting ingredients.",
    ingredients: ["Azelaic Acid (20%)", "Ceramide AP", "Centella Asiatica", "Squalane", "Shea Butter", "Panthenol", "Sodium Hyaluronate", "Allantoin", "Licorice Root Extract"],
    help: "Azelaic acid is one of the gentlest actives. It helps calm redness, fade marks and keep breakouts down, while ceramides and squalane cushion it so skin stays soft. It does not make skin sun-sensitive, though daily sunscreen is still a must.",
    tip: "Apply a thin layer over the whole face, avoiding the eyes. If skin tingles, use it every other night at first.",
  },
  pim: {
    name: "QuickFX Pimple Eraser Cream",
    image: "/products/pimple.jpg",
    short: "A targeted leave-on treatment for individual pimples.",
    ingredients: ["Salicylic Acid (1%)", "Glycolic Acid (0.5%)", "Niacinamide (0.5%)", "Zinc Oxide", "Vitamin C"],
    help: "Dries up pimples, helps prevent dark scars and keeps pores clear, while the toner and moisturizer around it keep the rest of your face comfortable.",
    tip: "Dab on pimples only, in a thin layer. Do not pick at them.",
  },
}

export const ROUTINES: Routine[] = [
  {
    id: "morning",
    tabLabel: "Morning",
    kicker: "YOUR AM RITUAL",
    title: "A fresh start",
    intro: "Five quick steps. The last one, sunscreen, is the one not to skip.",
    steps: [
      { productId: "water", action: "Rinse" },
      { productId: "toner", action: "Tone" },
      { productId: "txa", action: "Brighten" },
      { productId: "hyalu", action: "Moisturize" },
      { productId: "aqua", action: "Protect" },
    ],
    overviewNote: "Finish with sunscreen. Reapply every 2 to 3 hours when you are outdoors.",
  },
  {
    id: "night",
    tabLabel: "Night",
    kicker: "YOUR PM RITUAL",
    title: "A softer landing",
    intro: "Cleanse, tone, then moisturize with vitamin C and peptides while you sleep.",
    steps: [
      { productId: "face", action: "Cleanse" },
      { productId: "toner", action: "Tone" },
      { productId: "olay", action: "Moisturize" },
    ],
    overviewNote: "An easy reset: cleanse away the day, then bring skin back to comfortable hydration.",
  },
  {
    id: "extra",
    tabLabel: "Extra time",
    kicker: "AN OPTIONAL ACTIVE",
    title: "A little extra care",
    intro: "The night routine plus a gentle azelaic acid treatment before moisturizer.",
    steps: [
      { productId: "face", action: "Cleanse" },
      { productId: "toner", action: "Tone" },
      { productId: "aze", action: "Treat" },
      { productId: "olay", action: "Moisturize" },
    ],
    overviewNote: "Apply a thin layer. If your skin tingles, start by using it every other night.",
    note: ["If your skin feels tingly, apply moisturizer first and the cream on top."],
  },
  {
    id: "pimples",
    tabLabel: "Pimples",
    kicker: "TARGETED CARE",
    title: "For pimple nights",
    intro: "The night routine plus a spot treatment on the pimples only.",
    steps: [
      { productId: "face", action: "Cleanse" },
      { productId: "toner", action: "Tone" },
      { productId: "pim", action: "Spot treat" },
      { productId: "olay", action: "Moisturize" },
    ],
    overviewNote: "Use the treatment only on spots, and skip azelaic acid this evening.",
    note: [
      "Skip the azelaic acid cream on pimple nights. Using both stacks a lot of actives and can cause dryness or irritation.",
      "Persistent or painful acne is worth checking with a dermatologist.",
    ],
  },
]

export const QUICK_REFERENCE_ROWS: QuickReferenceRow[] = [
  { step: "Cleanse", morning: "Water", night: "Herb Day 365 Foaming Cleanser", extra: "Same", pimples: "Same" },
  { step: "Tone", morning: "Celeteque Hydration Toner", night: "Celeteque Hydration Toner", extra: "Same", pimples: "Same" },
  { step: "Treat", morning: "TXA 377 Dark Spot Serum", night: "None", extra: "SkinFX Azelaic Acid 20% Cream", pimples: "QuickFX Pimple Eraser (spots only)" },
  { step: "Moisturize", morning: "Hyalucera Moisturizer", night: "Olay Vitamin C + Peptide 24", extra: "Same", pimples: "Same" },
  { step: "Protect", morning: "Skin Aqua UV Gel SPF 50+", night: "None", extra: "None", pimples: "None" },
]

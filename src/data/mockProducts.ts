export interface ProductCategory {
  id: number;
  name: string;
}

export interface ProductAttribute {
  name: string;
  options: string[];
}

export interface ProductImage {
  src: string;
}

export interface ProductTag {
  name: string;
}

export interface MockProduct {
  id: number;
  name: string;
  price: string;
  categories: ProductCategory[];
  attributes: ProductAttribute[];
  images: ProductImage[];
  tags: ProductTag[];
  stock_status: string;
}

export interface MockCategory {
  id: number;
  slug: string;
  name: string;
  description: string;
}

export const categories: MockCategory[] = [
  { id: 131, slug: "collar",        name: "Collar",        description: "Collar"        },
  { id: 165, slug: "center-column", name: "Center Column", description: "Center Column" },
  { id: 168, slug: "arms",          name: "Arms",          description: "Arms"          },
  { id: 173, slug: "baluster",      name: "Baluster",      description: "Baluster"      },
  { id: 170, slug: "socket",        name: "Socket",        description: "Socket"        },
  { id: 169, slug: "bulb",          name: "Bulb",          description: "Bulb"          },
  { id: 171, slug: "canopy",        name: "Canopy",        description: "Canopy"        },
];

const p = (
  id: number, name: string, price: number,
  catId: number, catName: string,
  glb: number, dim: string,
  x: number, y: number, z: number
): MockProduct => ({
  id,
  name,
  price: String(price),
  categories: [{ id: 0, name: "All" }, { id: catId, name: catName }],
  attributes: [
    { name: "Dimension", options: [dim] },
    { name: "GLB",       options: [String(glb)] },
  ],
  images: [{ src: "" }],
  tags: [{ name: String(x) }, { name: String(y) }, { name: String(z) }],
  stock_status: "instock",
});

export const products: MockProduct[] = [
  // ── Collar – 100* (cat 131) ────────────────────────────────────────────────
  p(11693, "Collar 100", 1200, 131, "Collar",        100, "80cm",  0.0,  1.5,  0.0),
  p(11769, "Collar 101", 1350, 131, "Collar",        101, "90cm",  0.0, -0.7,  0.0),
  p(11771, "Collar 102", 1100, 131, "Collar",        102, "70cm", -0.2, -2.0,  0.0),
  p(11777, "Collar 103", 1400, 131, "Collar",        103, "85cm",  0.0,  1.0,  0.0),
  p(11779, "Collar 104", 1250, 131, "Collar",        104, "75cm",  0.0,  1.0,  0.0),
  p(11781, "Collar 105", 1300, 131, "Collar",        105, "80cm",  0.0, -0.8,  0.0),
  p(11783, "Collar 106", 1150, 131, "Collar",        106, "65cm",  0.0,  0.0,  0.0),

  // ── Center Column – 200* (cat 165) ────────────────────────────────────────
  p(11733, "Center Column 200",  950, 165, "Center Column", 200, "60cm",  0.5,  3.5,  0.0),
  p(11788, "Center Column 203",  980, 165, "Center Column", 203, "60cm",  0.0,  2.5,  0.0),
  p(12011, "Center Column 205",  920, 165, "Center Column", 205, "58cm",  0.0,  2.5, -1.5),

  // ── Arms – 300* (cat 168) — all share same position ────────────────────────
  p(11798, "Arms 300", 1500, 168, "Arms", 300, "100cm", 9.0, -1.5, 0.0),
  p(11799, "Arms 301", 1520, 168, "Arms", 301, "100cm", 9.0, -1.5, 0.0),
  p(11800, "Arms 302", 1480, 168, "Arms", 302, "100cm", 9.0, -1.5, 0.0),
  p(11801, "Arms 303", 1550, 168, "Arms", 303, "100cm", 9.0, -1.5, 0.0),

  // ── Baluster – 400* (cat 173) ─────────────────────────────────────────────
  p(11802, "Baluster 400",  800, 173, "Baluster", 400, "50cm",  0.8, 15.0, 0.5),
  p(11804, "Baluster 401",  850, 173, "Baluster", 401, "55cm",  0.0, 15.0, 0.5),
  p(11806, "Baluster 402",  780, 173, "Baluster", 402, "48cm",  0.0, 15.0, 0.0),
  p(12346, "Baluster 403",  900, 173, "Baluster", 403, "60cm",  0.0, 15.0, 0.0),

  // ── Socket – 500* (cat 170) ───────────────────────────────────────────────
  p(11815, "Socket 502", 1750, 170, "Socket", 502, "115cm", 12.0, 7.0, 0.0),
  p(11821, "Socket 505", 1950, 170, "Socket", 505, "135cm", 12.0, 7.0, 0.0),
  p(11827, "Socket 508", 1650, 170, "Socket", 508, "108cm", 12.0, 7.0, 0.0),

  // ── Bulb – 700* (cat 169) ─────────────────────────────────────────────────
  p(11836, "Bulb 700", 1100, 169, "Bulb", 700, "72cm", 12.0, 8.0, 0.0),
  p(12349, "Bulb 701", 1200, 169, "Bulb", 701, "78cm", 12.0, 8.0, 0.0),
  p(12351, "Bulb 702", 1050, 169, "Bulb", 702, "68cm", 12.0, 8.0, 0.0),
  p(12352, "Bulb 703", 1300, 169, "Bulb", 703, "82cm", 12.0, 8.0, 0.0),

  // ── Canopy – 900* (cat 171) ───────────────────────────────────────────────
  p(11843, "Canopy 900", 2800, 171, "Canopy", 900, "180cm", 0.5, 0.0, 0.0),
  p(11845, "Canopy 901", 2600, 171, "Canopy", 901, "170cm", 0.0, 0.0, 0.0),
];

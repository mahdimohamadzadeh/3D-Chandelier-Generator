export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  date: string;
  readTime: string;
  category: string;
  categoryIcon: 'formula' | 'trend' | 'care';
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'how-to-choose-chandelier-size-dining-room',
    title: 'How to Choose the Perfect Chandelier Size for Your Dining Room',
    excerpt: 'Selecting the ideal chandelier dimensions is crucial for balance, lighting quality, and headroom. Follow our simple mathematical formula.',
    content: `
### Finding the Perfect Scale

Choosing a chandelier for your dining room is as much about proportions as it is about aesthetic beauty. An undersized fixture will look lost in the space, while an oversized fixture can overwhelm the room and block line-of-sight across the table.

#### 1. The Room Dimension Formula
A reliable industry rule of thumb for finding the optimal chandelier diameter:
- Measure the **length** and **width** of your dining room in feet.
- Add those two numbers together.
- The total sum in **inches** gives you the ideal diameter for your chandelier.

*Example:* If your dining room is 14 feet by 16 feet (14 + 16 = 30), look for a chandelier around 30 inches in diameter.

#### 2. Hanging Height & Clearance
- **Over a Dining Table:** Hang the bottom of the chandelier **30 to 36 inches** above the table surface (based on an 8-foot ceiling). For higher ceilings, raise the fixture by 3 inches for every additional foot of ceiling height.
- **Table Ratio:** Ensure the chandelier diameter is roughly **1/2 to 2/3** the width of your dining table.

#### 3. Matching Architecture & 3D Customizer
With interactive 3D tools like **Luster 3D**, you can adjust the tier diameter, arm count, and socket count virtually before placing an order. This ensures zero guesswork during installation.
    `,
    author: {
      name: 'Elena Rostova',
      role: 'Lead Interior Architect',
      initials: 'ER',
    },
    date: 'August 12, 2026',
    readTime: '5 min read',
    category: 'Design Guide',
    categoryIcon: 'formula',
    featured: true,
  },
  {
    id: 2,
    slug: 'lighting-design-trends-2026',
    title: '5 Lighting Design Trends Shaping Luxury Homes in 2026',
    excerpt: 'From organic hand-blown glass clusters to integrated 3D-customized armatures, discover what is trending in high-end residential lighting.',
    content: `
### 1. Organic & Asymmetrical Sculptures
Rigid symmetry is yielding to fluid, nature-inspired forms. Freeform crystal clusters, asymmetrical branch chandeliers, and hand-bent brass arms bring warmth and artisan craftsmanship to living spaces.

### 2. Warm Architectural Dimmability (Tunable White)
Smart LED tech now allows seamless shifting from crisp 3000K task lighting during the day to romantic 2200K amber glow in the evening without compromising color rendering (CRI > 95).

### 3. Modular & Tailored Fixtures
Homeowners no longer accept off-the-shelf lighting. Customizable 3D configurators let designers specify exact socket spacing, tier heights, and bulb finishes tailored to unique ceiling slopes.

### 4. Smoked Glass & Brushed Brass Accents
Warm metallic tones paired with translucent smoked glass generate subtle sophistication without harsh glare.
    `,
    author: {
      name: 'Marcus Vance',
      role: 'Lighting Specialist',
      initials: 'MV',
    },
    date: 'August 5, 2026',
    readTime: '4 min read',
    category: 'Trends',
    categoryIcon: 'trend',
  },
  {
    id: 3,
    slug: 'maintaining-cleaning-crystal-chandeliers',
    title: 'The Ultimate Guide to Cleaning & Maintaining Crystal Chandeliers',
    excerpt: 'Keep your crystal prisms sparkling bright with our step-by-step cleaning procedure and maintenance checklist.',
    content: `
Crystal chandeliers accumulate dust and ambient film over time. A quick bi-annual cleaning routine ensures maximum luminosity and sparkle.

#### The Alcohol & Distilled Water Spray Method
1. Turn off power at the main circuit breaker and allow bulbs to cool completely.
2. Place a thick blanket underneath the chandelier to catch any accidental drips or dropped crystals.
3. Mix **1 part isopropyl alcohol** with **3 parts distilled water** in a spray bottle.
4. Spray crystals thoroughly and allow them to drip dry into the blanket below.
5. Polish remaining water spots gently using lint-free microfiber gloves.
    `,
    author: {
      name: 'Sophia Chen',
      role: 'Restoration Expert',
      initials: 'SC',
    },
    date: 'July 28, 2026',
    readTime: '6 min read',
    category: 'Care & Maintenance',
    categoryIcon: 'care',
  },
];

export interface BookChapterTranslation {
  titleEn: string;
  subtitleEn?: string;
  introEn?: string;
  paragraphsEn?: string[];
  quoteEn?: string;
}

export const BOOK_TRANSLATIONS: Record<string, Record<string, BookChapterTranslation>> = {
  "seni-menyeduh-kehidupan": {
    "kata-pengantar": {
      titleEn: "Foreword: On Coffee and Mindfulness",
      introEn: "An Opening Note",
      paragraphsEn: [
        "Every morning, millions of people brew coffee. But how many are truly present while it is being brewed?",
        "We often treat coffee merely as fuel for work, a quick caffeine boost before rushing into the relentless demands of the day. In doing so, we miss the quiet poetry occurring inside the dripper.",
        "This book is born from midnight quietness behind the coffee bar. It is a slow reflection that life, much like a good cup of coffee, requires patience, precise temperature, and the courage to embrace bitterness."
      ],
      quoteEn: "“Bitterness in coffee is not a flaw. It is the contrast that gives sweetness its true depth.”"
    },
    "pendahuluan": {
      titleEn: "Introduction: Brewing as a Philosophy of Life",
      paragraphsEn: [
        "When you pour hot water over freshly ground coffee beans, something magical happens. The coffee grounds bloom, releasing trapped carbon dioxide and unleashing hidden aromas.",
        "In coffee science, this stage is called the 'bloom'. In human life, we call it awakening.",
        "Before we can offer warmth to others, we must first allow ourselves to be bloomed by our experiences."
      ]
    },
    "bab-1": {
      titleEn: "Chapter 1: From Bean to Soul",
      paragraphsEn: [
        "Before a coffee bean reaches your cup, it undergoes a long, arduous journey. It grows on steep mountain slopes, weathered by rain, sun, and mountain winds.",
        "Then comes the roasting process—facing temperatures exceeding 200 degrees Celsius until its chemical structure transforms and it crackles under intense heat.",
        "Character is forged through heat. The trials we face in our working lives are our own roasting process, revealing the rich flavor hidden within us."
      ]
    },
    "bab-2": {
      titleEn: "Chapter 2: Water and Balance",
      paragraphsEn: [
        "Water makes up 98% of a brewed cup of coffee. No matter how exquisite the bean is, poor water quality will ruin the brew.",
        "In life, water represents our environment and daily habits. Surrounding ourselves with toxicity dulls our natural potential."
      ]
    },
    "bab-3": {
      titleEn: "Chapter 3: Temperature, Pressure, and Resilience",
      paragraphsEn: [
        "Water that is too cold fails to extract flavor. Water that is too hot burns the grounds and brings out harsh bitterness.",
        "Balance is key. Finding the right temperature means knowing when to push forward and when to rest."
      ]
    },
    "bab-4": {
      titleEn: "Chapter 4: Grind Size: On Details and Patience",
      paragraphsEn: [
        "Coarse grinds brew too quickly; fine grinds clog the filter. Paying attention to small details makes all the difference."
      ]
    },
    "bab-5": {
      titleEn: "Chapter 5: Brew Time and Patience",
      paragraphsEn: [
        "Good things take time. Rushing the pour over creates thin, acidic coffee. Patience yields richness."
      ]
    },
    "bab-6": {
      titleEn: "Chapter 6: Taste: Bitter, Sweet, and Balanced",
      paragraphsEn: [
        "A truly great cup is not purely sweet. It holds harmony between acidity, sweetness, and pleasant bitterness."
      ]
    },
    "bab-7": {
      titleEn: "Chapter 7: Coffee Ritual, Self Ritual",
      paragraphsEn: [
        "Taking ten minutes every morning to manually brew coffee is a act of reclaiming your own time."
      ]
    },
    "bab-8": {
      titleEn: "Chapter 8: The Art of Brewing Life",
      paragraphsEn: [
        "We are all baristas of our own destiny. We choose the ingredients, the pressure, and the time."
      ]
    },
    "bab-9": {
      titleEn: "Chapter 9: Coffee, Time, and Stillness",
      paragraphsEn: [
        "In the quiet hours after midnight, a warm cup reminds us that stillness is not wasted time."
      ]
    },
    "bab-10": {
      titleEn: "Chapter 10: Epilogue: Brewing with Soul",
      paragraphsEn: [
        "May every cup you hold remind you to live deliberately, slowly, and with deep intention."
      ]
    }
  },

  "cahaya-itu": {
    "pembuka": {
      titleEn: "Opening: Smell of Sweat",
      paragraphsEn: [
        "He came home at two in the morning. Not because of overtime, but because at home, no one was waiting.",
        "The night shift leaves a distinct scent on your jacket—a mix of cold espresso, steam, and silent exhaustion.",
        "Yet when the city sleeps, some lights stay lit, holding space for those who walk alone."
      ]
    },
    "01": {
      titleEn: "01: The Boy",
      paragraphsEn: [
        "He remembered the first time he held a portafilter. His hands trembled, not from cold, but from expectation."
      ]
    },
    "02": {
      titleEn: "02: The Charming One",
      paragraphsEn: [
        "Some customers leave memories like a warm lingering aftertaste long after they step out the glass door."
      ]
    },
    "03": {
      titleEn: "03: The Knife",
      paragraphsEn: [
        "Words spoken in fatigue can cut deeper than any sharp blade. Silence is often the safest shield."
      ]
    },
    "04": {
      titleEn: "04: That Night",
      paragraphsEn: [
        "Rain poured relentlessly over the asphalt. Inside the cafe, the grinder hummed its familiar lullaby."
      ]
    },
    "05": {
      titleEn: "05: The Lament",
      paragraphsEn: [
        "We mourn not the time we lost, but the version of ourselves we had to leave behind."
      ]
    },
    "penutup": {
      titleEn: "Closing: Do Not Become the Light",
      paragraphsEn: [
        "Do not burn yourself out just to illuminate others. Sometimes, simply being present in the dark is enough."
      ]
    }
  },

  "di-balik-bar": {
    "meja-kosong": {
      titleEn: "The Empty Table",
      paragraphsEn: [
        "A story about the favorite corner table left vacant, and the person who sat there every Thursday evening.",
        "Behind the bar, we are not just making drinks. We become quiet witnesses to human lives."
      ]
    }
  },

  "yang-tertinggal-di-lembah": {
    "prolog": {
      titleEn: "Prologue: The Deceptive Hill",
      paragraphsEn: [
        "We are always taught to climb. Since childhood, we are raised with myths about the summit: that happiness is the view from above, that success is the thinner air at high altitudes.",
        "But there is a quieter lie rarely spoken: that the bright hill is often lonely.",
        "This book is not about reaching the summit. It is about those who stay in the valley with you when everyone else ran toward the light."
      ]
    }
  }
};

export function getChapterTranslation(
  bookSlug: string,
  chapterId: string,
  lang: 'id' | 'en'
): BookChapterTranslation | null {
  if (lang !== 'en') return null;
  const bookDict = BOOK_TRANSLATIONS[bookSlug];
  if (!bookDict) return null;
  return bookDict[chapterId] || null;
}

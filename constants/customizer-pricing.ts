export const CUSTOMIZER_BASE_PRICE = 29.99;

export const CUSTOMIZER_PRICES = {
  weight: { "500g": 0, "1kg": 10, "2kg": 25, "3kg": 40 } as Record<string, number>,
  shape: { round: 0, square: 5, heart: 10, tiered: 30, sheet: 0 } as Record<string, number>,
  sponge: { vanilla: 0, chocolate: 0, "red-velvet": 3, lemon: 0, carrot: 2 } as Record<string, number>,
  cream: { buttercream: 0, "cream-cheese": 5, ganache: 8, whipped: 0, fondant: 12 } as Record<string, number>,
  filling: { "fruit-compote": 5, caramel: 3, "chocolate-mousse": 6, custard: 4, jam: 3 } as Record<string, number>,
  decoration: {
    "fresh-flowers": 15,
    piping: 5,
    sprinkles: 2,
    "edible-gold": 25,
    macarons: 12,
    "fresh-fruit": 10,
    "chocolate-shards": 8,
  } as Record<string, number>,
  colorTheme: {
    "pink-rose": 0,
    "midnight-blue": 0,
    "blush-pink": 0,
    "lavender-dream": 0,
    "gold-elegance": 5,
    "mint-fresh": 0,
    "classic-white": 0,
    rainbow: 8,
  } as Record<string, number>,
  cakeTopper: {
    "happy-birthday": 5,
    congrats: 5,
    "happy-anniversary": 5,
    "custom-text": 8,
    figurine: 12,
    "fresh-flowers": 10,
    none: 0,
  } as Record<string, number>,
  extras: {
    cakeMessage: 5,
    expressDelivery: 10,
  },
} as const;

export const FLAVOR_OPTIONS_CUSTOMIZER = [
  { label: "Chocolate", value: "chocolate", description: "Rich and indulgent" },
  { label: "Vanilla", value: "vanilla", description: "Classic and elegant" },
  { label: "Caramel", value: "caramel", description: "Sweet and buttery" },
  { label: "Fruity", value: "fruity", description: "Fresh and vibrant" },
] as const;

export const WEIGHT_OPTIONS_CUSTOMIZER = [
  { label: "500g", value: "500g", description: "Serves 4-6", price: 0 },
  { label: "1kg", value: "1kg", description: "Serves 8-10", price: 10 },
  { label: "2kg", value: "2kg", description: "Serves 14-18", price: 25 },
  { label: "3kg", value: "3kg", description: "Serves 20-25", price: 40 },
] as const;

export const SHAPE_OPTIONS = [
  { label: "Round", value: "round", description: "Classic circle", price: 0 },
  { label: "Square", value: "square", description: "Modern style", price: 5 },
  { label: "Heart", value: "heart", description: "Romantic shape", price: 10 },
  { label: "Tiered", value: "tiered", description: "Multi-layer", price: 30 },
  { label: "Sheet", value: "sheet", description: "Large servings", price: 0 },
] as const;

export const SPONGE_OPTIONS = [
  { label: "Classic Vanilla", value: "vanilla", description: "Light and fluffy", price: 0 },
  { label: "Rich Chocolate", value: "chocolate", description: "Deep cocoa flavor", price: 0 },
  { label: "Red Velvet", value: "red-velvet", description: "Velvety with cocoa", price: 3 },
  { label: "Lemon", value: "lemon", description: "Zesty and fresh", price: 0 },
  { label: "Carrot", value: "carrot", description: "Spiced with walnuts", price: 2 },
] as const;

export const CREAM_OPTIONS = [
  { label: "Buttercream", value: "buttercream", description: "Classic sweet", price: 0 },
  { label: "Cream Cheese", value: "cream-cheese", description: "Tangy and rich", price: 5 },
  { label: "Ganache", value: "ganache", description: "Silky chocolate", price: 8 },
  { label: "Whipped Cream", value: "whipped", description: "Light and airy", price: 0 },
  { label: "Fondant", value: "fondant", description: "Smooth finish", price: 12 },
] as const;

export const FILLING_OPTIONS = [
  { label: "Fruit Compote", value: "fruit-compote", description: "Mixed berries", price: 5 },
  { label: "Caramel", value: "caramel", description: "Smooth caramel", price: 3 },
  { label: "Chocolate Mousse", value: "chocolate-mousse", description: "Light and airy", price: 6 },
  { label: "Custard", value: "custard", description: "Vanilla custard", price: 4 },
  { label: "Jam", value: "jam", description: "Fruit preserves", price: 3 },
] as const;

export const DECORATION_OPTIONS = [
  { label: "Fresh Flowers", value: "fresh-flowers", description: "Real edible blooms", price: 15 },
  { label: "Piping", value: "piping", description: "Elegant piping details", price: 5 },
  { label: "Sprinkles", value: "sprinkles", description: "Colorful fun", price: 2 },
  { label: "Edible Gold Leaf", value: "edible-gold", description: "Luxurious finish", price: 25 },
  { label: "Macarons", value: "macarons", description: "French elegance", price: 12 },
  { label: "Fresh Fruit", value: "fresh-fruit", description: "Seasonal fruits", price: 10 },
  { label: "Chocolate Shards", value: "chocolate-shards", description: "Crisp chocolate", price: 8 },
] as const;

export const COLOR_THEME_OPTIONS = [
  { label: "Pink Rose", value: "pink-rose", color: "#FF69B4", price: 0 },
  { label: "Midnight Blue", value: "midnight-blue", color: "#191970", price: 0 },
  { label: "Blush Pink", value: "blush-pink", color: "#FFB6C1", price: 0 },
  { label: "Lavender Dream", value: "lavender-dream", color: "#B39DDB", price: 0 },
  { label: "Gold Elegance", value: "gold-elegance", color: "#D4AF37", price: 5 },
  { label: "Mint Fresh", value: "mint-fresh", color: "#98FF98", price: 0 },
  { label: "Classic White", value: "classic-white", color: "#FFFFFF", price: 0 },
  { label: "Rainbow", value: "rainbow", color: "url(#rainbow)", price: 8 },
] as const;

export const CAKE_TOPPER_OPTIONS = [
  { label: "Happy Birthday", value: "happy-birthday", description: "Classic text", price: 5 },
  { label: "Congratulations", value: "congrats", description: "Celebration text", price: 5 },
  { label: "Happy Anniversary", value: "happy-anniversary", description: "Romantic text", price: 5 },
  { label: "Custom Text", value: "custom-text", description: "Your own words", price: 8 },
  { label: "Figurine", value: "figurine", description: "Mini decoration", price: 12 },
  { label: "Fresh Flowers", value: "fresh-flowers", description: "Real blooms", price: 10 },
  { label: "No Topper", value: "none", description: "Skip this option", price: 0 },
] as const;

export const DELIVERY_TIMES_CUSTOMIZER = [
  { label: "Morning (9AM–12PM)", value: "morning" },
  { label: "Afternoon (12PM–3PM)", value: "afternoon" },
  { label: "Evening (3PM–6PM)", value: "evening" },
  { label: "Express (2–4 Hours)", value: "express" },
] as const;

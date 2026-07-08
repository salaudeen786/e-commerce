import type { NavLink, SavedAddress } from "@/types";

export const SITE_NAME = "Sweet Moments";
export const SITE_TAGLINE = "Premium Cakes • Coffee • Chocolates • Gifts";
export const SITE_DESCRIPTION =
  "Discover handcrafted premium cakes, artisanal chocolates, and curated gifts for every celebration. Sweet Moments makes every occasion special.";
export const SITE_URL = "https://sweetmoments.com";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const CATEGORY_SLUGS = [
  { label: "Cakes", slug: "cakes", image: "/images/category-cakes.jpg" },
  { label: "Coffee", slug: "coffee", image: "/images/category-coffee.jpg" },
  {
    label: "Chocolates",
    slug: "chocolates",
    image: "/images/category-chocolates.jpg",
  },
  { label: "Gifts", slug: "gifts", image: "/images/category-gifts.jpg" },
];

export const DEFAULT_PAGE_SIZE = 9;

export const PRICE_RANGES = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $75", min: 50, max: 75 },
  { label: "$75 - $100", min: 75, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
] as const;

export const RATING_OPTIONS = [
  { label: "4.5 & above", value: 4.5 },
  { label: "4.0 & above", value: 4.0 },
  { label: "3.5 & above", value: 3.5 },
  { label: "3.0 & above", value: 3.0 },
] as const;

export const FLAVOR_OPTIONS = [
  { label: "Chocolate", value: "chocolate" },
  { label: "Vanilla", value: "vanilla" },
  { label: "Caramel", value: "caramel" },
  { label: "Fruity", value: "fruity" },
] as const;

export const OCCASION_OPTIONS = [
  { label: "Birthday", value: "birthday" },
  { label: "Anniversary", value: "anniversary" },
  { label: "Celebration", value: "celebration" },
  { label: "Congratulations", value: "congratulations" },
] as const;

export const WEIGHT_OPTIONS = [
  { label: "500g", value: "500g" },
  { label: "1kg", value: "1kg" },
  { label: "2kg", value: "2kg" },
  { label: "1L", value: "1l" },
] as const;

export const TAX_RATE = 0.08;

export const MOCK_ORDER_PREFIX = "SM-";

export const US_STATES = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export const SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "Sarah",
    lastName: "Johnson",
    address: "123 Maple Street",
    apartment: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "(212) 555-0147",
  },
  {
    id: "addr-2",
    label: "Work",
    firstName: "Sarah",
    lastName: "Johnson",
    address: "456 Park Avenue",
    apartment: "Suite 200",
    city: "New York",
    state: "NY",
    zip: "10022",
    phone: "(212) 555-0147",
  },
  {
    id: "addr-3",
    label: "Parents",
    firstName: "Sarah",
    lastName: "Johnson",
    address: "789 Oak Lane",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    phone: "(212) 555-0147",
  },
];

export const DASHBOARD_NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/dashboard/profile" },
  { label: "Addresses", href: "/dashboard/addresses" },
  { label: "Wishlist", href: "/dashboard/wishlist" },
  { label: "Orders", href: "/dashboard/orders" },
  { label: "Notifications", href: "/dashboard/notifications" },
  { label: "Coupons", href: "/dashboard/coupons" },
  { label: "Reward Points", href: "/dashboard/rewards" },
  { label: "Reviews", href: "/dashboard/reviews" },
  { label: "Settings", href: "/dashboard/settings" },
  { label: "Security", href: "/dashboard/security" },
  { label: "Change Password", href: "/dashboard/change-password" },
  { label: "Support", href: "/dashboard/support" },
];

export const REWARD_TIERS: { name: string; minPoints: number; multiplier: number; color: string }[] = [
  { name: "Bronze", minPoints: 0, multiplier: 1, color: "#CD7F32" },
  { name: "Silver", minPoints: 500, multiplier: 1.25, color: "#C0C0C0" },
  { name: "Gold", minPoints: 1500, multiplier: 1.5, color: "#FFD700" },
  { name: "Platinum", minPoints: 3000, multiplier: 2, color: "#E5E4E2" },
];

export const ORDER_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export const DIETARY_OPTIONS = [
  { label: "Gluten-Free", value: "gluten-free" },
  { label: "Vegan", value: "vegan" },
  { label: "Nut-Free", value: "nut-free" },
] as const;

export const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
] as const;

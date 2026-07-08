export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: Category;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  flavor?: string;
  occasion?: string;
  weight?: string;
  dietaryInfo?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  content: string;
  date: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  image: string;
  validUntil: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  caption: string;
}

export interface CartItemCustomizations {
  flavor?: string;
  weight?: string;
  cakeMessage?: string;
  customImage?: string;
  deliveryDate?: string;
  deliveryTime?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: CartItemCustomizations;
  itemId: string;
}

export interface ReviewFormData {
  author: string;
  rating: number;
  content: string;
}

export interface CakeCustomizerData {
  flavor: string;
  weight: string;
  shape: string;
  sponge: string;
  cream: string;
  filling: string;
  decoration: string;
  colorTheme: string;
  cakeTopper: string;
  referenceImage?: string;
  cakeMessage?: string;
  deliveryDate: string;
  deliveryTime: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export type SortOption =
  | "popular"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "name-asc"
  | "name-desc";

export type ViewMode = "grid" | "list";

export interface GiftWrapInfo {
  enabled: boolean;
  message?: string;
  price: number;
}

export interface AppliedCoupon {
  code: string;
  discountPercent: number;
  type: "percentage" | "fixed";
  minOrder?: number;
}

export interface ShippingOption {
  method: string;
  label: string;
  cost: number;
  estimatedDays: string;
}

export interface SavedItem {
  id: string;
  product: Product;
  addedAt: string;
}

export type PaymentMethod = "credit-card" | "paypal" | "stripe";

export interface SavedAddress {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  savedAddressId?: string;
  deliveryDate: string;
  deliveryTime: string;
  orderNotes?: string;
  isGift: boolean;
  giftMessage?: string;
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  cardName?: string;
  acceptedTerms: boolean;
}

export type OrderStatus = "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  dateJoined: string;
  bio: string;
}

export interface DashboardOrder {
  id: string;
  date: string;
  status: OrderStatus;
  items: { productId: string; productName: string; productImage: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: SavedAddress;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface DashboardNotification {
  id: string;
  type: "order" | "promo" | "system" | "reward";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface RewardTransaction {
  id: string;
  points: number;
  type: "earned" | "spent";
  description: string;
  date: string;
  balance: number;
}

export interface UserCoupon {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validUntil: string;
  usedAt?: string;
  isExpired: boolean;
}

export interface UserReview {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  content: string;
  date: string;
  isVerified: boolean;
}

export interface DashboardStat {
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
}

export interface RewardTier {
  name: string;
  minPoints: number;
  multiplier: number;
  color: string;
}

export interface LoginSession {
  id: string;
  date: string;
  device: string;
  browser: string;
  location: string;
  isCurrent: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface CompanyStat {
  value: number;
  suffix: string;
  label: string;
}

export interface CompanyValue {
  icon: string;
  title: string;
  description: string;
}

export interface ShopFilters {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
  flavors: string[];
  occasions: string[];
  weights: string[];
  inStock: boolean | null;
  dietary: string[];
  search: string;
  sort: SortOption;
  page: number;
}

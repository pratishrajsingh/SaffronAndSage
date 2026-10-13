export const RESTAURANT = {
  name: "Saffron & Sage",
  phone: "+977 1-4567890",
  email: "hello@saffronandsage.com",
  address: "42 Lakeside Road, Pokhara, Nepal",
};

export const POPULAR_CATEGORIES = ["Chicken", "Seafood", "Vegetarian", "Pasta", "Beef", "Dessert"];

export const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

export const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

export const OCCASIONS = ["None", "Birthday", "Anniversary", "Business", "Date Night", "Family Gathering"];

export const STATS = [
  { value: "12+", label: "Years of service" },
  { value: "150+", label: "Dishes on the menu" },
  { value: "4.8", label: "Average guest rating" },
  { value: "25k", label: "Happy guests a year" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Anisha Sharma",
    role: "Food blogger",
    quote: "The tasting menu was a journey. Every course surprised me, and the staff remembered my spice preference without me asking twice.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohan Thapa",
    role: "Catering client",
    quote: "They catered our office launch for 200 people. Food was hot, service was flawless and the live pasta counter was the highlight.",
    rating: 5,
  },
  {
    id: 3,
    name: "Meera Joshi",
    role: "Regular guest",
    quote: "My go-to for Friday dinners. Delivery is always on time and the packaging keeps everything as good as dining in.",
    rating: 4,
  },
];

export const TEAM = [
  { id: 1, name: "Arjun Malla", role: "Head Chef", bio: "Trained in Lyon and Delhi, Arjun blends French technique with Himalayan flavours." },
  { id: 2, name: "Sita Gurung", role: "Pastry Chef", bio: "Sita runs our pastry kitchen and is the reason the dessert menu changes every month." },
  { id: 3, name: "Daniel Rai", role: "Sommelier", bio: "Daniel curates our wine and mocktail list with pairings for every dish." },
  { id: 4, name: "Priya Karki", role: "Restaurant Manager", bio: "Priya makes sure every guest leaves happier than they arrived." },
];

export const VALUES = [
  { icon: "leaf", title: "Fresh & local", text: "Vegetables and dairy come from farms within 50 km, delivered every morning." },
  { icon: "heart", title: "Made with care", text: "No shortcuts: sauces, breads and desserts are made from scratch in-house." },
  { icon: "users", title: "Guests first", text: "Every dietary need is welcome. Tell us once and we remember." },
  { icon: "globe", title: "Global kitchen", text: "Recipes from 25+ countries, cooked by chefs who grew up with them." },
];

export const TIMELINE = [
  { year: "2014", title: "A 20-seat beginning", text: "Saffron & Sage opened as a small family kitchen by the lake." },
  { year: "2017", title: "The new dining room", text: "We moved to our current 120-seat home with an open kitchen." },
  { year: "2020", title: "Delivery launched", text: "Our own delivery fleet started bringing the menu to homes across the city." },
  { year: "2023", title: "Best Restaurant award", text: "Voted city's Best Multi-Cuisine Restaurant by readers of Taste Magazine." },
  { year: "2026", title: "Catering & private dining", text: "Opened two private rooms and a full-service catering division." },
];

export const OPENING_HOURS = [
  { day: "Monday - Thursday", hours: "12:00 PM - 10:00 PM" },
  { day: "Friday - Saturday", hours: "12:00 PM - 11:30 PM" },
  { day: "Sunday", hours: "10:00 AM - 10:00 PM (Brunch till 3 PM)" },
];

export const FAQS = [
  {
    question: "Do I need a reservation?",
    answer: "Walk-ins are welcome, but we recommend booking for Friday and Saturday evenings and for groups larger than six.",
  },
  {
    question: "Do you cater for allergies and dietary needs?",
    answer: "Yes. Our menu marks vegetarian and vegan dishes, and the kitchen can adapt most dishes for gluten, nut or dairy allergies. Mention it in your booking.",
  },
  {
    question: "How far do you deliver?",
    answer: "We deliver within 8 km of the restaurant. Delivery is free on orders above Rs. 1,500.",
  },
  {
    question: "Can I modify or cancel a reservation?",
    answer: "Yes, from the Reservations page you can edit, cancel or delete any booking at any time.",
  },
];

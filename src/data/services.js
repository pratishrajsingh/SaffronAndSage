const services = [
  {
    slug: "dine-in",
    title: "Dine-In Experience",
    icon: "utensils",
    tagline: "Candle-lit tables, open kitchen, unhurried evenings.",
    summary:
      "Enjoy our seasonal menu in a warm, 120-seat dining room with an open kitchen, a sunlit terrace and a dedicated sommelier.",
    description:
      "Our dining room was designed for long conversations. Choose a quiet corner booth, a seat at the chef's counter to watch the kitchen at work, or a table on the garden terrace. Every dish is plated to order and our servers are happy to guide you through pairings, spice levels and dietary needs.",
    features: [
      "Open kitchen with chef's counter seating",
      "Garden terrace for up to 40 guests",
      "Vegetarian, vegan and gluten-free menus",
      "Curated wine and mocktail pairings",
      "Kids' menu and high chairs available",
      "Free valet parking on weekends",
    ],
    packages: [
      { name: "Lunch Set", price: 650, details: "Starter, main course and a soft drink. Weekdays 12-3 PM." },
      { name: "Chef's Tasting", price: 2400, details: "Seven courses chosen daily by our head chef." },
      { name: "Weekend Brunch", price: 1200, details: "Unlimited brunch buffet with live egg and dosa stations." },
    ],
    cta: { label: "Reserve a Table", to: "/reservations" },
  },
  {
    slug: "catering",
    title: "Event Catering",
    icon: "briefcase",
    tagline: "Restaurant-quality food at your venue.",
    summary:
      "From office lunches to weddings of 500, our catering team plans the menu, brings the staff and handles the clean-up.",
    description:
      "Our catering team has served corporate launches, birthday parties, festivals and weddings across the city. We design a menu around your guests, bring our own equipment and service staff, and keep live counters running so food is always fresh and hot.",
    features: [
      "Custom menus planned with our head chef",
      "Live counters: grill, pasta, chaat and desserts",
      "Professional service staff and setup",
      "Eco-friendly disposables on request",
      "Tasting session before large events",
      "Serving 20 to 500+ guests",
    ],
    packages: [
      { name: "Office Lunch", price: 450, details: "Per person. Two mains, rice, bread, salad and dessert." },
      { name: "Party Classic", price: 900, details: "Per person. Starters, three mains, live counter and dessert bar." },
      { name: "Wedding Premium", price: 1800, details: "Per person. Full multi-cuisine spread with dedicated event manager." },
    ],
    cta: { label: "Request a Quote", to: "/contact?subject=Event Catering Enquiry" },
  },
  {
    slug: "home-delivery",
    title: "Home Delivery",
    icon: "truck",
    tagline: "Hot, sealed and at your door in 40 minutes.",
    summary:
      "Order any dish from our menu online and get it delivered in insulated, tamper-proof packaging within 8 km.",
    description:
      "Browse the full menu, add dishes to your cart and check out in under a minute. Our own delivery riders carry insulated bags so curries stay hot and desserts stay chilled. Track your order from your profile page and pay online or with cash on delivery.",
    features: [
      "Full menu available for delivery",
      "Average delivery time of 40 minutes",
      "Free delivery on orders above Rs. 1,500",
      "Tamper-proof, recyclable packaging",
      "Cash on delivery or online payment",
      "Order history saved in your profile",
    ],
    packages: [
      { name: "Standard", price: 99, details: "Delivery fee for orders below Rs. 1,500 within 8 km." },
      { name: "Free Delivery", price: 0, details: "On every order of Rs. 1,500 or more." },
      { name: "Self Pickup", price: 0, details: "Collect from the restaurant counter. Ready in 20 minutes." },
    ],
    cta: { label: "Order from Menu", to: "/menu" },
  },
  {
    slug: "private-dining",
    title: "Private Dining",
    icon: "star",
    tagline: "A room of your own for the moments that matter.",
    summary:
      "Two private rooms for 10 to 30 guests, ideal for anniversaries, business dinners and family celebrations.",
    description:
      "The Saffron Room seats 12 around a single long table and the Sage Hall seats up to 30. Both come with a dedicated server, a personalised printed menu, AV equipment for presentations and optional decor packages for birthdays and anniversaries.",
    features: [
      "Two private rooms for 10-30 guests",
      "Dedicated server and personalised menu",
      "Projector, screen and sound system",
      "Birthday and anniversary decor packages",
      "Custom cakes from our pastry kitchen",
      "Flexible timings, including late nights",
    ],
    packages: [
      { name: "Saffron Room", price: 15000, details: "Room fee for up to 12 guests, 3 hours. Food billed separately." },
      { name: "Sage Hall", price: 30000, details: "Room fee for up to 30 guests, 4 hours. Food billed separately." },
      { name: "Celebration Add-on", price: 5000, details: "Decor, custom cake and a photo corner." },
    ],
    cta: { label: "Enquire Now", to: "/contact?subject=Private Dining Enquiry" },
  },
];

export default services;

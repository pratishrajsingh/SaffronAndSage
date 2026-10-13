# Saffron & Sage – Restaurant Web App

Final project for the React training session (Task 15). A complete, responsive restaurant
frontend where guests can browse a live menu, order food, book tables, explore services and
manage their profile.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run lint
```

Menu data comes from the free [TheMealDB API](https://www.themealdb.com/api.php) (no key needed).
Prices and ratings are derived from each dish id, so they stay stable between visits.

## Pages & routes

| Menu | Route | What it shows |
| --- | --- | --- |
| Home | `/` | Hero, stats, chef's specials (API), categories (API), services, testimonials |
| Menu | `/menu` | **Nested:** categories, category dishes, search, dish details |
| | `/menu/category/:categoryName` | Dishes in a category, with filter & sort in the URL |
| | `/menu/search?q=` | Search results from the API |
| | `/menu/dish/:dishId` | Dish details, ingredients, recipe steps, related dishes |
| Services | `/services` | **Nested:** overview + one page per service |
| | `/services/:serviceSlug` | Dine-in, Catering, Home Delivery, Private Dining |
| Reservations | `/reservations` | Booking form + list with Create / Read / Update / Delete |
| About | `/about` | Story, values, timeline, team |
| Contact | `/contact` | Validated contact form, opening hours, FAQ accordion |
| Cart | `/cart` | Cart management and validated checkout |
| Profile | `/profile?tab=` | Editable profile, orders, favourites, bookings, settings |
| 404 | `*` | Not-found page |

## Where each session topic is used

| Topic | Where |
| --- | --- |
| Components & Props | `src/components/*` – `DishCard`, `FormField`, `PageHeader`, `ReservationCard`, ... |
| useState | Everywhere – e.g. navbar toggle, quantity, FAQ accordion, checkout step |
| useEffect | `useFetch` (API + abort), `useLocalStorage`, `ThemeProvider`, `ScrollToTop`, auto-hide notice in `Reservations` |
| useRef | Menu search input (`MenuLayout`), focus first invalid field (all forms), "Added" timer (`DishCard`), scroll to edit form (`Reservations`) |
| useContext | `ThemeContext`, `UserContext`, `CartContext` via `hooks/useAppContext.js` |
| useReducer | Cart state – `reducers/cartReducer.js` used in `CartProvider` |
| Redux Toolkit | `redux/` – reservations (CRUD), orders, favourites; persisted to localStorage |
| Conditional rendering | Loading / error / empty states, edit vs create mode, delivery-only address field, order confirmation |
| List rendering | Dishes, categories, services, reservations, cart items, ingredients, team, timeline |
| API integration | `services/api.js` (axios) + `hooks/useFetch.js` |
| Custom hooks | `useFetch`, `useForm`, `useLocalStorage`, `useDocumentTitle`, `useTheme` / `useUser` / `useCart` |
| Routing & Nested routing | `App.jsx` with `MainLayout`, `MenuLayout`, `ServicesLayout` and `<Outlet />` |
| useParams | `CategoryDishes`, `DishDetails`, `ServiceDetail` |
| useSearchParams | Menu search `?q=`, category `?filter=&sort=`, reservations `?status=`, profile `?tab=`, contact `?subject=` |
| CRUD | Reservations page: create, list/filter, edit, cancel, delete |
| Form validation | `hooks/useForm.js` + `utils/validators.js` – reservations, checkout, contact, profile, newsletter |
| Responsive UI | Mobile nav, fluid grids, stacked layouts under 960px / 560px, light & dark themes |

## Folder structure

```
src/
├── components/   Reusable UI pieces
├── context/      Theme, User and Cart providers
├── data/         Static content (services, team, FAQs...)
├── hooks/        Custom hooks
├── layouts/      Main, Menu and Services layouts (nested routes)
├── pages/        Route pages (menu/ and services/ hold nested pages)
├── redux/        Store and slices
├── reducers/     useReducer logic for the cart
├── services/     Axios instance and API endpoints
├── styles/       base, components and pages CSS
└── utils/        Formatting, validation and menu helpers
```

import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";
import MenuLayout from "./layouts/MenuLayout.jsx";
import ServicesLayout from "./layouts/ServicesLayout.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Categories from "./pages/menu/Categories.jsx";
import CategoryDishes from "./pages/menu/CategoryDishes.jsx";
import SearchResults from "./pages/menu/SearchResults.jsx";
import DishDetails from "./pages/menu/DishDetails.jsx";
import ServicesOverview from "./pages/services/ServicesOverview.jsx";
import ServiceDetail from "./pages/services/ServiceDetail.jsx";
import Reservations from "./pages/Reservations.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        {/* Menu nested routes */}
        <Route path="menu" element={<MenuLayout />}>
          <Route index element={<Categories />} />
          <Route path="category/:categoryName" element={<CategoryDishes />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="dish/:dishId" element={<DishDetails />} />
        </Route>

        {/* Services nested routes */}
        <Route path="services" element={<ServicesLayout />}>
          <Route index element={<ServicesOverview />} />
          <Route path=":serviceSlug" element={<ServiceDetail />} />
        </Route>

        <Route path="reservations" element={<Reservations />} />
        <Route path="cart" element={<Cart />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

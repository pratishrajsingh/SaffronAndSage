import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import DishCard from "../components/DishCard.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import StarRating from "../components/StarRating.jsx";
import { SkeletonGrid, ErrorMessage } from "../components/Feedback.jsx";
import useFetch from "../hooks/useFetch.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { useUser } from "../hooks/useAppContext.js";
import { ENDPOINTS } from "../services/api.js";
import { toDish } from "../utils/menu.js";
import services from "../data/services.js";
import { STATS, TESTIMONIALS } from "../data/siteData.js";

function Home() {
  useDocumentTitle("Global Kitchen & Dining");
  const { user } = useUser();

  const specials = useFetch(ENDPOINTS.byCategory("Chicken"));
  const categories = useFetch(ENDPOINTS.categories);

  const dishes = (specials.data?.meals || [])
    .slice(0, 8)
    .map((meal) => ({ ...toDish(meal), category: "Chicken" }));
  const heroImages = dishes.slice(0, 3);
  const isGuest = user.name === "Guest Diner";

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              {isGuest ? "Fine dining · Global kitchen" : `Welcome back, ${user.name.split(" ")[0]}`}
            </p>
            <h1>
              Flavours from around the world, <span className="text-accent">served with love.</span>
            </h1>
            <p className="hero-sub">
              Seasonal menus, a lakeside dining room and a kitchen that cooks every dish from
              scratch. Dine in, order home or let us cater your next celebration.
            </p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary btn-lg">
                Explore Menu <Icon name="arrowRight" size={18} />
              </Link>
              <Link to="/reservations" className="btn btn-outline btn-lg">
                <Icon name="calendar" size={18} /> Book a Table
              </Link>
            </div>
            <ul className="hero-points">
              <li><Icon name="check" size={16} /> Open daily, 12 PM - 11 PM</li>
              <li><Icon name="check" size={16} /> Free delivery over Rs. 1,500</li>
            </ul>
          </div>

          <div className="hero-collage" aria-hidden="true">
            {heroImages.length > 0
              ? heroImages.map((dish, index) => (
                  <img key={dish.id} src={dish.image} alt="" className={`collage-${index}`} />
                ))
              : [0, 1, 2].map((index) => (
                  <div key={index} className={`skeleton collage-${index}`} />
                ))}
            <div className="hero-badge">
              <Icon name="star" size={18} filled />
              <div>
                <strong>4.8 / 5</strong>
                <span>2,400+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container">
        <div className="stats-strip">
          {STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Chef's specials (API) */}
      <section className="section container">
        <SectionTitle
          eyebrow="Chef's specials"
          title="This week's favourites"
          subtitle="Grills, curries and roasts: the chicken dishes our guests order most."
          align="left"
        >
          <Link to="/menu" className="link-arrow">
            View full menu <Icon name="arrowRight" size={16} />
          </Link>
        </SectionTitle>

        {specials.loading && <SkeletonGrid count={4} />}
        {specials.error && <ErrorMessage message={specials.error} onRetry={specials.refetch} />}
        {!specials.loading && !specials.error && (
          <div className="card-grid">
            {dishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </section>

      {/* Categories (API) */}
      <section className="section section-tinted">
        <div className="container">
          <SectionTitle
            eyebrow="Browse"
            title="Explore by category"
            subtitle="From comforting pastas to delicate seafood, pick a mood and start exploring."
          />

          {categories.loading && <SkeletonGrid count={6} />}
          {categories.error && (
            <ErrorMessage message={categories.error} onRetry={categories.refetch} />
          )}
          {categories.data && (
            <div className="category-grid">
              {categories.data.categories.slice(0, 6).map((category) => (
                <CategoryCard
                  key={category.idCategory}
                  name={category.strCategory}
                  image={category.strCategoryThumb}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services */}
      <section className="section container">
        <SectionTitle
          eyebrow="What we offer"
          title="Ways to enjoy Saffron & Sage"
          subtitle="Whether it's a quiet dinner for two or a wedding for five hundred."
        />
        <div className="service-grid">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-tinted">
        <div className="container">
          <SectionTitle eyebrow="Testimonials" title="What our guests say" />
          <div className="testimonial-grid">
            {TESTIMONIALS.map((item) => (
              <figure className="testimonial" key={item.id}>
                <StarRating value={item.rating} />
                <blockquote>“{item.quote}”</blockquote>
                <figcaption>
                  <strong>{item.name}</strong>
                  <span className="muted">{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section container">
        <div className="cta-banner">
          <div>
            <h2>Planning a special evening?</h2>
            <p>Reserve your table in under a minute. Tell us the occasion and we'll handle the rest.</p>
          </div>
          <Link to="/reservations" className="btn btn-light btn-lg">
            Reserve now <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;

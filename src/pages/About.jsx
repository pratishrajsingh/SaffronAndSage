import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Icon from "../components/Icon.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { getInitials } from "../utils/format.js";
import { STATS, TEAM, TIMELINE, VALUES } from "../data/siteData.js";

const AVATAR_COLORS = ["#d9731a", "#2f5d46", "#8a4fb8", "#c0504d"];

function About() {
  useDocumentTitle("About Us");

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A family kitchen that grew up"
        subtitle="Twelve years, one simple idea: cook honest food from around the world and serve it like family."
        crumbs={[{ label: "About" }]}
      />

      <section className="section-sm container about-story">
        <div>
          <SectionTitle eyebrow="Our story" title="From 20 seats to the city's favourite table" align="left" />
          <p>
            Saffron &amp; Sage began in 2014 as a 20-seat kitchen run by the Malla family, cooking
            the dishes they loved from their travels: Thai curries, Italian pastas, Moroccan tagines
            and the dal bhat they grew up with.
          </p>
          <p>
            Word spread, the queues grew longer, and today we welcome over 25,000 guests a year to our
            lakeside dining room. The recipes have travelled further, but the rule hasn't changed:
            everything is cooked from scratch, with ingredients we'd serve our own family.
          </p>
          <Link to="/menu" className="btn btn-primary">
            Taste the menu <Icon name="arrowRight" size={18} />
          </Link>
        </div>

        <div className="about-quote">
          <blockquote>
            “Good food is a conversation between the farmer, the cook and the guest. We just try to
            keep it going.”
          </blockquote>
          <p>Arjun Malla, Head Chef &amp; Founder</p>
          <div className="about-stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <SectionTitle eyebrow="What we believe" title="Our values" />
          <div className="value-grid">
            {VALUES.map((value) => (
              <div className="card value-card" key={value.title}>
                <span className="service-icon"><Icon name={value.icon} size={22} /></span>
                <h3>{value.title}</h3>
                <p className="muted">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionTitle eyebrow="Our journey" title="Milestones along the way" />
        <ol className="timeline">
          {TIMELINE.map((item) => (
            <li key={item.year}>
              <span className="timeline-year">{item.year}</span>
              <div className="timeline-body">
                <h3>{item.title}</h3>
                <p className="muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-tinted">
        <div className="container">
          <SectionTitle eyebrow="The team" title="The people behind your plate" />
          <div className="team-grid">
            {TEAM.map((member, index) => (
              <div className="card team-card" key={member.id}>
                <span className="team-avatar" style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}>
                  {getInitials(member.name)}
                </span>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="muted">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

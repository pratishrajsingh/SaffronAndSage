import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import FormField from "../components/FormField.jsx";
import Icon from "../components/Icon.jsx";
import useForm from "../hooks/useForm.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { useUser } from "../hooks/useAppContext.js";
import { validateContact } from "../utils/validators.js";
import { RESTAURANT, OPENING_HOURS, FAQS } from "../data/siteData.js";

const CONTACT_CARDS = [
  { icon: "phone", title: "Call us", value: RESTAURANT.phone, note: "Daily, 10 AM - 10 PM" },
  { icon: "mail", title: "Email", value: RESTAURANT.email, note: "We reply within 24 hours" },
  { icon: "map", title: "Visit", value: RESTAURANT.address, note: "Free parking on weekends" },
];

function Contact() {
  useDocumentTitle("Contact");
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const formRef = useRef(null);

  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(0);

  // ?subject=... is set by service pages ("Request a Quote" etc.)
  const { values, field, handleSubmit, reset } = useForm(
    {
      name: user.name === "Guest Diner" ? "" : user.name,
      email: user.email,
      phone: user.phone,
      subject: searchParams.get("subject") || "",
      message: "",
    },
    validateContact
  );

  const onSubmit = () => {
    setStatus("sending");
    // Simulated network request
    setTimeout(() => setStatus("sent"), 900);
  };

  const onError = (errors) => {
    formRef.current.querySelector(`[name="${Object.keys(errors)[0]}"]`)?.focus();
  };

  const sendAnother = () => {
    reset({ ...values, subject: "", message: "" });
    setStatus("idle");
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you"
        subtitle="Questions, feedback, catering enquiries or just a hello. Our team answers every message."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="container section-sm">
        <div className="contact-cards">
          {CONTACT_CARDS.map((card) => (
            <div className="card contact-card" key={card.title}>
              <span className="service-icon"><Icon name={card.icon} size={22} /></span>
              <div>
                <h3>{card.title}</h3>
                <p>{card.value}</p>
                <span className="muted small">{card.note}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-layout">
          <section className="card form-card" ref={formRef}>
            {status === "sent" ? (
              <div className="confirmation compact">
                <span className="confirmation-icon"><Icon name="check" size={30} /></span>
                <h2>Message sent!</h2>
                <p className="muted">
                  Thanks {values.name.split(" ")[0]}, we've received your message about
                  “{values.subject}” and will reply to {values.email} soon.
                </p>
                <button className="btn btn-outline" onClick={sendAnother}>Send another message</button>
              </div>
            ) : (
              <>
                <h2>Send us a message</h2>
                <form onSubmit={(e) => handleSubmit(e, onSubmit, onError)} noValidate>
                  <div className="form-row">
                    <FormField label="Full name" placeholder="Jane Doe" {...field("name")} />
                    <FormField label="Email" type="email" placeholder="jane@example.com" {...field("email")} />
                  </div>
                  <div className="form-row">
                    <FormField label="Phone (optional)" type="tel" inputMode="numeric" maxLength={10} placeholder="98XXXXXXXX" {...field("phone")} />
                    <FormField label="Subject" placeholder="What is this about?" {...field("subject")} />
                  </div>
                  <FormField
                    label="Message"
                    as="textarea"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    hint={`${values.message.trim().length} characters (minimum 20)`}
                    {...field("message")}
                  />
                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <><span className="spinner small" /> Sending...</>
                    ) : (
                      <><Icon name="mail" size={18} /> Send message</>
                    )}
                  </button>
                </form>
              </>
            )}
          </section>

          <aside className="contact-side">
            <div className="card">
              <h3><Icon name="clock" size={18} /> Opening hours</h3>
              <ul className="hours-list">
                {OPENING_HOURS.map((slot) => (
                  <li key={slot.day}>
                    <span>{slot.day}</span>
                    <strong>{slot.hours}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3>Frequently asked</h3>
              <div className="faq">
                {FAQS.map((faq, index) => (
                  <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={faq.question}>
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                    >
                      {faq.question}
                      <Icon name="chevronDown" size={18} />
                    </button>
                    {openFaq === index && <p className="muted">{faq.answer}</p>}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default Contact;

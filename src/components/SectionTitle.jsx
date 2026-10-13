function SectionTitle({ eyebrow, title, subtitle, align = "center", children }) {
  return (
    <div className={`section-title align-${align}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default SectionTitle;

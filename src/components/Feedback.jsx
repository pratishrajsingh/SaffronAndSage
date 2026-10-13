import Icon from "./Icon.jsx";

// Loading, error and empty states shared by every page

export function Loader({ text = "Loading..." }) {
  return (
    <div className="loader" role="status">
      <span className="spinner" />
      <span>{text}</span>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="card-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton-img" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
        </div>
      ))}
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-box state-error" role="alert">
      <Icon name="alert" size={32} />
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = "search", title, text, children }) {
  return (
    <div className="state-box">
      <span className="state-icon">
        <Icon name={icon} size={28} />
      </span>
      <h3>{title}</h3>
      {text && <p className="muted">{text}</p>}
      {children}
    </div>
  );
}

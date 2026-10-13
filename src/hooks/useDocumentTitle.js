import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Saffron & Sage` : "Saffron & Sage";
  }, [title]);
}

export default useDocumentTitle;

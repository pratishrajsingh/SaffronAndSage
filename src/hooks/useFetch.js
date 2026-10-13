import { useState, useEffect, useCallback } from "react";
import api from "../services/api.js";

// Fetches `url` from the menu API. Pass null to skip fetching.
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(url, { signal: controller.signal });

        setData(response.data);
      } catch (err) {
        if (err.name === "CanceledError") return;
        console.error(err);
        setError("We couldn't load this right now. Please check your connection and try again.");
        setData(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchData();

    // Cancel the request if the url changes or the component unmounts
    return () => controller.abort();
  }, [url, reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { data, loading, error, refetch };
}

export default useFetch;

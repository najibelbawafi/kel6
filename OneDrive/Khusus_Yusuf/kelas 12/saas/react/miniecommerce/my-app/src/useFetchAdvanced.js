import { useState, useEffect } from "react";

export default function useFetchAdvanced(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        setLoading(true);
        setError(null);

        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error(`Error: ${response.status}`);
                return response.json();
            })
            .then((json) => setData(json))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [url]);

    return { data, loading, error };
}
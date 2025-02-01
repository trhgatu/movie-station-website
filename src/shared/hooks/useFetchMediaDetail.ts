import { useState, useEffect } from "react";

export function useFetchMediaDetail(id: string, fetchDetail: Function) {
  const [media, setMedia] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDetail(id);
        setMedia(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (id) fetchData();
  }, [id, fetchDetail]);

  return { media, isLoading, error };
}

import { useEffect, useState } from "react";

export const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetchFn();
      setData(res);
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("An error occured while fetching.")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

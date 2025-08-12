import { useState, useEffect } from 'react';

const KEY = '76d1ca77';

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('Failed to fetch movies');
        const data = await res.json();
        if (data.Response === 'False')
          throw new Error(
            `No movie with the name "${query}" found, please try another movie name!`
          );
        setMovies(data.Search || []);
        setError('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching movies:', error);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setError('');
      setMovies([]);
      return;
    }
    // handleCloseMovie();
    fetchMovies();
    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
}

import { useEffect, useRef, useState } from 'react';
import StarRating from './StarRatig';

const average = (arr) =>
  Math.round(
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0) * 100
  ) / 100;

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === 'Enter') {
        inputEl.current.focus();
        setQuery('');
      }
    };
    document.addEventListener('keydown', callback);
    console.log(inputEl.current);
    return () => document.removeEventListener('keydown', callback);
  }, [setQuery]);

  /*  useEffect(() => {
    const el = document.querySelector('.search');
    console.log(el);
    el.focus();
  }, []); */

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function NavBar({ children }) {
  return <nav className='nav-bar'>{children}</nav>;
}

function Main({ children }) {
  return (
    <main className='main'>
      {children}
      {/* <ListBox movies={movies} />
      <WatchedBox /> */}
    </main>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={() => {
            onDeleteWatched(movie.imdbID);
          }}
          className='btn-delete'
        >
          X
        </button>
      </div>
    </li>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSetSelectMovie }) {
  return (
    <li onClick={() => onSetSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, onSetSelectMovie }) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSetSelectMovie={onSetSelectMovie}
        />
      ))}
    </ul>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

const KEY = '76d1ca77';

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState(
  //   JSON.parse(localStorage.getItem('movies')) || []
  // );
  const [watched, setWatched] = useState(() => {
    return JSON.parse(localStorage.getItem('movies')) || [];
  });
  // const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleSetectMovie(newId) {
    setSelectedId((prev) => (newId === prev ? null : newId));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((prev) => {
      const watched = [...prev, movie];
      // localStorage.setItem('movies', JSON.stringify(watched));
      return watched;
    });
  }

  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((el) => el.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(watched));
  }, [watched]);

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
    handleCloseMovie();
    fetchMovies();
    return () => controller.abort();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSetSelectMovie={handleSetectMovie} />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
        {/* <WatchedBox /> */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className='loader'>LOADING...</p>;
}

function ErrorMessage({ children }) {
  return <p className='error'>{children}</p>;
}

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current += 1;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  // const isTop = imdbRating > 8;
  // console.log(isTop);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  /* eslint-disable */
  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);
  // const isTop = imdbRating > 8;
  // console.log(isTop);

  // const [averageRating, setAverageRating] = useState(0);

  function handleAdd() {
    if (isWatched) return;
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();

    // setAverageRating(Number(imdbRating));
    // setAverageRating((avgRating) => (avgRating + userRating) / 2);
  }
  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);
  // useEffect(() => {
  //   setIsTop(imdbRating > 8);
  // }, [imdbRating]);

  useEffect(() => {
    if (!title) return;
    document.title = `MOVIE: ${title}`;
    return () => (document.title = 'usePopcorn');
  }, [title]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('Failed to fetch movie');
        const data = await res.json();
        if (data.Response === 'False')
          throw new Error(
            data.Error + ` No movie with ID: "${selectedId}" found!`
          );
        // console.log(data);
        setMovie(data);
        setError('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovie();
    return () => controller.abort();
  }, [selectedId]);

  useEffect(() => {
    // Function to handle the key press
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        onCloseMovie();
      }
    };

    // Add the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseMovie]); // Dependency array includes onCloseMovie if it might change

  return (
    <div className='details'>
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`}></img>
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          {/* <p>{averageRating}</p> */}
          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    // defaultRating={watched.userRating}
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && !isWatched && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* {selectedId} */}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import { getSearchQuery } from '../../service/serviceApi';
import Loader from 'components/Loader/Loader';
import styles from './movies.module.css'

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const submit = e => {
    e.preventDefault();

    setSearchParams({ query: query });
    setQuery('');
  };

  const movieSearch = searchParams.get('query');

  useEffect(() => {
    if (!movieSearch) return;
    setLoading(true);
    async function renderMovies() {
      try {
        setMovies(await getSearchQuery(movieSearch));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    renderMovies();
  }, [movieSearch]);

  const location = useLocation();

  return (
    <div className={styles.list}>
      <form onSubmit={submit}>
        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={onChange}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
      {loading && <Loader />}
      {movies.length === 0 && <h2>No movies found for your search query</h2>}
      {movies && (
        <ul className={styles.movies}>
          {movies.map(({ id, title }) => (
            <li key={id} className={styles.item}>
              <Link
                className={styles.link}
                to={`/movies/${id}`}
                state={{ from: location }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movies;
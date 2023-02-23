import { useState, useEffect } from 'react';
import { getTrending } from 'service/serviceApi'
import { Link, useLocation } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import styles from './trending-movies.module.css'

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
      useEffect(() => {
    const renderMovies = async () => {
      setLoading(true);
      try {
        setMovies(await getTrending());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    renderMovies();
      }, []);
  const location = useLocation();
  return (
    <>
      {loading && <Loader />}
      {movies && (
        <ul className={styles.movies}>
          {movies.map(({ id, title }) => (
            
              <Link key={id}
                className={styles.link}
                to={`/movies/${id}`}
              state={{ from: location }}>
              <li className={styles.item}>
                {title} </li>
              </Link>
           
          ))}
        </ul>
      )}
    </>
  );
}
export default TrendingMovies;
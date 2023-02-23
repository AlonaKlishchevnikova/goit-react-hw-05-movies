import { useEffect, useState, Suspense } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  Outlet,
  Link,
} from 'react-router-dom';
import { getDetails } from 'service/serviceApi';
import MovieCard from 'components/MovieCard/MovieCard';
import styles from './movie-details.module.css';
import Loader from 'components/Loader/Loader';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const goBackBtn = location.state?.from ?? '/';

  useEffect(() => {
    const renderCard = async () => {
      setLoading(true);
      try {
        setMovie(await getDetails(id));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    renderCard();
  }, [id]);

  return (
    <section className={styles.details}>
      <button className={styles.button} onClick={() => navigate(goBackBtn)}>
        Go back
      </button>
      {loading && <Loader />}
      {movie && (
        <div>
          <MovieCard movie={movie} />
          <div>
            <h2> Additional information</h2>
            <div>
              <ul>
                <li>
                  <Link
                    className={styles.link}
                    to="cast"
                    state={{ from: location.state?.from ?? '/' }}
                  >
                    Cast
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.link}
                    to="reviews"
                    state={{ from: location.state?.from ?? '/' }}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </section>
  );
};

export default MovieDetails;
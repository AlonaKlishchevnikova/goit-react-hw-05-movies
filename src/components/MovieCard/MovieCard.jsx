import PropTypes from 'prop-types';
import styles from './movie-card.module.css';

const MovieCard = ({ movie }) => {
  const { poster_path, original_title, vote_average, overview, genres } = movie;
  const defaultImage =
    'https://eshop.spartan.gr/images/virtuemart/product/noimage.jpg';

  return (
    <div className={styles.card}>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w300${poster_path}`
            : defaultImage
        }
        alt="movie poster"
        width={300}
      />
      <div className={styles.info}>
        <h3 className={styles.title}>{original_title}</h3>
        <p className={styles.text}>User score: {Math.round(vote_average * 10)}%</p>
        <h4 className={styles.overview}>Overview</h4>
        <p className={styles.text}>{overview}</p>
        <h5 className={styles.genres}>Genres</h5>
        <p className={styles.text}>{genres.map(item => item.name).join(' ')}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  poster_path: PropTypes.string,
  original_title: PropTypes.string,
  vote_average: PropTypes.number,
  overview: PropTypes.string,
};

export default MovieCard;
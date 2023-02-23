import styles from './home.module.css';
import TrendingMovies from 'components/TrendingMovies/TrendingMovies'

const Home = () => {
  return (
    
    <div className={styles.list}>
      <h1 className={styles.title}>Trending today</h1>
     <TrendingMovies/>
    </div>
  );
};

export default Home;
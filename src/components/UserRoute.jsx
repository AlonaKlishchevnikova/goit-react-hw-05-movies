
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from './Loader/Loader';

const Home = lazy(() => import('../pages/Home/Home'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const Cast = lazy(() => import('../pages/MovieDetails/Cast/Cast'));
const Reviews = lazy(() => import('../pages/MovieDetails/Reviews/Reviews'));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));


 const UserRoute = () => {
  return (
 
  <Suspense fallback={<Loader/>}>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
  </Suspense>
  );
};
export default UserRoute;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { geCast } from 'service/serviceApi';
import Loader from 'components/Loader/Loader';


const Cast = () => {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const renderCast = async () => {
      setLoading(true);
      try {
        setCasts(await geCast(id));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    renderCast();
  }, [id]);

  const defaultImage =
    'https://eshop.spartan.gr/images/virtuemart/product/noimage.jpg';

  return (
    <>
      {loading && <Loader />}
      {!casts && <h2>We don't have a list of actors for this movie</h2>}
      {casts && (
        <ul>
          {casts.map(({ id, character, name, profile_path }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : defaultImage
                }
                alt={name}
              />
              <div>
                <p>{character}</p>
                <p>{name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
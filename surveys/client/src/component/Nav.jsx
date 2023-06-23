import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { logoutUser } from '../actions/authActions';


export const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const isLoggedin = useSelector(state => state.auth.isAuthenticated);

  const handleClick = async () => {
    try {
      await dispatch(logoutUser(navigate, dispatch));
    } catch (err) {}
  };

  return (
    <nav className="bg-lime-600 h-full">
      <div className="container py-4 flex justify-between flex-col">
        <Link to="/" className="text-white text-2xl font-semibold text-center">
          Kérdőívek
        </Link>
        <div className="mt-6">
          <ul className="flex flex-col">
            {isLoggedin ? (
              <>
                <li className="nav-item">
                  <Link
                    to="/surveys"
                    className="text-white"
                  >
                    Kérdőíveim
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/answers"
                    className="text-white"
                  >
                    Válaszok
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className="text-white"
                  >
                    Profil
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleClick}
                    className="text-white"
                  >
                    Kijelentkezés
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="text-white"
                  >
                    Bejelentkezés
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="text-white"
                  >
                    Regisztráció
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

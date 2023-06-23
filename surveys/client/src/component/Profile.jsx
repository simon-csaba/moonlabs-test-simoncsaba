import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../actions/authActions";
import { fetchSurveys } from "../actions/surveyActions";
import { getIsLoggedIn, getSurveys } from "../utils/utils";

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector(getSurveys).total;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate, dispatch]);

  useEffect(() => {
    if(isLoggedIn) fetchSurveys(dispatch, user.id);
}, [user, dispatch]);

  const handleClick = async () => {
    try {
      dispatch(logoutUser(navigate, dispatch));
    } catch (err) {}
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center mb-4">Profil</h1>
      <div className="flex justify-center">
        <div className="w-1/2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h5 className="text-xl font-bold mb-4">Név: {user.fullname}</h5>
            <h6 className="text-gray-600 mb-2">Email: {user.email}</h6>
            <h6 className="text-gray-600 mb-4">Kérdőívek száma: {total}</h6>
            <button
              onClick={handleClick}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Kijelentkezés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

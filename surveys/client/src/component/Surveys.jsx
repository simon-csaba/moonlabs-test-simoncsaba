import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { getIsLoggedIn, getSurveys } from "../utils/utils";
import { fetchSurveys } from "../actions/surveyActions";
import { deleteSurvey } from "../actions/surveyActions";

export const Surveys = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const surveysState = useSelector(getSurveys);

  useEffect(() => {
    fetchSurveys(dispatch, user.id);
  }, [user, dispatch]);

  const handleCopyLink = (survey) => {
    navigator.clipboard.writeText(
      `http://localhost:3030/surveys/${survey.hash}`
    );
  };

  const handleDeleteButton = (id) => {
    deleteSurvey(navigate, id);
  };

  return (
    <div className="container mx-auto">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Kérdőíveim</h1>
        <div className="flex mb-2 justify-center items-center">
          <Link
            to="/surveys/new"
            className="px-4 py-2 bg-lime-600 text-white  rounded-md mt-2"
          >
            Kérdőív létrehozása
          </Link>
        </div>
        <table className="min-w-full divide-y divide-gray-200 border-solid border-2 border-gray-500 border-collapse">
          <thead className="bg-lime-800 text-white">
            <tr>
              <th className="px-4 py-2">Cím</th>
              <th className="px-4 py-2">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(surveysState.data) &&
              surveysState.data.map((survey) => (
                <tr key={survey.id} className="odd:bg-slate-100">
                  <td className="px-4 py-2">
                  <Link
                  to="surveys/${survey.hash}">
                    {survey.name}
                  </Link>
                    </td>
                  <td className="px-4 py-2">
                    <div className="space-x-2">
                      <Link
                        to={`/surveys/${survey.hash}`}
                        className="px-4 py-2 bg-lime-600 text-white rounded-md"
                      >
                        Módosítás
                      </Link>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={() => handleDeleteButton(survey.id)}
                      >
                        Törlés
                      </button>
                      <button
                        onClick={() => handleCopyLink(survey)}
                        className="px-4 py-2 bg-lime-600 text-white rounded-md"
                      >
                        Link másolása
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

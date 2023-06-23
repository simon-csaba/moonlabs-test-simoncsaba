import {useEffect} from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import { getIsLoggedIn } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { submitSurvey } from "../actions/surveyActions";

export const NewSurvey = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: async (values) => {
      submitSurvey(navigate, values);
    },
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl text-center mb-2">Kérdőív létrehozása</h1>
      <div className="flex justify-center">
        <div className="w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                name="content"
                style={{ height: "600px" }}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                placeholder="Kérdőív címe 
                
Kérdés 1
válasz 1
válasz 2
                
Kérdés 2
válasz 3
válasz 4"
                onChange={handleChange}
                value={values.content}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-lime-600 text-white px-4 py-2 rounded-md"
              >
                Hozzáadás
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

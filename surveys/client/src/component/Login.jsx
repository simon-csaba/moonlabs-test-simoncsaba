import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

import { loginUser } from "../actions/authActions";

export const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    try {
      setError(null);
      dispatch(loginUser(values, navigate, dispatch));
    } catch (err) {
      setError(err);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      strategy: "local"
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 mt-5 text-2xl">Bejelentkezés</h1>
        {error && <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">Helytelen email vagy jelszó</div>}

        <form onSubmit={handleSubmit} className="flex flex-col">

          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`border border-gray-300 rounded-md px-3 py-2 mb-2 max-w-md ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          <br/>
          <label htmlFor="password" className="block mb-2">Jelszó</label>  
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={`border border-gray-300 rounded-md px-3 py-2 mb-2 max-w-md ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
          />

          <button type="submit" className="bg-lime-600 text-white px-4 py-2 rounded-md w-36">
            Bejelentkezés
          </button>
        </form>
    </div>

  );
};

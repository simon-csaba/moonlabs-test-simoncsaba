import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { registerUser } from '../actions/authActions';

export const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const RegisterSchema = yup.object().shape({
    fullname: yup.string().required('Required'),
    email: yup.string().email('Please enter a valid email').required('Required'),
    password: yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    try {
      setError('');
      dispatch(registerUser(values, navigate, dispatch));
    } catch (err) {
      setError(err);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit,
  });

  return (
    <div className="container mx-auto">
      <h1 className="mb-4 mt-5 text-2xl">Regisztráció</h1>

      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label htmlFor="fullname" className="block mb-2">
          Teljes név
        </label>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.fullname}
          className={`border border-gray-300 rounded-md px-3 py-2 mb-2 max-w-md ${errors.fullname && touched.fullname ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.fullname && touched.fullname && (
          <div className="text-red-500 text-sm">{errors.fullname}</div>
        )}

        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className={`border border-gray-300 rounded-md px-3 py-2 mb-2 max-w-md ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && touched.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <label htmlFor="password" className="block mb-2">
          Jelszó
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={`border border-gray-300 rounded-md px-3 py-2 mb-2 max-w-md ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.password && touched.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button type="submit" className="bg-lime-600 text-white px-4 py-2 rounded-md w-36">
          Regisztráció
        </button>
      </form>
    </div>
  );
};

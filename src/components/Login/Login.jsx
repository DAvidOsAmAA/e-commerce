
import styles from './Login.module.scss'
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  {
    const initialValues = {
      email: "",
      password: "",
    };
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const { setUserToken } = useContext(AuthContext)
    const validationSchema = Yup.object({
      email: Yup.string().email().required("email is required"),
      password: Yup.string().matches(/^[A-Z][A-Za-z0-9_]{2,11}$/, "Invalid password"),
    });
    function handleLogin(values) {
      setIsLoading(true);
      console.log(values);
      axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
        .then(response => {
          console.log(`data after being in db ${response.data}`);
          if (response.data.message === "success") {
            setIsLoading(false);
            setError(null);
            console.log(response.data.token)
            localStorage.setItem("token",response.data.token)
            setUserToken(response.data.token)
          
            navigate("/")
          }
        })
        .catch(error => {
          console.log(error);
          setError(error.response.data.message);
          setIsLoading(false);
        });
    }



    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => handleLogin(values)
    });



    return (
      <section className='py-5' style={{ height: "540px" }}>
        <div className="container">
          {error && (<div className='alert alert-danger'>{error}</div>)}
          <form style={{ width: "75%", marginLeft: "120px" }} onSubmit={formik.handleSubmit}>
            <h1 style={{ marginLeft: "36%" }} className='text-success'>Login Now</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Email...."
                aria-describedby="helpId"
                onChange={formik.handleChange}
                value={formik.values.email}

              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Password...."
                aria-describedby="helpId"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <button type="submit" className="btn btn-success" disabled={!(formik.isValid && formik.dirty)} style={{ marginLeft: "43%" }}>
              {isLoading ? "Loading" : "Login"}
            </button>
          </form>
        </div>
      </section>
    );
  }
}

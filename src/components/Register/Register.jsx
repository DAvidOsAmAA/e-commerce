import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
const navigate =  useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().email().required("email is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    password: Yup.string().matches(/^[A-Z][A-Za-z0-9_]{2,11}$/, "Invalid password"),
    rePassword: Yup.string().required().oneOf([Yup.ref("password")], "Passwords must match"),
  });
  function handleRegister(values) {
    setIsLoading(true);
    console.log(values);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(response => {
        console.log(`data after being in db ${response.data}`);
        if (response.data.message === "success") {
          setIsLoading(false);
          setError(null);
          navigate("/login")
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
    onSubmit: (values) => handleRegister(values)
  });



  return (
    <section className='py-5'>
      <div className="container">
        {error && (<div className='alert alert-danger'>{error}</div>)}
        <form style={{ width: "75%", marginLeft: "120px" }} onSubmit={formik.handleSubmit}>
          <h1 style={{ marginLeft: "36%" }} className='text-success'>Register Now</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Name...."
              aria-describedby="helpId"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="rePassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              className="form-control"
              placeholder="Confirm Password...."
              aria-describedby="helpId"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form-control"
              placeholder="Phone...."
              aria-describedby="helpId"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>
          <button type="submit" className="btn btn-success" disabled={!(formik.isValid && formik.dirty)} style={{ marginLeft: "43%" }}>
            {isLoading ? "Loading" : "Register" }
          </button>
        </form>
      </div>
    </section>
  );
}

import React, { useContext } from 'react';
import styles from './Footer.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

export default function Footer() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const { numberOfItems } = useContext(CartContext);

  function handleLogout() {
    setUserToken(null);
    localStorage.removeItem("token");
  }

  return (
    <div className="container-fluid p-0">
      <footer className="bg-dark text-center text-white">
        <div className="container pb-0 ">
          {/* Section: Social media */}

          {/* Section: Social media */}

          {/* Navigation links */}
          <div className="row justify-content-center">
            <div className="col-md-4 mt-5">
              <ul className="list-unstyled">
                <li>
                  <NavLink className="nav-link mb-3" to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link mb-3" to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link mb-3" to="/categories">Categories</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link mb-3" to="/brands">Brands</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mt-5">
              <p className="text-light mt-3">Phone: +1234567890</p>
              <p className="text-light mt-5">Address: Cairo , Egypt</p>
              <div className='mt-3'>          
                <div className="py-3">
                <span className='text-light ms-3 fs-5'>social media : </span>
                <a className="fab fa-facebook text-decoration-none text-light mx-2" href="https://facebook.com/" target='_blank'></a>
                <a className="fab fa-instagram text-decoration-none text-light mx-2" href="https://instagram.com/" target='_blank'></a>
                <a className="fab fa-tiktok text-decoration-none text-light mx-2" href="https://tiktok.com/" target='_blank'></a>
                <a className="fab fa-twitter text-decoration-none text-light mx-2" href="https://twitter.com/" target='_blank'></a>
                <a className="fab fa-youtube text-decoration-none text-light mx-2" href="https://youtube.com/" target='_blank'></a>
              </div></div>
            </div>
            <div className="col-md-4 display-5 mt-5">
              <i className="fas fa-shopping-cart text-light me-2"></i>
              <Link className="navbar-brand text-light " to="/">FreshCart</Link>
            </div>
          </div>
          {/* Navigation links */}

        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          Created By : <span className="text-white">Eng / David</span>
        </div>
      </footer>
    </div>
  );
}

import React, { useContext } from 'react';
import styles from './Navbar.module.scss'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { WishList } from '../../context/WishlistContext';

export default function Navbar() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const { numberOfItems } = useContext(CartContext);
  const { numberOfItems2 } = useContext(WishList)
  function handelLogOut() {
    setUserToken(null)
    localStorage.removeItem("token")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <i className="fas fa-shopping-cart text-light me-2"></i>
          <Link className="navbar-brand text-light" to="/">FreshCart</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <NavLink className="nav-link text-light" to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-light" to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-light" to="/categories">Categories</NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-light" to="/brands">Brands</NavLink>
              </li>
              <li>
                <NavLink className="nav-link text-light position-relative" to="/cart">Cart
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numberOfItems}
                    <span class="visually-hidden">unread messages</span>
                  </span></NavLink>
              </li>

            </ul>
            <ul className="navbar-nav  mb-2 mb-lg-0 me-0">

            <li>
                <NavLink className="nav-link text-light position-relative me-3" to="/wishlist">Wishlist
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numberOfItems2}
                  </span></NavLink>
              </li>
              <li>
                <a className='fab fa-facebook text-decoration-none bg-light rounded-circle mx-2 mt-3' href="https://facebook.com/" target='_blank'></a>
                <a className='fab fa-instagram text-decoration-none text-light  rounded-circle mx-2 mt-3' href="https://instagram.com/" target='_blank'></a>
                <a className='fab fa-tiktok text-decoration-none  rounded-circle mx-2 mt-3 text-light' href="https://tiktok.com/" target='_blank'></a>
                <a className='fab fa-twitter text-decoration-none  rounded-circle mx-2 mt-3 text-light' href="https://twitter.com/" target='_blank'></a>
                <a className='fab fa-youtube text-decoration-none  rounded-circle mx-2 mt-3 text-light' href="https://youtube.com/" target='_blank'></a>
              </li>
              
              
              {
                userToken ?

                  <Link className="nav-link text-light" to="" onClick={handelLogOut}>LogOut</Link>
                  :
                  <>
                    <li>
                      <NavLink className="nav-link text-light" to="/register">Register</NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link text-light" to="/login">Login</NavLink>
                    </li></>

              }




            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}

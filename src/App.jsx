import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import ProductDetails from './components/ProductDetails/ProductDetails';
import { Offline, Online } from "react-detect-offline";
import AuthContextProvider from './context/AuthContext'
import CartContextProvider from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import CheckOut from './components/CheckOut/CheckOut';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import AllOrder from './components/AllOrder/AllOrder';
import WishListContextProvider from './context/WishlistContext';
import Wishlist from './components/Wishlist/Wishlist';

function App() {
  const router = createBrowserRouter([
    {
      path: '/', element: <Layout />, errorElement: <ErrorPage />, children: [
        { index: true, element: <Home /> },
        { path: "/products", element: <Products /> },
        { path: "/product-details/:id", element: <ProductDetails /> },
        { path: "/brands", element: <Brands /> },
        { path: "/cart", element: <Cart /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/categories", element: <Categories /> },
        { path: "/login", element: <Login /> },
        { path: "/Register", element: <Register /> },
        { path: "/checkout", element: <CheckOut /> },
        { path: "/AllOrder", element: <AllOrder /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ]);
  const query = new QueryClient();

  return (
    <>
      <div>
        <Online>
          <div className='alert alert-success position-fixed bottom-0 end-0 me-3'> Only shown when you're online</div></Online>
        <Offline>
          <div className='alert alert-danger position-fixed bottom-0 end-0 me-3'> You are offline</div>
        </Offline>
      </div>

      <QueryClientProvider client={query}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
            <RouterProvider router={router} />
            <ToastContainer />
            </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

    </>

  );


}

export default App;

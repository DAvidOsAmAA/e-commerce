import axios from "axios";
import { useContext, useEffect, useState, } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { jwtDecode } from "jwt-decode";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const endPoint = `https://ecommerce.routemisr.com/api/v1/cart`;
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  async function AddToCart(productId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const { data } = await axios.post(
        endPoint,
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      console.log(data.numberOfItems)
      setNumberOfItems(data.numOfCartItems);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getCart() {
    try {
      const { data } = await axios.get(endPoint, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setNumberOfItems(data.numOfCartItems);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  async function removeFromCart(id) {
    try {
      const { data } = await axios.delete(`${endPoint}/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        }
      })
      setNumberOfItems(data.numOfCartItems)
      return data
    } catch (error) {
      console.log(error)
    }
  }


  async function updateProductQnt(id, count) {
    try {
      const { data } = await axios.put(`${endPoint}/${id}`, {
        count
      }, {
        headers:
        {
          token: localStorage.getItem("token"),
        }
      })
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CartContext.Provider value={{ numberOfItems, AddToCart, getCart, removeFromCart, updateProductQnt, cartId }}>
      {children}
    </CartContext.Provider>
  );
}

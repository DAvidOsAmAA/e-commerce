import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishList = createContext();



export default function WishListContextProvider({ children }) {

  const endPoint = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const [numberOfItems2, setNumberOfItems] = useState(0)
  async function addToWishList(productId) {
    try {
      const { data } = await axios.post(endPoint, {
        productId
      }, {
        headers: {
          token: localStorage.getItem("token"),
        }
      })
      console.log(data.data.length, "from wishlist");
      setNumberOfItems(data.data.length);
    } catch (error) {
      console.log(error)
    }
  }

  async function getWishList() {
    try {
      const { data } = await axios.get(endPoint, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });
      console.log(data)
      setNumberOfItems(data.data.length);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getWishList()
  },[])


  async function removeFromWishList(id) {
    try {
      const { data } = await axios.delete(`${endPoint}/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        }
      })
      setNumberOfItems(data.data.length);      return data
    } catch (error) {
      console.log(error)
    }
  }


  return <WishList.Provider value={{ addToWishList, numberOfItems2, getWishList, removeFromWishList }} >{children}</WishList.Provider>
}
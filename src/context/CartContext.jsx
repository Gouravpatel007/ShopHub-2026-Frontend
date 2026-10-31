// import { server } from "@/main";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const token = Cookies.get("token");
//   const [loading, setLoading] = useState(false);
//   const [totalItem, setTotalItem] = useState(0);
//   const [subTotal, setSubTotal] = useState(0);

//   const [cart, setCart] = useState([]);
//   async function fetchCart() {
//     try {
//       const { data } = await axios.get(`${server}/api/cart/all`, {
//         headers: {
//           token: Cookies.get("token"),
//         },
//       });

//       setCart(data.cart);
//       setTotalItem(data.sumofQuantities);
//       setSubTotal(data.subTotal);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function addToCart(product) {
//     try {
//       const { data } = await axios.post(
//         `${server}/api/cart/add`,
//         { product },
//         {
//           headers: {
//             token,
//           },
//         }
//       );

//       toast.success(data.message);
//       fetchCart();
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function updateCart(action, id) {
//     try {
//       const { data } = await axios.post(
//         `${server}/api/cart/update?action=${action}`,
//         { id },
//         {
//           headers: {
//             token,
//           },
//         }
//       );

//       fetchCart();
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   async function removeFromCart(id) {
//     try {
//       const { data } = await axios.get(`${server}/api/cart/remove/${id}`, {
//         headers: {
//           token,
//         },
//       });

//       toast.success(data.message);
//       fetchCart();
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }

//   useEffect(() => {
//     fetchCart();
//   }, []);
//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         totalItem,
//         subTotal,
//         fetchCart,
//         addToCart,
//         setTotalItem,
//         updateCart,
//         removeFromCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const CartData = () => useContext(CartContext);


























































import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [cart, setCart] = useState([]);

  // Fetch cart
  async function fetchCart() {
    const token = Cookies.get("token");

    if (!token) {
      setCart([]);
      setTotalItem(0);
      setSubTotal(0);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(`${server}/api/cart/all`, {
        headers: {
          token,
        },
      });

      setCart(data.cart || []);
      setTotalItem(data.sumofQuantities || 0);
      setSubTotal(data.subTotal || 0);
    } catch (error) {
      console.error(
        "Fetch Cart Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }

  // Add product to cart
  async function addToCart(product) {
    const token = Cookies.get("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const { data } = await axios.post(
        `${server}/api/cart/add`,
        { product },
        {
          headers: {
            token,
          },
        }
      );

      toast.success(data.message);
      await fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to add product"
      );
    }
  }

  // Update cart quantity
  async function updateCart(action, id) {
    const token = Cookies.get("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const { data } = await axios.post(
        `${server}/api/cart/update?action=${action}`,
        { id },
        {
          headers: {
            token,
          },
        }
      );

      await fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update cart"
      );
    }
  }

  // Remove product from cart
  async function removeFromCart(id) {
    const token = Cookies.get("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const { data } = await axios.get(
        `${server}/api/cart/remove/${id}`,
        {
          headers: {
            token,
          },
        }
      );

      toast.success(data.message);
      await fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to remove product"
      );
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItem,
        subTotal,
        loading,
        fetchCart,
        addToCart,
        setTotalItem,
        updateCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartData = () => useContext(CartContext);
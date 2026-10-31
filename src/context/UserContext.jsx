// import { server } from "@/main";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [btnLoading, setBtnLoading] = useState(false);
//   const [isAuth, setIsAuth] = useState(false);

//   async function loginUser(email, navigate) {
//     setBtnLoading(true);
//     try {
//       const { data } = await axios.post(`${server}/api/user/login`, { email });

//       toast.success(data.message);
//       localStorage.setItem("email", email);
//       navigate("/verify");
//       setBtnLoading(false);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   }




//   async function verifyUser(otp, navigate, fetchCart) {
//     setBtnLoading(true);
//     const email = localStorage.getItem("email");
//     try {
//       const { data } = await axios.post(`${server}/api/user/verify`, {
//         email,
//         otp,
//       });

//       toast.success(data.message);
//       localStorage.clear();
//       navigate("/");
//       setBtnLoading(false);
//       setIsAuth(true);
//       setUser(data.user);

//       Cookies.set("token", data.token, {
//         expires: 15,
//         secure: true,
//         path: "/",
//       });

//       fetchCart();
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   }

//   async function fetchUser() {
//     try {
//       const { data } = await axios.get(`${server}/api/user/me`, {
//         headers: {
//           token: Cookies.get("token"),
//         },
//       });

//       setIsAuth(true);
//       setUser(data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setIsAuth(false);
//       setLoading(false);
//     }
//   }

//   function logoutUser(navigate, setTotalItem) {
//     Cookies.set("token", null);
//     setUser([]);
//     setIsAuth(false);
//     navigate("/login");
//     toast.success("Logged Out");
//     setTotalItem(0);
//   }

//   useEffect(() => {
//     fetchUser();
//   }, []);
//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         loading,
//         btnLoading,
//         isAuth,
//         loginUser,
//         verifyUser,
//         logoutUser,
//       }}
//     >
//       {children}
//       <Toaster />
//     </UserContext.Provider>
//   );
// };

// export const UserData = () => useContext(UserContext);





























import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // Send OTP
  async function loginUser(email, navigate) {
    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
      });

      localStorage.setItem("email", email.trim().toLowerCase());

      toast.success(data.message);
      navigate("/verify");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to send OTP"
      );
    } finally {
      setBtnLoading(false);
    }
  }

  // Verify OTP and Login
  async function verifyUser(otp, navigate, fetchCart) {
    setBtnLoading(true);

    const email = localStorage.getItem("email");

    if (!email) {
      toast.error("Please enter your email again");
      setBtnLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        email,
        otp,
      });

      if (!data.token || !data.user) {
        throw new Error("Authentication data not received");
      }

      // Save token
      Cookies.set("token", data.token, {
        expires: 15,
        secure: window.location.protocol === "https:",
        sameSite: "Lax",
        path: "/",
      });

      setUser(data.user);
      setIsAuth(true);

      localStorage.removeItem("email");

      toast.success(data.message || "Login successful");

      // Fetch cart after token is saved
      if (typeof fetchCart === "function") {
        await fetchCart();
      }

      navigate("/");
    } catch (error) {
      console.error(
        "OTP Verification Error:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "OTP verification failed"
      );
    } finally {
      setBtnLoading(false);
    }
  }

  // Fetch Logged-in User
  async function fetchUser() {
    const token = Cookies.get("token");

    if (!token) {
      setIsAuth(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token,
        },
      });

      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.error(
        "Fetch User Error:",
        error.response?.data || error.message
      );

      Cookies.remove("token", { path: "/" });

      setUser(null);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  // Logout
  function logoutUser(navigate, setTotalItem) {
    Cookies.remove("token", { path: "/" });

    setUser(null);
    setIsAuth(false);

    if (typeof setTotalItem === "function") {
      setTotalItem(0);
    }

    navigate("/login");
    toast.success("Logged Out");
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        isAuth,
        loginUser,
        verifyUser,
        logoutUser,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);

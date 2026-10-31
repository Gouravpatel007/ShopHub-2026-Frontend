// import Loading from "@/components/Loading";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { CartData } from "@/context/CartContext";
// import { server } from "@/main";
// import axios from "axios";
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";

// const Payment = () => {
//   const { cart, subTotal, fetchCart } = CartData();
//   const [address, setAddress] = useState("");
//   const [method, setMethod] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const { id } = useParams();

//   async function fetchAddress() {
//     try {
//       const { data } = await axios.get(`${server}/api/address/${id}`, {
//         headers: {
//           token: Cookies.get("token"),
//         },
//       });

//       setAddress(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchAddress();
//   }, [id]);

//   const paymentHandler = async () => {
//     if (method === "cod") {
//       setLoading(true);
//       try {
//         const { data } = await axios.post(
//           `${server}/api/order/new/cod`,
//           {
//             method,
//             phone: address.phone,
//             address: address.address,
//           },
//           {
//             headers: {
//               token: Cookies.get("token"),
//             },
//           }
//         );

//         setLoading(false);
//         toast.success(data.message);
//         fetchCart();
//         navigate("/orders");
//       } catch (error) {
//         setLoading(false);
//         toast.error(error.response.data.message);
//       }
//     }

//     if (method === "online") {
//       const stripePromise = loadStripe(
//         "pk_test_51QZEIUFMvOph2hyWyfOWX8VP9LAHjNTzzkExAHOzCqAR7KzHmcU5zufHu51eSnUbxRw49XmOme3vdTmeho2kE9fv00h2fOMgnC"
//       );

//       try {
//         setLoading(true);
//         const stripe = await stripePromise;

//         const { data } = await axios.post(
//           `${server}/api/order/new/online`,
//           {
//             method,
//             phone: address.phone,
//             address: address.address,
//           },
//           {
//             headers: {
//               token: Cookies.get("token"),
//             },
//           }
//         );

//         if (data.url) {
//           window.location.href = data.url;
//           setLoading(false);
//         } else {
//           toast.error("Failed to created Payment Session");
//           setLoading(false);
//         }
//       } catch (error) {
//         toast.error("Payment Failed. Please Try again");
//         setLoading(false);
//       }
//     }
//   };
//   return (
//     <div>
//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="container mx-auto px-4 py-8">
//           <div className="space-y-8">
//             <h2 className="text-3xl font-bold text-center">
//               Proceed to Payment
//             </h2>

//             <div>
//               <h3 className="text-xl font-semibold">Products</h3>
//               <Separator className="my-2" />

//               <div className="space-y-4">
//                 {cart &&
//                   cart.map((e, i) => (
//                     <div
//                       key={i}
//                       className="flex flex-col md:flex-row items-center justify-between bg-card  p-4 rounded-lg shadow border dark:border-gray-700"
//                     >
//                       <img
//                         src={e.product.images[0].url}
//                         alt="xyz"
//                         className="w-16 h-16 object-cover rounded mb-4 md:mb-0"
//                       />

//                       <div className="flex-1 md:ml-4 text-center md:text-left">
//                         <h2 className="text-lg font-medium">
//                           {e.product.title}
//                         </h2>

//                         <p className="text-sm text-muted-foreground dark:text-gray-400">
//                           ₹ {e.product.price} X {e.quauntity}
//                         </p>
//                         <p className="text-sm text-muted-foreground dark:text-gray-400">
//                           ₹ {e.product.price * e.quauntity}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>

//             <div className="text-lg font-medium text-center">
//               Total Price to be Paid: ₹ {subTotal}
//             </div>

//             {address && (
//               <div className="bg-card p-4 rounded-lg shadow border space-y-4 dark:border-gray-700">
//                 <h3 className="text-lg font-semibold text-center">Details</h3>
//                 <Separator className="my-2" />

//                 <div className="flex flex-col  space-y-4 ">
//                   <div>
//                     <h4 className="font-semibold mb-1">Delivery Address</h4>
//                     <p className="text-sm text-muted-foreground dark:text-gray-400">
//                       <strong>Address:</strong> {address.address}
//                     </p>
//                     <p className="text-sm text-muted-foreground dark:text-gray-400">
//                       <strong>Phone:</strong> {address.phone}
//                     </p>
//                   </div>

//                   <div className="w-full md:w-1/2">
//                     <h4 className="font-semibold mb-1">
//                       Select Payment Method
//                     </h4>

//                     <select
//                       value={method}
//                       onChange={(e) => setMethod(e.target.value)}
//                       className="w-full p-2 border rounded-lg bg-card dark:bg-gray-900 dark:text-white"
//                     >
//                       <option value="">Select Payment Method</option>
//                       <option value="cod">Cod</option>
//                       <option value="online">Online</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <Button
//               className="w-full py-3 mt-4"
//               onClick={paymentHandler}
//               disabled={!method || !address}
//             >
//               Procced To Checkout
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;















import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartData } from "@/context/CartContext";
import { server } from "@/main";

import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const { cart, subTotal, fetchCart } = CartData();

  const [address, setAddress] = useState(null);
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  // ==========================================
  // FETCH SELECTED DELIVERY ADDRESS
  // ==========================================

  useEffect(() => {
    let active = true;

    const fetchAddress = async () => {
      setAddressLoading(true);

      try {
        const token = Cookies.get("token");

        if (!token) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        if (!id) {
          throw new Error("Address ID is missing");
        }

        const { data } = await axios.get(
          `${server}/api/address/${id}`,
          {
            headers: {
              token,
            },
          }
        );

        console.log("Address API Response:", data);

        // Updated address controller returns { success, address }
        const addressData = data?.address;

        console.log("Selected Address:", addressData);
        console.log("Phone:", addressData?.phone);
        console.log("Delivery Address:", addressData?.address);

        if (!addressData) {
          throw new Error("Address data not found");
        }

        if (active) {
          setAddress(addressData);
        }
      } catch (error) {
        console.error(
          "Fetch Address Error:",
          error.response?.data || error
        );

        if (active) {
          setAddress(null);

          toast.error(
            error.response?.data?.message ||
              error.message ||
              "Failed to load address"
          );
        }
      } finally {
        if (active) {
          setAddressLoading(false);
        }
      }
    };

    fetchAddress();

    return () => {
      active = false;
    };
  }, [id, navigate]);

  // ==========================================
  // HANDLE PAYMENT
  // ==========================================

  const paymentHandler = async () => {
    if (loading) return;

    if (!address) {
      toast.error("Please select a valid delivery address");
      return;
    }

    if (!method) {
      toast.error("Please select a payment method");
      return;
    }

    if (!cart?.length) {
      toast.error("Your cart is empty");
      return;
    }

    const token = Cookies.get("token");

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    // Get phone and delivery address
    const phone = address?.phone;
    const deliveryAddress = address?.address;

    console.log("Address Object:", address);
    console.log("Phone:", phone);
    console.log("Delivery Address:", deliveryAddress);

    // Validate address details
    if (
      phone === undefined ||
      phone === null ||
      String(phone).trim() === "" ||
      !deliveryAddress ||
      String(deliveryAddress).trim() === ""
    ) {
      toast.error("Phone number or delivery address is missing");
      return;
    }

    const payload = {
      method,
      phone: String(phone),
      address: String(deliveryAddress),
    };

    console.log("Payment Payload:", payload);

    setLoading(true);

    try {
      // ======================================
      // CASH ON DELIVERY
      // ======================================

      if (method === "cod") {
        const { data } = await axios.post(
          `${server}/api/order/new/cod`,
          payload,
          {
            headers: {
              token,
            },
          }
        );

        console.log("COD Order Response:", data);

        toast.success(
          data?.message || "Order placed successfully"
        );

        await fetchCart();

        navigate("/orders");
        return;
      }

      // ======================================
      // ONLINE PAYMENT - STRIPE
      // ======================================

      if (method === "online") {
        console.log("Creating Stripe checkout session...");

        const { data } = await axios.post(
          `${server}/api/order/new/online`,
          payload,
          {
            headers: {
              token,
            },
          }
        );

        console.log("Stripe Session Response:", data);

        if (!data?.url) {
          throw new Error(
            data?.message ||
              "Stripe checkout URL was not returned"
          );
        }

        // Redirect to Stripe Checkout
        window.location.assign(data.url);
        return;
      }
    } catch (error) {
      console.error("Payment Error:", error);

      console.error(
        "Backend Response:",
        error.response?.data
      );

      console.error(
        "HTTP Status:",
        error.response?.status
      );

      console.error(
        "Request URL:",
        error.config?.url
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        "Payment failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (addressLoading) {
    return <Loading />;
  }

  // ==========================================
  // PAYMENT PAGE UI
  // ==========================================

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">

        <h2 className="text-3xl font-bold text-center">
          Proceed to Payment
        </h2>

        {/* CART PRODUCTS */}

        <div>
          <h3 className="text-xl font-semibold">
            Products
          </h3>

          <Separator className="my-2" />

          {!cart?.length ? (
            <p className="py-4 text-center text-muted-foreground">
              Your cart is empty.
            </p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => {
                const product = item.product;
                const quantity = Number(item.quauntity) || 0;
                const price = Number(product?.price) || 0;

                return (
                  <div
                    key={item._id || index}
                    className="flex flex-col md:flex-row items-center justify-between bg-card p-4 rounded-lg shadow border dark:border-gray-700"
                  >
                    <img
                      src={product?.images?.[0]?.url || ""}
                      alt={product?.title || "Product"}
                      className="w-16 h-16 object-cover rounded mb-4 md:mb-0"
                    />

                    <div className="flex-1 md:ml-4 text-center md:text-left">
                      <h3 className="text-lg font-medium">
                        {product?.title || "Product"}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        ₹ {price} × {quantity}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        Item total: ₹ {price * quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* TOTAL */}

        <div className="text-lg font-medium text-center">
          Total Price to be Paid: ₹ {subTotal}
        </div>

        {/* DELIVERY DETAILS */}

        {address ? (
          <div className="bg-card p-4 rounded-lg shadow border space-y-4 dark:border-gray-700">

            <h3 className="text-lg font-semibold text-center">
              Delivery Details
            </h3>

            <Separator className="my-2" />

            <div>
              <h4 className="font-semibold mb-1">
                Delivery Address
              </h4>

              <p className="text-sm">
                <strong>Address:</strong>{" "}
                {address.address || "Not available"}
              </p>

              <p className="text-sm">
                <strong>Phone:</strong>{" "}
                {address.phone || "Not available"}
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => navigate("/address")}
            >
              Change Address
            </Button>

            <div className="w-full md:w-1/2">
              <label
                htmlFor="payment-method"
                className="font-semibold mb-1 block"
              >
                Select Payment Method
              </label>

              <select
                id="payment-method"
                value={method}
                onChange={(event) =>
                  setMethod(event.target.value)
                }
                className="w-full p-2 border rounded-lg bg-card dark:bg-gray-900 dark:text-white"
              >
                <option value="">
                  Select Payment Method
                </option>

                <option value="cod">
                  Cash on Delivery (COD)
                </option>

                <option value="online">
                  Online Payment (Stripe)
                </option>
              </select>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-3">
            <p className="text-red-500">
              Delivery address could not be loaded.
            </p>

            <Button
              variant="outline"
              onClick={() => navigate("/address")}
            >
              Select Address
            </Button>
          </div>
        )}

        {/* CHECKOUT BUTTON */}

        <Button
          className="w-full py-3 mt-4"
          onClick={paymentHandler}
          disabled={
            !method ||
            !address ||
            loading ||
            !cart?.length
          }
        >
          {loading
            ? "Processing..."
            : "Proceed to Checkout"}
        </Button>

      </div>
    </div>
  );
};

export default Payment;

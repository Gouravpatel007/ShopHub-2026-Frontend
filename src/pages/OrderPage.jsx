// import Loading from "@/components/Loading";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { UserData } from "@/context/UserContext";
// import { server } from "@/main";
// import axios from "axios";
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const OrderPage = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { user } = UserData();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const { data } = await axios.get(`${server}/api/order/${id}`, {
//           headers: {
//             token: Cookies.get("token"),
//           },
//         });

//         setOrder(data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   if (loading) {
//     return <Loading />;
//   }

//   if (!order) {
//     return (
//       <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
//         <h1 className="text-2xl font-bold text-red-600">
//           No Order With this id
//         </h1>
//         <Button onClick={() => navigate("/products")}>Shop Now</Button>
//       </div>
//     );
//   }
//   return (
//     <div className="container mx-auto py-6 px-4">
//       {user._id === order.user._id || user.role === "admin" ? (
//         <>
//           <Card className="mb-6">
//             <CardHeader>
//               <div className="flex justify-between">
//                 <CardTitle className="text-2xl font-bold">
//                   Order Details
//                 </CardTitle>
//                 <Button onClick={() => window.print()}>Print Order</Button>
//               </div>
//             </CardHeader>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//                 <p>
//                   <strong>Order Id: </strong>

//                   {order._id}
//                 </p>
//                 <p>
//                   <strong>Status: </strong>
//                   <span
//                     className={`${
//                       order.status === "Pending"
//                         ? "text-yellow-500"
//                         : "text-green-500"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </p>
//                 <p>
//                   <strong>Total Items: </strong>

//                   {order.items.length}
//                 </p>

//                 <p>
//                   <strong>Payment Method: </strong>

//                   {order.method}
//                 </p>

//                 <p>
//                   <strong>SubTotal: </strong>

//                   {order.subTotal}
//                 </p>

//                 <p>
//                   <strong>Placed At: </strong>

//                   {new Date(order.createdAt).toLocaleDateString()}
//                 </p>

//                 <p>
//                   <strong>Paid At: </strong>

//                   {order.paidAt || "Payment Through COD"}
//                 </p>
//               </div>

//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
//                 <p>
//                   <strong>Phone:</strong> {order.phone}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {order.address}
//                 </p>
//                 <p>
//                   <strong>User:</strong> {order.user?.email || "Guest"}
//                 </p>
//               </div>
//             </div>
//           </Card>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {order.items.map((e, i) => (
//               <Card key={i}>
//                 <Link to={`/product/${e.product._id}`}>
//                   <img
//                     src={e.product.images[0]?.url}
//                     alt={e.product.title}
//                     className="max-w-full max-h-full object-contain"
//                   />
//                 </Link>

//                 <CardContent>
//                   <h3 className="text-lg font-semibold">{e.product.title}</h3>
//                   <p>
//                     <strong>Quantity:</strong>
//                     {e.quantity}
//                   </p>
//                   <p>
//                     <strong>Price:</strong>₹{e.product.price}
//                   </p>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </>
//       ) : (
//         <p className="text-red-500 text-3xl text-center">
//           This is not your order <br />
//           <Link to={"/"} className="mt-4 underline text-blue-400">
//             Go to home page
//           </Link>
//         </p>
//       )}
//     </div>
//   );
// };

// export default OrderPage;






























import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserData } from "@/context/UserContext";
import { server } from "@/main";

import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderPage = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = UserData();
  const navigate = useNavigate();

  // Fetch order details
  useEffect(() => {
    let active = true;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const { data } = await axios.get(
          `${server}/api/order/${id}`,
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        console.log("Order Data:", data);

        if (active) {
          setOrder(data?.order || data);
        }
      } catch (error) {
        console.error("Fetch Order Error:", error);
        console.error("Backend Response:", error.response?.data);

        if (active) {
          setErrorMessage(
            error.response?.data?.message ||
              "Unable to fetch order details."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchOrder();

    return () => {
      active = false;
    };
  }, [id]);

  // Loading
  if (loading) {
    return <Loading />;
  }

  // Order not found
  if (!order) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-red-600 mb-3">
          Order Not Found
        </h1>

        <p className="text-gray-600 mb-5">
          {errorMessage || "No order found with this ID."}
        </p>

        <Button onClick={() => navigate("/orders")}>
          Go to My Orders
        </Button>
      </div>
    );
  }

  // Authorization
  const orderUserId =
    order.user?._id?.toString() || order.user?.toString();

  const currentUserId = user?._id?.toString();

  const isAuthorized =
    (currentUserId && currentUserId === orderUserId) ||
    user?.role === "admin";

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 text-2xl font-semibold mb-4">
          This is not your order
        </p>

        <Link to="/" className="underline text-blue-500">
          Go to home page
        </Link>
      </div>
    );
  }

  // Order items
  const items = order.items || [];

  // Calculate subtotal from order items
  const calculatedSubTotal = items.reduce((total, item) => {
    const price = Number(item.price ?? item.product?.price ?? 0);

    const quantity = Number(
      item.quauntity ?? item.quantity ?? 1
    );

    return total + price * quantity;
  }, 0);

  // Use saved subtotal if available, otherwise calculate it
  const savedSubTotal = Number(
    order.SubTotal ?? order.subTotal
  );

  const displaySubTotal =
    Number.isFinite(savedSubTotal) && savedSubTotal > 0
      ? savedSubTotal
      : calculatedSubTotal;

  return (
    <div className="container mx-auto py-6 px-4">

      {/* Order Summary */}

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle className="text-2xl font-bold">
              Order Details
            </CardTitle>

            <Button onClick={() => window.print()}>
              Print Order
            </Button>
          </div>
        </CardHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">

          {/* Order Information */}

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <p className="break-all mb-2">
              <strong>Order ID: </strong>
              {order._id}
            </p>

            <p className="mb-2">
              <strong>Status: </strong>

              <span
                className={
                  order.status === "Pending"
                    ? "text-yellow-500"
                    : "text-green-500"
                }
              >
                {order.status || "Pending"}
              </span>
            </p>

            <p className="mb-2">
              <strong>Total Items: </strong>
              {items.length}
            </p>

            <p className="mb-2">
              <strong>Payment Method: </strong>
              {order.method || "Not available"}
            </p>

            <p className="mb-2">
              <strong>SubTotal: </strong>
              ₹{displaySubTotal.toFixed(2)}
            </p>

            <p className="mb-2">
              <strong>Placed At: </strong>
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "Not available"}
            </p>

            <p className="mb-2">
              <strong>Paid At: </strong>

              {order.paidAt
                ? new Date(order.paidAt).toLocaleString()
                : "Payment Through COD"}
            </p>
          </div>

          {/* Shipping Information */}

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Shipping Details
            </h2>

            <p className="mb-2">
              <strong>Phone: </strong>
              {order.phone || "Not available"}
            </p>

            <p className="mb-2">
              <strong>Address: </strong>
              {order.address || "Not available"}
            </p>

            <p className="mb-2 break-all">
              <strong>User: </strong>
              {order.user?.email || "Guest"}
            </p>
          </div>

        </div>
      </Card>

      {/* Ordered Products */}

      <h2 className="text-2xl font-bold mb-5">
        Ordered Products
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">
          No products found in this order.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {items.map((item, index) => {
            const product = item.product;

            const productId = product?._id;

            const productTitle =
              product?.title ||
              item.name ||
              "Product no longer available";

            const productImage = product?.images?.[0]?.url;

            const productPrice = Number(
              item.price ?? product?.price ?? 0
            );

            const quantity = Number(
              item.quauntity ?? item.quantity ?? 1
            );

            return (
              <Card key={item._id || index}>

                {productId ? (
                  <Link to={`/product/${productId}`}>
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={productTitle}
                        className="w-full h-52 object-contain p-3"
                      />
                    ) : (
                      <div className="w-full h-52 flex items-center justify-center bg-gray-100 text-gray-500">
                        No Image Available
                      </div>
                    )}
                  </Link>
                ) : (
                  <div className="w-full h-52 flex items-center justify-center bg-gray-100 text-gray-500">
                    Product Unavailable
                  </div>
                )}

                <CardContent className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    {productTitle}
                  </h3>

                  <p>
                    <strong>Quantity: </strong>
                    {quantity}
                  </p>

                  <p>
                    <strong>Price: </strong>
                    ₹{productPrice.toFixed(2)}
                  </p>

                  <p>
                    <strong>Total: </strong>
                    ₹{(productPrice * quantity).toFixed(2)}
                  </p>

                  {!product && (
                    <p className="text-sm text-red-500">
                      This product is no longer available.
                    </p>
                  )}
                </CardContent>

              </Card>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default OrderPage;

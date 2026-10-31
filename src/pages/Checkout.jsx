// import Loading from "@/components/Loading";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { server } from "@/main";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Trash } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// const Checkout = () => {
//   const [address, setAddress] = useState([]);
//   const [loading, setLoading] = useState(true);

//   async function fetchAddress() {
//     try {
//       const { data } = await axios.get(`${server}/api/address/all`, {
//         headers: {
//           token: Cookies.get("token"),
//         },
//       });

//       setAddress(data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   const [modalOpen, setModalOpen] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     address: "",
//     phone: "",
//   });

//   const handleAddAddress = async () => {
//     try {
//       const { data } = await axios.post(
//         `${server}/api/address/new`,
//         { address: newAddress.address, phone: newAddress.phone },
//         {
//           headers: {
//             token: Cookies.get("token"),
//           },
//         }
//       );

//       if (data.message) {
//         toast.success(data.message);
//         fetchAddress();
//         setNewAddress({
//           address: "",
//           phone: "",
//         }),
//           setModalOpen(false);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchAddress();
//   }, []);

//   const deleteHandler = async (id) => {
//     if (confirm("Are you sure you want to delete this address")) {
//       try {
//         const { data } = await axios.delete(`${server}/api/address/${id}`, {
//           headers: {
//             token: Cookies.get("token"),
//           },
//         });

//         toast.success(data.message);
//         fetchAddress();
//       } catch (error) {
//         toast.error(error.response.data.message);
//       }
//     }
//   };
//   return (
//     <div className="container mx-auto px-4 py-8 min-h-[60vh]">
//       <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//           {address && address.length > 0 ? (
//             address.map((e) => (
//               <div className="p-4 border rounded-lg shadow-sm" key={e._id}>
//                 <h3 className="text-lg font-semibold flex justify-between gap-3">
//                   Address - {e.address}
//                   <Button
//                     variant="destructive"
//                     onClick={() => deleteHandler(e._id)}
//                   >
//                     <Trash />
//                   </Button>
//                 </h3>

//                 <p className="text-sm">Phone- {e.phone}</p>
//                 <Link to={`/payment/${e._id}`}>
//                   <Button variant="outline">Use Address</Button>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p>No Address found</p>
//           )}
//         </div>
//       )}

//       <Button
//         className="mt-6"
//         variant="outline"
//         onClick={() => setModalOpen(true)}
//       >
//         Add New Address
//       </Button>

//       <Dialog open={modalOpen} onOpenChange={setModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Address</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <Input
//               placeholder="Address"
//               value={newAddress.address}
//               onChange={(e) =>
//                 setNewAddress({ ...newAddress, address: e.target.value })
//               }
//             />
//             <Input
//               type="number"
//               placeholder="Phone"
//               value={newAddress.phone}
//               onChange={(e) =>
//                 setNewAddress({ ...newAddress, phone: e.target.value })
//               }
//             />
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setModalOpen(false)}>
//               Close
//             </Button>
//             <Button variant="outline" onClick={handleAddAddress}>
//               Add Address
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Checkout;
































import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [newAddress, setNewAddress] = useState({
    address: "",
    phone: "",
  });

  // Authentication headers
  const getAuthHeaders = () => {
    const token = Cookies.get("token");

    if (!token || token === "null" || token === "undefined") {
      throw new Error("Please login again to manage addresses.");
    }

    return {
      token: token,
    };
  };

  // Fetch saved addresses
  const fetchAddress = async () => {
    try {
      const response = await axios.get(
        `${server}/api/address/all`,
        {
          headers: getAuthHeaders(),
        }
      );

      console.log("Address API response:", response.data);

      const data = response.data;

      if (Array.isArray(data)) {
        setAddress(data);
      } else if (Array.isArray(data.addresses)) {
        setAddress(data.addresses);
      } else if (Array.isArray(data.address)) {
        setAddress(data.address);
      } else {
        console.error("Unexpected address response format:", data);
        setAddress([]);
      }
    } catch (error) {
      console.error(
        "Fetch address error:",
        error.response?.status,
        error.response?.data || error.message
      );

      setAddress([]);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to load addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  // Add a new address
  const handleAddAddress = async () => {
    const addressValue = newAddress.address.trim();
    const phoneValue = newAddress.phone.trim();

    if (!addressValue || !phoneValue) {
      toast.error("Please enter address and phone number");
      return;
    }

    setBtnLoading(true);

    try {
      const response = await axios.post(
        `${server}/api/address/new`,
        {
          address: addressValue,
          phone: phoneValue,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      toast.success(
        response.data.message || "Address added successfully"
      );

      setNewAddress({
        address: "",
        phone: "",
      });

      setModalOpen(false);

      await fetchAddress();
    } catch (error) {
      console.error(
        "Add address error:",
        error.response?.status,
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add address"
      );
    } finally {
      setBtnLoading(false);
    }
  };

  // Delete an address
  const deleteHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `${server}/api/address/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );

      toast.success(
        response.data.message || "Address deleted successfully"
      );

      await fetchAddress();
    } catch (error) {
      console.error(
        "Delete address error:",
        error.response?.status,
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete address"
      );
    }
  };

  useEffect(()=>{
    fetchAddress()
  },[]);

  return (
    <div className="container mx-auto min-h-[60vh] px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Checkout
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {address.length > 0 ? (
            address.map((item) => (
              <div
                key={item._id}
                className="rounded-lg border p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="break-words text-lg font-semibold">
                    Address - {item.address}
                  </h3>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteHandler(item._id)}
                    aria-label="Delete address"
                  >
                    <Trash size={18} />
                  </Button>
                </div>

                <p className="mt-2 text-sm">
                  Phone - {item.phone}
                </p>

                <Link to={`/payment/${item._id}`}>
                  <Button className="mt-3" variant="outline">
                    Use Address
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">
              No addresses found. Add a new address to continue.
            </p>
          )}
        </div>
      )}

      <Button
        className="mt-6"
        variant="outline"
        onClick={() => setModalOpen(true)}
      >
        Add New Address
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Address"
              value={newAddress.address}
              onChange={(e) =>
                setNewAddress((previous) => ({
                  ...previous,
                  address: e.target.value,
                }))
              }
            />

            <Input
              type="tel"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress((previous) => ({
                  ...previous,
                  phone: e.target.value,
                }))
              }
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={btnLoading}
            >
              Close
            </Button>

            <Button
              onClick={handleAddAddress}
              disabled={btnLoading}
            >
              {btnLoading ? "Adding..." : "Add Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;

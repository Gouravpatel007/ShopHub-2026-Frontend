// import HomePage from "@/components/admin/HomePage";
// import InfoPage from "@/components/admin/InfoPage";
// import OrdersPage from "@/components/admin/OrdersPage";
// import { Button } from "@/components/ui/button";
// import { UserData } from "@/context/UserContext";
// import { Home, Info, MenuIcon, ShoppingBag, X } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [selectedPage, setSelectedPage] = useState("home");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const navigate = useNavigate();

//   const { user } = UserData();

//   if (user.role !== "admin") return navigate("/");

//   const renderPageContent = () => {
//     switch (selectedPage) {
//       case "home":
//         return <HomePage />;

//       case "orders":
//         return <OrdersPage />;

//       case "info":
//         return <InfoPage />;

//       default:
//         return <HomePage />;
//     }
//   };
//   return (
//     <div className="flex min-h-screen">
//       {/* sidebar */}
//       <div
//         className={`${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } fixed lg:relative lg:translate-x-0 h-full shadow-lg transition-transform duration-300 bg-background/50 border-b backdrop-blur z-50`}
//       >
//         <div className="flex flex-col h-full p-4">
//           <h1 className="text-lg font-bold mb-4">Admin Panel</h1>
//           <div className="space-y-4">
//             <Button
//               variant="ghost"
//               onClick={() => setSelectedPage("home")}
//               className={`w-full flex items-center gap-2 ${
//                 selectedPage === "home" ? "bg-gray-500" : ""
//               }`}
//             >
//               <Home className="w-5 h-5" /> Home
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={() => setSelectedPage("orders")}
//               className={`w-full flex items-center gap-2 ${
//                 selectedPage === "orders" ? "bg-gray-500" : ""
//               }`}
//             >
//               <ShoppingBag className="w-5 h-5" /> Orders
//             </Button>
//             <Button
//               variant="ghost"
//               onClick={() => setSelectedPage("info")}
//               className={`w-full flex items-center gap-2 ${
//                 selectedPage === "info" ? "bg-gray-500" : ""
//               }`}
//             >
//               <Info className="w-5 h-5" /> Info
//             </Button>

//             <Button
//               variant="ghost"
//               className="lg:hidden"
//               onClick={() => setSidebarOpen(false)}
//             >
//               <X className="w-5 h-5" /> Close
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col">
//         <div className="shadow p-4 flex items-center justify-between lg:justify-end">
//           <Button
//             variant="outline"
//             className="lg:hidden"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <MenuIcon className="w-5 h-5" />
//           </Button>
//           <h2 className="text-lg font-bold hidden lg:block">Admin Dashoard</h2>
//         </div>
//         <div className="p-4">{renderPageContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

















































import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HomePage from "@/components/admin/HomePage";
import InfoPage from "@/components/admin/InfoPage";
import OrdersPage from "@/components/admin/OrdersPage";

import { Button } from "@/components/ui/button";
import { UserData } from "@/context/UserContext";

import {
  Home,
  Info,
  Menu as MenuIcon,
  ShoppingBag,
  X,
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = UserData();

  // Check role from available user properties
  const userRole = String(
    user?.role ?? user?._role ?? ""
  ).toLowerCase();

  const isAdmin = userRole === "admin";

  // Redirect only when a user exists but is not an admin
  useEffect(() => {
    if (user && !isAdmin) {
      navigate("/", { replace: true });
    }
  }, [user, isAdmin, navigate]);

  // Wait for user data
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  // Block non-admin users
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking admin access...</p>
      </div>
    );
  }

  // Render selected page
  const renderPageContent = () => {
    switch (selectedPage) {
      case "home":
        return <HomePage />;

      case "orders":
        return <OrdersPage />;

      case "info":
        return <InfoPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-background shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">

          <h1 className="mb-8 text-xl font-bold">
            Admin Panel
          </h1>

          <div className="space-y-3">

            {/* Home */}
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedPage("home");
                setSidebarOpen(false);
              }}
              className={`w-full justify-start gap-3 ${
                selectedPage === "home" ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
            >
              <Home className="h-5 w-5" />
              Home
            </Button>

            {/* Orders */}
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedPage("orders");
                setSidebarOpen(false);
              }}
              className={`w-full justify-start gap-3 ${
                selectedPage === "orders" ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              Orders
            </Button>

            {/* Info */}
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedPage("info");
                setSidebarOpen(false);
              }}
              className={`w-full justify-start gap-3 ${
                selectedPage === "info" ? "bg-gray-200 dark:bg-gray-700" : ""
              }`}
            >
              <Info className="h-5 w-5" />
              Info
            </Button>

          </div>

          {/* Close sidebar on mobile */}
          <Button
            variant="outline"
            className="mt-auto w-full lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>

        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1">

        {/* Header */}
        <header className="flex items-center justify-between border-b p-4">

          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>

          <h2 className="text-lg font-bold">
            Admin Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">
            {user?.email || "Admin"}
          </p>

        </header>

        {/* Selected page */}
        <section className="p-4 md:p-6">
          {renderPageContent()}
        </section>

      </main>
    </div>
  );
};

export default AdminDashboard;

import React from "react";
import Sidebar from "../components/coursesPage/Sidebar";
import PurchaseLayout from "../components/purchasePage/PurchaseLayout";

const Purchases = () => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar></Sidebar>
      <PurchaseLayout></PurchaseLayout>
    </div>
  );
};

export default Purchases;

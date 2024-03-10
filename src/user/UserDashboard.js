import React from "react";
import BuyerAccount from "./BuyerAccount";
import SellerAccount from "../seller/SellerAccount";
import "./User.css";
export default function UserDashboard(props) {

  return (
    <div>
      {props.user.userRole === "buyer" ? (
        <BuyerAccount
          user={props.user}
          product={props}
 
        />
      ) : (
        <SellerAccount
          handleFileInputChange={props.handleFileInputChange}
          previewSourceProduct={props.previewSourceProduct}
          seller={props.seller}
          user={props.user}
          products={props.products}
          handleProductFileInputChange={props.handleProductFileInputChange}
          previewProductFile={props.previewProductFile}
          handleSubmitFileProduct={props.handleSubmitFileProduct}
          loadProductList={props.loadProductList}

        />
      )}
    </div>
  );
}

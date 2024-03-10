import React from "react";
import Axios from "axios";
import Profile from "../user/Profile";
import MyProducts from "./MyProducts";

export default function SellerAccount(props) {

  const addProduct = (product, id) => {
    Axios.post(`/product/add?id=${id}`, product)
      .then((response) => {
        props.handleSubmitFileProduct(response.data.product._id);
        props.loadProductList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(props.seller)

  return (
    <div className="container">
      <Profile user={props.user} loadDashboard={props.loadDashboard} />
      <MyProducts
        handleProductFileInputChange={props.handleProductFileInputChange}
        previewSourceProduct={props.previewSourceProduct}
        previewProductFile={props.previewProductFile}
        handleSubmitFileProduct={props.handleSubmitFileProduct}
        seller={props.seller}
        user={props.user}
        products={props.products}
        addProduct={addProduct}
        loadProductList={props.loadProductList}
      ></MyProducts>
    </div>
  );
}

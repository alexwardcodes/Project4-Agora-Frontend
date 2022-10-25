import React, { useState } from 'react'
import ProductCreateForm from '../product/ProductCreateForm'

export default function MyProducts(props) {
    const [showAddProductForm, setShowAddProductForm] = useState(false)

    console.log(props.product.product.product[0])

    const myProducts = props.product.product.product.map((product, index) => {
        return <div key={index}>
            <p>{product.title}</p>
        </div>
    })


  return (
    <div>
      <button
        onClick={() => {
          setShowAddProductForm(true);
        }}
      >
        Add Product
      </button>

      {showAddProductForm ? (
        <ProductCreateForm></ProductCreateForm>
      ) : (
        <div> </div>
      )}
      <div>{myProducts}</div>
    </div>
  );
}

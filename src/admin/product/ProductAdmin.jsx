import React from "react";
import EditProduct from "./EditProduct";
import ListProduct from "./ListProduct";

function ProductAdmin() {
  return (
    <React.Fragment>
      <EditProduct />
      <ListProduct />
    </React.Fragment>
  );
}

export default ProductAdmin;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json } from "react-router-dom";
import { addProduct, removeProduct, updateProduct } from "../redux/productTodo";

export default function () {
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productQuantity: "",
    status: "",
  });
  const dispatch = useDispatch();

  const getData = useSelector((state) => state?.products || []);
  const[editmode,setEditmode]=useState(false)

  console.log("getData", getData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(addProduct({ ...product }));
    // alert(JSON.stringify(product));
    setProduct({
        productName: "",
        productPrice: "",
        productDescription: "",
        productQuantity: "",
        status: "",
      })

  };

  const handleDelelte=(id)=>{
    // alert(id)
    dispatch(removeProduct(id));

  }


  

  const handleEdit=(item)=>{
    setProduct({
        id: item.id, 
        productName: item?.productName,
        productPrice: item?.productPrice,
        productDescription: item?.productDescription,
        productQuantity:item?.productQuantity,
        status: item?.status,
      })
  
      setEditmode(true);
      
      
  }


  const handleUpdate=()=>{
  
  dispatch(updateProduct({...product}))
 
  setEditmode(false)
  setProduct({
    productName: "",
    productPrice: "",
    productDescription: "",
    productQuantity: "",
    status: "",
  })


  }

  return (
    <div className="container d-flex justify-content-center align-items-center gap-5">
      <div className="card p-5 bg-light w-50 mt-5">
        <div className="card-body d-flex flex-column gap-4">
          <h6 className="text-center mb-4">Add Products</h6>

          <input
            type="text"
            name="productName"
            value={product.productName}
            placeholder="Product Name"
            className="form-control mb-3"
            onChange={handleChange}
          />
          <input
            type="number"
            name="productPrice"
            value={product?.productPrice}
            placeholder="Price"
            className="form-control mb-3"
            onChange={handleChange}
          />
          <input
            type="text"
            name="productDescription"
            value={product?.productDescription}
            placeholder="Description"
            className="form-control mb-3"
            onChange={handleChange}
          />
          <input
            type="number"
            name="productQuantity"
            value={product?.productQuantity}
            placeholder="Quantity"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <div className="d-flex flex-row gap-3">
            <label className="d-flex align-items-center">Available</label>
            <input
              type="radio"
              name="status"
              value="Available"
              checked={product?.status === "Available"}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex flex-row gap-3">
            <label className="d-flex align-items-center">UnAvailable</label>
            <input
              type="radio"
              name="status"
              value="UnAvailable"
              checked={product?.status === "UnAvailable"}
              onChange={handleChange}
            />
          </div>
          <button
            className="btn text-center bg-dark text-white"
            onClick={editmode ? handleUpdate : handleSubmit}
          >
            {editmode?'update product' :'Add Product'}
          </button>
        </div>
      </div>

      <div>
        {getData?.product?.length > 0 ? (
          getData?.product?.map((item) => (
            <div key={item.id} className="card d-flex flex-column p-5 column-gap-2">
              <h5>{item?.id}{"  ID"}</h5>
              <h6>{item?.productName}</h6>
              <p>{item?.productDescription}</p>
              <p>{item?.productPrice} {"  Rs."}</p>
              <p>{item?.productQuantity}{"  Qty"}</p>
              <p style={{ color: "red" }}>{item?.status}</p>
              <div className="d-flex justify-content-between flex-row text-white">
                < button className="btn bg-danger text-white" onClick={()=>handleDelelte(item?.id)}>
                    delete

                </button>
                < button className="btn bg-success text-white" onClick={()=>handleEdit(item)}>
                    Edit

                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

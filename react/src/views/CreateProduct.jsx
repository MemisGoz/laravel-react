import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";

export default function CreateProduct() {

  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({
    id: null,
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: ""
  })
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("ID:", id);

  console.log(id); 
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/products/${id}`)
        .then(({ data }) => {
          setLoading(false);
          const productData = data.data ? data.data : data;
          setProduct(productData);
          console.log(productData); 
        })
        .catch(() => {
          setLoading(false);
        });
    }, [id]);
  }
  
  const onSubmit = async (ev) => {
    ev.preventDefault();
    console.log("onSubmit triggered!");
  
    try {
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("product_description", product.product_description);
      formData.append("product_price", product.product_price);
      formData.append("product_image", product.product_image);
  
      let response;
      if (product.id) {
        // set the "X-HTTP-Method-Override" header to "PUT"
        formData.append("_method", "PUT");
        
        response = await axiosClient.post(`/products/${product.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-HTTP-Method-Override": "PUT"
          },
        });
        navigate("/products/");
        setProduct((prevProduct) => {
          return {
            ...prevProduct,
            ...response.data.data,
            
          }
          
        });
      } else {
        response = await axiosClient.post("/products/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProduct(response.data.data);
        navigate("/products/");
      }
      console.log(response.data); // log the response object
    } catch (error) {
      const response = error.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };
  
  
  
  

  
  return (
    <>
      {(id || product.id) && <h1>Update Product: {product ? product.product_name : ''} </h1>}
      {!id && !product.id && <h1>New Product</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} value>
            
            <input
              value={product ? product.product_name : ''}
              onChange={(ev) =>
                setProduct({ ...product, product_name: ev.target.value })
              }
              placeholder="Name"
            />
            <textarea
              value={product ? product.product_description : ''}
              onChange={(ev) =>
                setProduct({ ...product, product_description: ev.target.value })
              }
              placeholder="Description"
            />
            <input
              value={product ? product.product_price : ''}
              onChange={(ev) =>
                setProduct({ ...product, product_price: ev.target.value })
              }
              placeholder="Price"
            />
                  <label htmlFor="fileInput" className="fileInputButton">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        className="fileInput"
                        onChange={(ev) =>
                          setProduct({ ...product, product_image: ev.target.files[0] })
                    }
/>                 
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function CreateProduct() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState({
    id: null,
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/products/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setProduct(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("product_description", product.product_description);
    formData.append("product_price", product.product_price);
    formData.append("product_image", product.product_image);
  
    if (product.id) {
      axiosClient
        .patch(`/products/${product.id}`, formData)
        .then(() => {
          setNotification("Product was successfully updated");
          navigate("/products/");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/products/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setNotification("Product was successfully created");
          navigate("/products/");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };
  

  
  return (
    <>
      {product.id && <h1>Update Product: {product.product_name}</h1>}
      {!product.id && <h1>New Product</h1>}
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
          <form onSubmit={onSubmit}>
            <input
              value={product.product_name}
              onChange={(ev) =>
                setProduct({ ...product, product_name: ev.target.value })
              }
              placeholder="Name"
            />
            <textarea
              value={product.product_description}
              onChange={(ev) =>
                setProduct({ ...product, product_description: ev.target.value })
              }
              placeholder="Description"
            />
            <input
              value={product.product_price}
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
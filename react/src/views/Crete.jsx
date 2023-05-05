import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function CreForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: ""
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/products/${id}`)
        .then(({data}) => {
          setLoading(false)
          const productData = data.data ? data.data : data;
          setUser(productData);
          console.log(productData); // Check if the fetched data includes the id
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log("onSubmit triggered!");
    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("product_description", product.product_description);
    formData.append("product_price", product.product_price);
    formData.append("product_image", product.product_image);
  
    if (product.id) {
      axiosClient
        .put(`/products/${product.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => { // added destructuring of response to get data property
          setProduct(data.data); // update the state with new data received from the server
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
        .then(({ data }) => {
          setProduct(data.data); // update the state with new data received from the server
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
      {user.id && <h1>Update User: {user.product_name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={user.product_name} onChange={ev => setUser({...user, product_name: ev.target.value})} placeholder="Name"/>
            <input value={user.product_description} onChange={ev => setUser({...user, product_description: ev.target.value})} placeholder="Email"/>
            <input value={user.product_price} onChange={ev => setUser({...user, product_price: ev.target.value})} placeholder="Email"/>
            <input  value={user.product_image} onChange={ev => setUser({...user, product_image: ev.target.value})} placeholder="Email"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}

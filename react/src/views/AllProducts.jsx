import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const onDeleteClick = (product) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    axiosClient.delete(`/products/${product.id}`).then(() => {
      getProducts();
    });
  };

  const getProducts = () => {
    setLoading(true);
    axiosClient
      .get("/products")
      .then(({ data }) => {
        setLoading(false);
        setProducts(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="px-2 w-full">
      <div className="flex justify-between items-center mb-4 px-12">
        <h1>Products</h1>
        <Link className="btn-add" to="/products/new">
          Add new
        </Link>
      </div>
      <div className="card animated fadeInDown w-full">
        <table className="w-full grid justify-center">
          <thead className="w-full">
            <tr className="grid grid-cols-12 w-[1300px]  justify-items-center">
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th className="col-span-6">Img</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="6" class="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="grid grid-cols-12 w-[1300px] justify-items-center">
                  <td>{p.id}</td>
                  <td>{p.product_name}</td>
                  <td>{p.product_description}</td>
                  <td >{p.product_price}</td>
                  <img className="col-span-6" src={`http://localhost:8000/${p.product_image}`} alt="Product" />
                  {console.log(p.product_image)}
                  <td>
                    <Link className="btn-edit" to={`/products/${p.id}`}>
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      className="btn-delete"
                      onClick={(ev) => onDeleteClick(p)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      
    </div>
  );
}
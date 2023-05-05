import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { Provider } from "react-redux";
import store from "../redux/store"; // import your store

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/products/")
      .then((res) => setPosts(res.data.data)); // <-- modify this line
      
  }, []);
  

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        id: product.id,
        name: product.product_name,
        price: product.product_price,
        image: product.product_image,

      })
    );
  };
 
  const productss = posts.map((post) => {
    return (
      <div
        key={post.id}
        className="products-compact w-72 bg-base-200 shadow-xl m-4"
      >
        <div className="products-body rounded-lg shadow-lg h-full flex flex-col justify-between">
          <div className="p-4">
            <h2 className="products-title text-lg font-bold max-h-20">
              {post.product_name}
            </h2>

            <img src={`http://localhost:8000/${post.product_image}`} alt="Product" />

            <p className="text-white text-base mt-2">
              {post.product_description}
            </p>
           
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <div className="price font-bold text-xl">{post.product_price} DKK</div>
            <button
              className="btn btn-primary"
              id="addtocart"
              onClick={() =>
                handleAddToCart({
                  id: post.id,
                  product_name: post.product_name,
                  product_description: post.product_description,
                  product_price: post.product_price,
                  product_image: post.product_image,
                })
              }
            >
              Køb
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="flex flex-wrap justify-center m-6">{productss}</div>
    </>
  );
};

const ProductsWrapper = () => {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
};

export default ProductsWrapper;

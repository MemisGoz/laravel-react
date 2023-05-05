import React from "react";
import { useSelector, useDispatch, Provider } from 'react-redux';
import { addToCart, removeFromCart, decreaseCart, clearCart } from '../redux/CartSlice';
import { selectCartItems, selectCartTotalQuantity, selectCartTotalAmount } from '../redux/CartSlice';
import { Link } from 'react-router-dom';
import store from "../redux/store"; // import your store

function Cart() {
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseItem = (item) => {
    dispatch(decreaseCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="flex justify-center">
      <table className="table w-10/12 my-32 text-center">
        {" "}
          {/* conditionally render cart items */}
          {cart.cartItems.length === 0 ? (
            <div className="flex justify-center my-32 ">
              <Link
                to="/Shop"
                className="block text-white outline text-center rounded"
              >
                <div className="card p-10 rounded-lg ">
                  <h1 className="text-center font-bold text-3xl mb-4">
                    Your cart is empty
                  </h1>
                  <span className="text-center font-bold text-2xl mb-4 underline ">
                    Start shopping!
                  </span>
                </div>
              </Link>
            </div>
          ) : (
            <>
              {/* table header */}
              <thead>
                <tr>
                  <th className="font-bold text-xl">Product</th>
                  <th className="font-bold text-xl">quantity</th>
                  <th className="font-bold text-xl">Price</th>
                  <th className="font-bold text-xl">Add/Remove</th>
                </tr>
              </thead>
              {/* table body */}
              <tbody>
                {cartItems.map((item) => (
                  <tr>
                    <td key={item.id}>
                      <div className="flex items-center space-x-3 ">
                        <div className="avatar mx-auto">
                          <div className="mask mask-circle w-12 h-12">
                          <img src={`http://localhost:8000/${item.image}`} alt="Product" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.price} DKK</td>
                    <td>
                      <div className="btn-group">
                        <button
                          onClick={() => handleDecreaseItem(item)}
                          className="btn "
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="btn btn-danger"
                        >
                          REMOVE
                        </button>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="btn "
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* table footer */}
              <tfoot>
                <tr>
                  <td></td>
                  <td className="font-bold text-xl">
                    Total quantity: {totalQuantity}
                  </td>
                  <td className="font-bold text-xl">
                    Total amount: {totalAmount} DKK
                  </td>
                  <td>
                    <button
                      onClick={() => handleClearCart()}
                      className=" btn btn-outline btn-danger btn-sm cartClear "
                    >
                      Clear Cart
                    </button>
                  </td>
                </tr>
              </tfoot>
            </>
          )}
        </table>
      </div>
    </>
  );
}

const CartWrapper = () => {
    return (
      <Provider store={store}>
        <Cart />
      </Provider>
    );
  };

export default CartWrapper;
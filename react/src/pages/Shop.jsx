import React from "react";
import Products from "../components/Products";

function Shop() {
  return (
    <>
      <div className="">
        <div className="bg-base-200 p-12">
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img
                src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA1fHxzbmVha2VyfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                className="max-w-xl rounded-lg shadow-2xl"
                alt="hero-shop"
              />
              <div className="col-4">
                <h1 className="text-5xl font-bold">
                  Step up your sneakergame!
                </h1>
                <div className="py-6">
                  <p>
                    Our collection features top brands and styles that cater to
                    all tastes and preferences. Whether you're into classic
                    sneakers, retro styles, or the latest trends, we have
                    something for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-36 my-24">
          <h1 className="font-bold text-5xl text-center mb-20">
            Product list of Sneakers
          </h1>
          <Products />
        </div>
      </div>
    </>
  );
}

export default Shop;
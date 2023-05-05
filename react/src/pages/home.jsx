import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import Waitlist from "../components/Waitlist.jsx";
import Newsletter from "../components/Newsletter.jsx";
import { useStateContext } from "../context/ContextProvider";



function Home() {
    const { user, token } = useStateContext();

    if (token) {
      return <Navigate to="/" />;
    }

  return (
    <>
       
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1617695103171-8f9c25f014c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80)`,
        }}
      >
        
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-5xl">
            <h1 className="mb-5 text-5xl font-bold">Shoe'Fix</h1>
            <p className="mb-5 text-2xl font-semibold">
              From classic favorites to the hottest releases, we've got
              everything you need to take your sneaker collection to the next
              level.
            </p>
            <Link to="/shop">
              <button className="btn btn-primary">See our selection</button>
            </Link>
          </div>
        </div>
      </div>
      <Waitlist />
      <div class="card card-side shadow-xl text-center text-6xl bg-base-200">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1508125673219-7cec6bc90159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
            alt="Sneaker"
          />
        </figure>
        <div class="card-body text-center justify-center items-center">
          <h2 class="card-title text-center text-5xl font-bold">
            Fresh kicks, fresh start.
          </h2>
          <div class="stats stats-vertical shadow d-flex flex-col mt-16">
            <div class="stat">
              <div class="stat-title text-xl">5-star reviews</div>
              <div class="stat-value">2.4K</div>
            </div>

            <div class="stat">
              <div class="stat-title text-xl">Orders done</div>
              <div class="stat-value">4,322</div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
      
    </>
  );
}

export default Home;

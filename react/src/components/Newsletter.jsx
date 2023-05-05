import React, { useRef, useState } from "react";

function Newsletter() {
  const emailInputRef = useRef(null);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailInput = emailInputRef.current;
    emailInput.value = "";
    setShowThankYouMessage(true);
  };

  return (
    <>
      <div className="hero min-h-1/2 bg-base-200 mt-12">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              Subscribe to our newsletter now!
            </h1>
            <p className="py-6">
              Be the first to know about the latest sneaker drops, exclusive
              offers, and promotions! Sign up for our newsletter and stay
              up-to-date with everything happening at Shoe'Fix.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="input input-bordered"
                    ref={emailInputRef}
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Sign up!
                  </button>
                </div>
              </form>
              {showThankYouMessage && (
                <p className="text-center mt-6 text-green-600">Thank you!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newsletter;

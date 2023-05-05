import React from "react";
import { useState, useEffect } from "react";

function Waitlist() {
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(24);
  const [seconds, setSeconds] = useState(47);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(timer);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <>
      <div class="hero bg-base-100 p-16">
        <div class="hero-content flex-col lg:flex-row">
          <img
            src="https://images.unsplash.com/photo-1524532787116-e70228437bbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            class="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 class="text-5xl font-bold">AIR JORDAN 1 EGKWHITE</h1>
            <p class="py-6">
              Get on the waiting list for the next drop. We'll let you know as
              soon as they're available. You'll also be the first to know about
              future drops.
            </p>
<label for="my-modal-3" class="btn">GET ON THE LIST!</label>

<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 class="text-lg font-bold">Sorry!</h3>
    <p class="py-4">Our list is full. Consider subscribing to our newsletter to be first to know about new drops!</p>
  </div>
</div>{" "}
            <span className="countdown font-bold text-2xl">
              <span style={{ "--value": hours }}></span>h
              <span style={{ "--value": minutes }}></span>m
              <span style={{ "--value": seconds }}></span>s
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Waitlist;
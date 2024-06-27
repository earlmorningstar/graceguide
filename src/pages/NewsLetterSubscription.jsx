import { useState } from "react";

import "./AllStyles.css";

function NewsLetterSubscription() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };
  return (
    <>
      <div className="newsletter">
        <form onSubmit={handleSubmit}>
          <label>Your Email*</label>
          <div className="newsletter-input-btn">
            <input
              type="email"
            //   placeholder="Your email goes here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Join</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewsLetterSubscription;

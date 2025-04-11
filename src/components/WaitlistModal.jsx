import React, { useState, useEffect } from 'react';
import './WaitlistModal.css';

const WaitlistModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Wait for mount to apply the visible class (triggers animation)
    setTimeout(() => setVisible(true), 10);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    fetch("/", {
      method: "POST",
      body: data,
    }).then(() => setSubmitted(true))
      .catch((error) => {
        alert("Submission error! Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${visible ? 'visible' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>×</button>

        {submitted ? (
          <div className="success-message">
            <h2 className="modal-title gradient-text">You're on the list!</h2>
            <p className="modal-caption">Thanks for your interest in TwinNU. We’ll reach out soon.</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title gradient-text">Join the TwinNU Waitlist</h2>
            <p className="modal-caption">Join the Twiniverse and let your twin do the networking for you.</p>

            <form
              className="waitlist-form"
              name="waitlist"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="waitlist" />
              <p className="hidden">
                <label>Don’t fill this out: <input name="bot-field" /></label>
              </p>

              <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" placeholder="Name" required />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" placeholder="Email" required />
              </div>

              <div>
                <label htmlFor="affiliation">Affiliation</label>
                <input id="affiliation" type="text" name="affiliation" placeholder="Affiliation" required />
              </div>

              <div>
                <label htmlFor="interest">Why are you interested?</label>
                <textarea id="interest" name="interest" placeholder="Why are you interested?" rows="4" required />
              </div>

              <div className="submit-wrapper">
                <button type="submit">Submit</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;

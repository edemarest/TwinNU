import React, { useState, useEffect } from 'react';
import './WaitlistModal.css';

const WaitlistModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
            <p className="modal-caption">We’ll keep you in the loop about the Twiniverse ✨</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title gradient-text">Join the TwinNU Waitlist</h2>
            <p className="modal-caption">Curious about the Twiniverse?<br />Share your email and we’ll keep you in the loop.</p>

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
                <label htmlFor="email">Email (required)</label>
                <input id="email" type="email" name="email" placeholder="your@email.com" required />
              </div>

              <div>
                <label htmlFor="affiliation">Your affiliations (e.g. major, grad year, groups)</label>
                <input id="affiliation" type="text" name="affiliation" placeholder="Affiliation (optional)" />
              </div>

              <div>
                <label htmlFor="interests">People, places, or events you’d like to encounter?</label>
                <textarea id="interests" name="interests" rows="3" placeholder="Let us know what excites you..." />
              </div>

              <div>
                <label htmlFor="comments">Any thoughts or comments?</label>
                <textarea id="comments" name="comments" rows="3" placeholder="Optional message..." />
              </div>

              <div>
                <label htmlFor="name">Your name</label>
                <input id="name" type="text" name="name" placeholder="Name (optional)" />
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

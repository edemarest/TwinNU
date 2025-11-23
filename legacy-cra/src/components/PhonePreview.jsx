import React from 'react';
import './PhonePreview.css';

const PhonePreview = () => {
    return (
        <div className="phone-preview-wrapper">
            <img src="images/phone_2.svg" alt="phone 2" className="phone phone-back" />
            <img src="images/phone_1.svg" alt="phone 1" className="phone phone-front" />
        </div>
    );
};

export default PhonePreview;

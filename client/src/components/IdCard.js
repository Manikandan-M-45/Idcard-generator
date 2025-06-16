import React from "react";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";

const IdCard = ({ cardData }) => {
  const cardRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => cardRef.current,
  });

  if (!cardData) return null;

  return (
    <div className="id-card-container">
      <div className="id-card" ref={cardRef}>
        <div className="id-card-header">
          <h2>Company Name</h2>
          <p>Employee ID Card</p>
        </div>

        <div className="id-card-body">
          <div className="id-card-image">
            <img
              src={`http://localhost:5000${cardData.imagePath}`}
              alt="Profile"
            />
          </div>

          <div className="id-card-details">
            <p>
              <strong>Name:</strong> {cardData.name}
            </p>
            <p>
              <strong>Email:</strong> {cardData.email}
            </p>
            <p>
              <strong>Address:</strong> {cardData.address}
            </p>
            <p>
              <strong>ID:</strong> {cardData._id.slice(-6).toUpperCase()}
            </p>
          </div>
        </div>
      

        <div className="id-card-footer">
          <p>Valid until: {new Date().getFullYear() + 2}</p>
        </div>
      </div>
      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={`My name is ${cardData.name} and i'm in ${cardData.address}.My Id no is ${cardData._id.slice(-6).toUpperCase()}. Contact me: ${cardData.email}`}
          viewBox={`0 0 256 256`}
        />
      </div>
      <button onClick={handlePrint} className="print-button">
        Print ID Card
      </button>
    </div>
  );
};

export default IdCard;

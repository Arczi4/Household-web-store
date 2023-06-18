import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import MapContainer from "../../Components/MapContainer/MapContainer";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <Header />
      <div className="map-container">
        <MapContainer />
      </div>
      <div className="contact-content">
        <div className="row">
          <div className="column">
            <h3>Contact</h3>
            <p>It's very easy to get in touch with us!</p>
          </div>
          <div className="column">
            <h3>Phone</h3>
            <p>111 222 333</p>
          </div>
          <div className="column">
            <h3>E-mail</h3>
            <p>shopping@dka.pl</p>
          </div>
        </div>
        <div className="row">
          <div className="column address-column">
            <h3>Address</h3>
            <p>Zakładowa 138</p>
            <p>58-500 Wrocław</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;

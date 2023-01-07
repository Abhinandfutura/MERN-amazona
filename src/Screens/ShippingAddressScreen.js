import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../Components/CheckoutSteps";
function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: cxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  console.log("=============", state);
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?reddirect?=/shipping");
    }
  }, [userInfo, navigate]);
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();

    cxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" contrlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />

            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ShippingAddressScreen;

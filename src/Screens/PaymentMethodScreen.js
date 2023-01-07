import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: cxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "paypal"
  );

  useEffect(() => {
    console.log(shippingAddress);
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    cxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/plceorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="Paypal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Strip"
              label="Strip"
              value="Strip"
              checked={paymentMethodName === "Strip"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PaymentMethodScreen;

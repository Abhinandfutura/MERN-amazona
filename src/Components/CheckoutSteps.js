import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Sing-In </Col>
      <Col className={props.step2 ? "active" : ""}>Shipping </Col>
      <Col className={props.step3 ? "active" : ""}>Payment </Col>
      <Col className={props.step4 ? "active" : ""}>Place Order</Col>
    </Row>
  );
}

export default CheckoutSteps;

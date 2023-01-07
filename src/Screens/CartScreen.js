import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../Components/MessageBox";
import { Store } from "../Store";

function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const updateHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry  ! product is out Stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = async (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((i) => (
                <ListGroup.Item key={i._id}>
                  <Row className="align-item-center">
                    <Col md={4}>
                      <img
                        src={i.image}
                        alt={i.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>
                      <Link to={`/product/${i.slug}`}>{i.name}</Link>
                    </Col>
                    {/* //=====================Minus ======== */}
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() => updateHandler(i, i.quantity - 1)}
                        disabled={i.quantity === 1}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </Button>
                      <span>{i.quantity}</span>

                      {/* //=====================Plus ======== */}

                      <Button
                        variant="light"
                        onClick={() => updateHandler(i, i.quantity + 1)}
                        disabled={i.quantity === i.countInStock}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${i.price}</Col>
                    <Col md={2}>
                      {/* //=====================Delete ======== */}

                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(i)}
                        disabled={i.quantity === 1}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}
                    ,items) :$
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="button "
                      onClick={checkOutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;

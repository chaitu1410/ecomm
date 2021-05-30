import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

import Message from '../conponents/Message';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';


export default function CartScreen({ match, location, history }) {
    const productId = match.params.id;
    const quantity = location.quantity;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId && quantity) {
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity])

    const onProceedToCheckoutClick = () => {
        history.push("/Login?redirect=Shipping");
    }

    const getSubtotal = () => {
        return cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0).toFixed()
    }

    const getTotalItems = () => {
        return cartItems.reduce((acc, item) => (acc + item.quantity), 0)
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? (
                        <Message variant="info">
                            Your cart is empty, <Link to="/" style={{ textDecoration: "none" }}>Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {
                                cartItems.map((item) => (
                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/Product/${item.product}`} style={{ textDecoration: "none" }}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ₹{item.price}
                                            </Col>
                                            <Col md={3}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.quantity}
                                                    onChange={(e) => { dispatch(addToCart(item.product, e.target.value)) }}
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    as="button"
                                                    variant="light"
                                                    onClick={() => { dispatch(removeFromCart(item.product)) }}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal({getTotalItems()})</h2>
                            ₹{getSubtotal()}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block w-100"
                                disabled={cartItems.length === 0}
                                onClick={onProceedToCheckoutClick}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';

import { getProduct } from '../redux/actions/productActions';

import Rating from '../conponents/Rating';
import Loading from '../conponents/Loading';
import Message from '../conponents/Message';

// import products from '../products';

export default function ProductScreen({ match }) {
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(getProduct(match.params.id));
    }, [dispatch, match]);

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {
                loading ? <Loading />
                    : error ? <Message variant="danger">{error}</Message>
                        :
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>

                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ₹{product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description:<br />{product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>₹{product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Button className="btn btn-block" type="button" style={{ "width": "100%" }} disabled={!product.countInStock}>Add to Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
            }
        </div>
    )
}

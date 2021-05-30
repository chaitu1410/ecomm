import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap';
import axios from 'axios';

import Rating from '../conponents/Rating';

// import products from '../products';

export default function ProductScreen({ match }) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        (async function () {
            const { data } = await axios.get(`/api/products/${match.params.id}`);
            setProduct(data);
        })();
    });

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
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
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

import Product from "../conponents/Product";

// import products from '../products';

export default function HomeScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        /// IIFE
        (async function () {
            const { data } = await axios.get("/api/products/");
            setProducts(data);
        })();
    }, []);

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

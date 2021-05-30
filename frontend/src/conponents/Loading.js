import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loading() {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{
                height: "5rem",
                width: "5rem",
                margin: "auto",
                display: "block"
            }}
        >
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

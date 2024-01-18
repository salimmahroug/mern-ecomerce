import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';

export default function ProductCreateScreen() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [numReviews, setNumReviews] = useState(0);
    const [slug, setSlug] = useState('');

    const [error, setError] = useState('');

    const { state } = useContext(Store);
    const { userInfo } = state;

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                '/api/products/admin/create',
                {
                    name,
                    price,
                    image,
                    category,
                    countInStock,
                    brand,
                    description,
                    rating,
                    numReviews,
                    slug,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            navigate(`/admin/product/${data.product._id}`);
        } catch (err) {
            setError(err.response.data.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <Container className="small-container">
            <Helmet>
                <title>Create Product</title>
            </Helmet>
            <h1 className="my-3">Create Product</h1>
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" required onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control required onChange={(e) => setImage(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control onChange={(e) => setCategory(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control type="number" required onChange={(e) => setCountInStock(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control onChange={(e) => setBrand(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} required onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control type="number" step="0.1" min="0" max="5" onChange={(e) => setRating(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="numReviews">
                    <Form.Label>Number of Reviews</Form.Label>
                    <Form.Control type="number" onChange={(e) => setNumReviews(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="slug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control onChange={(e) => setSlug(e.target.value)} required />
                </Form.Group>

                <div className="mb-3">
                    <Button type="submit">Create Product</Button>
                </div>

                <div className="mb-3">
                    <Link to="/admin/products">Back to Product List</Link>
                </div>
            </Form>
        </Container>
    );
}
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct(productId);
    }, [productId]);

    const fetchProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/product/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token 71a52fe8a247496ea7be30a30d5f1fd366ea7b2e'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch product from the API');
            }

            const data = await response.json();
            setProduct(data.data);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value);
        setQuantity(value);
    };

    const handleAddToCart = () => {
        // TODO: implement adding to cart functionality!
        const message = `Added ${quantity} item(s) of product ${productId} to the cart.`;
        window.alert(message);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    const { product_name, description, stock, image, price, rating } = product.attributes;

    return (
        <div>
            <Header />
            <div className="container">
                <div className="image">
                    <img src={image} alt={product_name} />
                </div>
                <div className="details">
                    <h2 className="name">
                        {product_name}
                        {rating && (
                            <span className="rating">
                                <FontAwesomeIcon icon={faStar} />
                                {rating}
                            </span>
                        )}
                    </h2>
                    <p className="description">{description}</p>
                    <p className="price">{price} zł</p>
                    <p>{stock > 0 ? 'In stock' : 'Out of stock'}</p>
                    <div className="add-to-cart">
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="quantity-selector"
                        />
                        <button onClick={handleAddToCart} className="button">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;

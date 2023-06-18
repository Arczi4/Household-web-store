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
                    'Authorization': 'Token 312f0749f5cec769c023b9153cec667c1b5664fe'
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
    
    const handleAddToCart = () => {
        // TODO: implement adding to cart functionality!
        const message = `Added ${quantity} item(s) of product ${product_name} to the cart.`;
        window.alert(message);
        sessionStorage.setItem('product_count', Number(sessionStorage.getItem('product_count'))+1);
        const existingObject = JSON.parse(sessionStorage.getItem('product')) || [];
        // Merge the new object with the existing object
        product['quantity'] = quantity
        const updatedObject = [ ...existingObject, product ];
        // Store the updated object in session storage
        sessionStorage.setItem('product', JSON.stringify(updatedObject));
        window.location.reload()
    };
    // sessionStorage.clear()
    
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

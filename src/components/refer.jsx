import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Card() {
  const { data, cart, setData, setCart, totalPrice, setTotalPrice } = useContext(myContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addQuantity, setAddQuantity] = useState(1);

  const currentItem = data[currentIndex];
  const maxQuantity = currentItem.rating.count;

  useEffect(() => {
    // Update total price whenever the cart changes
    const newTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cart, setTotalPrice]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % data.length;
      setAddQuantity(1); // Reset quantity when switching items
      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + data.length) % data.length;
      setAddQuantity(1); // Reset quantity when switching items
      return newIndex;
    });
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= maxQuantity) {
      setAddQuantity(value);
    }
  };

  const removeItem = () => {
    if (data.length === 1) {
      alert("Cannot remove the last item.");
      return;
    }

    setData((prevData) => {
      const newData = [...prevData];
      newData.splice(currentIndex, 1);
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= newData.length) {
          return newData.length - 1;
        }
        return prevIndex;
      });
      return newData;
    });
  };

  const addToCart = () => {
    const existingItem = cart.find(item => item.id === currentItem.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === currentItem.id ? { ...item, quantity: item.quantity + addQuantity } : item
      ));
    } else {
      setCart([...cart, { ...currentItem, quantity: addQuantity }]);
    }
  };

  return (
    <div className="card-container">
      <div className="row g-0">
        {/* Image column */}
        <div className="col-md-3 imgStyle">
          <img
            src={currentItem.image}
            className="img-fluid rounded-start"
            alt={currentItem.title}
          />
        </div>
        {/* Text and quantity column */}
        <div className="col-md-5">
          <div className="card-body">
            <h5 className="card-title">{currentItem.title}</h5>
            <p className="card-text mb-3">
              <strong>Category:</strong> {currentItem.category}
            </p>
            <p className="card-text mb-3">{currentItem.description}</p>
            <div className="mb-3">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={index < currentItem.rating.rate ? 'text-warning' : 'text-secondary'}
                />
              ))}
            </div>
            <div className="d-flex align-items-center mb-3">
              <input
                type="number"
                value={addQuantity}
                onChange={handleQuantityChange}
                min="1"
                max={maxQuantity}
                className="form-control me-2"
                style={{ width: "70px" }}
              />
              <span className="fw-bold">Quantity</span>
            </div>
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={handlePrev}
                disabled={data.length <= 1}
              >
                Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={data.length <= 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Price and remove button column */}
        <div className="col-md-4 remove">
          <h3 className="mb-4 " style={{ textAlign: 'center', paddingLeft: '100px' }}>
            ${currentItem.price.toFixed(2)}
          </h3>
          <button className="btn btn-danger" style={{ marginBottom: '20px', marginLeft: '100px' }} onClick={removeItem}>
            Remove
          </button>
          <button className="btn btn-primary me-2" style={{ marginBottom: '20px', marginLeft: '100px' }} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

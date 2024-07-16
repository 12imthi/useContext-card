import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Card() {
  const {data, setData,totalPrice,setTotalPrice} = useContext(myContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addQuantity, setAddQuantity] = useState(1);
  // const [totalPrice, setTotalPrice] = useState(data[0].price);
  const [removeCard, setRemoveCard] = useState(data[0].id);
const [rating,setRating] = useState()

  console.log(removeCard);
  const currentItem = data[currentIndex];
  const maxQuantity = currentItem.rating.count;
 


  useEffect(() => {
    setTotalPrice(currentItem.price * addQuantity); // updating phase
  }, [currentItem, addQuantity]); // unmounting phase

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % data.length;
      console.log(`Current Index: ${prevIndex}, Next Index: ${newIndex}`);
      setAddQuantity(1); // Reset quantity when switching items
      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + data.length) % data.length;
      console.log(`Current Index: ${prevIndex}, Previous Index: ${newIndex}`);
      setAddQuantity(1); // Reset quantity when switching items
      return newIndex;
    });
  };

  //   const increaseQ = () => {
  //     setAddQuantity((prevQ) => {
  //       const newQ = prevQ + 1;
  //       if (newQ <= maxQuantity) {
  //         return newQ;
  //       } else {
  //         return prevQ;
  //       }
  //     });
  //   };

  //   const decreaseQ = () => {
  //     setAddQuantity((prevQ) => {
  //       const newQ = prevQ - 1;
  //       if (newQ >= 0) {
  //         return newQ;
  //       } else {
  //         return prevQ;
  //       }
  //     });
  //   };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    console.log(value);
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
        <h3 className="mb-4 " style={{textAlign:'center',paddingLeft: '100px'}}>${totalPrice.toFixed(2)}</h3>
        <button className="btn btn-danger" style={{marginBottom: '20px',marginLeft: '100px'}} onClick={removeItem}>
          Remove
        </button>
      </div>
    </div>
  </div>
  );
}

export default Card;

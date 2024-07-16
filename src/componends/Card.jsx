import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../App";

function Card() {
  const [data, setData] = useContext(myContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addQuantity, setAddQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(data[0].price);
const [removeCard,setRemoveCard] = useState(data[0].id)
console.log(removeCard);
  const currentItem = data[currentIndex];
  const maxQuantity = currentItem.rating.count;

  useEffect(() => {
    setTotalPrice(currentItem.price * addQuantity); // updating phase
  }, [currentItem,addQuantity]); // unmounting phase

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
    <div className="card-container ">
    <div className="row g-0">
      <div className="col-md-3">
        <img src={currentItem.image} className="img-fluid rounded-start" alt={currentItem.title} />
      </div>
      <div className="col-md-5">
        <div className="card-body">
          <h5 className="card-title">{currentItem.title}</h5>
          <p className="card-text"><strong>Category: </strong>{currentItem.category}</p>
          <p className="card-text">{currentItem.description}</p>
          <div className="d-flex align-items-center">
            <input
              type="number"
              value={addQuantity}
              onChange={handleQuantityChange}
              min="1"
              max={maxQuantity}
              className="form-control me-2"
              style={{ width: "70px" }}
            />
            <span>Quantity</span>
          </div>
          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handlePrev}>Previous</button>
            <button className="btn btn-primary" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
      <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <h3>${totalPrice.toFixed(2)}</h3>
        <button className="btn btn-danger mt-2" onClick={removeItem}>Remove</button>
      </div>
    </div>
  </div>
  );
}

export default Card;

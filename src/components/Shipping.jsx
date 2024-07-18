import React from "react";
import { useContext } from "react";
import { myContext } from "../App";

function Shipping() {
  const {cart} = useContext(myContext);

  console.log('frf ',cart);

  return (
    <div className="col-12  shipping">
      <div className="col-6">
        <span>SubTotal : </span> <br />
        <span>Shipping : </span>
      </div>
      <div className="col-6">
        <div>
          <span style={{fontWeight: 'bold'}}>{cart.price}</span>
        </div>
        <div>
          <span>Free</span>
        </div>
      </div>
    </div>
  );
}

export default Shipping;

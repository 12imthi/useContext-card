import React from "react";
import { useContext } from "react";
import { myContext } from "../App";

function Shipping() {
  const [data, setData] = useContext(myContext);

  return (
    <div className="col-12  shipping">
      <div className="col-6">
        <span>SubTotal : </span> <br />
        <span>Shipping : </span>
      </div>
      <div className="col-6">
        <div>
          <span>{data[0].price}</span>
        </div>
        <div>
          <span>Free</span>
        </div>
      </div>
    </div>
  );
}

export default Shipping;

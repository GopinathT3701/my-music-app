import React from "react";

function Garage(props) {
    

  const {carinfo} = props
  const {brand,color} = carinfo

  return (
    <>

      <h2>
       I have a {brand}  {color} my garage
      </h2>
    </>
  );
}

export default Garage;
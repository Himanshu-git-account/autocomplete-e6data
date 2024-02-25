import React from "react";
import CardItem from "./CardItem";

const CardContainer = ({ card }) => {
  return (
    <div className="row card-container ">
      {card.map((item) => (
        <CardItem item={item} />
      ))}
    </div>
  );
};

export default CardContainer;

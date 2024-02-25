import React from "react";

const CardItem = ({ item }) => {
  const { title, summary, author } = item;
  return (
    <div className="col-3 card-item ">
      <div class="card ">
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{author}</h6>
          <p class="card-text">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;

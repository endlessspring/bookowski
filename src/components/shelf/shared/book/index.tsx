import React from "react";
import "./style.scss";

type Props = {
  title?: string;
  cover?: string;
};

const Book: React.FC<Props> = ({ title, cover }) => {
  return (
    <div className="bb-book">
      <div className="bb-book-cover">
        <img src={cover} alt="1" />
      </div>
      <div className="bb-book-footer">
        <div className="bb-book-title">{title}</div>
      </div>
    </div>
  );
};

export default Book;

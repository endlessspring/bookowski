import React from "react";
import "./style.scss";

type Props = {
  title?: string;
};

const Book: React.FC<Props> = ({ title }) => {
  return (
    <div className="bb-book">
      <div className="bb-book-cover"></div>
      <div className="bb-book-footer">{title}</div>
    </div>
  );
};

export default Book;

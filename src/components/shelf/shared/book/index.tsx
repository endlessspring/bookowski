import { WebviewWindow } from "@tauri-apps/api/window";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";

type Props = {
  id: any;
  title?: string;
  cover?: string;
  path?: string;
};

const Book: React.FC<Props> = ({ id, title, cover, path }) => {
  
  console.log(id);
  
  const navigate = useNavigate()
  return (
    <div
      className="bb-book"
      onClick={() => {
        navigate(`/reader/${id}`)
      }}
    >
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

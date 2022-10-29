import React from "react";

import "./style.scss";

type Props = {
  title?: string;
  children?: any;
};

const Page: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="bb-shelf-page">
      <div className="bb-shelf-page-header">
        <div className="bb-shelf-page-title">{title}</div>
      </div>
      <div className="bb-shelf-page-content">{children}</div>

      <div className="bb-shelf-page-footer"></div>
    </div>
  );
};

export default Page;

import React from "react";

import "./style.scss";

type Props = {
  title?: string;
  children?: any;
  toolbar?: React.ReactElement;
};

const Page: React.FC<Props> = ({ children, title, toolbar }) => {
  return (
    <div className="bb-shelf-page">
      <div className="bb-shelf-page-header">
        <div className="bb-shelf-page-title">{title}</div>
        <div className="bb-shelf-page-toolbar">{toolbar && toolbar}</div>
      </div>
      <div className="bb-shelf-page-content">{children}</div>

      <div className="bb-shelf-page-footer"></div>
    </div>
  );
};

export default Page;

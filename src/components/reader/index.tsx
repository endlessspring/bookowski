import Epub from "epubjs";
import ePub, { Book } from "epubjs";
import Url from "epubjs/types/utils/url";
import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo, useRef } from "react";
import { ReactReader } from "react-reader";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { useStore } from "../../hooks/useStore";

import "./style.scss";

const Reader: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { bookStore } = useStore();

  const book = bookStore.getBookById(Number(id))

  const navigate = useNavigate();

  const buffer = useMemo( () => book?.getBufferArray(), [book?.path])



  
  return (
    <div className="bb-reader">
      <div className="bb-reader-header">
        {/* <button onClick={() => navigate(-1)}>back</button> */}
      </div>
      <div className="bb-reader-content">
        {buffer && <ReactReader url={buffer}/>}
      </div>
      <div className="bb-reader-footer"></div>
    </div>
  );
});
export default Reader;

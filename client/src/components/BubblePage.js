import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [toggle, setToggle] = useState(false);

  const getColors = () => {
    axiosWithAuth()
      .get("/colors")
      .then(res => setColorList(res.data))
      .catch(err => console.log("bubblepage err", err));
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        fetchReq={getColors}
        setToggle={setToggle}
        toggle={toggle}
      />
      <Bubbles colors={colorList} toggle={toggle} />
    </>
  );
};

export default BubblePage;

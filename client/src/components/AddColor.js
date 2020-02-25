import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../styles.scss";
const initialColor = {
  color: "",
  code: { hex: "" }
};

const AddColor = ({ updateColors, setToggle, toggle }) => {
  const [creating, setCreating] = useState(false);
  const [newColor, setNewColor] = useState(initialColor);
  const [houdini, setHoudini] = useState(true);

  const createColor = () => {
    setCreating(true);
    setHoudini(false);
  };

  const addColorFn = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", newColor)
      .then(res => {
        updateColors(res.data);
        setNewColor(initialColor);
      })
      .catch(err => console.log("newColor err", err));
  };

  return (
    <div>
      <div className="button-shed">
        {houdini && (
          <button onClick={createColor} className="add">
            add color
          </button>
        )}
        <button className="add" onClick={() => setToggle(!toggle)}>
          toggle
        </button>
      </div>
      {creating && (
        <form className="addform" onSubmit={addColorFn}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setNewColor({ ...newColor, color: e.target.value })
              }
              value={newColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setNewColor({
                  ...newColor,
                  code: { hex: e.target.value }
                })
              }
              value={newColor.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button
              onClick={() => {
                setCreating(false);
                setHoudini(true);
              }}
            >
              cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddColor;

import React, { useState, useEffect } from "react";
import { Pack, Grid } from "@potion/layout";
import { Svg, Circle } from "@potion/element";

const Bubbles = ({ colors, toggle }) => {
  const [bubbleData, setBubbleData] = useState([]);

  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);
  console.log("bubble", bubbleData);
  return (
    <div className="bubble-wrap">
      {toggle && (
        <>
          <p>bubbles</p>
          <Svg width={400} height={400}>
            <Pack
              data={{
                children: bubbleData
              }}
              sum={datum => datum.value}
              size={[400, 400]}
              includeRoot={false}
              nodeEnter={d => ({ ...d, r: 0 })}
              animate
            >
              {nodes =>
                nodes
                  .map(({ x, y, r, key }, i) => {
                    if (i < colors.length) {
                      return (
                        <Circle
                          key={key}
                          cx={x}
                          cy={y}
                          r={r}
                          fill={colors[i].code.hex}
                        />
                      );
                    }
                    return null;
                  })
                  .filter(v => v)
              }
            </Pack>
          </Svg>
        </>
      )}
      {!toggle && (
        <>
          <p>bubble grid</p>
          <Svg width={400} height={400}>
            <Grid
              data={bubbleData}
              bands
              size={[400, 400]}
              nodeEnter={d => ({ ...d, x: 200, y: 200 })}
              animate
            >
              {nodes =>
                nodes.map(({ nodeWidth, nodeHeight, x, y, key, value }, i) => (
                  <Circle
                    key={key}
                    cx={x + nodeWidth / 2}
                    cy={y + nodeHeight / 2}
                    r={value}
                    fill={colors[i].code.hex}
                  />
                ))
              }
            </Grid>
          </Svg>
        </>
      )}
    </div>
  );
};

export default Bubbles;

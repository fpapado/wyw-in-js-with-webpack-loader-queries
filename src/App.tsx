import { css } from "@linaria/core";
import { styled } from "@linaria/react";

// wyw-in-js attempts to read the full path from the filesystem, which fails
import { Component as ArrowSvg } from "./assets/arrow.svg?svgUse";

const ColorDiv = styled.div`
  color: turquoise;
`;

const colorCls = css`
  color: turquoise;
`;

const ColoredArrow = styled(ArrowSvg)`
  color: red;
`;

function App() {
  return (
    <div>
      <ColoredArrow />
      <ColorDiv>
        <ArrowSvg />
      </ColorDiv>
      <ArrowSvg className={colorCls} />
    </div>
  );
}

export default App;

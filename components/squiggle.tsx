import * as React from "react";

interface SquiggleLogoProps {
  stroke?: string;
}

const SquiggleComponent = ({ stroke }: SquiggleLogoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    x={0}
    y={0}
    enableBackground="new 0 0 200 23.4"
    viewBox="0 0 200 23.4"
    stroke={stroke}
  >
    <style>{".st0{fill:#010101}"}</style>
    <path
      d="m12 17.6 17.5-10 17.6 10 17.5-10 17.6 10 17.6-10 17.5 10 17.6-10 17.6 10 17.5-10 17.6 10"
      style={{
        fill: "none",
        strokeWidth: 2.5,
        strokeMiterlimit: 2,
      }}
    />
  </svg>
);
export default SquiggleComponent;

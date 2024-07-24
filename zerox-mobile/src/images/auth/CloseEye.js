import * as React from "react";
import Svg, {Defs, G, Path} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const SVGComponent = props => (
  <Svg
    width={props.width || 20}
    height={props.height || 20}
    viewBox="0 0 24 24"
    id="magicoon-Filled"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    fill={props.color}
  >
    <Defs></Defs>
    <G id="eye-slash-Filled">
      <Path
        id="eye-slash-Filled-2"
        data-name="eye-slash-Filled"
        className="cls-1"
        d="M21.016,10.241a14.386,14.386,0,0,0-2.646-3.2L20.7,4.707a1,1,0,1,0-1.414-1.414l-16,16A1,1,0,1,0,4.7,20.707l2.535-2.535A9.139,9.139,0,0,0,12,19.5c4.83,0,7.72-3.6,9.02-5.74A3.421,3.421,0,0,0,21.016,10.241ZM12,16.5a4.457,4.457,0,0,1-2.385-.7l1.473-1.474A2.49,2.49,0,0,0,14.5,12a.57.57,0,0,0-.01-.13A.994.994,0,0,1,14,12a.972.972,0,0,1-.461-.127L15.8,9.612A4.485,4.485,0,0,1,12,16.5Zm-7.68-.88a14.3,14.3,0,0,1-1.33-1.86,3.444,3.444,0,0,1-.01-3.52C4.276,8.1,7.176,4.5,12,4.5a9.307,9.307,0,0,1,2.75.41.527.527,0,0,1,.35.36.486.486,0,0,1-.14.47l-1.89,1.89A4.679,4.679,0,0,0,12,7.5,4.507,4.507,0,0,0,7.5,12a4.316,4.316,0,0,0,.13,1.08l-2.57,2.57a.491.491,0,0,1-.36.15h-.02A.5.5,0,0,1,4.316,15.621Z"
      />
    </G>
  </Svg>
);
export default SVGComponent;

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12ZM15.7127 10.7197C16.0055 10.4268 16.0055 9.95192 15.7127 9.65903C15.4198 9.36614 14.9449 9.36614 14.652 9.65903L10.9397 13.3713L9.34869 11.7804C9.0558 11.4875 8.58092 11.4875 8.28803 11.7804C7.99514 12.0732 7.99514 12.5481 8.28803 12.841L10.4093 14.9623C10.7022 15.2552 11.1771 15.2552 11.47 14.9623L15.7127 10.7197Z"
      fill="#1fa779"
    />
  </Svg>
);
export default SVGComponent;

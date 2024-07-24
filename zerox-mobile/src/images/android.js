import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 4C6.44445 4 5.44766 4.25161 4.56634 4.69812L2.91603 2.22266L2.08398 2.77736L3.71104 5.21794C2.06927 6.39771 1 8.32399 1 10.5V13H14V10.5C14 8.32399 12.9307 6.39772 11.289 5.21795L12.916 2.77736L12.084 2.22266L10.4337 4.69812C9.55235 4.25161 8.55556 4 7.5 4ZM5 10H4V9H5V10ZM10 10H11V9H10V10Z"
      fill={props.color}
    />
  </Svg>
);
export default SVGComponent;

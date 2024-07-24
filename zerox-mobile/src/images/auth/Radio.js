import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    {...props}>
    <Path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </Svg>
);
export default SVGComponent;

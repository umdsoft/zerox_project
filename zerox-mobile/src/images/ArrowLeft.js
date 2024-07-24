import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SVGComponent = ({width, height, color}) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M7 1L1 7L7 13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

SVGComponent.defaultProps = {
  width: 12,
  height: 12,
  color: '#fff',
};

export default SVGComponent;

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={20}
    height={18}
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M10.2564 4.23529H2.05128C1.50725 4.23529 0.985497 4.4584 0.600807 4.85554C0.216117 5.25268 0 5.79131 0 6.35294V10.5882C0 11.1499 0.216117 11.6885 0.600807 12.0856C0.985497 12.4828 1.50725 12.7059 2.05128 12.7059H3.07692V16.9412C3.07692 17.222 3.18498 17.4913 3.37733 17.6899C3.56967 17.8884 3.83055 18 4.10256 18H6.15385C6.42586 18 6.68674 17.8884 6.87908 17.6899C7.07143 17.4913 7.17949 17.222 7.17949 16.9412V12.7059H10.2564L15.3846 16.9412V0L10.2564 4.23529ZM13.3333 12.2824L11.2821 10.5882H2.05128V6.35294H11.2821L13.3333 4.65882V12.2824ZM20 8.47059C20 10.2812 19.0154 11.9224 17.4359 12.7059V4.23529C19.0051 5.02941 20 6.67059 20 8.47059Z"
      fill="white"
    />
  </Svg>
);
export default SVGComponent;

import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const SVGComponent = props => (
  <Svg
    width={props.size}
    height={props.size}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}>
    <G clipPath="url(#clip0_169_3103)">
      <Path
        d="M12.5 24.4898C19.4036 24.4898 25 19.0076 25 12.2449C25 5.48223 19.4036 0 12.5 0C5.59644 0 0 5.48223 0 12.2449C0 19.0076 5.59644 24.4898 12.5 24.4898Z"
        fill="#F0F0F0"
      />
      <Path
        d="M24.2225 16.504C24.725 15.1775 25 13.7427 25 12.2449C25 10.7471 24.725 9.31235 24.2225 7.98584H0.77749C0.275049 9.31235 0 10.7471 0 12.2449C0 13.7427 0.275049 15.1775 0.77749 16.504L12.5 17.5688L24.2225 16.504Z"
        fill="#0052B4"
      />
      <Path
        d="M12.5001 24.4897C17.8747 24.4897 22.4564 21.1668 24.2226 16.5039H0.777588C2.54375 21.1668 7.12554 24.4897 12.5001 24.4897Z"
        fill="#D80027"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_169_3103">
        <Rect width={25} height={24.4898} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SVGComponent;

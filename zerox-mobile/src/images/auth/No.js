import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const No = props => (
  <Svg
    width={props.width || 30}
    height={props.height || 30}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
      fill={props.color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2218 31.7782C15.8313 31.3877 15.8313 30.7545 16.2218 30.364L30.364 16.2218C30.7545 15.8313 31.3877 15.8313 31.7782 16.2218C32.1687 16.6124 32.1687 17.2455 31.7782 17.636L17.6361 31.7782C17.2455 32.1687 16.6124 32.1687 16.2218 31.7782Z"
      fill={props.color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.2218 16.2218C16.6124 15.8313 17.2455 15.8313 17.636 16.2218L31.7782 30.364C32.1687 30.7545 32.1687 31.3876 31.7782 31.7782C31.3877 32.1687 30.7545 32.1687 30.364 31.7782L16.2218 17.636C15.8313 17.2455 15.8313 16.6123 16.2218 16.2218Z"
      fill={props.color}
    />
  </Svg>
);
export default No;

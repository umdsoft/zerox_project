import * as React from 'react';
import Svg, {Defs, Path, Rect, Polygon} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const QrCode = props => (
  <Svg
    width={props.width}
    height={props.height}
    fill={props.color}
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    {...props}>
    <Defs></Defs>
    <Path
      className="cls-1"
      d="M32,153.6h89.6a32,32,0,0,0,32-32V32a32,32,0,0,0-32-32H32A32,32,0,0,0,0,32v89.6A32,32,0,0,0,32,153.6ZM25.6,32A6.41,6.41,0,0,1,32,25.6h89.6A6.41,6.41,0,0,1,128,32v89.6a6.41,6.41,0,0,1-6.4,6.4H32a6.41,6.41,0,0,1-6.4-6.4Z"
    />
    <Rect className="cls-1" x={51.2} y={51.2} width={51.2} height={51.2} />
    <Path
      className="cls-1"
      d="M121.6,358.4H32a32,32,0,0,0-32,32V480a32,32,0,0,0,32,32h89.6a32,32,0,0,0,32-32V390.4A32,32,0,0,0,121.6,358.4ZM128,480a6.41,6.41,0,0,1-6.4,6.4H32a6.41,6.41,0,0,1-6.4-6.4V390.4A6.41,6.41,0,0,1,32,384h89.6a6.41,6.41,0,0,1,6.4,6.4Z"
    />
    <Rect className="cls-1" x={51.2} y={409.6} width={51.2} height={51.2} />
    <Path
      className="cls-1"
      d="M480,0H390.4a32,32,0,0,0-32,32v89.6a32,32,0,0,0,32,32H480a32,32,0,0,0,32-32V32A32,32,0,0,0,480,0Zm6.4,121.6A6.41,6.41,0,0,1,480,128H390.4a6.41,6.41,0,0,1-6.4-6.4V32a6.41,6.41,0,0,1,6.4-6.4H480a6.41,6.41,0,0,1,6.4,6.4Z"
    />
    <Rect className="cls-1" x={409.6} y={51.2} width={51.2} height={51.2} />
    <Polygon
      className="cls-1"
      points="204.8 25.6 230.4 25.6 230.4 51.2 256 51.2 256 0 243.2 0 230.4 0 179.2 0 179.2 12.8 179.2 25.6 179.2 51.2 204.8 51.2 204.8 25.6"
    />
    <Rect className="cls-1" x={307.2} width={25.6} height={25.6} />
    <Polygon
      className="cls-1"
      points="204.8 128 230.4 128 230.4 102.4 204.8 102.4 204.8 76.8 179.2 76.8 179.2 179.2 204.8 179.2 204.8 128"
    />
    <Polygon
      className="cls-1"
      points="332.8 102.4 332.8 51.2 307.2 51.2 307.2 76.8 230.4 76.8 230.4 102.4 307.2 102.4 332.8 102.4"
    />
    <Rect className="cls-1" x={230.4} y={153.6} width={51.2} height={25.6} />
    <Polygon
      className="cls-1"
      points="307.2 128 307.2 179.2 307.2 204.8 384 204.8 384 179.2 332.8 179.2 332.8 128 307.2 128"
    />
    <Polygon
      className="cls-1"
      points="460.8 204.8 486.4 204.8 486.4 230.4 512 230.4 512 204.8 512 179.2 460.8 179.2 460.8 204.8"
    />
    <Rect className="cls-1" x={409.6} y={179.2} width={25.6} height={51.2} />
    <Polygon
      className="cls-1"
      points="358.4 332.8 384 332.8 384 230.4 358.4 230.4 358.4 256 332.8 256 332.8 230.4 307.2 230.4 307.2 256 307.2 281.6 332.8 281.6 358.4 281.6 358.4 332.8"
    />
    <Rect className="cls-1" x={256} y={256} width={25.6} height={25.6} />
    <Polygon
      className="cls-1"
      points="486.4 281.6 460.8 281.6 460.8 256 435.2 256 435.2 281.6 409.6 281.6 409.6 307.2 435.2 307.2 460.8 307.2 486.4 307.2 512 307.2 512 256 486.4 256 486.4 281.6"
    />
    <Rect className="cls-1" x={76.8} y={179.2} width={25.6} height={25.6} />
    <Polygon
      className="cls-1"
      points="51.2 281.6 51.2 256 51.2 230.4 76.8 230.4 76.8 204.8 25.6 204.8 25.6 179.2 0 179.2 0 230.4 25.6 230.4 25.6 256 0 256 0 281.6 25.6 281.6 51.2 281.6"
    />
    <Polygon
      className="cls-1"
      points="102.4 307.2 140.8 307.2 140.8 281.6 76.8 281.6 76.8 307.2 0 307.2 0 332.8 102.4 332.8 102.4 307.2"
    />
    <Polygon
      className="cls-1"
      points="230.4 307.2 230.4 256 230.4 230.4 256 230.4 256 204.8 204.8 204.8 204.8 230.4 153.6 230.4 153.6 179.2 128 179.2 128 256 140.8 256 153.6 256 204.8 256 204.8 307.2 179.2 307.2 179.2 384 204.8 384 204.8 332.8 230.4 332.8 256 332.8 256 384 230.4 384 230.4 409.6 256 409.6 268.8 409.6 281.6 409.6 281.6 307.2 256 307.2 230.4 307.2"
    />
    <Rect className="cls-1" x={307.2} y={307.2} width={25.6} height={25.6} />
    <Rect className="cls-1" x={307.2} y={358.4} width={25.6} height={51.2} />
    <Rect className="cls-1" x={179.2} y={409.6} width={25.6} height={51.2} />
    <Polygon
      className="cls-1"
      points="230.4 460.8 256 460.8 256 486.4 179.2 486.4 179.2 512 256 512 281.6 512 281.6 460.8 281.6 448 281.6 435.2 230.4 435.2 230.4 460.8"
    />
    <Rect className="cls-1" x={486.4} y={332.8} width={25.6} height={51.2} />
    <Rect className="cls-1" x={358.4} y={358.4} width={25.6} height={25.6} />
    <Polygon
      className="cls-1"
      points="486.4 409.6 460.8 409.6 460.8 460.8 473.6 460.8 486.4 460.8 512 460.8 512 435.2 486.4 435.2 486.4 409.6"
    />
    <Polygon
      className="cls-1"
      points="435.2 460.8 435.2 435.2 435.2 409.6 435.2 358.4 460.8 358.4 460.8 332.8 435.2 332.8 409.6 332.8 409.6 358.4 409.6 409.6 358.4 409.6 358.4 435.2 409.6 435.2 409.6 460.8 358.4 460.8 358.4 473.6 358.4 486.4 358.4 512 384 512 384 486.4 409.6 486.4 409.6 512 460.8 512 460.8 486.4 435.2 486.4 435.2 460.8"
    />
    <Rect className="cls-1" x={486.4} y={486.4} width={25.6} height={25.6} />
    <Rect className="cls-1" x={307.2} y={435.2} width={25.6} height={25.6} />
    <Rect className="cls-1" x={307.2} y={486.4} width={25.6} height={25.6} />
  </Svg>
);

export default QrCode;

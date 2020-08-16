import React, { useState } from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
import '../helpers/style.css';

let stateResize = {width: 200, height: 200};

export default function ResizableComp() {
  const [sizeEl, setSize] = useState(stateResize);
  const onResize = (event, {element, size, handle}) => {
    setSize({ width: size.width, height: size.height });
  };
  const {width, height} = sizeEl;
  return (
    <Resizable className="box" height={height} width={width} onResize={onResize} resizeHandles={['se']}>
      <div className="box" style={{width: width + 'px', height: height + 'px', backgroundColor:"blue"}} >
        new resizable
      </div>
    </Resizable>
  );
}

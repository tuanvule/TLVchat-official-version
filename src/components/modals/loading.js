import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color, height, width }) => (
    <div className=" fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
);
 
export default Loading;
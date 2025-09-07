// components/Loader.jsx
import React from 'react';
import { TailSpin } from 'react-loader-spinner';

function Loader({
  height = 80,
  width = 80,
  color = "#14b8a6",
  overlay = true,
}) {
  return (
    <div
      className={`${
        overlay ? "fixed inset-0 bg-white bg-opacity-70 z-50" : ""
      } flex items-center justify-center`}
    >
      <div className="flex flex-col items-center space-y-3">
        <TailSpin
          height={height}
          width={width}
          color={color}
          ariaLabel="loading"
          radius="1"
          visible={true}
        />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;

import React from 'react'

const Dots = () => (
  <div className={'flex justify-center items-center h5 w-100'}>
    <svg
      width="57px"
      height="57px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="lds-ellipsis"
      style={{background: 'none'}}
    >
      <circle cx="84" cy="50" r="0" fill="#4AC883">
        <animate
          attributeName="r"
          values="10;0;0;0;0"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="0s"
        />
        <animate
          attributeName="cx"
          values="84;84;84;84;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle cx="40.0957" cy="50" r="10" fill="#FAC05D">
        <animate
          attributeName="r"
          values="0;10;10;10;0"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="-1.25s"
        />
        <animate
          attributeName="cx"
          values="16;16;50;84;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="-1.25s"
        />
      </circle>
      <circle cx="16" cy="50" r="7.08698" fill="#3A78FF">
        <animate
          attributeName="r"
          values="0;10;10;10;0"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="-0.625s"
        />
        <animate
          attributeName="cx"
          values="16;16;50;84;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="-0.625s"
        />
      </circle>
      <circle cx="84" cy="50" r="2.91302" fill="#344055">
        <animate
          attributeName="r"
          values="0;10;10;10;0"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="0s"
        />
        <animate
          attributeName="cx"
          values="16;16;50;84;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle cx="74.0957" cy="50" r="10" fill="#4AC883">
        <animate
          attributeName="r"
          values="0;0;10;10;10"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="0s"
        />
        <animate
          attributeName="cx"
          values="16;16;16;50;84"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          calcMode="spline"
          dur="2.5s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
    </svg>
  </div>
)

export default Dots

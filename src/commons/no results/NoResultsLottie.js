import React from "react";
import Lottie from "react-lottie-player";
import noResults from "./noResults.json";

const animation = {
  animation: noResults,
  height: "400px",
  width: "auto",
  //   marginTop: "-100px",
};

export default function NoResultsLottie() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Lottie
        loop={false}
        animationData={animation.animation}
        play
        style={{ width: animation.width, height: animation.height }}
      />
    </div>
  );
}

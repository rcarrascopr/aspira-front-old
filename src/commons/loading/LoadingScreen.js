import React from "react";
import Lottie from "react-lottie-player";
import paperplane from "./paperplane.json";
import loadingDots from "./loadingDots.json";
import bookPages from "./bookPages.json";
import { randomElement } from "../common_methods";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const animations = [
  {
    animation: paperplane,
    height: "400px",
    width: "auto",
    marginTop: "-250px",
  },
  {
    animation: bookPages,
    height: "400px",
    width: "400px",
    marginTop: "-200px",
  },
];

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.98)",
  },
}));

let animation = randomElement(animations);

export const LoadingScreen = (props) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Lottie
          loop
          animationData={animation.animation}
          play
          style={{ width: animation.width, height: animation.height }}
        />
        <Lottie
          loop
          animationData={loadingDots}
          play
          style={{
            width: "400px",
            height: "400px",
            marginTop: animation.marginTop,
          }}
        />
      </div>
    </Backdrop>
  );
};

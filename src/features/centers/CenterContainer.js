import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCenters } from "../../actions/centerActions";
import { Center } from "./Center";
import { LoadingScreen } from "../../commons/LoadingScreen";
import "./centers.css";

export const CenterContainer = ({ loading, centers, fetch_centers }) => {
  useEffect(() => {
    fetch_centers();
    // eslint-disable-next-line
  }, [centers]);

  const generateCenters = () => {
    if (loading) {
      return <LoadingScreen content="Retrieving Centers" />;
    } else if (centers.length > 0) {
      return centers.map((center) => <Center key={center.id} {...center} />);
    }
  };
  return <div>{generateCenters()}</div>;
};

let mapStateToProps = (state) => {
  return {
    centers: state.centers.centers,
  };
};

let mapDispatchToProps = (dispatch) => {
  return { fetch_centers: () => dispatch(fetchCenters()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterContainer);

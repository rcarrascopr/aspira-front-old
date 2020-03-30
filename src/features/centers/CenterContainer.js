import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCenters } from "../../actions/centerActions";
import { Center } from "./Center";
import { LoadingScreen } from "../../commons/LoadingScreen";

export const CenterContainer = ({ loading, centers, fetch_centers }) => {
  useEffect(() => {
    fetch_centers();
  }, [fetch_centers, centers.length]);

  const generateCenters = () => {
    if (centers.length > 0) {
      return centers[0].map(center => <Center key={center.id} {...center} />);
    }
  };

  if (loading) {
    return <LoadingScreen content="Retrieving Centers" />;
  }

  return <div>{generateCenters()}</div>;
};

let mapStateToProps = state => {
  return {
    centers: state.centers.centers
  };
};

let mapDispatchToProps = dispatch => {
  return { fetch_centers: () => dispatch(fetchCenters()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CenterContainer);

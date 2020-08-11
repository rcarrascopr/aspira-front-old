import React, { useEffect } from "react";
import { connect } from "react-redux";

import ActivityListContainer from "./activities/ActivityListContainer";

import { fetchUTIS } from "../../../../../actions/UTISActions";

import "./UTISShowContainer.css";

export function UTISShowContainer(props) {
  useEffect(() => {
    props.fetchUTIS(props.match.params.utis_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="utis-show-container">
      <ActivityListContainer currentUTIS={props.currentUTIS} />
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUTIS: state.utis.currentUTIS,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUTIS: (utisId) => dispatch(fetchUTIS(utisId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UTISShowContainer);

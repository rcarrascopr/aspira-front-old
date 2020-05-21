import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";

export const SelectInput = (props) => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 170,
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    icon: {
      fill: `${props.invert ? "#282460" : "white"}`,
    },
  }));

  const classes = useStyles();
  const generateSemesters = () => {
    return props.items.map((object, i) => {
      if (typeof object === "string") {
        return (
          <MenuItem key={i} value={object}>
            {object}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem key={object.id} value={object.name}>
            {object.name}
          </MenuItem>
        );
      }
    });
  };
  return (
    <div className="select-input">
    <FormControl
      variant="outlined"
      className={classes.formControl}
      error={props.error}
    >
      <InputLabel
        id={`${props.name}-select`}
        className={`${
          props.invert ? "dark-purple-text" : "white-text"
        } bigger-text`}
      >
        {props.label}
      </InputLabel>
      <Select
        variant="outlined"
        className={`${props.invert ? "invert" : ""}`}
        value={props.value}
        name={props.name}
        onChange={props.handleChange}
        labelWidth={props.labelWidth}
        inputProps={{
          id: `${props.name}-select`,
          classes: { icon: classes.icon },
        }}
      >
        {generateSemesters()}
      </Select>
    </FormControl>
    {props.error && <p className="tooltip">⚠️ <span className="tooltiptext">error message goes here</span></p>}
    </div>
  );
};

export default SelectInput;

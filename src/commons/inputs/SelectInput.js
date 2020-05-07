import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  icon: {
    fill: "white",
  },
}));

export const SelectInput = (props) => {
  const classes = useStyles();
  const generateSemesters = () => {
    return props.items.map((semester) => (
      <MenuItem value={semester}>{semester}</MenuItem>
    ));
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="semester-select" className="white-text bigger-text">{props.label}</InputLabel>

      <Select
        variant="outlined"
        value={props.value}
        onChange={props.handleChange}
        labelWidth={props.labelWidth}
        inputProps={{ id: "semester-select", classes: { icon: classes.icon } }}
      >
        {generateSemesters()}
      </Select>
    </FormControl>
  );
};

export default SelectInput;

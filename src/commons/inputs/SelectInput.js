import React from "react";

import { Controller } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Error from "./Error";

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
  const generateOptions = () => {
    return props.items.map((object, i) => {
      if (typeof object === "string") {
        return (
          <MenuItem key={i} value={object}>
            {object}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem key={object.id} value={object.id}>
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
        error={props.errors}
      >
        <InputLabel
          id={`${props.name}-select`}
          className={`${
            props.invert ? "dark-purple-text" : "white-text"
          } bigger-text`}
        >
          {props.label}
        </InputLabel>
        {props.control ? (
          <Controller
            as={
              <Select
                variant="outlined"
                className={`${props.invert ? "invert" : ""}`}
                // name={props.name}
                // onChange={props.handleChange}
                labelWidth={props.labelWidth}
                inputProps={{
                  id: `${props.name}-select`,
                  classes: { icon: classes.icon },
                }}
              >
                {generateOptions()}
              </Select>
            }
            defaultValue={props.defaultValue}
            name={props.name}
            control={props.control}
            rules={{ required: true }}
          />
        ) : (
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
            {generateOptions()}
          </Select>
        )}
      </FormControl>
      <Error errors={props.errors} />
    </div>
  );
};

export default SelectInput;

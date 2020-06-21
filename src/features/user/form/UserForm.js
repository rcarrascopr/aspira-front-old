import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

import { SelectInput } from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";
import grades from "../../../commons/data/grades";
import { userFormData as formData } from "../../../commons/form-data/userFormData";

import {
  userCreate,
  fetchUser,
  userNotFoundError,
} from "../../../actions/userActions";
import { fetchCenters } from "../../../actions/centerActions";
import "./userForm.css";

function UserForm(props) {
  console.log("props from userForm", props);
  const defaultValues = props.fetchedUser
    ? props.fetchedUser
    : props.defaultValues;

  const { control, errors, handleSubmit, watch } = useForm({
    defaultValues,
  });

  const userId = parseInt(props.match.params.id, 10);
  const accountType = watch("account_type");
  const nameFields = Object.keys(formData).slice(0, 4);
  const others = Object.keys(formData);
  const otherFields = others.slice(4, others.length);

  formData.center_id.items = props.centers;

  const generateNameFields = () => {
    return (
      <div className="name-inputs">
        {nameFields.map((field, index) => {
          return (
            <div className="textfield-input" key={index}>
              <Controller
                as={
                  <TextField
                    id="student-name"
                    label={formData[field].label}
                    variant="outlined"
                    className={"dark-purple-text textfield-outlined"}
                    error={errors[field]}
                  />
                }
                // onChange={handleChange}
                name={field}
                control={control}
                rules={{ required: formData[field].required }}
              />
              <Error errors={errors[field]} />
            </div>
          );
        })}
      </div>
    );
  };

  const generateOtherFields = () => {
    return otherFields.map((field) => {
      if (!!formData[field] && formData[field].type === "select") {
        return (
          <SelectInput
            name={field}
            label={formData[field].label}
            invert={true}
            labelWidth={70}
            items={formData[field].items}
            // value={typeof formData[field] === "string" ? formData[field] : formData[field].id}
            // handleChange={handleSelectChange}
            control={control}
            errors={errors[field]}
            // defaultValue={formData[field].defaultValue}
          />
        );
      } else if (!!formData[field]) {
        return (
          <div className="textfield-input">
            <Controller
              as={
                <TextField
                  label={formData[field].label}
                  variant="outlined"
                  className={"dark-purple-text textfield-outlined"}
                  error={errors[field]}
                  type={formData[field].type}
                />
              }
              // onChange={handleChange}
              name={field}
              control={control}
              rules={{ required: formData[field].required }}
            />
            <Error errors={errors[field]} />
          </div>
        );
      }
    });
  };

  const generateAcademicLevels = () => {
    if (accountType === "student") {
      return (
        // Using SelectInput component

        <SelectInput
          name="academic_level"
          label="Grados"
          invert={true}
          labelWidth={70}
          items={grades}
          // handleChange={handleSelectChange}
          control={control}
          // defaultValue={grades[0]}
          errors={errors["academic_level"]}
        />
      );
    }
  };

  const onSubmit = (data, event) => {
    console.log(`Submitted data: `, data, `\n Event: `, event);
    props.userCreate(data);
  };

  useEffect(() => {
    //fetch user if route params contain user id
    if (userId && Number.isInteger(userId)) {
      props.fetchUser(userId);
    }

    if (props.error && props.isAdmin) {
      props.history.push("/admin");
    } else if (props.error) {
      props.userNotFoundError(props);
    }
    //remove password field, will use different form to change passwords
    delete formData.password;
    delete formData.password_confirmation;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!props.isAdmin) delete formData.account_type;
  }, [props, userId]);

  useEffect(() => {
    if (props.centers.length === 0) {
      props.fetchCenters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <h1 className="dark-purple-text text-align-center">Crear cuenta</h1>
        {generateNameFields()}
        <div className="details-inputs">
          {generateOtherFields()} {generateAcademicLevels()}
        </div>

        <div className="flex-end">
          <input type="submit" className="primary-btn " value="Guardar" />
        </div>
      </form>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    error: state.users.error,
    centers: state.centers.centers,
    fetchedUser: state.users.fetchedUser,
    defaultValues: state.users.defaultValues,
    currentUser: state.users.currentUser,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    userCreate: (data) => dispatch(userCreate(data)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchCenters: () => dispatch(fetchCenters()),
    userNotFoundError: (props) => dispatch(userNotFoundError(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

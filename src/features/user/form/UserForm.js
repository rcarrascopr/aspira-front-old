import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

import { SelectInput } from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";
import grades from "../../../commons/data/grades";
import { userFormData } from "../../../commons/form-data/userFormData";

import {
  userCreate,
  userEdit,
  fetchUser,
  userNotFoundError,
  resetUserForm,
} from "../../../actions/userActions";
import { fetchCenters } from "../../../actions/centerActions";
import "./userForm.css";

let formData = { ...userFormData };

function UserForm(props) {
  const { isEdit, formDefaultValues } = props;
  const { control, errors, handleSubmit, watch, reset } = useForm({
    defaultValues: formDefaultValues,
  });

  

  const userId = parseInt(props.match.params.id, 10);
  const accountType = watch("role");
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
                    InputLabelProps={{ shrink: true }}
                  />
                }
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
            control={control}
            errors={errors[field]}
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
                  InputLabelProps={{ shrink: true }}
                />
              }
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
    if (accountType === "Student") {
      return (
        <SelectInput
          name="academic_level"
          label="Grados"
          invert={true}
          labelWidth={70}
          items={grades}
          control={control}
          errors={errors["academic_level"]}
        />
      );
    }
  };

  const onSubmit = (data, event) => {
    console.log(`Submitted data: `, data, `\n Event: `, event);
    if (isEdit) {
      props.userEdit(data, userId);
    } else {
      props.userCreate(data);
      reset(formDefaultValues);
    }
  };

  useEffect(() => {
    //fetch user if route params contain user id
    if (isEdit && Number.isInteger(userId)) {
      console.log(props.currentUser, userId);
      if (props.formDefaultValues.id != userId) {
        props.fetchUser(userId);
      }

      delete formData.email;
      delete formData.password;
      delete formData.password_confirmation;
    } else {
      props.resetUserForm();
      formData = { ...userFormData };
    }

    if (props.error) {
      props.userNotFoundError(props);
    }
    //remove password field, will use different form to change passwords
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // if (!props.isAdmin) delete formData.role;
  }, []);

  useEffect(() => {
    if (props.centers.length === 0) {
      props.fetchCenters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reset(formDefaultValues);
  }, [formDefaultValues]);

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <h1 className="dark-purple-text text-align-center">
          {props.match.params.id ? "Editar" : "Crear"} cuenta
        </h1>
        {generateNameFields()}
        <div className="details-inputs">
          {generateOtherFields()}
          {generateAcademicLevels()}
        </div>

        <div className="flex-end">
          <input type="submit" className="primary-btn" value="Guardar" />
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
    formDefaultValues: state.users.defaultValues,
    currentUser: state.users.currentUser,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    userCreate: (data) => dispatch(userCreate(data)),
    userEdit: (data, userId) => dispatch(userEdit(data, userId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchCenters: () => dispatch(fetchCenters()),
    userNotFoundError: (props) => dispatch(userNotFoundError(props)),
    resetUserForm: () => dispatch(resetUserForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);

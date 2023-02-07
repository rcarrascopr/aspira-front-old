import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { TextField, FormControlLabel } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
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
  const { control, errors, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: formDefaultValues,
  });
  const [isActive, setIsActive] = useState(formDefaultValues["is_active"])

  const userId = parseInt(props.match.params.id, 10);
  const accountType = watch("role");
  const nameFields = Object.keys(formData).slice(0, 4);
  const others = Object.keys(formData);
  const otherFields = others.slice(4, others.length);
  formData.center_id.items = props.centers;

  const handleCheckboxChange = (field) => {
    setIsActive(!isActive)
  }

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
      } else if (!!formData[field] && formData[field].type === "checkbox") {
        return (
          <FormControlLabel
            control={
              <Checkbox
                name={field}
                checked={isActive}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label={formData[field].label}
          />
        )
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

  const generateStudentBadge = () => {
    if (accountType === "Student") {
      return (
        <div className="textfield-input">
          <Controller
            as={
              <TextField
                label={"Número de estudiante"}
                variant="outlined"
                className={"dark-purple-text textfield-outlined"}
                error={errors["badge_id"]}
                type={"text"}
                InputLabelProps={{ shrink: true }}
              />
            }
            name={"badge_id"}
            control={control}
            rules={{ required: true }}
          />
          <Error errors={errors["badge_id"]} />
        </div>
      );
    }
  };

  const onSubmit = (data, event) => {
    if (isEdit) {
      props.userEdit({...data, is_active: isActive}, userId);
    } else {
      props.userCreate({...data, is_active: isActive});
      reset(formDefaultValues);
    }
  };

  useEffect(() => {
    //fetch user if route params contain user id
    if (isEdit && Number.isInteger(userId)) {
      // If user id provided is a new one, then fetch user
      if (!(props.formDefaultValues && props.formDefaultValues.id == userId)) {
        props.fetchUser(userId);
      }

      // delete formData.email;
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
    setIsActive(formDefaultValues.is_active)
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
          {generateStudentBadge()}
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

import React from "react";
import { BrowserRouter, Link, Switch } from "react-router-dom";
import { PrivateRoute } from "../../commons/PrivateRoute";
import UserForm from "../user/form/UserForm";

export default function AdminContainer() {
  return (
    <BrowserRouter>
      <>
        <h1>Hello from AdminContainer!</h1>
        {/* <Link to="/users/13/edit">Edit User</Link> */}
        <hr />
        {/* <Switch>
          <PrivateRoute
            path="/users/:id/edit"
            render={() => <UserForm isAdmin={true} />}
          />
        </Switch> */}
      </>
    </BrowserRouter>
  );
}

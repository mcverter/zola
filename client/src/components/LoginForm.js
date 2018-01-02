import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

import TextField from "material-ui/TextField"
import RaisedButton from 'material-ui/RaisedButton'

import {signInUser} from "../actions/auth/authActions";

const validations = {
    required: value => (value ? undefined : "Required"),
    minLength10: value =>
        value && value.length < 10 ? `Must be 10 characters or more` : undefined,
    email: value =>
        value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? 'Invalid email address'
            : undefined,
    nonAlpha: value =>
        value && !/\W/i.test(value)
            ? 'Passwords must include a nonword character'
            : undefined
};

const renderTextField = ({
                             input,
                             label,
                             meta : {touched, error},
                             ...custom
                         }) => {
    const type = custom.type || "text";
    return (
        <TextField
            hintText={label}
            type={type}
            floatingLabelText={label}
            errorText={touched && error}
            {...input}
        />
    )
};

const LoginForm = props => {
    const {handleSubmit, pristine, submitting, invalid,
        signInUser, authenticated, authError} = props;

    const {email, nonAlpha, minLength10, required} = validations;

    if (authenticated) {
        return (<Redirect to='/users' />);
    }

    return (
        <div>
            <div className="centered">
                <h2> Zola Login </h2>
            </div>
            <div className="centered">
                <form onSubmit={handleSubmit(signInUser)}>
                    <div>
                        <Field
                            name="email"
                            type="email"
                            component={renderTextField}
                            label="Email"
                            validate={[required, email]}
                        />
                    </div>

                    <div>
                        <Field
                            name="password"
                            type="password"
                            component={renderTextField}
                            label="Password"
                            validate={[required, nonAlpha, minLength10]}
                        />
                    </div>

                    <div className="centered" style={{marginTop: 30}}>
                        <RaisedButton type="submit" disabled={pristine || submitting || invalid}>
                            Login
                        </RaisedButton>
                    </div>

                    {authError &&
                      <div className="centered" style={{marginTop: 30}}>DENIED</div>}
                </form>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (username, password) => {
            dispatch(signInUser(username, password));
        }
    };
};

function mapStateToProps(state) {
    return {authError: state.auth.error, authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "LoginForm",
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount

}) (LoginForm));
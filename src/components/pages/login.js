import React, { useState, useEffect } from 'react'
import Validator from 'validator'
import { Redirect } from 'react-router-dom'
import Error from '../atoms/error'
import Form from '../atoms/form'
import FormTitle from '../molecules/form/form-title'
import InputWithLabel from '../molecules/form/input-with-label'
import SubmitButton from '../molecules/form/submit-button'
import { loginUser, isLoggedIn } from '../../utils/authentication'

const renderLogin = function(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    function validateForm(){
        return new Promise((resolve, reject) => {
            if(!email){
                reject("Email Required");
            } else {
                if (!Validator.isEmail(email)){
                    reject("Email Not valid")
                }
            }
            if (!password){
                reject("Password Required");
            }
            resolve();
        });
    }
    function handleSubmit(e){
        e.preventDefault();
        setSubmitting(true);
        validateForm()
        .then(() => {
            let User = {
                email: email,
                password: password
            }
            loginUser(User)
            .then(() => {
                setLoggedIn(true);
            })
            .catch((err) => setErrorMessage(err));
        })
        .catch((err) => setErrorMessage(err))
        .finally(() => setSubmitting(false));
    }
    return (
        (!loggedIn) ?
        <Form>
            <FormTitle>Login</FormTitle>
            <InputWithLabel
                value={email} label="Email Address" id="email"
                onChange={setEmail} required={true} type="text" />
            <InputWithLabel
                value={password} label="Password" id="password"
                onChange={setPassword} required={true} type="password" />
            { (error) ? <Error>{error}</Error> : null}
            <SubmitButton onClick={handleSubmit} isSubmitting={submitting}>Login</SubmitButton>
        </Form>
        : <Redirect to="/pending-products" />
    )
}

export default renderLogin;
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layoat from '../core/Layoat'
import {signup} from '../auth'


const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });


    const { name, email, password, success, error } = values

    
    const handelChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };


    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false })
        signup({ name, email, password })
        .then(data =>{
            if(data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({ ...values, name: '', email: '', password: '', error: '', success: true })
            }
        })
    };



    const signUpForm = () => (
        <form className="col-8">
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handelChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handelChange('email')} type="email" className="form-control" value={email}  />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handelChange('password')} type="Password" className="form-control" value={password}  />
            </div>
            <div style={{display:'flex', justifyContent: 'space-between'}}>
                <button onClick={clickSubmit} className="btn btn-primary">submit</button>
            </div>
        </form>
    );


    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account is created. please <Link to="/signin">Signin</Link>
        </div>
    )


    return(
        <Layoat title="Signup" description="Signup to App" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layoat>
    );
};

export default Signup;
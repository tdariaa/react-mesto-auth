import React from 'react';
import Authentication from './Authentication.jsx';
import * as auth from './auth.jsx';
import { Link, useNavigate } from 'react-router-dom';

function Register(props) {
    console.log(props);
    const email = React.useRef();
    const password = React.useRef();
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        props.onRegistration(password.current.value, email.current.value);
        navigate('/login', { replace: true });
    };

    return (
        <Authentication title="Регистрация" buttonTitle="Зарегистрироваться" link="/login" onSubmit={handleSubmit}>
            <input id="auth__email" className="auth__input auth__input_type_email" placeholder="Email" ref={email} />
            <input id="auth__password" className="auth__input auth__input_type_password" placeholder="Пароль" type="password" autoComplete="on" ref={password} />
        </Authentication>
    )
}

export default Register;


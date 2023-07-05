import React from 'react';
import Authentication from './Authentication.jsx';

function SignUp() {
    return (
        <Authentication title="Регистрация" buttonTitle="Зарегистрироваться" link="/login">
            <input id="auth__email" className="auth__input auth__input_type_email" placeholder="Email" />
            <input id="auth__password" className="auth__input auth__input_type_password" placeholder="Пароль" type="password" autoComplete="on" />
        </Authentication>
    )
}

export default SignUp;


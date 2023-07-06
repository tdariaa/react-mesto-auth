import React from 'react';
import Authentication from './Authentication.jsx';
import * as auth from './auth.jsx';
import { Link, useNavigate } from 'react-router-dom';

function LogIn(props) {

    console.log(props);
    
    const email = React.useRef();
    const password = React.useRef();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        // if (!formValue.username || !formValue.password) {
        //     return;
        // }
        auth.authorize(password.current.value, email.current.value)
            .then((data) => {
                console.log(data);
                if (data.token) {
                    // setFormValue({ username: '', password: '' });
                    props.handleLogin();
                    navigate('/main', { replace: true });
                }

                // нужно проверить, есть ли у данных jwt
                // сбросьте стейт, затем в колбэке установите
                // стейт loggedIn родительского App как true,
                // затем перенаправьте его в /diary
            })
            .catch(err => console.log(err));
    }



    return (
        <Authentication title="Вход" buttonTitle="Войти" onSubmit={handleSubmit}>
            <input id="auth__email" className="auth__input auth__input_type_email" placeholder="Email" ref={email} />
            <input id="auth__password" className="auth__input auth__input_type_password" placeholder="Пароль" type="password" autoComplete="on" ref={password} />
        </Authentication>
    )
}

export default LogIn;
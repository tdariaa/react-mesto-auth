import React from 'react';
import { Link } from 'react-router-dom';

function Authentication(props) {

    return (
        <>
            <div className="auth">
                <h1 className="auth__title">{props.title}</h1>
                <form className="auth__form">

                    {props.children}
                    <button className="auth__button">{props.buttonTitle}</button>

                </form>
                {props.link && <p className="auth__log-in">Уже зарегистрированы? <Link to="/login" className="auth__log-in_link">Войти</Link></p>}
            </div>
        </>
    )

}

export default Authentication;
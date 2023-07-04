function SignUp() {

    console.log('Hi! Please, sign up!');

    return (
        <>
            <div className="sign-up">
                <h1 className="sign-up__title">Регистрация</h1>
                <form className="sign-up__form">


                    <input id="sign-up__email" className="sign-up__input sign-up__input_type_email" placeholder="Email" />
                    <input id="sign-up__password" className="sign-up__input sign-up__input_type_password" placeholder="Пароль" />
                    <button className="sign-up__button">Зарегистрироваться</button>


                </form>
                <p className="sign-up__log-in">Уже зарегистрированы? <a rel="stylesheet" href="#" className="sign-up__log-in_link">Войти</a></p>
                {/* <p className="sign-up__log-in">Уже зарегистрированы? <Link to="/log-in" className="sign-up__log-in_link">Войти</Link></p> */}
            </div>
        </>
    )

}

export default SignUp;
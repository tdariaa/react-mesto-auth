import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/api.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup .jsx'
import DeleteWarningPopup from './DeleteWarningPopup.jsx';
import '../App.css';


import Register from './Register.jsx';
import LogIn from './LogIn.jsx';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import * as auth from './auth.jsx';





function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isPopupWithImageOpen, setPopupWithImageOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [selectedCardId, setSelectedCardId] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);


  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isRegistrationSuccess, setRegistrationSuccess] = React.useState(false);




  React.useEffect(() => {
    api.getAllNeededData()
      .then(function (value) {
        const [cardsInfo, profileInfo] = value;
        setCurrentUser(profileInfo);
        setCards(cardsInfo);
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }, [])

  function closeAllPopup() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setPopupWithImageOpen(false);
    setDeletePopupOpen(false);

    setInfoTooltipOpen(false);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleDeleteClick(cardId) {
    setSelectedCardId(cardId);
    setDeletePopupOpen(true);
  }

  function handleCardDelete() {
    api.deleteCard(selectedCardId)
      .then((value) => {
        setCards(cards.filter((card) => card._id !== selectedCardId));
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
    setDeletePopupOpen(false);
  }

  function handleCardClick(cardInfo) {
    setSelectedCard(cardInfo);
    setPopupWithImageOpen(true);
  }

  function handleCardLike(likes, cardId) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(cardId, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardId ? newCard : c
        ));
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }

  function handleUpdateUser(data) {
    api.patchProfileData(data)
      .then((profileData) => {
        setCurrentUser(profileData);
        setEditProfilePopupOpen(false);
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }

  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        setEditAvatarPopupOpen(false);
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setAddPlacePopupOpen(false);
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      })
  }






  
  function handleRegistration() {
    setInfoTooltipOpen(true);
  }
  function handleRegisterSubmit(password, email) {
    auth.register(password, email)
      .then((response) => {
        console.log(response.ok);
        setRegistrationSuccess(response.ok);
        return response.json();
      })
      .then((res) => {
        console.log(res);
        handleRegistration();
        return res;
      })
      .catch(function (value) {
        setRegistrationSuccess(false);
        console.log('Ошибка:' + value);
      })
  }



  function handleLogin() {
    setLoggedIn(true);
  }





  return (






    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <BrowserRouter>

          <Header />

          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/signup" replace />} />
            <Route path="/signup" element={<Register onRegistration={handleRegisterSubmit} />} />
            <Route path="/login" element={<LogIn handleLogin={handleLogin} />} />

            <Route path="/main" element={
              <ProtectedRouteElement element={Main} loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleDeleteClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards} />

            } />


            {/* <Route path="/main" element={
              <>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardDelete={handleDeleteClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                />

              </>
            } /> */}

          </Routes>

          {loggedIn && <Footer />}

        </BrowserRouter >

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeleteWarningPopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopup}
          onCardDelete={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isPopupWithImageOpen}
          onClose={closeAllPopup}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccess}
          onClose={closeAllPopup}
          onRegistration={handleRegistration}
        />

      </div>
    </CurrentUserContext.Provider>






  );
}

export default App;

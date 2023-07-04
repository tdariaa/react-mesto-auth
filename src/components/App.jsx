import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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


import SignUp from './SignUp.jsx'




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

  return (






    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-up" replace />} />
            <Route path="/sign-up" element={
              <>
                
                <SignUp />
              </>
            } />


            <Route path="/main" element={
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
                <Footer />
              </>
            } />

          </Routes>
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

      </div>
    </CurrentUserContext.Provider>






  );
}

export default App;

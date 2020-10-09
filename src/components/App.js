import React from "react";
import { Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import myApi from "../utils/Api";
import * as authApi from "../utils/AuthApi.js";
import failImg from "../images/popup/fail.png";
import successImg from "../images/popup/success.png";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(
    false
  );
  const [cards, setCards] = React.useState([]);
  const [img, setImg] = React.useState(failImg);
  const [imgAlt, setImgAlt] = React.useState("Увы");
  const [title, setTitle] = React.useState(
    "Что-то пошло не так! Попробуйте ещё раз."
  );
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  const tokenCheck = () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi.getContent(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        }
      });
    }
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    history.push("/signin");
  };

  const onLogin = (email, password) => {
    return authApi
      .authorize(email, password)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          history.push("/");
          setInfoTooltipPopupOpen(true);
          setEmail(email);
          setImg(successImg);
          setImgAlt("У - успех!");
          setTitle("Вы успешно вошли, когратсы!");
          setTimeout(() => {
            setInfoTooltipPopupOpen(false);
          }, 3000);
        } else {
          setInfoTooltipPopupOpen(true);
          setTitle("Неверный логин или пароль");
          setTimeout(() => {
            setInfoTooltipPopupOpen(false);
          }, 3000);
          throw new Error("Введен неверный email или пароль");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onRegister = (email, password) => {
    return authApi
      .register(email, password)
      .then((data) => {
        if (data) {
          history.push("/signin");
          setInfoTooltipPopupOpen(true);
          setImg(successImg);
          setImgAlt("У - успех!");
          setTitle("Вы успешно зарегистрировались!");
        } else {
          setInfoTooltipPopupOpen(true);
          throw new Error("Увы, зарегестрироваться не получилось..");
        }
      })
      .catch((err) => console.log(err.message));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      myApi
        .setLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log(`Ошибка отправки лайка... ${err}`);
        });
    } else {
      myApi
        .delLike(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log(`Ошибка отправки лайка... ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    myApi.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(undefined);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(onUpdateUser) {
    myApi.setUserInfo(onUpdateUser).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(onUpdateAvatar) {
    myApi.setAvatar(onUpdateAvatar).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit(onAddPlace) {
    myApi.setNewCard(onAddPlace).then((newCard) => {
      setCards([...cards, newCard]);
      closeAllPopups();
    });
  }

  React.useEffect(() => {
    myApi
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Ошибка получения данных... ${err}`);
      });
  }, []);

  React.useEffect(() => {
    myApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка получения данных о пользователе... ${err}`);
      });
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <Switch>
      <Router history={history}>
        <div className="page">
          <Header
            loggedIn={loggedIn}
            onSignOut={onSignOut}
            onEmail={email}
            onLogin={onLogin}
          />
          <CurrentUserContext.Provider value={currentUser}>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              selectedCard={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip
              isOpen={isInfoTooltipPopupOpen}
              onClose={closeAllPopups}
              img={img}
              alt={imgAlt}
              title={title}
            />
          </CurrentUserContext.Provider>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
          <Footer />
        </div>
      </Router>
    </Switch>
  );
}

export default App;

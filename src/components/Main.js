import React from 'react';
import defaultAvatar from '../images/profile/download.jpg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__wrapper">
                    <div className="profile__edit" onClick={props.onEditAvatar}>
                        <img src={currentUser.avatar || defaultAvatar} alt="аватар" className="profile__avatar" />
                    </div>
                    <div className="profile__data-container">
                        <div className="profile__info">
                            <h1 className="profile__info-title">{currentUser.name}</h1>
                            <button type="button" onClick={props.onEditProfile} className="profile__info-edit-button"></button>
                        </div>
                        <p className="profile__info-subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" onClick={props.onAddPlace} className="profile__add-button"></button>
            </section>
            <section className="gallery">
                {props.cards.map((item, id) => {
                    return (
                        <Card card={item} key={id} onCardClick={props.selectedCard} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                    )
                })}
            </section>
        </main>
    );
}

export default Main;


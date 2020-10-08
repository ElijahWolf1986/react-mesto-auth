import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    const card = props.card;
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__trash ${isOwn && 'card__trash_type_visible'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked && 'card__like_state_active'}`
    );
    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }

    function handleDeleteClick() {
        props.onCardDelete(card);
    }

    return (
        <div className="card">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img src={card.link} alt={card.name} className="card__img" onClick={handleClick} />
            <div className="card__place">
                <h3 className="card__title">{card.name}</h3>
                <div className="card__like_group">
                    <button type="button" title="" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__like_counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;
import React from 'react';

function ImagePopup(props) {
    const selectedCard = props.card;
    return (
        <section id='popup-view' className={`popup ${selectedCard && 'popup_state_opened'}`}>
            <div className="popup__overlay" onClick={props.onClose}> </div>
            <div className="popup__container-view">
                <button type="button" name='closePlace' className="popup__close-icon" onClick={props.onClose}></button>
                <img src={selectedCard ? selectedCard.link : '#'} alt={selectedCard ? selectedCard.name : 'none'} className="popup__img-view" />
                <h2 className="popup__title-view">{selectedCard ? selectedCard.name : ''}</h2>
            </div>
        </section>
    );
}

export default ImagePopup;
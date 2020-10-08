import React from 'react';

function PopupWithForm(props) {
    return (
        <section id={props.id} className={`popup ${props.isOpen && 'popup_state_opened'}`}>
            <div className="popup__overlay" onClick={props.onClose}> </div>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <form name={props.name} onSubmit={props.onSubmit} method="POST" className="popup__form" noValidate>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;
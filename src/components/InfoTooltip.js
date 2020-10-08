import React from 'react';

function InfoTooltip(props) {
    return (
        <section id={props.id} className={`popup ${props.isOpen && 'popup_state_opened'}`}>
            <div className="popup__overlay" onClick={props.onClose}> </div>
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <div className="popup__status">
                    <img src={props.img} alt={props.alt} />    
                    <h2 className="popup__title-status">{props.title}</h2>
                </div>
            </div>
        </section>
    );
}

export default InfoTooltip;
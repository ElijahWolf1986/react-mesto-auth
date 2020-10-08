import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name: name,
            link: link
        });
    }

    return (
        <PopupWithForm id='popup-place' name='popup_place_form' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__form-author-info">
                <input id="place-input" type="text" value={name || ''} onChange={handleChangeName} name="place" minLength="1" maxLength="30" required placeholder="Название" className="popup__input" />
                <span id="place-input-error" className="popup__error_visible"></span>
                <input id="url-input-img" type="url" value={link || ''} onChange={handleChangeLink} name="url" required placeholder="Ссылка на картинку" className="popup__input" />
                <span id="url-input-error" className="popup__error_visible"></span>
            </fieldset>
            <button type="submit" className="popup__button-save">Создать</button>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
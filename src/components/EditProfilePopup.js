import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm id='popup-author' name='popup_author_form' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
            <fieldset className="popup__form-author-info">
                <input id="author-input" type="text" value={name || ''} onChange={handleChangeName} name="author" minLength="2" maxLength="40" required placeholder="Введите имя" className="popup__input" />
                <span id="author-input-error" className="popup__error_visible"></span>
                <input id="metier-input" type="text" value={description || ''} onChange={handleChangeDescription} name="metier" minLength="2" maxLength="200" required placeholder="Введите род занятий" className="popup__input" />
                <span id="metier-input-error" className="popup__error_visible"></span>
            </fieldset>
            <button type="submit" className="popup__button-save">Сохранить</button>
        </PopupWithForm>
    )
}




export default EditProfilePopup;
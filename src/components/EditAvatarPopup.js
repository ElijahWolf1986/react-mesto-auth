import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const inputAvatar = React.useRef(null);

    React.useEffect(() => {
        inputAvatar.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateAvatar({
            avatar: inputAvatar.current.value
        });
    }

    return (
        <PopupWithForm id='popup-avatar' name='popup_avatar' title='Обновите аватар' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__form-author-info">
                <input id="url-input" type="url" ref={inputAvatar} name="url" required placeholder="Ссылка на аватар" className="popup__input" />
                <span id="url-input-error" className="popup__error_visible"></span>
            </fieldset>
            <button type="submit" className="popup__button-save">Сохранить</button>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
export default class Popup {

    constructor(addPopup, profilePopup, avatarPopup) {
        this.addPopup = addPopup;
        this.profilePopup = profilePopup;
        this.avatarPopup = avatarPopup;
    }

    openBigPic(event, picturePopup, picturePopupContentImage, bgDimmer) {
        if (event.target.classList.contains('place-card__image')){
            picturePopupContentImage.src = event.target.getAttribute('style').substring(22, event.target.getAttribute('style').length - 1);
            picturePopup.removeAttribute('style');
            bgDimmer.removeAttribute('style');
        }
    }

    closeBigPic(event, picturePopup, picturePopupContentImage, bgDimmer) {
        if ((event.target.classList.contains('popup__close') || event.keyCode === 27) && document.getElementById('bigPicture') !== null) {
            picturePopupContentImage.removeAttribute('src');
            picturePopup.style.display = 'none';
            bgDimmer.style.display = 'none';
        }
        
    }

    open(event, userInfo, profileForm, errorAuthorName, errorAbout) {
        if (event.target.classList.contains('button_user-info')) {
            this.addPopup.classList.add('popup_is-opened');
        };
        if (event.target.classList.contains('button_edit-button')) {
            userInfo.setUserInfo(profileForm.authorName, profileForm.about);
            errorAuthorName.textContent = '';
            errorAbout.textContent = '';
            profileForm.submit.removeAttribute('disabled');
            this.profilePopup.classList.add('popup_is-opened');
        };
        if (event.target.classList.contains('background-dimmer__user-photo')) {
            this.avatarPopup.classList.add('popup_is-opened');
        };
    }

    close(event) {
        event.target.closest('.popup').classList.remove('popup_is-opened');
    }
};


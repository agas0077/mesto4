import '../pages/index.css';
import Api from './Api';
import Card from './Card';
import CardList from './CardList';
import FormValidator from './FormValidator';
import Popup from './Popup';
import UserInfo from './UserInfo';
 

// Переменные

    // Формы
    const addForm = document.forms.new;
    const profileForm = document.forms.profile; 
    const avatarForm = document.forms.avatar;

    // Попап добавления картинок
    const addPopup = document.querySelector('#add-form');
    const addFormSubmitBtn = addPopup.querySelector('.button_addSave');
    const addPopupCloseBtn = addPopup.querySelector('.popup__close');
    const addPopupOpenBtn = document.querySelector('.button_user-info');

    // Документ
    const placesList = document.querySelector('.places-list');
    const userName = document.querySelector('.user-info__name');
    const userAbout = document.querySelector('.user-info__job');
    const fieldsForValidation = ['name', 'link', 'authorName', 'about', 'avatarLink'];
    const userId = 'facb15f543978314e4235451'

    // Попап профиля
    const profilePopup = document.querySelector('#profile-form');
    const profilePopupCloseBtn = profilePopup.querySelector('.popup__close');
    const profileFormSubmitBtn = profilePopup.querySelector('.button');
    const profilePopupOpenBtn = document.querySelector('.button_edit-button');
    const errorAuthorName = document.querySelector('#error-authorName');
    const errorAbout = document.querySelector('#error-about');

    // Попап большой картинки
    const picturePopup = document.querySelector('.picture-popup');
    const picturePopupContentImage = document.querySelector('.picture-popup-content__image');
    const bgDimmer = document.querySelector('.background-dimmer__page');

    // Попап аватара
    const avatarPopup = document.querySelector('#avatar-form');
    const avatarPopupOpenBtn = document.querySelector('.user-info__photo');
    const avatarPopupCloseBtn = avatarPopup.querySelector('.popup__close');
    const avatarPopupSubmitBtn = avatarPopup.querySelector('.button_avatarSave');

// Классы
const api = new Api('https://praktikum.tk/cohort8', '366ae70b-266a-41f4-b874-e57697e718a8');
const card = new Card();
const popup = new Popup(addPopup, profilePopup, avatarPopup);
const userInfo = new UserInfo(api, userName, userAbout);
const elements = new FormValidator(fieldsForValidation);
const cardList = new CardList(placesList);



// Запуск функций сайта

// Первые 10 карточек
cardList.render(card, api, userId);

// Открытие попапов больших картинок
placesList.addEventListener('click', () => {
    popup.openBigPic(event, picturePopup, picturePopupContentImage, bgDimmer);
});

// Закрытие попапов больших картинок
document.addEventListener('click', () => {
    popup.closeBigPic(event, picturePopup, picturePopupContentImage, bgDimmer);
});

document.addEventListener('keyup', () => {
    popup.closeBigPic(event, picturePopup, picturePopupContentImage, bgDimmer);
});

// Валидация всех полей ввода
elements.setEventListeners.call(elements);

// Добавление новых фотографий
function addMorePic() {
    event.preventDefault();
    addFormSubmitBtn.classList.remove('button_addSave');
    addFormSubmitBtn.classList.add('button_addSaveWhileUploading');
    addFormSubmitBtn.textContent = 'Загрузка...';
    cardList.addCard(card, api, addForm.name.value, addForm.link.value)
        .then(() => {
            addFormSubmitBtn.classList.remove('button_addSaveWhileUploading');
            addFormSubmitBtn.classList.add('button_addSave');
            addFormSubmitBtn.textContent = '+';
            addForm.reset();
            addPopup.classList.remove('popup_is-opened');
            addFormSubmitBtn.setAttribute('disabled', true);
        });
};

addForm.addEventListener('submit', addMorePic);

// Слушатель удаления карточек
placesList.addEventListener('click', (event) => {
    card.delete(api, event);
});

// Слушатель лайков на карточки
placesList.addEventListener('click', (event) => {
    card.like(api, event);
});

// Открыте форм
addPopupOpenBtn.addEventListener('click', () => {
    popup.open.call(popup, event);
});

profilePopupOpenBtn.addEventListener('click', () => {
    popup.open.call(popup, event, userInfo, profileForm, errorAuthorName, errorAbout);
});

avatarPopupOpenBtn.addEventListener('click', () => {
    popup.open.call(popup, event);
});

// Слушатели на кнопки закрытия
addPopupCloseBtn.addEventListener('click', popup.close);
profilePopupCloseBtn.addEventListener('click', popup.close);
avatarPopupCloseBtn.addEventListener('click', popup.close);

// Слушатель на кнопку esc
document.addEventListener('keyup', (event) => {
    if (event.keyCode === 27) {
        addPopup.classList.remove('popup_is-opened');
        profilePopup.classList.remove('popup_is-opened');
        avatarPopup.classList.remove('popup_is-opened');
    };
});

// Подгрузка имени и "о себе" в форму
userInfo.setUserInfo(profileForm.authorName, profileForm.about);

// Слушатель на сохранение значения имени и "о себе"
profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileFormSubmitBtn.textContent = 'Загрузка...';
    api.patchUserInfo(userName.textContent, userAbout.textContent)
        .then(() => {
            profileFormSubmitBtn.textContent = 'Сохранить';
            userName.textContent = profileForm.authorName.value;
            userAbout.textContent = profileForm.about.value;
            popup.close(event);
        });
});

// Подгрузка аватара
userInfo.setInitialAvatar(api, avatarPopupOpenBtn);

// Сохранение нового аватара
avatarForm.addEventListener('submit', (event) => {
    event.preventDefault();
    avatarPopupSubmitBtn.textContent = 'Загрузка...';
    api.patchAvatar(avatarForm.avatarLink.value)
        .then(() => {
            avatarPopupSubmitBtn.textContent = 'Сохранить';
            userInfo.setNewAvatar(avatarForm.avatarLink.value, avatarPopupOpenBtn);
            avatarForm.avatarLink.value = "";
            popup.close(event);
        });
});


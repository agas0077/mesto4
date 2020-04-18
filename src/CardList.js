/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
export default class CardList {
  constructor(DOM) {
    this.DOM = DOM;
  }

  addCard(card, api, picName, picLink) {
    api.postNewCard(picName, picLink);
    return api.getPicturesFromServer()
      .then((array) => {
        // Проверка на случай одновременного добавления картинок несколькими пользователями
        let i = array.length - 1;
        while (array[i].owner._id !== 'facb15f543978314e4235451') {
          i -= 1;
        }
        const item = array[i];
        this.DOM.insertAdjacentHTML('beforeend', card.createMyCard(item.name, item.link, item._id, item.likes.length));
      });
  }

  render(card, api, userId) {
    api.getPicturesFromServer()
      .then((array) => {
        for (let data of array) {
            // if (data.owner._id === 'facb15f543978314e4235451') {
              if (true) { //Пока непонятки с авторизацией оставлю так
                this.DOM.insertAdjacentHTML('beforeend', card.createMyCard(data.name, data.link, data._id, data.likes.length));
                this.putLikes(card, data, userId);
            } else {
                this.DOM.insertAdjacentHTML('beforeend', card.createNotMyCard(data.name, data.link, data._id, data.likes.length));
                this.putLikes(card, data, userId);
            }
        }
      });
  }

  putLikes(card, data, userId) {
    if (card.isLiked(data, userId)) {
      this.DOM.lastChild.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
    }
  }
}

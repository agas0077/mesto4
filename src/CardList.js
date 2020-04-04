export default class CardList {

    constructor(DOM) {
        this.DOM = DOM;
    }

    addCard(card, api, picName, picLink) {
        api.postNewCard(picName, picLink);
        return api.getPicturesFromServer()
            .then(array => {
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
            .then(array => {
                let i = 0;
                for (let data of array.reverse()) {
                    if (data.owner._id === userId) {
                        this.DOM.insertAdjacentHTML('beforeend', card.createMyCard(data.name, data.link, data._id, data.likes.length));
                        this.putLikes(card, data, userId);
                    }
                    if (i !== 10 && data.owner._id !== userId) {
                        this.DOM.insertAdjacentHTML('beforeend', card.createNotMyCard(data.name, data.link, data._id, data.likes.length));
                        this.putLikes(card, data, userId);
                        i += 1;
                    }
                }
                // Загружается очень много фотографий, поэтому буду отображать только последние 10 
                // и только мои (как только эта проблема решится, нaдо удалить предыдущий цикл и раскомментить
                // тот, который ниже)

                // for (let data of array) {
                //     if (data.owner._id === 'facb15f543978314e4235451') {
                //         this.DOM.insertAdjacentHTML('beforeend', card.createMyCard(data.name, data.link, data._id, data.likes.length));
                //         this.putLikes(card, data, userId);
                //     } else {
                //         this.DOM.insertAdjacentHTML('beforeend', card.createNotMyCard(data.name, data.link, data._id, data.likes.length));
                //         this.putLikes(card, data, userId);
                //     }
                // }
            });
    }

    putLikes(card, data, userId) {
        if (card.isLiked(data, userId)) {
            this.DOM.lastChild.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
        }
    }

};
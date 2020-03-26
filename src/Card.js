export default class Card {
    
    createMyCard(name, link, _id, likes) {
        return `<div class="place-card" id='${_id}'>
                    <div class="place-card__image" style="background-image: url(${link})">
                        <button class="place-card__delete-icon"></button>
                    </div>
                    <div class="place-card__description">
                        <h3 class="place-card__name">${name}</h3>
                        <div class='place-card__like-container'>
                            <button class="place-card__like-icon"></button>
                            <p class='place-card__like-counter'>${likes}</p>
                        </div>
                    </div>
                </div>`;
    }

    createNotMyCard(name, link, _id, likes) {
        return `<div class="place-card" id='${_id}'>
                    <div class="place-card__image" style="background-image: url(${link})">
                    </div>
                    <div class="place-card__description">
                        <h3 class="place-card__name">${name}</h3>
                        <div class='place-card__like-container'>
                            <button class="place-card__like-icon"></button>
                            <p class='place-card__like-counter'>${likes}</p>
                        </div>
                    </div>
                </div>`;
    }

    like(api, event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            switch (event.target.classList.contains('place-card__like-icon_liked')) {
                case true:
                    // Убрать лайк
                    event.target.classList.remove('place-card__like-icon_liked');
                    api.deleteLike(event.target.closest('.place-card').getAttribute('id'))
                        .then(data => {
                            event.target.closest('.place-card__like-container').querySelector('.place-card__like-counter').textContent = data.likes.length;
                        });
                    break
                case false:
                    // Поставить лайк
                    event.target.classList.add('place-card__like-icon_liked');
                    api.putLike(event.target.closest('.place-card').getAttribute('id'))
                        .then(data => {
                            event.target.closest('.place-card__like-container').querySelector('.place-card__like-counter').textContent = data.likes.length;
                        });
                    break
            }       
        };  
    }

    delete(api, event) {
        if (event.target.classList.contains('place-card__delete-icon')) {
            if(window.confirm('Вы действительно хотите БЕЗВОЗВРАТНО удалить фотографию?')) {
                api.deleteCardFromServer(event.target.closest('.place-card').getAttribute('id'));
                event.target.closest('.places-list').removeChild(event.target.closest('.place-card'));
            } else {
                alert('Правильно, нам эта фотография тоже нравится))')
            };
        };
    }

    isLiked(card, userId) {
        for (let i = 0; i < card.likes.length; i++) {
            if (card.likes[i]._id === userId) return true;
        };
    }
};
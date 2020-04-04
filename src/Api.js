export default class Api {

    constructor(serverAdress, authorizationToken) {
        this.server = serverAdress;
        this.token = authorizationToken;
    }

    getUserInfoFromServer() {
        return fetch(`${this.server}/users/me`, {
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось получить данные о пользователе с сервера( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

    patchUserInfo(newUserName, newUserAbout) {
        return fetch(`${this.server}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': `${newUserName}`,
                'about': `${newUserAbout}`,
            }),
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось отправить данные о пользователе на сервер( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

    getPicturesFromServer() {
        return fetch(`${this.server}/cards`, {
            headers: {
                authorization: this.token
            },
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось получить данные с сервера( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

    postNewCard(name, link) {
        return fetch(`${this.server}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': `${name}`,
                'link': `${link}`,
            }),
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось создать пост( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

    deleteCardFromServer(_id) {
        return fetch(`${this.server}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось удалить фотографию с сервера( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

    putLike(_id) {
        return fetch(`${this.server}/cards/like/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось поставить лайк( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

    deleteLike(_id) {
        return fetch(`${this.server}/cards/like/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось удалить лайк( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

    getAvatar() {
        return fetch(`${this.server}/users/me/`, {
            headers: {
                authorization: this.token,
            },
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось получить аватар с сервера( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

    patchAvatar(newUrl) {
        return fetch(`${this.server}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'avatar': `${newUrl}`,
            }),
        })
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(`Упс, не удалось отправить аватар на сервер( Ошибка: ${res.status} ${res.statusText}`)
            })
            .catch((err) => {
                alert(err)
            });
    }

}

	/**
    * Здравствуйте. 
    * 
     * --------------------------------------------------------------------
     * Весь функционал работает корректно 
     * Код чистый и хорошо читается 
     * Вы используете логические группировки операций  
     * --------------------------------------------------------------------
     *  
     * 
     * Параметр "this.server/" необходимо вынести отдельно, можно в константу
     * как и this.token - это явное дублирование
     * 
     * Так же 'facb15f543978314e4235451' параметр

     * Самый правильный способ, как пример указан в брифе
     // url лучше передавать при инициализации класса в конструктор
     fetch(`url/cards`,
                {
       headers: {
                        // ключ который надо передавать в параметрах
      authorization: param.authorization
                    }
                })
      .then(res => {
        if (res.ok) {
       return res.json();
                }
                // если ошибка, переходим в catch
       return Promise.reject(`Ошибка: ${res.status
                }`);
            })
    .then((result) => {
                // обрабатываем результат
                // а точнее возвращает результат работы прямо в тот класс откуда вызывали
            })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
                });
    
 Хочу заметить что данные авторизации лучше передать при создании класса API в ввиде объекта	
     
     
     	
         * Класс Api это отдельный класс который ничего не знает о других классах и методах
         * Вы можете только получать данные из этого класса и использовать эти данные.
         * Представьте, что я дам Вам другой класс(допустим DataBase) к внутренностям которого вы не будете иметь доступ и даже прочитать этот файл не сможете
         * скажу что у него есть несколько методов  getInitialCards deleteCard addCard, editUserInfo, setUserInfo и так далее
         * Который только возвращает данные, а вы можите получить только обращась к этим методам.
         * Соответственно в классе нельзя реализовать такие методы как querySelector или обратиться к другому классу, а только обратитьсяк методам.
         * Отдельная обязанность. Таким же способом Вы обращаетесь к серверу. Вы не знаете, что на сервере, даже язык программирования, но вы знаете методы
         * к которым обращаетесь и способ обращения. Это и есть обязанность отдельного класса.
         
     
     
     *
     * Стоит отметить, что реализации в классе API быть не должно.Точнее прямого взаимодействия.Методы могут вызываться
    * из других классов и возвращать данные, а работа с этими данными должны быть непосредственно в классах создаваемых в 8 спринте
        *
     * работа принимается только при исправлении всех "Надо исправить"
    *
    */


    // Замечание по поводу передачи ссылки и токена учел и исправил. 
    //
    // Однако, вторую часть не понял. Если я правильно понял, то Вы имели в виду, что в классе Api, т.е. в 
    // этом файле, не может быть никаких непосредственных взаимодействий с другими классами и вообще 
    // с документом. Но у меня их и нет. Или во всяком случае я их не вижу. Все изменения, которые происходят 
    // в реузльтает получения данных или их отправления с/на сервер, описываются в других файлах путем
    // вызова метода класса Api (например, api.getAvatar()), а потом уже им приписываются дополнительные then
    // для обработки полученных данных (например вот так 
    // api.getAvatar()
    //      .then(userInfoObject => {
    //          avatarPlace.style.backgroundImage = `url(${userInfoObject.avatar})`;
    //      });)

    /* 
    Здравствуйте, работа принимается 
    По второй части это было не замечание в вашу сторону, это было напоминание. 
    Можно же не только прокинуть данные в класс API  а обратиться за ними в другой класс. 


    уберите из класса Card ключ 'facb15f543978314e4235451', вынесите в константу
    Тоже самое из класса  CardList 
    
    Но у вас я смотрю всё хорошо ) Вы молодцы
    
    */
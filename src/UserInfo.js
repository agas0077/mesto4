export default class UserInfo {

    constructor(api, userName, userAbout) {
        this.name = userName;
        this.about = userAbout; 
        api.getUserInfoFromServer()
            .then(data => {
                this.name.textContent = data.name;
                this.about.textContent = data.about;
            });
    }

    setUserInfo(formPlace1, formPlace2) {
        formPlace1.value = this.name.textContent;
        formPlace2.value = this.about.textContent;
    }

    setInitialAvatar(api, avatarPlace) {
        api.getAvatar()
            .then(userInfoObject => {
                avatarPlace.style.backgroundImage = `url(${userInfoObject.avatar})`;
            });
        
    }

    setNewAvatar(url, avatarPlace) {
        avatarPlace.style.backgroundImage = `url(${url})`;
    }

};

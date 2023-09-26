import {searchUserByLoginData} from './account.service'
let userInfo = null;
class ObserverPattern {
    constructor() {
        this.observers = [];
    }
    subscribe(observerFunction) {
        this.observers.push(observerFunction);
    }
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    notifyChange(){
        this.observers.forEach((observer) => {
            observer(userInfo);
        });
    }
    async logIn(mail, password) {
        let response = await searchUserByLoginData(mail, password);
        if(response !== undefined && response){
            userInfo = response;
            this.notifyChange();
            return true;
        }
        return false;
    }
    logOut(){
        userInfo = null;
        this.notifyChange();
    }
};
const userNotifications = new ObserverPattern();

export default{
methods:{
    //Suscribe una funcion a los cambios del usuario. También devuelve el valor actual del usuario
    watchUser(observer){
        userNotifications.subscribe(observer);
        return userInfo;
    },
    //Desuscribe una función de los cambios del usuario.
    unwatchUser(observer){
        userNotifications.unsubscribe(observer);
    },
    //Intenta iniciar sesión con dos credenciales. Si el inicio es exitoso, devuelve true. En caso contrario, devuelve false
    async logIn(mail, password){
        return await userNotifications.logIn(mail, password);
    },
    logOut(){
        userNotifications.logOut();
    }
}}
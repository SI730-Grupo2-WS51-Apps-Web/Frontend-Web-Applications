import http from "@/shared/services/http-common";

async function searchUserByLoginData(email, password){
    try {
        const response = await http.get(`/users?login.email=${email}&login.password=${password}`);
        const userData = response.data;
        if(userData){
            return userData;
        }
        else {
            throw new Error(`No existe un usuario con el correo ${email} y la contraseña ${password}`);
        }
    } catch (error) {
        console.error("Error al iniciar sesión en account.service.js", error);
        throw error;
    }
}












let userInfo = {
    id: 3,
    image: 3,
    personal: {
        firstName: "Marcelo",
        lastName: "Scerpella Zarkovic",
        phone: "+51 997 096 440",
        genre: true
    },
    login: {
        email: "marcelo.scerpella@gmail.com",
        password: "uwu"
    },
    shipping: {
        address: "Calle Parque Osores 123",
        district: "Pueblo Libre",
        province: "Lima"
    },
    payment: {
        selectedMethod: 2,
        card: {
            number: "4857 5663 8214 4352",
            name: "Marcelo Scerpella",
            month: "01",
            year: "24",
            cvv: 259
        },
        wallet: {
            id: 1
        }
    }
};
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
    logIn(mail, password) {
        searchUserByLoginData(mail, password)
            .then((response)=>{
                if(response){
                    userInfo = response;
                    this.notifyChange();
                    return true;
                }
                else return false;
            })
            .catch((error)=>{
                console.log(error);
                return false;
            });
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
    logIn(mail, password){
        return userNotifications.logIn(mail, password)
    },
    logOut(){
        userNotifications.logOut();
    }
}}
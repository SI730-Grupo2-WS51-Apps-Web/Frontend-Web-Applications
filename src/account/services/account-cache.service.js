import {createUser, getUserByLoginData, updateUser} from './account.service'
import {getDistrictByID, getDepartmentByID, getProvinceByID} from "@/account/services/regional-information.service";
import {userTemplate} from "@/account/models/user.model";
let userInfo = null;

function onlyToSave(usData){
    let newUserData = userTemplate;
    newUserData.id = usData.id;
    newUserData.image = usData.image;
    newUserData.personal.genre = usData.personal.genre;
    newUserData.personal.firstName = usData.personal.firstName;
    newUserData.personal.lastName = usData.personal.lastName
    newUserData.personal.phone = usData.personal.phone;
    newUserData.shipping.district = usData.shipping.district;
    newUserData.shipping.province = usData.shipping.province;
    newUserData.shipping.address = usData.shipping.address;
    newUserData.payment.card = usData.payment.card;
    newUserData.payment.selectedMethod = usData.payment.selectedMethod;
    newUserData.payment.wallet = usData.payment.wallet;
    return newUserData;
}
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
    async logIn(email, password) {
        let response = await getUserByLoginData(email, password);
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
    async register(userData){
        return await createUser(userData)
            .then((registeredUser)=>{
                userInfo = registeredUser;
                this.notifyChange();
            })
    }
    async update(userData){
        return await updateUser(onlyToSave(userData))
            .then((response)=>{
                userInfo = userData;
                this.notifyChange();
                return response;
            })
            .catch((error)=>{
                console.log(error)
            })
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
        const response = await userNotifications.logIn(mail, password);
        return  !!response;
    },
    logOut(){
        userNotifications.logOut();
    },
    async register(userData){
        const response = await userNotifications.register(userData);
        return !!response;
    },
    async updateDirection(Address, Department, Province, District){
        userInfo.shipping.address = Address;
        userInfo.shipping.district = await getDistrictByID(District);
        userInfo.shipping.province = await getDepartmentByID(Department);
        userInfo.shipping.district_id = District;
        userInfo.shipping.province_id = Province;
        userInfo.shipping.department_id = Department
        return await userNotifications.update(userInfo)
            .then((response)=>{
                return response;
            })
            .catch((error)=>{
                console.log("Ocurrio un error al actualizar la direccion en account-cache.service.js")
            })
    },
    async updatePersonalInformation(newUserData){
        userNotifications.update(userInfo)
            .then((response)=>{
                return response;
            })
            .catch((error)=>{
                console.log("Ocurrio un error al actualizar la información personal del usuario en account-cache.service.js")
            })
    }
}}
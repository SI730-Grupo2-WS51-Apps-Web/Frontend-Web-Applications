import {emailUsed} from "@/account/services/account.service";
const userTemplate = {
    id: Number.MAX_SAFE_INTEGER,
    image: 0,
    personal: {
        firstName: "",
        lastName: "",
        phone: null,
        genre: undefined,
    },
    login: {
        email: "",
        password: "",
    },
    shipping: {
        address: "",
        district: "",
        province: "",
    },
    payment:{
        selectedMethod: 0,
        card:{
            number: "",
            name: "",
            month: "",
            year: "",
            cvv: 0,
        },
        wallet: {
            id: 0,
        }
    },
}

const genres = [
    {name: "Masculino",value:true},
    {name: "Femenino",value:false},
]

const errors = {
    no_mail: "No ha ingresado un correo para la cuenta",
    no_password: "No ha ingresado una contraseña para la cuenta",
    no_at: "El correo no posee una @",
    more_than_one_at: "El correo tiene más @ de las que debería",
    no_mail_valid_url: "La direccion web del correo es invalida",
    email_already_used: "El correo ya ha sido usado antes",
    no_repeated_password: "Las contraseñas ingresadas no son iguales",

    not_name: "Debe insertar un nombre",
    not_last_name: "Debe insertar un apellido",
    not_phone: "Debe insertar un numero de telefono",
    phone_is_not_a_number: "El telefono debe ser un número",
    phone_out_of_range: "El numero telefonico debe ser un valor entre 900 000 000 y 999 999 999",
    not_genre: "No ha elegido su sexo"
}
async function validateNewEmailAndPassword(user, repeatedPass){
    if(!user.login.password) return errors.no_password;
    if(!user.login.email) return errors.no_mail;
    if(user.login.password !== repeatedPass) return errors.no_repeated_password;
    const validateAt = user.login.email.split("@");

    //Si hay mas de una arroba, o no hay texto antes o despues de la arroba (Purgar @@@@@@)
    if(validateAt.length > 2) return errors.more_than_one_at;
    if(validateAt.length !== 2 || !validateAt[0] || !validateAt[1]) return errors.no_at;

    const validateURL = validateAt[1].split(".");

    //Si el texto que hay despues de la arroba no tiene un punto (Purgar a@a)
    if(validateURL.length < 2) return errors.no_mail_valid_url;

    for(let partsOfEmailWebDomain in validateURL){
        //Si existe texto entre los puntos (Purgar a@a......a)
        if(validateURL[partsOfEmailWebDomain].length === 0){
            return errors.no_mail_valid_url;
        }
    }

    if(await emailUsed(user.login.email)){
        return errors.email_already_used;
    }
    else{
        return false
    }
}
async function validatePersonalInformation(info){
    info.personal.phone = Number(info.personal.phone);
    if(!info.personal.firstName) return errors.not_name;
    if(!info.personal.lastName) return errors.not_last_name;
    if(!info.personal.phone) return errors.not_phone;
    if(!info.personal.genre) return errors.not_genre;
    if(info.personal.phone === NaN){
        info.personal.phone = "";
        return errors.phone_is_not_a_number;
    }
    if(!(900000000<info.personal.phone && info.personal.phone<999999999)){
        return errors.phone_out_of_range;
    }
    return false;
}

export {
    genres, userTemplate, validateNewEmailAndPassword, validatePersonalInformation,
}
import {emailUsed} from "@/account/services/account.service";
import {userTemplate} from "@/account/models/user.model";
import {genres} from "@/account/models/user.model";

const errors = {
    no_mail: "No ha ingresado un correo para la cuenta",
    no_password: "No ha ingresado una contraseña para la cuenta",
    no_at: "El correo no posee una @",
    more_than_one_at: "El correo tiene más @ de las que debería",
    no_mail_valid_url: "La direccion web del correo es invalida",
    email_already_used: "El correo ya ha sido usado antes",
    no_repeated_password: "Las contraseñas ingresadas no son iguales",
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

export {
    genres, userTemplate, validateNewEmailAndPassword,
}
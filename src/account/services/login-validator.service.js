const errors = {
    no_mail: "Ingrese el correo electronico",
    no_password: "Ingrese la contraseña",
    no_mail_at: "El correo electrónico no es valido",
    no_mail_valid_url: "La direccion web del correo es invalida",
}
function isLoginWrong(email, password){
    if(!password) return errors.no_password;
    if(!email) return errors.no_mail;
    const validateAt = email.split("@");

    //Si hay mas de una arroba, o no hay texto antes o despues de la arroba (Purgar @@@@@@)
    if(validateAt.length !== 2 || !validateAt[0] || !validateAt[1]) return errors.no_mail_at;

    const validateWebdir = validateAt[1].split(".");

    //Si el texto que hay despues de la arroba no tiene un punto (Purgar a@a)
    if(validateWebdir.length < 2) return errors.no_mail_valid_url;


    for(let partsOfEmailWebDomain in validateWebdir){
        //Si existe texto entre los puntos (Purgar a@a......a)
        if(validateWebdir[partsOfEmailWebDomain].length === 0){
            return errors.no_mail_valid_url;
        }
    }
    return false;
}
export {isLoginWrong};
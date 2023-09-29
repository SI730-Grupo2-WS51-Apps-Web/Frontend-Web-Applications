const errors = {
    not_name: "No has insertado un nombre válido",
    not_last_name: "No has insertado un apellido válido",
    not_phone: "No has insertado un número de teléfono",
    phone_out_of_range: "El numero telefonico debe ser un valor entre 900 000 000 y 999 999 999",
    not_genre: "No has elegido un sexo"
}

async function validatePersonalInformation(info){
    info.personal.phone = Number(info.personal.phone);
    if(!info.personal.firstName) return errors.not_name;
    if(!info.personal.lastName) return errors.not_last_name;
    if(!info.personal.phone) return errors.not_phone;
    if(info.personal.genre === undefined) return errors.not_genre;
    if(!(900000000<=info.personal.phone && info.personal.phone<=999999999)){
        return errors.phone_out_of_range;
    }
    return false;
}
export {validatePersonalInformation}
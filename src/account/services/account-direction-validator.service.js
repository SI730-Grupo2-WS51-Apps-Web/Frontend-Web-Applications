const errors = {
    no_address: "No ha ingresado una direccion",
    no_department: "No ha elegido un departamento",
    no_province: "No ha elegido una provincia",
    no_district: "No ha elegido un distrito",
}

function validateDirection(address, department, province, district){
    if(!address) return errors.no_address;
    if(!department) return errors.no_department;
    if(!province) return errors.no_province;
    if(!district) return errors.no_district;
    return false;
}
export {validateDirection}
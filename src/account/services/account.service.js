import http from "@/shared/services/http-common";

async function searchUserByLoginData(email, password){
    try {
        const response = await http.get(`/users?login.email=${email}&login.password=${password}`);
        const userData = response.data;
        console.log(userData);
        if(userData !== undefined){
            if(userData.length > 0){
                console.log(userData[0])
                return userData[0];
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Error al iniciar sesión en account.service.js: ", error);
        return false;
    }
}

export {
    searchUserByLoginData
}
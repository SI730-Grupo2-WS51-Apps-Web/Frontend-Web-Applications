import http from "@/shared/services/http-common";
import {getImageURLbyImageId} from "@/shared/services/image.service";
import {paymentMethods} from "@/account/models/user.model";

async function getUserByLoginData(email, password){
    try {
        const response = await http.get(`/users?login.email=${email}&login.password=${password}`);
        const userData = response.data;
        if(userData !== undefined){
            if(userData.length > 0){
                userData[0].imageName = await getImageURLbyImageId(userData[0].image);
                userData[0].login.password = "***********";
                const paymentMethodResponse = await http.get(`/paymentMethods?id=${userData[0].payment.selectedMethod}`);
                const paymentData = paymentMethodResponse.data;
                if(paymentData && paymentData.length === 1){
                    userData[0].payment.paymentMethod = paymentData[0].name;
                    switch (paymentData[0].id){
                        case paymentMethods.card:
                            userData[0].payment.MethodData = {};
                            userData[0].payment.MethodData.name = userData[0].payment.card["number"];
                            userData[0].payment.MethodData.maxCost = 100000;
                            break;
                        case paymentMethods.wallet:
                            const walletResponse = await http.get(`/wallets?id=${userData[0].payment.wallet.id}`);
                            const walletData = walletResponse.data;
                            userData[0].payment.MethodData = {};
                            userData[0].payment.MethodData.name = walletData[0].name;
                            userData[0].payment.MethodData.maxCost = walletData[0].max;
                            break;
                    }
                }
                else {
                    userData[0].payment.paymentMethod = "Undefined";
                    userData[0].payment.MethodData.name = "Undefined";
                    userData[0].payment.MethodData.maxCost = 0;
                }
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

async function emailUsed(email){
    try {
        const response = await http.get(`/users?login.email=${email}`);
        const userData = response.data;
        if(userData !== undefined) return userData.length > 0;
        else return false;
    } catch (error) {
        console.error("Error al validar si el usuario existe en account.service.js: ", error);
        return false;
    }
}

async function createUser(newUserData){
    try {
        const response = await http.get(`/users?_sort=id&_order=asc`);
        const usersData = response.data;
        //Como los ID estan ordenados de menor a mayor, si quisieramos
        //saber si hay algun ID que no hemos usado que sea menor al
        //maximo id, podemos usar un truco. Como los elementos del arreglo
        //estan ordenados por ID, entonces los valores que contenga ese
        //arreglo deberian ser id=0 pos=0; id=1 pos=1; y así sucesivamente,
        //hasta id=n pos=n. Si falta algun valor de entre medias, entonces
        //el ultimo valor n sería id=n+a pos=n, siendo a  la cantidad de ids
        //sin usar si hicieramos una lista desde 0 hasta n
        if(usersData[usersData.length-1].id === usersData.length-1){
            console.log("Las IDs estan usadas. Se creará una nueva")
            newUserData.id = usersData.length;
        }
        else{
            console.log("Hay IDs disponibles sin usar")
            let left = 0;
            let right = usersData.length - 1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);

                // Comprueba si el ID actual es igual a su posición en el arreglo.
                if (usersData[mid].id === mid) {
                    // Si es igual, busca en la mitad derecha.
                    left = mid + 1;
                } else {
                    // Si no es igual, busca en la mitad izquierda.
                    right = mid - 1;
                }
            }
            newUserData.id = left;
        }
        console.log(newUserData)
        const creationResponse = await http.post(`/users`,newUserData);
        const creationData = response.data;
        newUserData.imageName = await getImageURLbyImageId(newUserData.image);
        newUserData.login.password = "***********";
        return newUserData;
    } catch (error) {
        console.error("Error al crear el usuario en account.service.js: ", error);
        return false;
    }
}

async function updateUser(userData){
    try {
        const login = await http.get(`/users/${userData.id}`);
        //Recargar los datos de login
        const loginData = login.data;
        console.log(loginData)
        userData.login = loginData.login;

        const response = await http.put(`/users/${userData.id}`,userData);
        const responseData = response.data;
        if(responseData) return responseData;
        else return false;
    } catch (error) {
        console.error("Error al actualizar el usuario en account.service.js: ", error);
        return false;
    }
}

export {
    getUserByLoginData, emailUsed, createUser, updateUser,
}
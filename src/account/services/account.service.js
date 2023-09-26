import http from "@/shared/services/http-common";

const paymentMethods={
    card: 1,
    wallet: 2,
}
async function searchUserByLoginData(email, password){
    try {
        const response = await http.get(`/users?login.email=${email}&login.password=${password}`);
        const userData = response.data;
        if(userData !== undefined){
            if(userData.length > 0){
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
                console.log("uwu", userData)
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
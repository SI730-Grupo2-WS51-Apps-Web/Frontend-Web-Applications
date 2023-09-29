import http from "@/shared/services/http-common";

async function getWalletsData(){
    try {
        const response = await http.get(`/wallets`);
        const walletsData = response.data;
        if(walletsData) return walletsData;
        else return [];
    } catch (error) {
        console.error("Error al obtener la información de billeteras digitales en digital-wallets.service.js: ", error);
        return false;
    }
}
async function getWalletFromID(id){
    try {
        const response = await http.get(`/wallets?id=${id}`);
        const walletsData = response.data;
        if(walletsData) if(walletsData.length > 0) return walletsData[0];
        else return {};
    } catch (error) {
        console.error("Error al obtener la información de billeteras digitales en digital-wallets.service.js: ", error);
        return false;
    }
}

export {
    getWalletsData, getWalletFromID,
}
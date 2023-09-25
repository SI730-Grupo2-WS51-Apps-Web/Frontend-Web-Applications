import axios from "axios";

// URL de tu servidor JSON
const serverUrl = "http://localhost:3000";


// Función para obtener el atributo 'image' de un usuario por su ID
async function getProductListLike(like, limit = 3) {
    try {
        const response = await axios.get(`${serverUrl}/products?name_like=${like}&_limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error al solicitar datos de los productos en products.service.js", error);
        throw error;
    }
}

export {getProductListLike}
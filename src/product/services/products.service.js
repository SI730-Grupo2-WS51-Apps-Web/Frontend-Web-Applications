import http from "@/shared/services/http-common";

// Función para obtener el atributo 'image' de un usuario por su ID
async function getProductListLike(like, limit = 3) {
    try {
        const response = await http.get(`/products?name_like=${like}&_limit=${limit}`);
        const products = response.data;
        if(products){
            return products;
        }
        else{
            return undefined;
        }
    } catch (error) {
        console.error("Error al solicitar datos de los productos en products.service.js", error);
        throw error;
    }
}

export {getProductListLike}
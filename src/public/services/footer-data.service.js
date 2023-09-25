import http from "@/shared/services/http-common";

// Función para obtener el atributo 'image' de un usuario por su ID
async function getFooterInfo() {
    try {
        const response = await http.get(`/footer`);
        return response.data;
    } catch (error) {
        console.error("Error al solicitar datos del footer en footer-data.service.js", error);
        throw error;
    }
}

export {getFooterInfo}
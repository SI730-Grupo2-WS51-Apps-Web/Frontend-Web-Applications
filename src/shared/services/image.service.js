import http from "@/shared/services/http-common";

// Función para obtener el atributo 'image' de un usuario por su ID

async function getImageList(){
    try {
        const imageResponse = await http.get(`/imageList`);
        const imageData = imageResponse.data;
        let response = [];

        if (imageData) {
            for(let image in imageData){
                response.push(imageData[image].id);
            }
            return response;
        } else {
            throw new Error("Imagenes no encontradas");
        }
    } catch (error) {
        console.error("Error al obtener la lista de imagenes: ", error);
        throw error;
    }
}
async function getUserImageByUser(userData) {
    try {
        if(userData===null || userData === undefined) {userData = {}; userData.image="0";};
        const imageResponse = await http.get(`/imageList/${userData.image}`);
        const imageData = imageResponse.data;
        return imageData.location;
    } catch (error) {
        console.error("Error al obtener la imagen del usuario:", error);
        throw error;
    }
}

async function getImageURLbyImageId(imageId) {
    try {
        const imageResponse = await http.get(`/imageList/${imageId}`);
        const imageData = imageResponse.data;
        return imageData.location;
    } catch (error) {
        console.error("Error al obtener la lista de imagenes: ", error);
        throw error;
    }
}
async function setUserImageById(imageId, userId){
    try {
        const userResponse = await http.get(`/users/${userId}`);
        const imageResponse = await http.get(`/imageList/imageId`);
        const userData = userResponse.data;
        const imageData = imageResponse.data;
        if(imageData.location){
            if (userData) {
                userData.image = imageId;
                await http.put(`/users/${userId}`, userData)
                    .then((response)=>{
                        if(response.status === 200){
                            console.log(`Imagen del usuario ${userId} actualizada a ${imageId}`)
                            return response;
                        }
                        else {
                            throw new Error(`Error al actualizar la imagen del usuario  ${userId}. Respuesta erronea del servidor en image.service.js`);
                        }
                    })
                    .catch((error)=>{
                        console.log(`Error al actualizar la imagen del usuario ${userId}. Error retenido en image.service.js`)
                    })
            }
            else {
                throw new Error("usuario no encontrado en image.service.js");
            }
        }
        else {
            throw new Error("imagen no encontrada en image.service.js");
        }
    } catch (error) {
        console.error("Error al establecer la imagen del usuario:", error);
        throw error;
    }
}

export {getImageList, getUserImageByUser, getImageURLbyImageId, setUserImageById}
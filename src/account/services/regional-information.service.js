import http from "@/shared/services/http-common";

async function getDepartmentsData(){
    try {
        const response = await http.get(`/departments`);
        const departmentsData = response.data;
        if(departmentsData) return departmentsData;
        else return [];
    } catch (error) {
        console.error("Error al obtener la informacion de departamentos en regional-information.service.js: ", error);
        return false;
    }
}

async function getProvincesData(departmentsId){
    try {
        const response = await http.get(`/provinces?department_id=${departmentsId}`);
        const provincesData = response.data;
        if(provincesData) return provincesData;
        else return [];
    } catch (error) {
        console.error("Error al obtener la informacion de provincias en regional-information.service.js: ", error);
        return false;
    }
}

async function getDistrictsData(provinceId){
    try {
        const response = await http.get(`/districts?province_id=${provinceId}`);
        const districtsData = response.data;
        if(districtsData) return districtsData;
        else return [];
    } catch (error) {
        console.error("Error al obtener la informacion de distritos en regional-information.service.js: ", error);
        return false;
    }
}
async function getDepartmentByID(id){
    try {
        const response = await http.get(`/departments?id=${id}`);
        const departmentsData = response.data;
        if(departmentsData) return departmentsData[0].name;
        else return null;
    } catch (error) {
        console.error(`Error al obtener el departamento ${id} en regional-information.service.js: `, error);
        return false;
    }
}

async function getProvinceByID(id){
    try {
        const response = await http.get(`/provinces?id=${id}`);
        const provincesData = response.data;
        if(provincesData) return provincesData[0].name;
        else return null;
    } catch (error) {
        console.error(`Error al obtener la provincia ${id} en regional-information.service.js: `, error);
        return false;
    }
}

async function getDistrictByID(id){
    try {
        const response = await http.get(`/districts?id=${id}`);
        const districtsData = response.data;
        if(districtsData) return districtsData[0].name;
        else return null;
    } catch (error) {
        console.error(`Error al obtener el distrito ${id} en regional-information.service.js: `, error);
        return false;
    }
}
export {
    getDepartmentsData, getProvincesData, getDistrictsData,getDepartmentByID,getProvinceByID,getDistrictByID,
}
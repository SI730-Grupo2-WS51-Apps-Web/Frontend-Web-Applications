const userTemplate = {
    id: Number.MAX_SAFE_INTEGER,
    image: 0,
    personal: {
        firstName: "",
        lastName: "",
        phone: null,
        genre: undefined,
    },
    login: {
        email: "",
        password: "",
    },
    shipping: {
        address: "",
        district_id: "",
        province_id: "",
        department_id: "",
    },
    payment:{
        selectedMethod: 0,
        card:{
            number: "",
            name: "",
            month: "",
            year: "",
            cvv: 0,
        },
        wallet: {
            id: 0,
        }
    },
}
const paymentMethods= {
    "Tarjeta": 1,
    "Billetera Digital": 2,
}

const genres = [
    {name: "Masculino",value:true},
    {name: "Femenino",value:false},
]

export {userTemplate, paymentMethods, genres}
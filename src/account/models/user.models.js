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
        district: "",
        province: "",
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
export {userTemplate}
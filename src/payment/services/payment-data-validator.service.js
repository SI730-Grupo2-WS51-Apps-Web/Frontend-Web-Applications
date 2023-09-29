import {paymentMethods} from "@/account/models/user.model";

const errors = {
    not_selected: "No has seleccionado el metodo de pago que deseas usar",

    not_card_number: "No has ingresado el numero de la tarjeta",
    not_card_name: "No has ingresado el nombre del titular de la tarjeta",
    not_card_month: "No has ingresado el mes de vencimiento de la tarjeta",
    not_card_year: "No has ingresado el año de vencimiento de la tarjeta",
    expired_card: "La tarjeta ha vencido, por favor utiliza una tarjeta válida",
    not_cvv: "No has ingresado el CVV de la tarjeta",

    not_wallet: "No has elegido una billetera digital"
}

function validatePaymentData(info){
    if(!info.payment.selectedMethod) return errors.not_selected;
    if(info.payment.selectedMethod === paymentMethods.Tarjeta){
        if(!info.payment.card.number) return errors.not_card_number;
        if(!info.payment.card.name) return errors.not_card_name;
        if(!info.payment.card.month) return errors.not_card_month;
        if(!info.payment.card.year) return errors.not_card_year;
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        if((info.payment.card.year+2000) < currentYear)return errors.expired_card;
        if((info.payment.card.year+2000) == currentYear && info.payment.card.month < currentMonth) return errors.expired_card;
        return false;
    }
    else if (info.payment.selectedMethod === paymentMethods["Billetera Digital"]) {
        if(!info.payment.wallet.id) return errors.not_wallet;
        return false;
    }
}
export {validatePaymentData}
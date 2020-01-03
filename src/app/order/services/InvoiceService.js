import { Service, autowired } from "snowball/app";

export default class InvoiceService extends Service {
    @autowired
    _userServer;

    addInvoice({
        isDefault,
        type,
        titleType,
        title,
        taxCode,
        phoneNo
    }) {
        return this._userServer.post('/userInvoice/addInvoice', {
            isDefault,
            type,
            titleType,
            title,
            taxCode,
            phoneNo
        });
    }

    updateInvoice({
        id,
        isDefault,
        type,
        titleType,
        title,
        taxCode,
        phoneNo
    }) {
        return this._userServer.post('/userInvoice/updateInvoice', {
            id,
            isDefault,
            type,
            titleType,
            title,
            taxCode,
            phoneNo
        });
    }

    listInvoice() {
        return this._userServer.post('/userInvoice/listInvoice');
    }

    getDefaultInvoice() {
        return this._userServer.post('/userInvoice/getDefaultInvoice');
    }
}
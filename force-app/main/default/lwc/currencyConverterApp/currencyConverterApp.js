import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList';

export default class CurrencyConverterApp extends LightningElement {
    countryList = countryCodeList;
    COUNTRYFROM = "USD";
    COUNTRYTO = "AUD";
    amount = '';
    result = '';
    error = '';

    handleChange(event) {
        const { name, value } = event.target;
        console.log("name", name);
        console.log("value", value);
        this[name] = value;
        this.result = '';
        this.error = '';
    }

    handleSubmit(event) {
        event.preventDefault();
        this.convert();
    }
    

    async convert() {
        const API_URL = `https://api.exchangerate.host/latest?from=${this.COUNTRYFROM}&to=${this.COUNTRYTO}`;
        try {
            const data = await fetch(API_URL);
            const jsonData = await data.json();
            this.result = (Number(this.amount) * jsonData.rates[this.COUNTRYTO]).toFixed(2);
            console.log(this.result);
        } catch (error) {
            console.log(error);
            this.error = "An error occurred.";
        }
    }
}

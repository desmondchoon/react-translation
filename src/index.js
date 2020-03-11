import TranslateHOC from './hoc';
const fetch = require("node-fetch");
export default class ReactTranslate {
    constructor(props) {       
        this.withTranslation = (namespaces, child) => {
            return TranslateHOC(child, props, namespaces.split(" "));
        }
    }
}
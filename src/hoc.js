import React, { Component } from 'react';
const fetch = require("node-fetch");

function TranslateHOC(WrappedComponent, globalProps, namespaces) {
    return class WrapperComponent extends Component {

        constructor(props) {
            super(props);
            this.state = {
                languages: {},
                loadLang: false
            }
        }

        componentDidMount(){
            if (!window.localStorage.getItem('_lang')) {
                window.localStorage.setItem('_lang', globalProps.defaultLang);
            }

            if (globalProps.ssr == true) {
                this.ssrGetJson(globalProps.path, namespaces).then(languages => {
                    this.setState({ languages: languages });
                })
            } else {
                let languages = this.getJson(globalProps.path, namespaces);
                this.setState({ languages: languages });
            }
        }

        componentDidUpdate(){
            if(this.state.loadLang == true){
                if (globalProps.ssr == true) {
                    this.ssrGetJson(globalProps.path, namespaces).then(languages => {
                        this.setState({ languages: languages, loadLang: false });
                    })
                } else {
                    let languages = this.getJson(globalProps.path, namespaces);
                    this.setState({ languages: languages, loadLang: false });
                }
            }
        }

        async ssrGetJson(path, namespaces) {
            let languages = {};
            for (let n = 0; n < namespaces.length; n++) {
                let namespace = namespaces[n];
                const response = await fetch(`${path}/${window.localStorage.getItem('_lang')}/${namespace}.json`)
                const data = await response.json();
                languages = {
                    ...languages,
                    [namespace]: data
                }
            }
            return languages;
        }

        getJson = (path, namespaces) => {
            let languages = {};
            for (let n = 0; n < namespaces.length; n++) {
                let namespace = namespaces[n];
                var data = require(`${path}/${window.localStorage.getItem('_lang')}/${namespace}.json`);
                languages = {
                    ...languages,
                    [namespace]: data
                }
            }
            return languages;
        }

        render() {
            return <WrappedComponent {...this.props} {...globalProps}
                t={(string) => {
                    return this.state.languages[string.split(".")[0]] && this.state.languages[string.split(".")[0]][string.split(".")[1]]
                        ? this.state.languages[string.split(".")[0]][string.split(".")[1]]
                        : ""
                }}
                changeLang={(lang)=>{
                    if(typeof window !== 'undefined'){
                        window.localStorage.setItem('_lang',lang);
                        this.setState({loadLang: true});
                    }
                }}
            />;
        }
    };
}

export default TranslateHOC;
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { settings, ENVS, Environment } from './api.envs';

const isFramed = window.parent && window !== window.parent;

@Injectable()
export class PrincipalService {

    constructor(http: Http) {
        
    }

    Base64DecodeUrl(url: string) {
        return window.atob(url.replace(/-/g, '+').replace(/_/g, '/'));
    }

    initPrincipalService() {
        const checkIFrame = document.createElement('IFRAME');
        checkIFrame.style.width = '0';
        checkIFrame.style.height = '0';
        document.body.appendChild(checkIFrame);

        let receiveMessage = (m) => {
            const data = queryString.parse(m.data);
            if (data.access_token) {
                this.setToken(data.acdess_token);
            } else {
                this.clear
            }
        }
    }

    receiveMessage(m: any) {
        
    }



    
//{
    public isIFramed() {
        return window.parent && window !== window.parent;
    }

    config() {
        if (this.isIFramed()) {
            console.log('isIFramed()');
            var url = window.location.href;
            if (url) {
                console.log('--- Got url: ', url);
                window.parent.postMessage(url.split('#')[1], location.protocol + '//' + location.host);
            } else {
                console.log('--- Got No url: ', url);
            }
        } else {
            console.log('isIFramed()');
        }
    }
//}

}    

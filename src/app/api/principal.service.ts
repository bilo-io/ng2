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

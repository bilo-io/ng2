import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface IParams {
    [index: string]: any;
}

@Injectable()
export class ApiService {
    @Output() tokenUpdated$: EventEmitter<any> = new EventEmitter<any>();
    defaultHeaders() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    markdownHeaders() {
        return {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        }
    }
    xmlFormHeaders() {
        return {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    constructor(@Inject(Http) private http: Http) {
    }

    private processData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Response status: ' + res.status);
        }
        let body = res.json();
        return body.data || {};
    }
    private processError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        // return Observable.throw(errMsg);
    }

    getToken(apiUrl: string, endpoint: string, params: IParams) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', apiUrl + '/' + endpoint, true);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.setRequestHeader('Accept', 'application/json');
        xhttp.send(this.toFormData(params));
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let token = JSON.parse(xhttp.responseText).access_token;
                localStorage.setItem('token', token);
                this.tokenUpdated$.emit(JSON.parse(xhttp.responseText));
                console.log('Response Token: ', {token});
            }
        }
    }

    GET(
        apiUrl: string,
        endpoint: string,
        urlParams: IParams,
        headers: IParams) {
        
        let urlString: string = apiUrl + '/' + endpoint + (urlParams != undefined ? '?' + this.toUrlParams(urlParams) : '');
        return this.http.get(urlString, this.toHeaders(headers));
    }

    GETItem(
        apiUrl: string,
        endpoint: string,
        id: string,
        urlParams: IParams,
        headers: IParams) {
        return this.http.get(apiUrl + '/' + endpoint + '/' + id, this.toHeaders(headers));
    }

    POST(
        apiUrl: string,
        endpoint: string,
        urlParams: IParams,
        headers: IParams,
        body: any) {
        return this.http.post(apiUrl + '/' + endpoint, JSON.stringify(body), this.toHeaders(headers));
    }

    PUT(
        apiUrl: string,
        endpoint: string,
        id: string,
        urlParams: IParams,
        headers: IParams,
        body: any) {
        return this.http.put(apiUrl + '/' + endpoint + '/' + id, JSON.stringify(body), this.toHeaders(headers));
    }

    DELETE(
        apiUrl: string,
        endpoint: string,
        id: string,
        urlParams: IParams,
        headers: IParams) {
        return this.http.delete(apiUrl + '/' + endpoint + '/' + id, this.toHeaders(headers));
    }

    toUrlParams(obj: IParams): string {
        let urlParams: string = '';
        for (var key in obj) {
            urlParams += `${key}=${obj[key]}&`;
        }
        return urlParams.slice(0, -1);;
    }

    toFormData(obj: IParams): FormData {
        let formData: FormData = new FormData();
        for (var key in obj) {
            formData.append(key, obj[key]);
        }
        return formData;
    }

    toHeaders(obj: IParams): RequestOptions {
        let headers: Headers;
        let options: RequestOptions;
        headers = new Headers();
        for (var key in obj) {
            headers.append(key, obj[key]);
        }
        options = new RequestOptions({ headers });
        return options;
    }

    testApiService() {
        var url: string = 'http://jsonplaceholder.typicode.com'
        var body = {
            "userId": 27,
            "id": 4,
            "title": "Your mother",
            "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        };

        this.GET(url, 'posts', {}, this.defaultHeaders)
            .subscribe(
            response => this.processData(response),
            error => this.processError(error),
            () => console.log('ApiService: DONE: GET'));

        this.GETItem(url, 'posts', '1', {}, this.defaultHeaders)
            .subscribe(
            response => this.processData(response),
            error => this.processError(error),
            () => console.log('ApiService: DONE: GETItem'));

        this.POST(url, 'posts', {}, this.defaultHeaders, body)
            .subscribe(
            response => this.processData(response),
            error => this.processError(error),
            () => console.log('ApiService: DONE: POST'));

        this.PUT(url, 'posts', '2', {}, this.defaultHeaders, body)
            .subscribe(
            response => this.processData(response),
            error => this.processError(error),
            () => console.log('ApiService: DONE: PUT'));

        this.DELETE(url, 'posts', '3', {}, this.defaultHeaders)
            .subscribe(
            response => this.processData(response),
            error => this.processError(error),
            () => console.log('ApiService: DONE: DELETE'));
    }
}
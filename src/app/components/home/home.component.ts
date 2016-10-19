import { Component, Inject } from '@angular/core';
import { PrincipalService } from '../../api/principal.service';
import { WsPoint } from '../../shared/ws/models';
import * as firebase from 'firebase';
// import template from './home.component.html';
    
@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: [
        'home.component.css',
        '../../shared/ws/scss/ws.css'
    ]
})
export class HomeComponent {
    constructor( @Inject(PrincipalService) private principal: PrincipalService) {
    }

    ngOnInit() {
        this.initFirebase();
    }   
    
    initFirebase() {
        var fbApp = firebase.initializeApp({
            databaseURL: 'https://hermes-68424.firebaseio.com'
        });
        var alertsRef = firebase.database(fbApp).ref('alerts');
        alertsRef.on('value', (snapshot) => {
            console.log(snapshot.val());
        })
    }
}

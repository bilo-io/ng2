// // http://chariotsolutions.com/blog/post/testing-http-services-angular-2-jasmine/
// import { HTTP_PROVIDERS } from '@angular/http';
// import { TapiService } from './tapi.service';
// import { Agency } from './tapi.models';

// import {
//     describe, expect, beforeEach, it, inject, injectAsync, beforeEachProviders
// } from '@angular/core/testing';

// describe('tapi.service tests', () => {

//     beforeEachProviders(() => {
//         return [
//             HTTP_PROVIDERS,
//             TapiService
//         ]
//     });

    
//     it('tapi.spec', () => {
//         expect(true).toEqual(true);
//     });

//     it('should get agencies',
//         inject([HTTP_PROVIDERS, TapiService], (tapi: TapiService) => {
            
//             tapi.getAgencies().subscribe((agencies: Agency[]) => {
//                 expect(agencies.length).toBeGreaterThan(0);
//             });
//         }));
// });
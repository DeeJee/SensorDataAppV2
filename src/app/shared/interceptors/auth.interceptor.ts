// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { mergeMap } from 'rxjs/operators';
// import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
// //import { AdalService } from 'adal-angular4';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//     constructor(private adal: MsAdalAngular6Service) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//         // if the endpoint is not registered then pass
//         // the request as it is to the next handler
//         const resource = this.adal.getResourceForEndpoint(request.url);
//         if (!resource) {
//             console.log(request.url + ": no resource");
//             return next.handle(request);
//         }

//         // if the user is not authenticated then drop the request
//         if (!this.adal.userInfo.authenticated) {
//             console.log(request.url + ": not authenticated");
//             throw new Error('Cannot send request to registered endpoint if the user is not authenticated.');
//         }

//         return this.adal.acquireToken(resource)
//             .pipe(
//                 mergeMap((token: string) => {
//                     //console.log(`token: ${token}`);
//                     // clone the request and replace the original headers with
//                     // cloned headers, updated with the authorization
//                     const authorizedRequest = request.clone({
//                         headers: request.headers.set('Authorization', 'Bearer ' + token),
//                     });
//                     return next.handle(authorizedRequest);
//                 }
//                 )
//             );
//     }
// }
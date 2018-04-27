import { Injectable } from '@angular/core';
import { Headers, Http ,Response,RequestOptions} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { Observable } from 'rxjs/Observable';

import { Pred } from './pred';

//TESTING THE AMAZON REST API
//curl -d "review='bad result '" -X POST http://ec2-34-215-99-128.us-west-2.compute.amazonaws.com:5000/predict
//curl -d "review='good result '" -X POST http://ec2-34-215-99-128.us-west-2.compute.amazonaws.com:5000/predict

//CORS ISSUE
//https://forum.ionicframework.com/t/web-service-response-with-status-0-for-url-null/106761/7

@Injectable()

export class LmService {
  
   private lmApiUrl = 'http://ec2-34-215-99-128.us-west-2.compute.amazonaws.com:5000/';  // URL to web api
   
  

//Enable CrossOrigin resource sharing if this is enable by using plugin in in Chrome 
//Th ejson parse wont work so the subscribe fail to return from the observable . It cannot parse the json object
  constructor(private http:Http) {
      //this.http.append('Content-Type','application/json');
      //this.http.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
      //this.http.append('Access-Control-Allow-Origin', '*');
      //this.http.append('Access-Control-Allow-Headers', "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
      
    }


  
 
 
 Predict(pred:Pred): Observable<Pred> {
    console.log('Where it is');
    let headers = new Headers({ 
    'Content-Type': 'application/json',
    'Accept':'application/json',
    'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers': "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding"

    });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify( pred ); 
    return this.http.post(this.lmApiUrl+'predict', body,options)
    .map( response =><Pred>response.json())
    .catch(this.handleError)
       
}

 Correct(pred:Pred): Observable<string> {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     let body = JSON.stringify( pred ); 
     return this.http.post(this.lmApiUrl+'correct',body, options)
    .map( response =><string>response.json())
    .catch(this.handleError)
 }

//This way you can log the response over the map that is good to REMEMBER *****
//
Predict2(pred:Pred): Observable<Pred> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });

    //let options = new RequestOption()
    return this.http.post(this.lmApiUrl, pred.review,options)
    .map((response:Response) => {
        //console.log(response.json().result);
        <Pred> response.json().result;
        })
    .catch(this.handleError)
       
}

private handleError(error:any):Promise<any> {

  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
 
}


}



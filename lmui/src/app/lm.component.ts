import { Component,OnInit } from '@angular/core';
import { LmService } from './lm.service';
import { Router } from '@angular/router';
import { Pred } from './pred';

import {LoginService} from './login.service'


@Component({
  selector: 'LM-UI',
  templateUrl:'./view/lm.component.html',
  styleUrls:['./css/lm.component.css'] 
 
  
})

export class LmComponent implements OnInit { 
  
  title = 'Check your Review';
  prediction : Pred;
  resultpredcheck:number;
  ReviewText:string;
  Textvalues = '';
  isValidText: boolean = false;
  isOnCheck: boolean = false;
  isButtonConfirmValid:boolean=false;
  reviewCheck:string;
  alertMsg: boolean = false;

  constructor(
        private router:Router,
        private lmService: LmService,
        private loginService:LoginService
        ) { };
 
  onSubmitReview(review:string){
       console.log(review);
       let newpred  = new Pred();
       newpred.review=review;
       const pred$= this.lmService.Predict(newpred);
       pred$.subscribe(
            pred => { newpred.result = pred.result, newpred.valid=pred.valid
              this.prediction=newpred;
              if (this.prediction.valid) {
               console.log("I AM  VALID review");
                 this.ReviewText='';      
                 this.resultpredcheck=-1;
                 //Disable text area
                 this.isOnCheck = true;
                 //Disable the button to submit the review
                 this.isValidText = false;
              }
              else{
                console.log("I AM not VALID review");
                this.alertMsg = true;
                this.isValidText = false;
                setTimeout(function() {
                  this.alertMsg = false;
                  //this.isValidText = true;
                 
                }.bind(this), 4000);
               this.ReviewText='';      
               this.resultpredcheck=-1;
              }
            
            
            },
            err=> console.error("Error"+err),
            ()=>console.log('Prediction completed')
            ); 
    
       
   }

   onKey(event: any) { // without type info
     this.Textvalues = event.target.value;
     let onlyspaces=false;
     if (/^\s+$/.test(this.Textvalues)){
       onlyspaces=true;
     }
     if ( this.Textvalues && (! onlyspaces) ) {
     console.log(' not just spaces');
        this.isValidText = true;
    }
     else 
        this.isValidText = false;
     
  }
   
  onSelectionChange(entry) {

    this.reviewCheck=(entry = 0 ) ? 'Wrong' : 'Right'
    this.isButtonConfirmValid=true;

}
   

   onSubmitCorrect(review:string){
       console.log('review'+review+"Was I correct:"+this.prediction.wascorrect)
       
    
       let newpred  = new Pred();
       newpred.review = this.prediction.review;
       newpred.result = this.prediction.result;
       newpred.wascorrect = this.prediction.wascorrect;
       const pred$ = this.lmService.Correct(newpred);
       
       pred$.subscribe(
            pred => newpred.result = pred,
            err=> console.error("Error"+err),
            ()=>console.log('Prediction completed')
            ); 
       this.prediction.result='9999';
       this.isValidText=false;
       this.isOnCheck = false; 
       this.reviewCheck=null;
       this.isButtonConfirmValid=false;
       
   }
        
   logout(){
       this.loginService.logout();
   }
  ngOnInit(): void {
      
      //this.loginService.checkCredentials();
      
    let newpred = new Pred();
    newpred.review='Empty Review';
    newpred.result='9999';
    newpred.wascorrect=-1;
    //const pred$=this.lmService.Predict(newpred);
    
    //pred$.subscribe(pred => newpred.result = pred.result );
    this.prediction=newpred;
    
  };
  
  
 
};

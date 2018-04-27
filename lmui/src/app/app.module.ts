import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule }     from './app-routing.modules';
import { LmComponent } from './lm.component'

//SERVICES
import { LmService } from './lm.service'

//COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

@NgModule({
  declarations: [
    AppComponent,
    LmComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
    
  ],
  providers: [LmService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }

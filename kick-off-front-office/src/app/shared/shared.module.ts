import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { UserRoutingModule } from '../Features/user/user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { ChatbotComponent } from './chatbot/chatbot.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ChatbotComponent

  ],
  imports: [
    CommonModule,
    UserRoutingModule,  
    HttpClientModule ,
    ReactiveFormsModule,
    FormsModule, 
  ]
  ,
  exports: [
    HeaderComponent,
    FooterComponent,
    ChatbotComponent

  ]
})
export class SharedModule { }

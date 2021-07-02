import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { HttpService} from './http.service';
import {Framework} from './models/framework';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ HttpService ]
})

export class AppComponent implements OnInit {
  
  title = "testITeam";
  frameworks:string[] = ['angular', 'react', 'vue'];
  frameworkSelected: string = "";
  

  frameworksVersion:Framework;
 

  frontEndDeveloperForm : FormGroup;
 

  constructor( private httpService: HttpService ){
      this.frontEndDeveloperForm = new FormGroup({
          "firstName": new FormControl("", [Validators.required]),
          "lastName": new FormControl("", [Validators.required]),
          "dateOfBirth": new FormControl("", [Validators.required]),
          "framework": new FormControl("", [Validators.required]),
          "frameworkVersion": new FormControl("", [Validators.required]),
          "email": new FormControl("", [Validators.required, 
                                        Validators.email],
                                        [this.emailAsyncValidator.bind(this)]
                                  ),
          "hobby": new FormArray([
              new FormGroup({
                  "name": new FormControl("", [Validators.required]),
                  "duration": new FormControl("", [Validators.required])
              })
          ])
          
      })
  }
    
  emailAsyncValidator(control: FormControl): Observable<ValidationErrors>  {
     return this.httpService.validateEmail(control.value);
  }
  
  addHobby(){
      (<FormArray>this.frontEndDeveloperForm.controls["hobby"]).push(new FormGroup({
        "name": new FormControl("", [Validators.required]),
        "duration": new FormControl("", [Validators.required])
      }));
  }


  submit(){
      console.log(this.frontEndDeveloperForm.value);
   }

  
  ngOnInit(){
        
    this.httpService.getData().subscribe((data: any) => 
        this.frameworksVersion = new Framework(data.angular, data.react, data.vue));
        this.frontEndDeveloperForm.get("framework").valueChanges.subscribe(selectedValue => {
        this.frameworkSelected = selectedValue;
        }
    )

  }


  

}

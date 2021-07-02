import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
  
@Injectable()

export class HttpService{
  
    emails: string[];
      
    constructor (private http: HttpClient) { 
       this.emails = ["test@test.test", "test2@test.test", "test3@test.test"];
    }
      
    getData(){
        return this.http.get('assets/frameworcs.json')
    }

    validateEmail(developerEmail: string): Observable<ValidationErrors> {
        return new Observable<ValidationErrors>(observer => {
            const email = this.emails.find(email => email === developerEmail);
                if (email) {
                    observer.next({
                        emailError: 'This email already exists '
                    });
                    observer.complete();
                }
                observer.next(null);
                observer.complete();
        }).pipe(delay(2000));
    }

}
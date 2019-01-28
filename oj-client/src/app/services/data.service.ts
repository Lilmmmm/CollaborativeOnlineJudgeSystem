import { Injectable } from '@angular/core';
import { Problem } from "../models/problem.model";
import { PROBLEMS } from "../mock-problems";
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: HttpClient) { }

  // make these function observable, so the subscriber could get refresh info once the data change
  getProblems(): Observable<Problem[]> {
    // connect client to server to get the problem info.
    this.http.get("api/v1/problems") // return a observer pattern
              .toPromise()
              .then((res: any) => {
                this.problemsSource.next(res.json());
              })
              .catch(this.handleError);

    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
                    .toPromise()
                    .then((res: any) => res.json())
                    .catch(this.handleError);
  }

  addProblem(problem: Problem): void {
    // let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    // return this.http.post('api/v1/problems', problem, options)
    //                   .toPromise()
    //                   .then((res: any) => {
    //                     this.getProblems();
    //                     return res.json();
    //                   })
    //                   .catch(this.handleError);
      problem.id = 2;

  }

  // Error handler
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);  // use for demo debug
    return Promise.reject(error.body || error);
  }
}

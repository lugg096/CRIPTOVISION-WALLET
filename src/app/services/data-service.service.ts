import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();


  private transactionsSoouce = new BehaviorSubject('');
  currentTransactions = this.transactionsSoouce.asObservable();

  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }

  sendDataTransactions(data:any){
    this.transactionsSoouce.next(data)
  }


}

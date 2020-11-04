import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alertObservable = new BehaviorSubject<any>({});
  public alertMessage = this.alertObservable.asObservable();

  /**
   * Sets alert
   * @desc sets and emitts current alert message
   * @param alert [alert message to be rendered]
   */
  setAlert(alert: any): void {
    this.alertObservable.next(alert);
  }

}

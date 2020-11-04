import { Injectable } from '@angular/core';
import { ApiLinkService } from './apilink.service';
import { AlertService } from '../alert/alert.service';
import { SessionStorageService } from '../session/session-storage.service';
@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  constructor(
    public apiLink: ApiLinkService,
    public alertService: AlertService,
    public sessionStorageService: SessionStorageService
  ) { }

  connect(data: any, link: string, callback?): void {
    this.apiLink.dataUplink(data, link).subscribe(
      // handle backend responses
      (res: any) => {
        if (res) {
          callback(res, res.status, this.alertService.setAlert.bind(this));
        }
      },
      // handle http responses
      (err: any) => {
        callback(err, 'ERROR');
        // this.alertMessage('danger', err, err);
      }
    );
  }

  secureConnect(data: any, link: string, callback?): void {
    this.apiLink.dataUplink(this.addSessionToken(data), link).subscribe(
      // handle backend responses
      (res: any) => {
        if (res) {
          callback(res, res.status, this.alertMessage.bind(this));
        }
      },
      // handle http responses
      (err: any) => {
        this.alertMessage('danger', 'Error', err);
      }
    );
  }

  alertMessage(type: string, title: string, message: string): void {
    this.alertService.setAlert({ type, title, message });
  }

  addSessionToken(form): any {
    form.sessionToken = this.sessionStorageService.getSessionToken();
    return form;
  }

}

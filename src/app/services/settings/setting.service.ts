import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() { }

  formatDate(date: Date): string {
    const mnth = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  getCurrentDayDate(): string {
    return this.formatDate(new Date());
  }

  /**
   * Gets current week dates
   * @returns current week dates
   */
  getCurrentWeekDates(): { first; last } {
    const currentDate = Object.assign(new Date());
    const firstDay = currentDate.getDate() - currentDate.getDay();
    const lastDay = firstDay + 6;
    console.log(new Date());
    return Object.assign({
      first: this.formatDate(new Date(currentDate.setDate(firstDay))),
      last: this.formatDate(new Date(currentDate.setDate(lastDay))),
    });
  }

  /**
   * Gets current month dates
   * @returns current month dates
   */
  getCurrentMonthDates(): { first; last } {
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    return { first: this.formatDate(firstDay), last: this.formatDate(lastDay) };
  }

  /**
   * Gets current year dates
   * @returns current year dates
   */
  getCurrentYearDates(): { first; last } {
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), 0, 1);
    const lastDay = new Date(currentDate.getFullYear(), 12, 0);
    return { first: this.formatDate(firstDay), last: this.formatDate(lastDay) };
  }

  getDayOfWeek(date: Date): any {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  dateIsValid(dateString): boolean {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (dateString.toString().match(regEx)) {
      return true;
    }
  }

  getHour(value): number {
    const hours = Math.floor(value / 60);
    return hours;
  }

  getMinute(value): number {
    const minutes = Math.floor(value % 60);
    return minutes;
  }

  transformMinutesToHours(value): string {
    const hours = Math.floor(value / 60);
    const minutes = Math.floor(value % 60);

    return `${hours} hrs ${minutes} min`;
  }
}

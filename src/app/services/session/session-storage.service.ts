import { Injectable } from '@angular/core';
import {
  SESSION_TOKEN,
  TOKEN, USER_ROLES,
  ACTIVE_ROLE, JWT_TOKEN,
  ACTIVE_USER, USER_DASHBOARDS,
  EMPLOYEE_DETAILS, USER_CREDENTIALS
} from '../../constants/session/constants';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor() {
  }

  /**
   * Sets session token
   * @param token [set session token]
   */
  setSessionToken(token: string): void {
    sessionStorage.removeItem(SESSION_TOKEN);
    sessionStorage.setItem(SESSION_TOKEN, token);
  }

  /**
   * Sets token
   * @param token [session token for user]
   */
  setToken(token: string): void {
    sessionStorage.setItem(TOKEN, token);
  }

  /**
   * Sets user roles
   * @param roles [all user roles]
   */
  setUserRoles(roles: any): void {
    sessionStorage.removeItem(USER_ROLES);
    sessionStorage.setItem(USER_ROLES, JSON.stringify(roles));
  }

  /**
   * Sets active user role
   * @param role [user active selected role]
   */
  setActiveUserRole(role: any): void {
    sessionStorage.removeItem(ACTIVE_ROLE);
    sessionStorage.setItem(ACTIVE_ROLE, JSON.stringify(role));
  }

  /**
   * Setjwts token
   * @param token [jwt token]
   */
  setjwtToken(token: string): void {
    sessionStorage.removeItem(JWT_TOKEN);
    sessionStorage.setItem(JWT_TOKEN, token);
  }

  /**
   * Sets active user
   * @param user [active logged in user]
   */
  setActiveUser(user: any): void {
    sessionStorage.removeItem(ACTIVE_USER);
    sessionStorage.setItem(ACTIVE_USER, JSON.stringify(user));
  }

  /**
   * Sets user dash board
   * @param dashboard [user dashboard]
   */
  setUserDashBoards(dashboard: any): void {
    sessionStorage.removeItem(USER_DASHBOARDS);
    sessionStorage.setItem(USER_DASHBOARDS, JSON.stringify(dashboard));
  }

  setUserCredentials(userCredentails): void {
    localStorage.removeItem(USER_CREDENTIALS);
    localStorage.setItem(USER_CREDENTIALS, JSON.stringify(userCredentails));
  }

  /**
   * Sets employee details
   */
  setEmployeeDetails(employee: any): void {
    sessionStorage.removeItem(EMPLOYEE_DETAILS);
    sessionStorage.setItem(EMPLOYEE_DETAILS, JSON.stringify(employee));
  }

  /**
   * Gets user credentials
   * @returns user credentials
   */
  getUserCredentials(): any {
    return JSON.parse(localStorage.getItem(USER_CREDENTIALS));
  }

  /**
   * Gets employee details
   */
  getEmployeeDetails(): any {
    return JSON.parse(sessionStorage.getItem(EMPLOYEE_DETAILS));
  }

  /**
   * Gets user dash boards
   * @returns user dashboard
   */
  getUserDashBoards(): any {
    return JSON.parse(sessionStorage.getItem(USER_DASHBOARDS));
  }

  /**
   * Gets active user
   * @returns active user
   */
  getActiveUser(): any {
    return JSON.parse(sessionStorage.getItem(ACTIVE_USER));
  }

  /**
   * Gets session token
   * @returns session token
   */
  getSessionToken(): any {
    return sessionStorage.getItem(SESSION_TOKEN);
  }

  /**
   * Gets token
   * @returns token
   */
  getToken(): string {
    return sessionStorage.getItem(TOKEN);
  }

  /**
   * Gets user roles
   * @returns user roles
   */
  getUserRoles(): Array<any> {
    return JSON.parse(sessionStorage.getItem(USER_ROLES));
  }

  /**
   * Gets active user roles
   * @returns active role
   */
  getActiveUserRole(): any {
    return JSON.parse(sessionStorage.getItem(ACTIVE_ROLE));
  }

  /**
   * Getjwts token
   * @returns token
   */
  getjwtToken(): string {
    return sessionStorage.getItem(JWT_TOKEN);
  }
}

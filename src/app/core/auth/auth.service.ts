import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'environments/environment';

import { User } from 'app/shared/models/user.model';
import { AuthSubject, Session } from 'app/shared/models/session.model';

@Injectable()
export class AuthService {
    authSubject: AuthSubject;
    public subject: BehaviorSubject<AuthSubject> = new BehaviorSubject<AuthSubject>(this.authSubject);

    static getAuthSubject(): AuthSubject {
        const session: AuthSubject = JSON.parse(localStorage.getItem('BBOX-user'));
        return session ? new AuthSubject(session) : null;
    }

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Logs the user in
     *
     * @param {string} mail
     * @param {string} password
     * @memberof AuthService
     */
    login(mail: string, password: string): Observable<Session> {
        return this.http.post<Session>(environment.araza + '/auth/login', { mail: mail, password: password });
    }

    showConnectedUser(token: string): Observable<User> {
        return this.http.get<User>(environment.araza + '/user/' + token);
    }

    signup(mail: string, password: string, name: string): Observable<Session> {
        return this.http.post<Session>(environment.araza + '/auth/signup', { mail, password, name });
    }

    // PASSWORD RESET

    /**
     * Consumes the API that will trigger a password reset for the given mail address
     *
     * @param {string} mail
     * @returns
     * @memberof AuthService
     */
    triggerPasswordReset(mail: string) {
        return this.http.post(`${environment.araza}/auth/reset`, { mail })
    }

    checkPasswordToken(resetToken: string) {
        return this.http.get(`${environment.araza}/auth/reset/${resetToken}`)
    }

    resetPassword(resetToken: string, password: string) {
        return this.http.post(`${environment.araza}/auth/reset/${resetToken}`, { password })
    }

    /**
     * Logs the user out by destroying its session
     *
     * @memberof AuthService
     */
    logout() {
        localStorage.removeItem('BBOX-token');
        localStorage.removeItem('BBOX-expires_at');
        localStorage.removeItem('BBOX-user');
        location.reload();
    }

    /**
     * Sets the session for the user based on the bearer token
     *
     * @public // Should be private
     * @param {*} session Result of the authentification process
     * @memberof AuthService
     */
    public setSession(session: Session) {
        const expiresAt = moment().add(session.expiresIn, 'second');

        localStorage.setItem('BBOX-token', session.bearer);
        localStorage.setItem('BBOX-expires_at', JSON.stringify(expiresAt));
        localStorage.setItem('BBOX-user', JSON.stringify(session.subject));

        this.authSubject = session.subject;
    }

    public isLoggedIn(): boolean {
        return moment().isBefore(this.getExpiration());
    }

    getExpiration() {
        return moment(JSON.parse(localStorage.getItem('BBOX-expires_at')));
    }

    /**
     * Below are user subscription methods for all components in the application.
     */

    public getUser(): Observable<AuthSubject> {
        if (!this.authSubject) {
            this.authSubject = JSON.parse(localStorage.getItem('BBOX-user'));
            this.sendUser();
        }
        return this.subject.asObservable();
    }

    public sendUser() {
        this.subject.next(this.authSubject);
    }

}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { AngularFireAuth } from '@angular/fire/auth';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public auth: AngularFireAuth, public credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext) {
    return this.auth.signInWithEmailAndPassword(context.username, context.password);
    // Replace by proper authentication call
  }

  register(registerInfo: any) {
    return this.auth.createUserWithEmailAndPassword(registerInfo.email, registerInfo.password);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.auth.signOut().then(() => {
      this.credentialsService.setCredentials();
    });
    return of(true);
  }
}

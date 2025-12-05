import { Injectable, signal, computed } from '@angular/core';
import { User, UserRole } from '../models/database';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly router = inject(Router);
  private readonly _currentUser = signal<User | null>(null);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuth = computed(() => !!this._currentUser);

  readonly isAdmin = computed(() => this._currentUser()?.roleId === UserRole.ADMIN);
  readonly isOwner = computed(() => this._currentUser()?.roleId === UserRole.DUENO_TIENDA);

  login(email: string, pass: string): boolean {
    if (email === 'admin1@prueba.com' && pass === 'admin123') {
      const adminUser: User = {
        id: 1,
        email: 'admin1@prueba.com',
        firstSurname: 'Lara',
        name: 'Axel',
        roleId: 1,
        status: 'ACTIVO',
      };

      this._currentUser.set(adminUser);
      this.redirectBasedOnRole(UserRole.ADMIN);
      return true;
    }

    if (email === 'dueno1@prueba.com' && pass === 'dueño123') {
      const duenoUser: User = {
        id: 2,
        email: 'dueno1@prueba.com',
        firstSurname: 'Tienda',
        name: 'Dueño',
        roleId: 3,
        status: 'ACTIVO',
      };

      this._currentUser.set(duenoUser);
      this.redirectBasedOnRole(UserRole.DUENO_TIENDA);
      return true;
    }

    return false;
  }

  logout(): void {
    this._currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
  
  private redirectBasedOnRole(role: UserRole) { 
    this.router.navigate(['/dashboard']);
  }
}

import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { UserTable } from '../components/user-table/user-table';
import { User, UserRole } from '../../../core/models/database';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserTable],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users {
  //Mock test-data
  private readonly _users = signal<User[]>([
      { id: 1, roleId: UserRole.ADMIN, email: 'admin1@prueba.com', name: 'Axel', firstSurname: 'Lara', status: 'ACTIVO' },
      { id: 2, roleId: UserRole.DUENO_TIENDA, email: 'dueno1@prueba.com', name: 'Juan', firstSurname: 'Dueño', status: 'ACTIVO' },
      { id: 3, roleId: UserRole.CLIENTE, email: 'cliente1@gmail.com', name: 'Maria', firstSurname: 'Cliente', status: 'ACTIVO' },
      { id: 4, roleId: UserRole.DUENO_TIENDA, email: 'dueno2@prueba.com', name: 'Pedro', firstSurname: 'Tienda', status: 'INACTIVO' },
      { id: 5, roleId: UserRole.ADMIN, email: 'admin2@prueba.com', name: 'Super', firstSurname: 'Admin', status: 'ACTIVO' },
      { id: 6, roleId: UserRole.CLIENTE, email: 'cliente2@hotmail.com', name: 'Luisa', firstSurname: 'Lane', status: 'ACTIVO' },
    ]);

  readonly adminUsers = computed(()=>this._users().filter(u => u.roleId === UserRole.ADMIN));
  readonly ownerUsers = computed(()=>this._users().filter(u => u.roleId === UserRole.DUENO_TIENDA));
  readonly clientUsers = computed(()=>this._users().filter(u => u.roleId === UserRole.CLIENTE));
}

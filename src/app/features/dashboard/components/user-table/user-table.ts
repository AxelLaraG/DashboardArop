import { Component, input, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { User } from '../../../../core/models/database';
import { icons } from '../../../../core/models/icons';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTable {
  private readonly sanitizer = inject(DomSanitizer);
  
  title = input.required<string>();
  users = input.required<User[]>();
  
  add = output<void>();
  edit = output<User>();
  delete = output<User>();
  
  iconAdd: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(icons.add); 
  iconEdit: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(icons.edit); 
  iconDelete: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(icons.delete); 
}

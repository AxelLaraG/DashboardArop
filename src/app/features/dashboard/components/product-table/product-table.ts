import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Product } from '../../../../core/models/database';
import { icons } from '../../../../core/models/icons';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {
  private readonly sanitizer = inject(DomSanitizer);

  title = input.required<string>();
  products = input.required<Product[]>();

  add = output<void>();
  viewAll = output<void>();
  edit = output<Product>();
  delete = output<Product>();

  iconAdd: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(icons.add);
  iconEdit: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(icons.edit);
  iconDelete: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(icons.delete);
  iconStore: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(icons.store);
}

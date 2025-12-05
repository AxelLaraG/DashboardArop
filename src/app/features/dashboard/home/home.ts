import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../../../core/models/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly auth = inject(Auth);
  private readonly sanitizer = inject(DomSanitizer);

  readonly isAdmin = this.auth.isAdmin;
  
  private getIcon(htmlString: string): SafeHtml { 
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
  
  readonly iconSales = this.getIcon(icons.money);
  readonly iconAlert = this.getIcon(icons.warning);

  //Mock Datra
  readonly stats = computed(() => {
    if (this.isAdmin()) {
      return {
        title: 'Visión Global (Todas las Tiendas)',
        sales: 150450.0,
        profits: 45200.0,
        orders: 1250,
        pendingOrders: 45,
        inventoryAlerts: 12, // Productos con stock bajo global
      };
    } else {
      return {
        title: 'Mi Sucursal (Estadísticas Locales)',
        sales: 12300.0,
        profits: 3400.0,
        orders: 85,
        pendingOrders: 3,
        inventoryAlerts: 2, // Productos con stock bajo de MI tienda
      };
    }
  });
}

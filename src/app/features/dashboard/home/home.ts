import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { icons } from '../../../core/models/icons';

import { OrderChart } from '../components/order-chart/order-chart';
import { PaymentChart } from '../components/payment-chart/payment-chart';
import { StatsCard } from '../components/stats-card/stats-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, OrderChart, PaymentChart, StatsCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly auth = inject(Auth);
  readonly isAdmin = this.auth.isAdmin;
  readonly icons = icons;

  readonly stats = computed(() => {
    if (this.isAdmin()) {
      return {
        title: 'Estadísticas de todas las tiendas',
        sales: 150450.0,
        profits: 45200.0,
        inventoryAlerts: 12,
        orders: {
          delivered: 450,
          shipped: 200,
          pending: 150,
          cancelled: 50,
        },
        payments: {
          paid: 75,
          pending: 25,
          recovery: 5.2,
        },
      };
    } else {
      return {
        title: 'Estadísticas de la tienda',
        sales: 12300.0,
        profits: 3400.0,
        inventoryAlerts: 2,
        orders: {
          delivered: 20,
          shipped: 15,
          pending: 5,
          cancelled: 1,
        },
        payments: {
          paid: 65,
          pending: 40,
          recovery: 2.1,
        },
      };
    }
  });
}

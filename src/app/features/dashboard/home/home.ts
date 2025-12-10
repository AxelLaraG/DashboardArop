import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icons } from '../../../core/models/icons';
import {
  NgApexchartsModule,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions,
  ApexLegend,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  colors: string[];
  stroke: ApexStroke;
  fill: ApexFill;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrencyPipe, NgApexchartsModule],
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
        title: 'Estadísticas de todas las tiendas',
        sales: 150450.0,
        profits: 45200.0,
        orders: 1250,
        pendingOrders: 45,
        inventoryAlerts: 12,
      };
    } else {
      return {
        title: 'Estadísticas de Mi Tienda',
        sales: 12300.0,
        profits: 3400.0,
        orders: 85,
        pendingOrders: 3,
        inventoryAlerts: 2,
      };
    }
  });

  readonly orderChartOptions: Partial<ChartOptions> = {
    series: [450, 200, 150, 50], // Datos Mock: Entregado, Enviado, Pendiente, Cancelado
    chart: {
      type: 'donut',
      height: 300,
      fontFamily: 'Segoe UI, sans-serif',
    },
    labels: ['Entregado', 'Enviado', 'Pendiente', 'Cancelado'],
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'], // Verde, Azul, Naranja, Rojo
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Pedidos',
              color: '#6b7280',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: any, b: any) => a + b, 0);
              },
            },
            value: {
              fontSize: '24px',
              fontWeight: 700,
              color: '#1f2937',
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    legend: { position: 'bottom' },
  };

  readonly paymentChartOptions: Partial<ChartOptions> = {
    series: [75, 25], // 75% Cobrado, 25% Pendiente
    chart: {
      type: 'donut',
      height: 300,
      fontFamily: 'Segoe UI, sans-serif',
    },
    labels: ['Cobrados', 'Pendientes'],
    colors: ['#10b981', '#ef4444'], // Verde (Cobrado), Rojo (Pendiente)
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: { show: true, offsetY: -20 },
            value: { show: true, offsetY: -10, fontSize: '22px', fontWeight: 700 },
            total: {
              show: true,
              label: 'Total Realizado',
              color: '#6b7280',
              fontSize: '14px',
              formatter: () => '75%', // Mock porcentaje total
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    legend: { position: 'bottom' },
    // Fondo gris para simular el track de la barra radial si fuera necesario
    fill: { opacity: 1 },
  };
}

import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import {
  NgApexchartsModule,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexLegend,
  ApexResponsive,
} from 'ng-apexcharts';

@Component({
  selector: 'app-order-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-chart.html',
  styleUrl: './order-chart.scss',
})
export class OrderChart {
  readonly delivered = input.required<number>();
  readonly shipped = input.required<number>();
  readonly pending = input.required<number>();
  readonly cancelled = input.required<number>();

  readonly series = computed(() => [
    this.delivered(),
    this.shipped(),
    this.pending(),
    this.cancelled(),
  ]);

  readonly labels = ['Entregado', 'Enviado', 'Pendiente', 'Cancelado'];
  readonly colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  readonly chart: ApexChart = {
    type: 'donut',
    height: 300,
    fontFamily: 'Segoe UI, sans-serif',
  };

  readonly legend: ApexLegend = { position: 'bottom' };

  readonly plotOptions: ApexPlotOptions = {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Pedidos',
            color: '#6B7280',
            formatter: (w) => {
              return w.globals.seriesTotals.reduce((a: any, b: any) => a + b, 0);
            },
          },
          value: {
            fontSize: '24px',
            fontWeight: 700,
            color: '#1F2937',
          },
        },
      },
    },
  };
}

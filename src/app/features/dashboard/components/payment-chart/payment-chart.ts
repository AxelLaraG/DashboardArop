import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import {
  NgApexchartsModule,
  ApexChart,
  ApexPlotOptions,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';

@Component({
  selector: 'app-payment-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-chart.html',
  styleUrl: './payment-chart.scss',
})
export class PaymentChart {
  readonly paid = input.required<number>();
  readonly pending = input.required<number>();
  readonly recoveryRate = input.required<number>();
  

  readonly series = computed(() => [this.paid(), this.pending()]);
  readonly labels = ['Cobrados', 'Pendientes'];
  readonly colors = ['#10b981', '#ef4444'];

  readonly chart: ApexChart = {
    type: 'donut',
    height: 300,
    fontFamily: 'Segoe UI, sans-serif',
  };

  readonly legend: ApexLegend = { position: 'bottom' };

  readonly plotOptions: ApexPlotOptions = {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10,
      donut: {
        size: '75',
        labels: {
          show: true,
          name: { show: true, offsetY: -20 },
          value: { show: true, offsetY: -10, fontSize: '22px', fontWeight: 700 },
          total: {
            show: true,
            label: 'Total realizado',
            color: '#6B7280',
            fontSize: '14px',
            formatter: () => `${((this.paid()*100)/(this.paid() + this.pending())).toFixed(2)}%`,
          },
        },
      },
    },
  };
}

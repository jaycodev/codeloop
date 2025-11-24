import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { debounceTime, Subscription } from 'rxjs';
import { LayoutService } from '@admin/layout/services/layout.service';
import { PaymentStatsResponse } from '@/domains/payment/models/dto/payment-stats.dto';

@Component({
  standalone: true,
  selector: 'app-revenue-stream-widget',
  imports: [ChartModule],
  template: `
    <div class="card mb-8!">
      <div class="font-semibold text-xl mb-4">Ingresos por los últimos 6 meses. Acumulado ({{ stats?.totalRevenue }} $)</div>
      <p-chart type="bar" [data]="chartData" [options]="chartOptions" class="h-100" />
    </div>
  `
})
export class RevenueStreamWidget implements OnChanges {
  @Input() stats: PaymentStatsResponse | null = null;

  chartData: any;
  chartOptions: any;
  subscription!: Subscription;

  constructor(public layoutService: LayoutService) {
    this.subscription = this.layoutService.configUpdate$.pipe(debounceTime(25)).subscribe(() => {
      this.initChart();
    });
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats'] && this.stats) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    if (!this.stats) return;

    const documentStyle = getComputedStyle(document.documentElement);

    this.chartData = {
      labels: this.stats.monthlyPayments.map(mp => mp.month),
      datasets: [
        {
          type: 'bar',
          label: 'Ingresos',
          backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
          data: this.stats.monthlyPayments.map(mp => mp.totalAmount),
          barThickness: 32,
          borderRadius: {
            topLeft: 8,
            topRight: 8
          }
        }
      ]
    };
  }

  private initChart(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: { color: textColor }
        }
      },
      scales: {
        x: {
          ticks: { color: textMutedColor },
          grid: { color: 'transparent', borderColor: 'transparent' }
        },
        y: {
          ticks: { color: textMutedColor },
          grid: {
            color: borderColor,
            borderColor: 'transparent',
            drawTicks: false
          }
        }
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, input, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
})
export class StatsCard {
  private sanitizer = inject(DomSanitizer);
  
  title = input.required<string>();
  value = input.required<string | number | null>();
  subtext = input.required<string>();
  iconHtml = input.required<string>();
  trend = input<string>('');
  valueColorClass = input<string>('');
  
  safeIcon = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.iconHtml()));
}

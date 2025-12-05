import { Component, ChangeDetectionStrategy, inject, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { icons } from '../../core/models/icons';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface MenuItem { 
  label: string,
  route: string,
  icon: SafeHtml
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MainLayout {
  private readonly auth = inject(Auth);
  private readonly sanitizer = inject(DomSanitizer);
  
  readonly user = this.auth.currentUser;
  
  private getIcon(htmlString: string): SafeHtml { 
    return this.sanitizer.bypassSecurityTrustHtml(htmlString);
  }
  
  readonly menuItems = computed<MenuItem[]>(() => {
    if (this.auth.isAdmin()) {
      return [
        { label: 'Dashboard Administrador', route: '/dashboard', icon: this.getIcon(icons.dashboard) },
        { label: 'Usuarios', route: '/dashboard/users', icon: this.getIcon(icons.users) },
        { label: 'Tiendas', route: '/dashboard/stores', icon: this.getIcon(icons.store) },
        { label: 'Productos', route: '/dashboard/products', icon: this.getIcon(icons.productos) },
        { label: 'Pedidos', route: '/dashboard/orders', icon: this.getIcon(icons.pedidos) }
      ];
    } else { 
      return [
        { label: 'Dashboard Dueño', route: '/dashboard', icon: this.getIcon(icons.dashboard) },
        { label: 'Tienda', route: '/dashboard/store', icon: this.getIcon(icons.store) },
        { label: 'Productos', route: '/dashboard/products', icon: this.getIcon(icons.productos) },
        { label: 'Pedidos', route: '/dashboard/orders', icon: this.getIcon(icons.pedidos) }
      ];
    }
  });
  
  logout(): void { 
    this.auth.logout();
  }
}

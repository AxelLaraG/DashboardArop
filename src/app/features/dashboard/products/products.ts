import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ProductTable } from '../components/product-table/product-table';
import { StatsCard } from '../components/stats-card/stats-card';
import { Product, Store } from '../../../core/models/database';
import { icons } from '../../../core/models/icons';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductTable, StatsCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products {
  private readonly _stores = signal<Store[]>([
    {
      id: 1,
      commercialName: 'Tienda Tech',
      ownerId: 1,
      statusId: 2,
      legalName: '',
      logoUrl: '',
      description: '',
      email: '',
      phoneNumber: '',
      address: '',
      clabeIban: '',
      rfc: '',
      tLocalShip: '',
      tNationalShip: '',
    },
    {
      id: 2,
      commercialName: 'Moda Center',
      ownerId: 2,
      statusId: 2,
      legalName: '',
      logoUrl: '',
      description: '',
      email: '',
      phoneNumber: '',
      address: '',
      clabeIban: '',
      rfc: '',
      tLocalShip: '',
      tNationalShip: '',
    },
    {
      id: 3,
      commercialName: 'Market Fresh',
      ownerId: 3,
      statusId: 2,
      legalName: '',
      logoUrl: '',
      description: '',
      email: '',
      phoneNumber: '',
      address: '',
      clabeIban: '',
      rfc: '',
      tLocalShip: '',
      tNationalShip: '',
    },
  ]);

  private readonly _products = signal<Product[]>([
    // Tienda 1
    {
      id: 1,
      storeId: 1,
      name: 'Laptop Gamer',
      stock: 5,
      shortDesc: 'i7 16GB RAM',
      stockWarn: 2,
      isNewInd: 1,
      discount: 0,
      price: 15000,
      desc: '',
      photoUrl: '',
      status: 'ACTIVO',
      deleteDate: '',
      storeInd: 1,
    },
    {
      id: 2,
      storeId: 1,
      name: 'Mouse',
      stock: 50,
      shortDesc: 'Wireless',
      stockWarn: 0,
      isNewInd: 1,
      discount: 0,
      price: 500,
      desc: '',
      photoUrl: '',
      status: 'ACTIVO',
      deleteDate: '',
      storeInd: 1,
    },
    {
      id: 3,
      storeId: 1,
      name: 'Teclado',
      stock: 12,
      shortDesc: 'Mecánico',
      stockWarn: 1,
      isNewInd: 1,
      discount: 0,
      price: 1200,
      desc: '',
      photoUrl: '',
      status: 'ACTIVO',
      deleteDate: '',
      storeInd: 1,
    },

    // Tienda 2 (Tiene alertas altas)
    {
      id: 5,
      storeId: 2,
      name: 'Camiseta',
      stock: 100,
      shortDesc: 'Algodón',
      stockWarn: 5,
      isNewInd: 1,
      discount: 0,
      price: 200,
      desc: '',
      photoUrl: '',
      status: 'ACTIVO',
      deleteDate: '',
      storeInd: 1,
    },

    // Tienda 3
    {
      id: 6,
      storeId: 3,
      name: 'Manzanas',
      stock: 200,
      shortDesc: 'Kilo',
      stockWarn: 0,
      isNewInd: 1,
      discount: 0,
      price: 40,
      desc: '',
      photoUrl: '',
      status: 'ACTIVO',
      deleteDate: '',
      storeInd: 1,
    },
  ]);

  readonly alertCards = computed(() => {
    return this._stores()
      .map((store) => {
        const storeProducts = this._products().filter((p) => p.storeId === store.id);
        const totalWarnings = storeProducts.reduce((acc, p) => acc + (p.stockWarn || 0), 0);

        return {
          storeName: store.commercialName,
          warnings: totalWarnings,
          hasAlerts: totalWarnings > 0,
        };
      })
      .filter((data) => data.hasAlerts)
      .slice(0, 3);
  });

  readonly tablesData = computed(() => {
    return this._stores().map((store) => {
      const allProducts = this._products().filter((p) => p.storeId === store.id);
      const last3 = allProducts.slice(-3).reverse();

      return {
        storeId: store.id,
        storeName: store.commercialName,
        products: last3,
      };
    });
  });

  readonly iconWarning = icons.warning;

  handleAction(action: string, storeName: string) {
    console.log(`Acción: ${action} - Tienda: ${storeName}`);
  }
}

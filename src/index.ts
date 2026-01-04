import { orderBy, remove } from 'lodash';
import fs from 'node:fs';
import path from 'node:path';
class ListaDeCosas<T> {
  name: string;
  cosas: T[] = [];
  constructor(name: string) {
    this.name = name;
  }
  add(nuevaCosa: T) {
    this.cosas.push(nuevaCosa);
  }
  getCosas(): T[] {
    return this.cosas;
  }
}

type Product = {
  name: string;
  price: number;
  id: number;
};

class ListaDeProductos extends ListaDeCosas<Product> {
  constructor(name: string) {
    super(name);
    // Cargamos el JSON de productos desde la carpeta original para que funcione tanto en src como en dist
    const productsPath = path.join(__dirname, '../src/products.json');
    const productJson = fs.readFileSync(productsPath, 'utf-8');
    const data: Product[] = JSON.parse(productJson);
    data.forEach((product) => this.add(product));
  }

  addProduct(product: Product) {
    this.add(product);
  }

  getProduct(id: number): Product | undefined {
    const cosas = this.getCosas();
    return cosas.find((c) => c.id === id);
  }

  removeProduct(id: number) {
    remove(this.cosas, (c) => c.id === id);
  }

  getSortedByPrice(order: 'asc' | 'desc'): Product[] {
    return orderBy(this.cosas, ['price'], [order]);
  }
}

export { ListaDeProductos, Product };

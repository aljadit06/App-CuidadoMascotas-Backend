import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {DetallesPedido} from './detalles-pedido.model';
import {Proveedor} from './proveedor.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreProducto: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  PrecioVenta: number;

  @property({
    type: 'number',
    required: true,
  })
  PrecioCompra: number;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @hasMany(() => DetallesPedido)
  detallesPedidos: DetallesPedido[];

  @belongsTo(() => Proveedor)
  proveedorId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;

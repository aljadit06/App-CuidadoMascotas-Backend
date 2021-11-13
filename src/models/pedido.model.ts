import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {DetallesPedido} from './detalles-pedido.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaPedido: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaEntrega: string;

  @property({
    type: 'string',
    required: true,
  })
  FormaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'string',
    required: true,
  })
  Detalles: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => DetallesPedido)
  detallesPedidos: DetallesPedido[];

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;

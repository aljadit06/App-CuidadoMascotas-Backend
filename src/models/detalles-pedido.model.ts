import {Entity, model, property} from '@loopback/repository';

@model()
export class DetallesPedido extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @property({
    type: 'string',
  })
  pedidoId?: string;

  @property({
    type: 'string',
  })
  productoId?: string;

  constructor(data?: Partial<DetallesPedido>) {
    super(data);
  }
}

export interface DetallesPedidoRelations {
  // describe navigational properties here
}

export type DetallesPedidoWithRelations = DetallesPedido & DetallesPedidoRelations;

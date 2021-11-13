import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Plan} from './plan.model';

@model()
export class PagosPlanes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @property({
    type: 'date',
    required: true,
  })
  FechaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  FormaPago: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Plan)
  planId: string;

  constructor(data?: Partial<PagosPlanes>) {
    super(data);
  }
}

export interface PagosPlanesRelations {
  // describe navigational properties here
}

export type PagosPlanesWithRelations = PagosPlanes & PagosPlanesRelations;

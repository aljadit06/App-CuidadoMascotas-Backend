import {Entity, model, property} from '@loopback/repository';

@model()
export class VisitaPyP extends Entity {
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
  Fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  HoraInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  HoraFin: string;

  @property({
    type: 'number',
    required: true,
  })
  EdadMascota: number;

  @property({
    type: 'string',
    required: true,
  })
  Alimento: string;

  @property({
    type: 'string',
  })
  empleadoId?: string;

  @property({
    type: 'string',
  })
  mascotaId?: string;

  constructor(data?: Partial<VisitaPyP>) {
    super(data);
  }
}

export interface VisitaPyPRelations {
  // describe navigational properties here
}

export type VisitaPyPWithRelations = VisitaPyP & VisitaPyPRelations;

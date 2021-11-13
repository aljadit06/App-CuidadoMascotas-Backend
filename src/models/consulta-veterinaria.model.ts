import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';

@model()
export class ConsultaVeterinaria extends Entity {
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
  FechaSolicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaConsulta: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<ConsultaVeterinaria>) {
    super(data);
  }
}

export interface ConsultaVeterinariaRelations {
  // describe navigational properties here
}

export type ConsultaVeterinariaWithRelations = ConsultaVeterinaria & ConsultaVeterinariaRelations;

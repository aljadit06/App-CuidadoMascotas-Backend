import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Empleado} from './empleado.model';
import {VisitaPyP} from './visita-py-p.model';

@model()
export class Mascota extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Especie: string;

  @property({
    type: 'string',
    required: true,
  })
  Raza: string;

  @property({
    type: 'number',
    required: true,
  })
  Edad: number;

  @property({
    type: 'string',
    required: true,
  })
  Color: string;

  @property({
    type: 'number',
    required: true,
  })
  Peso: number;

  @property({
    type: 'object',
    required: true,
  })
  Foto: object;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @hasMany(() => VisitaPyP)
  visitaPyPS: VisitaPyP[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;

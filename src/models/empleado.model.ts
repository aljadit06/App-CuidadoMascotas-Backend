import {Entity, hasMany, model, property} from '@loopback/repository';
import {VisitaPyP} from './visita-py-p.model';


@model()
export class Empleado extends Entity {
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
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaIngreso: string;

  @property({
    type: 'string',
    required: true,
  })
  Cargo: string;

  @property({
    type: 'string',
    required: true,
  })
  Departamento: string;

  @property({
    type: 'number',
    required: true,
  })
  Comision: number;

  @property({
    type: 'string',
    required: true,
  })
  Nivel: string;

  @hasMany(() => VisitaPyP)
  visitaPyPS: VisitaPyP[];

  @hasMany(() => Empleado)
  empleados: Empleado[];

  @property({
    type: 'string',
  })
  empleadoId?: string;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;

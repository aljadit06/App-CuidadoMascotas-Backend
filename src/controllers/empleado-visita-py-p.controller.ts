import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Empleado,
  VisitaPyP,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoVisitaPyPController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/visita-py-ps', {
    responses: {
      '200': {
        description: 'Array of Empleado has many VisitaPyP',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VisitaPyP)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VisitaPyP>,
  ): Promise<VisitaPyP[]> {
    return this.empleadoRepository.visitaPyPS(id).find(filter);
  }

  @post('/empleados/{id}/visita-py-ps', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaPyP)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyP, {
            title: 'NewVisitaPyPInEmpleado',
            exclude: ['Id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) visitaPyP: Omit<VisitaPyP, 'Id'>,
  ): Promise<VisitaPyP> {
    return this.empleadoRepository.visitaPyPS(id).create(visitaPyP);
  }

  @patch('/empleados/{id}/visita-py-ps', {
    responses: {
      '200': {
        description: 'Empleado.VisitaPyP PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyP, {partial: true}),
        },
      },
    })
    visitaPyP: Partial<VisitaPyP>,
    @param.query.object('where', getWhereSchemaFor(VisitaPyP)) where?: Where<VisitaPyP>,
  ): Promise<Count> {
    return this.empleadoRepository.visitaPyPS(id).patch(visitaPyP, where);
  }

  @del('/empleados/{id}/visita-py-ps', {
    responses: {
      '200': {
        description: 'Empleado.VisitaPyP DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitaPyP)) where?: Where<VisitaPyP>,
  ): Promise<Count> {
    return this.empleadoRepository.visitaPyPS(id).delete(where);
  }
}

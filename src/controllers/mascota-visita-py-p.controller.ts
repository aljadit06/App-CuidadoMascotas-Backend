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
  Mascota,
  VisitaPyP,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaVisitaPyPController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/visita-py-ps', {
    responses: {
      '200': {
        description: 'Array of Mascota has many VisitaPyP',
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
    return this.mascotaRepository.visitaPyPS(id).find(filter);
  }

  @post('/mascotas/{id}/visita-py-ps', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitaPyP)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyP, {
            title: 'NewVisitaPyPInMascota',
            exclude: ['Id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) visitaPyP: Omit<VisitaPyP, 'Id'>,
  ): Promise<VisitaPyP> {
    return this.mascotaRepository.visitaPyPS(id).create(visitaPyP);
  }

  @patch('/mascotas/{id}/visita-py-ps', {
    responses: {
      '200': {
        description: 'Mascota.VisitaPyP PATCH success count',
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
    return this.mascotaRepository.visitaPyPS(id).patch(visitaPyP, where);
  }

  @del('/mascotas/{id}/visita-py-ps', {
    responses: {
      '200': {
        description: 'Mascota.VisitaPyP DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitaPyP)) where?: Where<VisitaPyP>,
  ): Promise<Count> {
    return this.mascotaRepository.visitaPyPS(id).delete(where);
  }
}

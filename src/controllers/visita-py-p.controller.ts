import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {VisitaPyP} from '../models';
import {VisitaPyPRepository} from '../repositories';

export class VisitaPyPController {
  constructor(
    @repository(VisitaPyPRepository)
    public visitaPyPRepository : VisitaPyPRepository,
  ) {}

  @post('/visita-py-ps')
  @response(200, {
    description: 'VisitaPyP model instance',
    content: {'application/json': {schema: getModelSchemaRef(VisitaPyP)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyP, {
            title: 'NewVisitaPyP',
            exclude: ['Id'],
          }),
        },
      },
    })
    visitaPyP: Omit<VisitaPyP, 'id'>,
  ): Promise<VisitaPyP> {
    return this.visitaPyPRepository.create(visitaPyP);
  }

  @get('/visita-py-ps/count')
  @response(200, {
    description: 'VisitaPyP model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VisitaPyP) where?: Where<VisitaPyP>,
  ): Promise<Count> {
    return this.visitaPyPRepository.count(where);
  }

  @get('/visita-py-ps')
  @response(200, {
    description: 'Array of VisitaPyP model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VisitaPyP, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VisitaPyP) filter?: Filter<VisitaPyP>,
  ): Promise<VisitaPyP[]> {
    return this.visitaPyPRepository.find(filter);
  }

  @patch('/visita-py-ps')
  @response(200, {
    description: 'VisitaPyP PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyP, {partial: true}),
        },
      },
    })
    visitaPyP: VisitaPyP,
    @param.where(VisitaPyP) where?: Where<VisitaPyP>,
  ): Promise<Count> {
    return this.visitaPyPRepository.updateAll(visitaPyP, where);
  }

  @get('/visita-py-ps/{id}')
  @response(200, {
    description: 'VisitaPyP model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VisitaPyP, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VisitaPyP, {exclude: 'where'}) filter?: FilterExcludingWhere<VisitaPyP>
  ): Promise<VisitaPyP> {
    return this.visitaPyPRepository.findById(id, filter);
  }

  @patch('/visita-py-ps/{id}')
  @response(204, {
    description: 'VisitaPyP PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitaPyP, {partial: true}),
        },
      },
    })
    visitaPyP: VisitaPyP,
  ): Promise<void> {
    await this.visitaPyPRepository.updateById(id, visitaPyP);
  }

  @put('/visita-py-ps/{id}')
  @response(204, {
    description: 'VisitaPyP PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitaPyP: VisitaPyP,
  ): Promise<void> {
    await this.visitaPyPRepository.replaceById(id, visitaPyP);
  }

  @del('/visita-py-ps/{id}')
  @response(204, {
    description: 'VisitaPyP DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitaPyPRepository.deleteById(id);
  }
}

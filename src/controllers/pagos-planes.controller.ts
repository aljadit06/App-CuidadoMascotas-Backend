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
import {PagosPlanes} from '../models';
import {PagosPlanesRepository} from '../repositories';

export class PagosPlanesController {
  constructor(
    @repository(PagosPlanesRepository)
    public pagosPlanesRepository : PagosPlanesRepository,
  ) {}

  @post('/pagos-planes')
  @response(200, {
    description: 'PagosPlanes model instance',
    content: {'application/json': {schema: getModelSchemaRef(PagosPlanes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlanes, {
            title: 'NewPagosPlanes',
            exclude: ['Id'],
          }),
        },
      },
    })
    pagosPlanes: Omit<PagosPlanes, 'id'>,
  ): Promise<PagosPlanes> {
    return this.pagosPlanesRepository.create(pagosPlanes);
  }

  @get('/pagos-planes/count')
  @response(200, {
    description: 'PagosPlanes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PagosPlanes) where?: Where<PagosPlanes>,
  ): Promise<Count> {
    return this.pagosPlanesRepository.count(where);
  }

  @get('/pagos-planes')
  @response(200, {
    description: 'Array of PagosPlanes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PagosPlanes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PagosPlanes) filter?: Filter<PagosPlanes>,
  ): Promise<PagosPlanes[]> {
    return this.pagosPlanesRepository.find(filter);
  }

  @patch('/pagos-planes')
  @response(200, {
    description: 'PagosPlanes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlanes, {partial: true}),
        },
      },
    })
    pagosPlanes: PagosPlanes,
    @param.where(PagosPlanes) where?: Where<PagosPlanes>,
  ): Promise<Count> {
    return this.pagosPlanesRepository.updateAll(pagosPlanes, where);
  }

  @get('/pagos-planes/{id}')
  @response(200, {
    description: 'PagosPlanes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PagosPlanes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PagosPlanes, {exclude: 'where'}) filter?: FilterExcludingWhere<PagosPlanes>
  ): Promise<PagosPlanes> {
    return this.pagosPlanesRepository.findById(id, filter);
  }

  @patch('/pagos-planes/{id}')
  @response(204, {
    description: 'PagosPlanes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlanes, {partial: true}),
        },
      },
    })
    pagosPlanes: PagosPlanes,
  ): Promise<void> {
    await this.pagosPlanesRepository.updateById(id, pagosPlanes);
  }

  @put('/pagos-planes/{id}')
  @response(204, {
    description: 'PagosPlanes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pagosPlanes: PagosPlanes,
  ): Promise<void> {
    await this.pagosPlanesRepository.replaceById(id, pagosPlanes);
  }

  @del('/pagos-planes/{id}')
  @response(204, {
    description: 'PagosPlanes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagosPlanesRepository.deleteById(id);
  }
}

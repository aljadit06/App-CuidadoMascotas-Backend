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
import {DetallesPedido} from '../models';
import {DetallesPedidoRepository} from '../repositories';

export class DetallesPedidoController {
  constructor(
    @repository(DetallesPedidoRepository)
    public detallesPedidoRepository : DetallesPedidoRepository,
  ) {}

  @post('/detalles-pedidos')
  @response(200, {
    description: 'DetallesPedido model instance',
    content: {'application/json': {schema: getModelSchemaRef(DetallesPedido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedido, {
            title: 'NewDetallesPedido',
            
          }),
        },
      },
    })
    detallesPedido: Omit<DetallesPedido, 'id'>,
  ): Promise<DetallesPedido> {
    return this.detallesPedidoRepository.create(detallesPedido);
  }

  @get('/detalles-pedidos/count')
  @response(200, {
    description: 'DetallesPedido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DetallesPedido) where?: Where<DetallesPedido>,
  ): Promise<Count> {
    return this.detallesPedidoRepository.count(where);
  }

  @get('/detalles-pedidos')
  @response(200, {
    description: 'Array of DetallesPedido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DetallesPedido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DetallesPedido) filter?: Filter<DetallesPedido>,
  ): Promise<DetallesPedido[]> {
    return this.detallesPedidoRepository.find(filter);
  }

  @patch('/detalles-pedidos')
  @response(200, {
    description: 'DetallesPedido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedido, {partial: true}),
        },
      },
    })
    detallesPedido: DetallesPedido,
    @param.where(DetallesPedido) where?: Where<DetallesPedido>,
  ): Promise<Count> {
    return this.detallesPedidoRepository.updateAll(detallesPedido, where);
  }

  @get('/detalles-pedidos/{id}')
  @response(200, {
    description: 'DetallesPedido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DetallesPedido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetallesPedido, {exclude: 'where'}) filter?: FilterExcludingWhere<DetallesPedido>
  ): Promise<DetallesPedido> {
    return this.detallesPedidoRepository.findById(id, filter);
  }

  @patch('/detalles-pedidos/{id}')
  @response(204, {
    description: 'DetallesPedido PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedido, {partial: true}),
        },
      },
    })
    detallesPedido: DetallesPedido,
  ): Promise<void> {
    await this.detallesPedidoRepository.updateById(id, detallesPedido);
  }

  @put('/detalles-pedidos/{id}')
  @response(204, {
    description: 'DetallesPedido PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detallesPedido: DetallesPedido,
  ): Promise<void> {
    await this.detallesPedidoRepository.replaceById(id, detallesPedido);
  }

  @del('/detalles-pedidos/{id}')
  @response(204, {
    description: 'DetallesPedido DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detallesPedidoRepository.deleteById(id);
  }
}

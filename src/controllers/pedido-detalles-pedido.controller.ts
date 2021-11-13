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
  Pedido,
  DetallesPedido,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoDetallesPedidoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/detalles-pedidos', {
    responses: {
      '200': {
        description: 'Array of Pedido has many DetallesPedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetallesPedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetallesPedido>,
  ): Promise<DetallesPedido[]> {
    return this.pedidoRepository.detallesPedidos(id).find(filter);
  }

  @post('/pedidos/{id}/detalles-pedidos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetallesPedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedido, {
            title: 'NewDetallesPedidoInPedido',
            
            optional: ['pedidoId']
          }),
        },
      },
    }) detallesPedido: Omit<DetallesPedido, 'Id'>,
  ): Promise<DetallesPedido> {
    return this.pedidoRepository.detallesPedidos(id).create(detallesPedido);
  }

  @patch('/pedidos/{id}/detalles-pedidos', {
    responses: {
      '200': {
        description: 'Pedido.DetallesPedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedido, {partial: true}),
        },
      },
    })
    detallesPedido: Partial<DetallesPedido>,
    @param.query.object('where', getWhereSchemaFor(DetallesPedido)) where?: Where<DetallesPedido>,
  ): Promise<Count> {
    return this.pedidoRepository.detallesPedidos(id).patch(detallesPedido, where);
  }

  @del('/pedidos/{id}/detalles-pedidos', {
    responses: {
      '200': {
        description: 'Pedido.DetallesPedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetallesPedido)) where?: Where<DetallesPedido>,
  ): Promise<Count> {
    return this.pedidoRepository.detallesPedidos(id).delete(where);
  }
}

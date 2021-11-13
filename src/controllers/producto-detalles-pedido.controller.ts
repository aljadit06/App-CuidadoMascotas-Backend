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
  Producto,
  DetallesPedido,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetallesPedidoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detalles-pedidos', {
    responses: {
      '200': {
        description: 'Array of Producto has many DetallesPedido',
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
    return this.productoRepository.detallesPedidos(id).find(filter);
  }

  @post('/productos/{id}/detalles-pedidos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetallesPedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesPedido, {
            title: 'NewDetallesPedidoInProducto',
            
            optional: ['productoId']
          }),
        },
      },
    }) detallesPedido: Omit<DetallesPedido, 'Id'>,
  ): Promise<DetallesPedido> {
    return this.productoRepository.detallesPedidos(id).create(detallesPedido);
  }

  @patch('/productos/{id}/detalles-pedidos', {
    responses: {
      '200': {
        description: 'Producto.DetallesPedido PATCH success count',
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
    return this.productoRepository.detallesPedidos(id).patch(detallesPedido, where);
  }

  @del('/productos/{id}/detalles-pedidos', {
    responses: {
      '200': {
        description: 'Producto.DetallesPedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetallesPedido)) where?: Where<DetallesPedido>,
  ): Promise<Count> {
    return this.productoRepository.detallesPedidos(id).delete(where);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Cliente, Producto, DetallesPedido} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ProductoRepository} from './producto.repository';
import {DetallesPedidoRepository} from './detalles-pedido.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.Id,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.Id>;

  public readonly DetallesPedido: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.Id,
          Cliente,
          typeof Pedido.prototype.Id
        >;

  public readonly productos: HasManyThroughRepositoryFactory<Producto, typeof Producto.prototype.Id,
          Cliente,
          typeof Pedido.prototype.Id
        >;

  public readonly detallesPedidos: HasManyRepositoryFactory<DetallesPedido, typeof Pedido.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('DetallesPedidoRepository') protected detallesPedidoRepositoryGetter: Getter<DetallesPedidoRepository>,
  ) {
    super(Pedido, dataSource);
    this.detallesPedidos = this.createHasManyRepositoryFactoryFor('detallesPedidos', detallesPedidoRepositoryGetter,);
    this.registerInclusionResolver('detallesPedidos', this.detallesPedidos.inclusionResolver);
    this.productos = this.createHasManyThroughRepositoryFactoryFor('productos', productoRepositoryGetter, clienteRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.DetallesPedido = this.createHasManyThroughRepositoryFactoryFor('DetallesPedido', productoRepositoryGetter, clienteRepositoryGetter,);
    this.registerInclusionResolver('DetallesPedido', this.DetallesPedido.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}

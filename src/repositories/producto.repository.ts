import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, DetallesPedido, Proveedor} from '../models';
import {DetallesPedidoRepository} from './detalles-pedido.repository';
import {ProveedorRepository} from './proveedor.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.Id,
  ProductoRelations
> {

  public readonly detallesPedidos: HasManyRepositoryFactory<DetallesPedido, typeof Producto.prototype.Id>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetallesPedidoRepository') protected detallesPedidoRepositoryGetter: Getter<DetallesPedidoRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Producto, dataSource);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.detallesPedidos = this.createHasManyRepositoryFactoryFor('detallesPedidos', detallesPedidoRepositoryGetter,);
    this.registerInclusionResolver('detallesPedidos', this.detallesPedidos.inclusionResolver);
  }
}

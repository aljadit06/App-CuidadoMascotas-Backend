import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallesPedido, DetallesPedidoRelations} from '../models';

export class DetallesPedidoRepository extends DefaultCrudRepository<
  DetallesPedido,
  
  DetallesPedidoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(DetallesPedido, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VisitaPyP, VisitaPyPRelations} from '../models';

export class VisitaPyPRepository extends DefaultCrudRepository<
  VisitaPyP,
  typeof VisitaPyP.prototype.Id,
  VisitaPyPRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(VisitaPyP, dataSource);
  }
}

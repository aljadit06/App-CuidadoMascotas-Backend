import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagosPlanes, PagosPlanesRelations, Mascota, Plan} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PlanRepository} from './plan.repository';

export class PagosPlanesRepository extends DefaultCrudRepository<
  PagosPlanes,
  typeof PagosPlanes.prototype.Id,
  PagosPlanesRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof PagosPlanes.prototype.Id>;

  public readonly plan: BelongsToAccessor<Plan, typeof PagosPlanes.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(PagosPlanes, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}

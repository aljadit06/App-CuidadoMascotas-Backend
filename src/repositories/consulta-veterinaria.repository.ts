import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ConsultaVeterinaria, ConsultaVeterinariaRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class ConsultaVeterinariaRepository extends DefaultCrudRepository<
  ConsultaVeterinaria,
  typeof ConsultaVeterinaria.prototype.Id,
  ConsultaVeterinariaRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof ConsultaVeterinaria.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(ConsultaVeterinaria, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Empleado, VisitaPyP} from '../models';
import {ClienteRepository} from './cliente.repository';
import {EmpleadoRepository} from './empleado.repository';
import {VisitaPyPRepository} from './visita-py-p.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.Id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.Id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.Id>;

  public readonly visitaPyPS: HasManyRepositoryFactory<VisitaPyP, typeof Mascota.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('VisitaPyPRepository') protected visitaPyPRepositoryGetter: Getter<VisitaPyPRepository>,
  ) {
    super(Mascota, dataSource);
    this.visitaPyPS = this.createHasManyRepositoryFactoryFor('visitaPyPS', visitaPyPRepositoryGetter,);
    this.registerInclusionResolver('visitaPyPS', this.visitaPyPS.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}

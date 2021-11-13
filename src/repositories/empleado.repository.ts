import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, VisitaPyP} from '../models';
import {VisitaPyPRepository} from './visita-py-p.repository';


export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.Id,
  EmpleadoRelations
> {

  public readonly visitaPyPS: HasManyRepositoryFactory<VisitaPyP, typeof Empleado.prototype.Id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empleado.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VisitaPyPRepository') protected visitaPyPRepositoryGetter: Getter<VisitaPyPRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Empleado, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.visitaPyPS = this.createHasManyRepositoryFactoryFor('visitaPyPS', visitaPyPRepositoryGetter,);
    this.registerInclusionResolver('visitaPyPS', this.visitaPyPS.inclusionResolver);
  }
}

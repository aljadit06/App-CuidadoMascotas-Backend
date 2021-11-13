import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PagosPlanes,
  Mascota,
} from '../models';
import {PagosPlanesRepository} from '../repositories';

export class PagosPlanesMascotaController {
  constructor(
    @repository(PagosPlanesRepository)
    public pagosPlanesRepository: PagosPlanesRepository,
  ) { }

  @get('/pagos-planes/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to PagosPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof PagosPlanes.prototype.Id,
  ): Promise<Mascota> {
    return this.pagosPlanesRepository.mascota(id);
  }
}

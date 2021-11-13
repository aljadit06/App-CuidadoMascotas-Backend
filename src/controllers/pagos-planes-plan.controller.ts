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
  Plan,
} from '../models';
import {PagosPlanesRepository} from '../repositories';

export class PagosPlanesPlanController {
  constructor(
    @repository(PagosPlanesRepository)
    public pagosPlanesRepository: PagosPlanesRepository,
  ) { }

  @get('/pagos-planes/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to PagosPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof PagosPlanes.prototype.Id,
  ): Promise<Plan> {
    return this.pagosPlanesRepository.plan(id);
  }
}

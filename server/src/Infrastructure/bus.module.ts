import {Module} from '@nestjs/common';
import {CqrsModule} from '@nestjs/cqrs';
import {CommandBusAdapter} from './Adapter/CommandBusAdapter';
import {QueryBusAdapter} from './Adapter/QueryBusAdapter';

const providers = [
  {provide: 'ICommandBusAdapter', useClass: CommandBusAdapter},
  {provide: 'IQueryBusAdapter', useClass: QueryBusAdapter}
];

@Module({
  imports: [CqrsModule],
  providers: [...providers],
  exports: [...providers]
})
export class BusModule {}

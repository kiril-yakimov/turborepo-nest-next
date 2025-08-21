import { Module, Provider } from '@nestjs/common';
import { WebsocketService, WebsocketUsersService } from './services';

const sharedProviders: Provider[] = [WebsocketUsersService, WebsocketService];

@Module({
    providers: [...sharedProviders],
    exports: [...sharedProviders],
})
export class WebsocketsModule {}

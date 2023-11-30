import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmdModule } from './cmd/cmd.module';
import { SocketModule } from './socket/socket.module';
import { SocketService } from './socket/socket.service';

@Module({
  imports: [CmdModule, SocketModule],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}

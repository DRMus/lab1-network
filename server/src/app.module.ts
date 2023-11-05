import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CmdModule } from './cmd/cmd.module';

@Module({
  imports: [CmdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { CmdService } from './cmd.service';
import { CmdDto } from './cmd.dto';

@Controller('cmd')
export class CmdController {
  constructor(private cmdService: CmdService) {}

  @Post()
  createCommand(@Body() dto: CmdDto) {
    return this.cmdService.createCMD(dto);
  }
}

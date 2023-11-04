import { Injectable } from '@nestjs/common';
import { exec, execSync } from 'child_process';
import { CmdDto } from './cmd.dto';
import { decode } from 'iconv-lite';

@Injectable()
export class CmdService {
    createCMD(dto: CmdDto) {
        const buffer = execSync(`${dto.rules}`);

        return decode(buffer, "cp-866");
    }
}

import { Injectable } from '@nestjs/common';
import { exec, execSync } from 'child_process';
import { CmdDto } from './cmd.dto';
import { decode, encode } from 'iconv-lite';

const execPromise = (cmd: string) =>
  new Promise<string>((resolve, reject) => {
    const proc = exec(cmd, { timeout: 5000 }, (err, stdout, stderr) => {
      if (err && err.signal !== "SIGTERM") {
        reject(err.message);
        return;
      }
      resolve(stdout);
    });
    // proc.stdout.setEncoding('utf8');
  });

@Injectable()
export class CmdService {
  async createCMD(dto: CmdDto) {
    const buffer = await execPromise(dto.rules);
    // return { data: buffer };
    return {data: decode(encode(buffer, "cp1251"), "utf8").toString()};
    // return { data: buffer };
  }
}

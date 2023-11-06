import { Injectable } from '@nestjs/common';
import { exec, execSync } from 'child_process';
import { CmdDto } from './cmd.dto';
import { decode, encode } from 'iconv-lite';

const cpPids: number[] = [];

const execPromise = (cmd: string, timeout: number) =>
  new Promise<string>((resolve, reject) => {
    const proc = exec(
      'chcp 65001 | ' + cmd,
      { timeout },
      (err, stdout, stderr) => {
        if (err && err.signal !== 'SIGTERM') {
          reject(err.message);
          return;
        }
        resolve(stdout);
      },
    );
    cpPids.push(proc.pid);

    // proc.stdout.setEncoding('utf8');
  });

@Injectable()
export class CmdService {
  async createCMD(dto: CmdDto) {
    const buffer = await execPromise(dto.rules, dto.timeout);
    // return { data: buffer };
    return { data: decode(encode(buffer, 'cp1251'), 'utf8').toString() };
    // return { data: buffer };
  }

  killAll() {
    cpPids.map((pid) => {
      exec('taskkill /F /T /PID ' + pid);
    });

    return { deletedPids: cpPids };
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import * as mime from 'mime-types';
import { writeFile, unlink } from 'fs/promises';
import { nanoid } from 'nanoid';

const FILES_PATH = 'files';

@Injectable()
export class FilesService {
  async save(files: Array<Express.Multer.File>) {
    try {
      const arr = Array.from(files).map(async (file) => {
        const id = nanoid();
        const ext = mime.extension(file.mimetype);
        const filePath = join(process.cwd(), 'public', FILES_PATH);
        fs.mkdirSync(filePath, { recursive: true });
        await writeFile(join(filePath, `${id}.${ext}`), file.buffer);
        return `${id}.${ext}`;
      });
      return await Promise.all(arr);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(fileNames: string[]) {
    try {
      const arr = fileNames.map(async (fileName) => {
        const filePath = join(process.cwd(), 'public', FILES_PATH);
        await unlink(join(filePath, `${fileName}`));
        return fileName;
      });
      return await Promise.all(arr);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

import { Injectable, PipeTransform } from '@nestjs/common';
import * as sharp from 'sharp';
import { handleError } from 'src/utils/helper';

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  async transform(file: Express.Multer.File): Promise<string> {
    try {
      const [originalname] = file.originalname.split('.');
      const fileName = Date.now() + '-' + originalname + '.webp';

      await sharp(file.buffer)
        .webp({ quality: 70 })
        .toFile(`${process.cwd()}/public/img/${fileName}`);
      return fileName;
    } catch (error) {
      handleError(error);
    }
  }
}

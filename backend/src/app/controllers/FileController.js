import { unlink } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });
    return res.json(file);
  }

  async delete(req, res) {
    const file = await File.findByPk(req.params.id);

    if (!file) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }
    const filePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file.path
    );
    const unlinkAsync = promisify(unlink);
    await Promise.all([file.destroy(), unlinkAsync(filePath)]);

    return res.send();
  }
}

export default new FileController();

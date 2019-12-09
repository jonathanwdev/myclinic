import Sequelize from 'sequelize';
import File from '../app/models/File';
import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [File, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();

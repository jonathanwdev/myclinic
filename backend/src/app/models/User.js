import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        doctor: Sequelize.BOOLEAN,
        address: Sequelize.STRING,
        profession: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default User;

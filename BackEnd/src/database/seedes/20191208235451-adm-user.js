const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'admin',
          email: 'admin@admin.com',
          password_hash: bcrypt.hashSync('123456', 8),
          doctor: true,
          address: 'RJ / Barra da Tijuca',
          profession: 'Ortodontia',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'admin',
          email: 'admin@admin.com',
          password_hash: '123456',
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

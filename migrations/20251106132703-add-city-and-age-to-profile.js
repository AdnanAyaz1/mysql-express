export async function up(queryInterface, Sequelize) {
  const table = await queryInterface.describeTable('profiles');

  if (!table.city) {
    await queryInterface.addColumn('profiles', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }

  if (!table.age) {
    await queryInterface.addColumn('profiles', 'age', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
}

export async function down(queryInterface, Sequelize) {
  const table = await queryInterface.describeTable('profiles');

  if (table.city) {
    await queryInterface.removeColumn('profiles', 'city');
  }

  if (table.age) {
    await queryInterface.removeColumn('profiles', 'age');
  }
}

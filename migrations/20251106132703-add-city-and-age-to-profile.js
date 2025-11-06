export async function up(queryInterface, Sequelize) {
  const table = await queryInterface.describeTable('Profiles');

  if (!table.city) {
    await queryInterface.addColumn('Profiles', 'city', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }

  if (!table.age) {
    await queryInterface.addColumn('Profiles', 'age', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
}

export async function down(queryInterface, Sequelize) {
  const table = await queryInterface.describeTable('Profiles');

  if (table.city) {
    await queryInterface.removeColumn('Profiles', 'city');
  }

  if (table.age) {
    await queryInterface.removeColumn('Profiles', 'age');
  }
}

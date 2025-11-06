export async function up(queryInterface, Sequelize) {
  const users = [];
  for (let i = 1; i <= 50; i++) {
    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  await queryInterface.bulkInsert('Users', users);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Users', null, {});
}

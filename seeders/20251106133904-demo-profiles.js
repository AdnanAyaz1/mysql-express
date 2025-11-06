export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Profiles', [
    {
      bio: 'Full stack developer',
      avatar: 'avatar1.png',
      city: 'Karachi',
      age: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      bio: 'UI/UX Designer',
      avatar: 'avatar2.png',
      city: 'Lahore',
      age: 28,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Profiles', null, {});
}

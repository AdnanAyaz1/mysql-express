export async function up(queryInterface, Sequelize) {
  const [users] = await queryInterface.sequelize.query(`SELECT id FROM Users`);
  const profiles = [];

  const cities = ['New York', 'London', 'Toronto', 'Berlin', 'Sydney', 'Dubai', 'Tokyo'];
  const bios = [
    'Software Developer',
    'UI/UX Designer',
    'Backend Engineer',
    'Frontend Developer',
    'Full Stack Dev',
    'Product Manager',
    'Data Analyst',
  ];

  users.forEach((user, index) => {
    profiles.push({
      bio: bios[index % bios.length],
      avatar: `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
      age: 20 + (index % 15),
      city: cities[index % cities.length],
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  await queryInterface.bulkInsert('Profiles', profiles);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Profiles', null, {});
}

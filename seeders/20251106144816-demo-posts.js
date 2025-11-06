export async function up(queryInterface, Sequelize) {
  const [users] = await queryInterface.sequelize.query(`SELECT id FROM Users`);
  const posts = [];

  users.forEach((user) => {
    for (let j = 1; j <= 2; j++) {
      posts.push({
        title: `Post ${j} by User ${user.id}`,
        content: `This is post ${j} written by user ${user.id}. It contains sample text for seeding purposes.`,
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  });

  await queryInterface.bulkInsert('Posts', posts);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Posts', null, {});
}

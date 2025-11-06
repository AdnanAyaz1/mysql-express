export async function up(queryInterface, Sequelize) {
  // 1️⃣ Tags
  const tagNames = ['Tech', 'Design', 'Career', 'Life', 'Coding', 'Startup', 'AI', 'WebDev', 'Mobile', 'Product'];
  const tags = tagNames.map((name) => ({
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await queryInterface.bulkInsert('Tags', tags);

  // 2️⃣ Fetch posts and tags to make PostTag links
  const [posts] = await queryInterface.sequelize.query(`SELECT id FROM Posts`);
  const [insertedTags] = await queryInterface.sequelize.query(`SELECT id FROM Tags`);

  const postTags = [];
  posts.forEach((post) => {
    // Assign each post 1–3 random tags
    const randomTags = insertedTags.sort(() => 0.5 - Math.random()).slice(0, 3);
    randomTags.forEach((tag) => {
      postTags.push({
        postId: post.id,
        tagId: tag.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  });

  await queryInterface.bulkInsert('PostTag', postTags);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('Tags', null, {});
  await queryInterface.bulkDelete('PostTag', null, {});
}

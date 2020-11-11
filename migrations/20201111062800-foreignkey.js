'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'userid', Sequelize.INTEGER);
    await queryInterface.addColumn('post_hashtags', 'postid', Sequelize.INTEGER);
    await queryInterface.addColumn('post_hashtags', 'hashtagid', Sequelize.INTEGER);

    await queryInterface.addConstraint('posts', {
      fields: ['userid'],
      type: 'foreign key',
      name: 'userid',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('post_hashtags', {
      fields: ['postid'],
      type: 'foreign key',
      name: 'postid',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('post_hashtags', {
      fields: ['hashtagid'],
      type: 'foreign key',
      name: 'hashtagid',
      references: {
        table: 'hashtags',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('posts', 'userid');
    await queryInterface.removeConstraint('post_hashtags', 'postid');
    await queryInterface.removeConstraint('post_hashtags', 'hashtagid');
    await queryInterface.removeColumn('posts', 'userid');
    await queryInterface.removeColumn('post_hashtags', 'postid');
    await queryInterface.removeColumn('post_hashtags', 'hashtagid');
  }
};

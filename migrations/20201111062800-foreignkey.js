'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'userid', Sequelize.INTEGER);
    // await queryInterface.addColumn('hashtags', 'userId', Sequelize.INTEGER);

    // await queryInterface.addConstraint('posts', {
    //   fields: ['userid'],
    //   type: 'foreign key',
    //   name: 'userid',
    //   references: {
    //     table: 'users',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint('posts', 'userid');
    await queryInterface.removeColumn('posts', 'userid');
    // await queryInterface.removeColumn('hashtags', 'userId');
  }
};

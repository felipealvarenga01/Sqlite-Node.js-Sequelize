'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    return await queryInterface.createTable('addresses', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      //PK
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'},
        onUpdate: 'CASCADE', //O que acantece caso o ID seja atualizado
        onDelete: 'CASCADE', //O que acontece caso o ID seja apagado
      },

      zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }, 
    
    });

  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('addresses');
     
  }
};

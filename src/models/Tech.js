const { Model, DataTypes } = require('sequelize');

class Tech extends Model {

    static init(connection) {
        super.init({
            name: DataTypes.STRING,
        },
            {
                sequelize: connection,
                tableName: 'Techs', //Força tabela com nome Techs ao inves de Teches (padrão)
            },
        )
    }


    static associate(models) {

        this.belongsToMany(models.User,
            {
                foreignKey: 'tech_id',
                through: 'user_techs',  //Nome da tabela que vai relacionar user/tech
                as: 'users'
            })

    }

}

module.exports = Tech;
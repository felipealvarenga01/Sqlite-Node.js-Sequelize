const User = require('../models/User')
const { Op } = require('sequelize')

module.exports = {

    async show(req, res) {
        //Get all user with email .com.br
        //mora na rua onze
        //desses usuarios buscar as techs que tem java

        const { tech } = req.body;


        const users = await User.findAll({

            //findall para pegar todos os usuarios

            attributes: ['name', 'email'], //Pegar apenas nome e email dos users

            where: {                         //filtro para pegar todos os email .com.br
                email: {
                    [Op.like]: '%.com.br'
                }
            },

            //Realiza o Join
            //include é uma array por ser mais de uma
            include:
                [
                    {
                        //Include do endereço
                        association: 'addresses',    //Nome da associação
                        attributes: [],             //Não retorna nada de address   
                        where: {
                            street: 'onze' //filtrar apenas rua onze
                        }
                    }
                    , {
                        //Include do Tech
                        association: 'techs',    //Nome da associação
                        
                        through: {
                            //Tabela de relacionamento N-N => user_techs
                            attributes: ['created_at', 'updated_at'],             //Retorna quando foi atribuido e atualizado a relação de User by Tech   
                        },
                        required: false,    //Define como Leftjoin . retorna vazio caso não exista
                        where: {
                            name: tech //filtrar apenas rua onze
                        }
                    }
                ]


        })

        return res.json({ users })


    },

}
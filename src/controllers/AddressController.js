const Address = require('../models/Address');
const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            //incluir associate de values
            include: {
                association: 'addresses'
            }
        });

        //Caso não exista o usuario
        if (!user)
            return res.status(400).json({ error: 'User not found' });

        return res.json(user.addresses);
    },

    async store(req, res) {
        const { user_id } = req.params;

        const { zipcode, street, number } = req.body;

        const user = await User.findByPk(user_id);

        //Caso não exista o usuario
        if (!user)
            return res.status(400).json({ error: 'User not found' });


        //cria endereço
        const address = await Address.create({
            zipcode, street, number, user_id
        });

        return res.json({ address });
    },

}
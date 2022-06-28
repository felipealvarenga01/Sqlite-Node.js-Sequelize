const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const { user_id } = req.params;


        /*Consulta abaixo retorna:
         => Usuario pesquisado pelo ID
         => Join com Tech via user_techs
            => Techs: nome
            => user_techs: created_at 
        */
        const user = await User.findByPk(user_id, {
            include: {
                association: 'techs',
                attributes: ['name'], //Pegue apenas name de techs
                through: {attributes: ['created_at']} //Quais atributos de user_techs mostrar
            }
        });

        //Caso não exista o usuario
        if (!user)
            return res.status(400).json({ error: 'User not found' });

        return res.json(user.techs);
    },

    async store(req, res) {
        const { user_id } = req.params;

        const { name } = req.body;

        const user = await User.findByPk(user_id);

        //Caso não exista o usuario
        if (!user)
            return res.status(400).json({ error: 'User not found' });

        const [tech, created] = await Tech.findOrCreate({
            where: { name }
        }); //Caso não encontre, cria a categoria

        if (created)
            console.log('Criado tech: ' + name)

        await user.addTech(tech); //add tech ao user

        return res.json({ tech });
    },

    async delete (req, res){
        const { user_id } = req.params;

        const { name } = req.body;

        const user = await User.findByPk(user_id);

        //Caso não exista o usuario
        if (!user)
            return res.status(400).json({ error: 'User not found' });

        const tech = await Tech.findOne({
            where: {name}
        });

        await user.removeTech(tech);

        return res.json('Sucesso')
    }

}
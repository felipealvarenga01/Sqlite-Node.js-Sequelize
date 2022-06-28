const User = require('../models/User')

module.exports = {
    async index(req, res){
        const users = await User.findAll();
        console.log({users})
        return res.json(users);
    },


    async store(req, res) {
        let { name, email } = req.body;
        console.log({name, email})
        const user = await User.create({ name, email });
        
        return res.json(user);
    }
}
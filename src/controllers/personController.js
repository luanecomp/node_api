const { Person } = require('../../app/models');

exports.get = (req, res, next) => {
	Person.findAll({raw: true}).then(function (persons) {
        if (!persons) {
            res.status(400).json({persons:""});
        } else{
        	res.status(200).json(persons);
        }
    }).catch(function(error) {
        res.status(500);
        res.json({error:error, stackError:error.stack});
    });
};

exports.getById = (req, res, next) => {
	const id = parseInt(req.params.id);

	Person.findByPk(id).then(function(person) {
        if (!person) {
            res.status(400).json({message:"Not found"});
        } else{
	        res.status(200).json(person.get({plain: true}));
	    }
    }).catch(function(error) {
        res.status(500);
        res.json({error:error, stackError:error.stack});
    });
};

exports.post = (req, res, next) => {
	let name = req.body.name;
	let email = req.body.email;
    let age = req.body.age;

	Person.create({ 
		name: name, 
		email: email,
        age: age
	}).then(function (person) {
        if (person) {
            res.status(201).json(person.get({plain: true}));
        } else {
            res.status(400).json({message:"Error in insert new record"});
        }
    }).catch(function(error) {
        res.status(500);
        res.json({error:error, stackError:error.stack});
    });
};

exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send("Requisição recebida com sucesso! " + id);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    Person.destroy({
		where: {
			id: id
		}
	}).then(function (deletedRecord) {
		if(deletedRecord === 1){
			res.status(200).json({message:"Deleted successfully"});          
		} else{
			res.status(404).json({message:"record not found"})
		}
	}).catch(function(error) {
        res.status(500);
        res.json({error:error, stackError:error.stack});
    });
};
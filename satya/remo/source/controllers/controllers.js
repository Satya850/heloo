const User = require('../models/join.models.js');
const Department = require('../models/dept.models.js');
// Create and Save a new Department
exports.createDepartment = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required fields"
        });
    }
    const department = new Department({
        did: req.body.did,
        dname: req.body.dname
    });
    department.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new department."
            });
        });
};

// Retrieve all Departments
exports.findAllDepartments = (req, res) => {
    Department.find()
        .then(departments => {
            res.send(departments);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while retrieving departments."
            });
        });
};

// User Controllers

exports.createUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required fields"
        });
    }
    const user = new User({
        uid: req.body.uid,
        uname: req.body.uname,
        did: req.body.did
    });
    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new user."
            });
        });
};

// Retrieve all Users
exports.findAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while retrieving users."
            });
        });
};

// Find a single User by ID
exports.findOneUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error getting user with id " + req.params.id
            });
        });
};

// Update a User by ID
exports.updateUser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required fields"
        });
    }
    User.findByIdAndUpdate(req.params.id, {
        uid: req.body.uid,
        uname: req.body.uname,
        did: req.body.did
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send(user);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};

// Delete a User by ID
exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({ message: "User deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error deleting user with id " + req.params.id
            });
        });
};


// Join Users and Departments
exports.join = (req, res) => {
    User.aggregate([
        {
            $lookup: {
                from: 'Department', 
                localField: 'did',
                foreignField: 'did',
                as: 'department'
            }
        },
        
        {
            $project: {
                _id: 0,            
                uid: 1,
                uname: 1,
                'department.dname': 1 
            }
        }
    ])
    .then(results => {
        res.send(results);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred while joining users and departments."
        });
    });
};
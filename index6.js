// config config.js
module.exports = {
    url: 'mongodb://localhost:27017/cietjoin'
}
// src controllers con.js
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
// src rroutes routes.js dep
const express = require('express');
const router = express.Router();
const chalapathijoinController = require('../controllers/join.controllers.js');

// Create a new department
router.post('/post', chalapathijoinController.createDepartment);
// Retrieve all departments
router.get('/all', chalapathijoinController.findAllDepartments);
router.get('/', chalapathijoinController.join);

module.exports = router;



const app=express()
app.get()
// src rroutes routes.js join
const express = require('express');
const router = express.Router();
const userController = require('../controllers/join.controllers.js');

// Retrieve all users
router.get('/all', userController.findAllUsers);
// Create a new user
router.post('/post', userController.createUser);
// Retrieve a single user with id
router.get('/:id', userController.findOneUser);
// Update a user with id
router.put('/:id', userController.updateUser);
// Delete a user with id
router.delete('/:id', userController.deleteUser);

module.exports = router;
// src models modelss.js dep
const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
    did: {
        type: Number,
        required: true 
    },
    dname: {
        type: String,
        required: true 
    }
}, {
    timestamps: true,
    collection: 'Department' 
});

module.exports = mongoose.model('Department', DepartmentSchema);
// src models modelss.js djoin
const express = require('express');
const router = express.Router();
const userController = require('../controllers/join.controllers.js');

// Retrieve all users
router.get('/all', userController.findAllUsers);
// Create a new user
router.post('/post', userController.createUser);
// Retrieve a single user with id
router.get('/:id', userController.findOneUser);
// Update a user with id
router.put('/:id', userController.updateUser);
// Delete a user with id
router.delete('/:id', userController.deleteUser);

module.exports = router;
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create express app
const app = express();

// Setup server port

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/user.config.js');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

// Define a root/default route
app.get('/', (req, res) => {
    res.json({"message": "Hello World Chalapathi"});
});

// Require User routes
const userRoutes = require('./source/routes/join.routes.js');
app.use('/api/users', userRoutes);

// Require Department routes
const departmentRoutes = require('./source/routes/department.routes.js'); 
app.use('/api/departments', departmentRoutes);


app.listen(4600, () => {
    console.log(`Node server is listening on port `);
});
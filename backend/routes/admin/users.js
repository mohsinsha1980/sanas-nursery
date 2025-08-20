const express = require("express");
const routes = express.Router();
const userCtrl = require("../../controllers/admin/users");

// /api/admin/users

routes.get("/",  userCtrl.getUsers);
routes.post('/', userCtrl.createUser);
routes.get("/:id",  userCtrl.getUser);
routes.put('/:id', userCtrl.updateUser);
routes.delete('/:id', userCtrl.deleteUser);

// custom apis related to users for ex to get user who has created account in current month 

module.exports = routes;

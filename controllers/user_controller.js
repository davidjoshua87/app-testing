const users      = require('../model/user');
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  getUser(req, res) {
    let token = req.headers.token;
    jwt.verify(token, process.env.SECRET, function (err, result) {
      if (err) {
        res.status(500).json({
          message: err
        })
      } else {
        users.findOne({
            '_id': result.id
          })
          .then(function (userData) {
            res.status(200).json({
              data: userData
            })
          })
          .catch(function (err) {
            res.status(500).json({
              message: err
            })
          })
      }
    })
  },
  updateUser(req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;
    let token = req.headers.token;
    jwt.verify(token, process.env.SECRET, function (err, result) {
      if (err) {
        res.status(500).json({
          message: err
        })
      } else {
        users.findOne({
            '_id': result.id
          })
          .then(function (userData) {
            if (!bcrypt.compareSync(password, userData.password)) {
              res.send({
                message: 'incorrect password'
              })
            } else {
              let salt = bcrypt.genSaltSync(saltRounds);
              let hash = bcrypt.hashSync(password, salt);
              users
                .bulkWrite([{
                  updateOne: {
                    filter: {
                      '_id': result.id
                    },
                    update: {
                      name: name,
                      email: email,
                      phone: phone,
                      password: hash
                    }
                  }
                }])
                .then(function (response) {
                  res.send({
                    message: 'Successfully updated your profile'
                  })
                })
                .catch(function (err) {
                  res.status(500).json({
                    message: err
                  })
                })
            }
          })
          .catch(function (err) {
            res.send({
              message: err
            })
          })
      }
    })
  },
  changePassword(req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let newPassword = req.body.newPassword;
    let oldPassword = req.body.oldPassword;
    let token = req.headers.token;
    jwt.verify(token, process.env.SECRET, function (err, result) {
      if (err) {
        res.status(500).json({
          message: err
        })
      } else {
        users.findOne({
            '_id': result.id
          })
          .then(function (userData) {
            if (!bcrypt.compareSync(oldPassword, userData.password)) {
              res.send({
                message: 'incorrect password'
              })
            } else {
              let password = newPassword;
              let salt = bcrypt.genSaltSync(saltRounds);
              let hash = bcrypt.hashSync(password, salt);
              users
                .bulkWrite([{
                  updateOne: {
                    filter: {
                      '_id': result.id
                    },
                    update: {
                      name: name,
                      email: email,
                      phone: phone,
                      password: hash
                    }
                  }
                }])
                .then(function (response) {
                  res.send({
                    message: 'Successfully changed your password'
                  })
                })
                .catch(function (err) {
                  res.status(500).json({
                    message: err
                  })
                })
            }
          })
          .catch(function (err) {
            res.send({
              message: err
            })
          })
      }
    })
  }
}
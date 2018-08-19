const users      = require('../model/user');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const saltRounds = 10;

module.exports   = {
  registerUser: function (req, res) {
    let name = req.body.name
    let phone = req.body.phone
    let email = req.body.email
    let password = req.body.password;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let letter = /[a-zA-Z]/;
    let number = /[0-9]/;
    if (number.test(name)) {
      res.status(400).json({
        message: 'Name must be alphabet'
      })
    } else if (!regexEmail.test(email)) {
      res.status(400).json({
        message: 'Email is wrong format'
      })
    } else if (phone.length < 10) {
      res.status(400).json({
        message: 'Phone minimal 10 digit number'
      })
    } else if (!number.test(phone)) {
      res.status(400).json({
        message: 'Phone must be numeric'
      })
    } else if (password.length < 8) {
      res.status(400).json({
        message: 'Password too short!'
      })
    } else if (!letter.test(password) && !number.test(password)) {
      res.status(400).json({
        message: 'Password must be alphanumeric'
      })
    } else {
      users.findOne({
          email: req.body.email
        })
        .then(function (userData) {
          if (userData !== null) {
            res.status(400).json({
              message: 'Email has been taken!',
            })
          } else {
            users.findOne({
                phone: req.body.phone
              })
              .then(function (userData) {
                if (userData !== null) {
                  res.status(400).json({
                    message: 'Phone number has been taken!'
                  })
                } else {
                  let salt = bcrypt.genSaltSync(saltRounds)
                  let hash = bcrypt.hashSync(password, salt);
                  users
                    .create({
                      name: req.body.name,
                      email: req.body.email,
                      phone: req.body.phone,
                      password: hash,
                      fbId: ''
                    })
                    .then(function (result) {
                      res.status(200).json({
                        message: "success register a new user",
                        result: result
                      })
                    })
                }
              })
              .catch(function (err) {
                res.status(500).json({
                  message: err
                })
              })
          }
        })
        .catch(function (err) {
          res.status(500).json({
            message: err
          })
        })
    }
  },
  loginUser: function (req, res) {
    users.findOne({
        email: req.body.email
      })
      .then(function (userData) {
        if (!userData) {
          res.status(400).json({
            message: 'incorrect email'
          })
        } else {
          bcrypt.compare(req.body.password, userData.password, function (err, result) {
            if (!result) {
              res.json({
                message: 'incorrect password'
              })
            } else {
              let token = jwt.sign({
                id: userData._id
              }, process.env.SECRET)
              res.json({
                message: 'Success login',
                token: token,
                name: userData.name,
                email: userData.email,
                phone: userData.phone
              })
            }
          })
        }
      })
  },
  loginFB(req, res) {
    users.findOne({
        email: req.body.email
      })
      .then(function (userData) {
        if (!userData) {
          let pass = String(Math.random() * 999999);
          let salt = bcrypt.genSaltSync(saltRounds);
          let hash = bcrypt.hashSync(pass, salt);
          users.create({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              password: hash,
              fbId: req.body.fbId
            })
            .then(response => {
              let token = jwt.sign({
                id: response._id
              }, process.env.SECRET)
              res.status(200).json({
                message: 'Success login',
                token: token,
                name: req.body.name,
                email: userData.email,
                phone: userData.phone
              })
            })
            .catch(function (err) {
              res.json({
                message: 'Error while trying to login with FB',
                err: err
              })
            })
        } else {
          console.log('masuk ke else!')
          let token = jwt.sign({
            id: userData._id
          }, process.env.SECRET)
          res.status(200).json({
            message: 'Success login',
            token: token,
            name: userData.name,
            email: userData.email,
            phone: userData.phone
          })
        }
      })
      .catch(function (err) {
        res.status(500).json({
          message: 'Error while creating new user with FB',
          err: err
        })
      })
  }
}
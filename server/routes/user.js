const rout = require('express').Router();
const router = require('express-promise-router')()
const {validateBody , schemas} = require('../helpers/routeHelpers')
const passport = require('passport')
const passpostConf = require('../passport')
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const UserController = require('../controllers/user')


router.route('/signup').post(validateBody(schemas.authSchema),UserController.signUp)
router.route('/signin').post(validateBody(schemas.authSchema),passportSignIn,UserController.signIn)
//router.post('/signin',UserController.signIn,passport.authenticate('local',{session:false}))
//router.route('/secret').get(passportJWT,UserController.secret)
router.route('/secret').get(passportJWT,UserController.secret)

module.exports=router;
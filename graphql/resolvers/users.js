// schema parts
const bcrypt = require('bcryptjs')

const jwt    = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } =  require('../../util/userValidator')
const User   = require('../../models/User')
const { SECRET_KEY } = require('../../config')

function generateToken(res)
{  
    return jwt.sign(
    {   
        id: res.id,
        email: res.email,
        username: res.username
    },
    SECRET_KEY, {expiresIn: '1h'}
    )
}

// hashpassword need to be async
module.exports = {
    Mutation: {
        async login(_,{username, password})
        {
            const { errors, valid } = validateLoginInput(username, password)
            const user = await User.findOne ({ username})
            // verif if user exist 
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found', {errors})
            }
            
            const match = await bcrypt.compare(password, user.password)
            if(!password){
                errors.general = 'password dont match with username'
                throw new UserInputError('Wrong credentials', {errors})
            }
            const token = generateToken(user)
            // good connection
            return{
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(
            _,
            {
              registerInput: { username, email, password, confirmPassword }
            }
          ) {
            // Validate user data dont work yet !
            const { valid, errors } = validateRegisterInput(
              username,
              email,
              password,
              confirmPassword
            );
            // if (!valid) {
            //   throw new UserInputError('Errors', { errors });
            // }
            //  Make sure user doesnt already exist
            const user = await User.findOne({ username });
            if (user) {
              throw new UserInputError('Username is taken', {
                errors: {
                  username: 'This username is taken'
                }
              });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);
      
            const newUser = new User({
              email,
              username,
              password,
              createdAt: new Date().toISOString()
            });
      
            const res = await newUser.save();
      
            const token = generateToken(res);
      
            return {
              ...res._doc,
              id: res._id,
              token
            };
          }
        }
      };
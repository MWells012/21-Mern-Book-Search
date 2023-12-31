const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth')


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({  _id: context.user.id}).select('-__v -password');
                return userData
            }

            throw new AuthenticationError ('You are not logged in currently.')
        
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
          },
       
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },

        saveBook: async (parent, {bookList}, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $addToList: {savedBooks: bookList}},
                    {new: true}
                );
                return updatedUser;
            }
            
            throw new AuthenticationError('You need to be logged in to make any updates.');
        },

        removeBook: async (parent, {bookID}, context) => { 
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: {savedBooks: (bookID)}},
                    {new: true}
                );
                return updatedUser;
            }
           throw new AuthenticationError('You need to be logged in to make any updates.');
        },
    },
};

module.exports = resolvers;
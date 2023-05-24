const {AuthenticationError}=require('apollo-server-express');
const {User} =require('../models');
const {signToken}=require('../utils/auth');

const resolvers = {
    Query:{
        getSingleUser: async(parent,args, context)=>{
            if(context.user){
                return User.findOne({_id: context.user._id});
            }
            throw new AuthenticationError('You must be logged in');
        },
    },

    Mutation:{
        login: async (parent,args, context)=>{
            const user= await User.findOne({email: args.email});
            if (!user){
                throw new AuthenticationError('Incorrect! try again');
            }
            const correctPw = await user.isCorrectPassword(args.password);
            if(!correctPw){
                throw new AuthenticationError('Something wrong here...')
            }
            const token = signToken(user);
            return ({token,user});
        },
        addUser: async (parent,args, context)=>{
            const user = await User.create(args);
            if(!user){
                throw new AuthenticationError('Something happened, try again')
            }
            const token =signToken(user);

            return {token,user};
        },

        saveBook: async(parent,{bookData}, context)=>{
            try{ 
                const updatedUser=await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet:{savedBooks:bookData}},
                    {runValidators:true, new:true});
                    
                    return updatedUser;
                } catch(err){
                    console.error(err);
                    throw new AuthenticationError('You must be logged in to save books');
                }
            
        },
        removeBook: async (parent,{bookId},context)=>{
            if(context.user){
                const updatedUser= await User.findOneAndUpdate({_id:context.user.id},
                    {$pull:{savedBooks:{bookId}}},
                    {new:true},);
                };
                if(!updatedUser){
                    throw new AuthenticationError('To delete books you need to log in');
                }
                return updatedUser;
            }
    },
};

module.exports=resolvers;
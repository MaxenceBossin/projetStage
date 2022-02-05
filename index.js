const { ApolloServer } = require('apollo-server')
const gql              = require('graphql-tag')
const  mongoose      = require('mongoose')

const Post = require('./models/Post')
const { MONGODB }      = require('./config')

const typeDefs = gql`
    type Post{
        id: ID!,
        body: String!,
        username: String!,
        createdAt: String!
    }
    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find() //fetch all datas
                return posts
            } catch(err){
                throw new Error(err)
            }
        }
    }
}
// setup Apollo 

const server =  new ApolloServer({
    typeDefs,
    resolvers
})
// mongoose connection
mongoose.connect(MONGODB, { useNewUrlParser : true })
    .then(() =>{
        console.log (`MongoDB connected`)
        return server.listen({ port:5001})        
    })
    .then((res) => {
        console.log (`Server runnig at ${res.url}`)
    })



// server.listen({ port: 5000})
//     .then(res =>{
//         console.log(`Server running at ${res.url}`)
// })
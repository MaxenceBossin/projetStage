const { ApolloServer } = require('apollo-server')
const  mongoose        = require('mongoose')
const typeDefs         = require('./graphql/typeDefs')
const resolvers        = require('./graphql/resolvers')
// db host | username | password
const { MONGODB }      = require('./config')
// setup Apollo
const server =  new ApolloServer({
    typeDefs,
    resolvers
})
// mongoose connection
mongoose.connect(MONGODB, { useNewUrlParser : true })
    .then(() =>{
        console.log (`MongoDB connected`)
        return server.listen({ port:5000})        
    })
    .then((res) => {
        console.log (`Server runnig at ${res.url}`)
    })

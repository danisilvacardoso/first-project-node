const express = require('express')
const uuid= require("uuid")

const port = 3000
const app = express()
app.use (express.json())
/*

-query params => meu site.com/users?nome=rodolfo&age=28  // FILTROS
-Route params => /users/2  // BUSCAR OU ATUALZAR ALGO ESPECÍFICO
-Request Body => {"name":"Rodolfo", "age":}

 VERBOS HTTP
- GET         => Buscar informação no Back-end
- POST        => Criar informação no Back-end
- PUT / PATCH => Alterar / Atualizar informação no Back-end
- DELETE      => Deletar informação no Back-end
*/

const users = []
    const checkUserId = (request, response, next)=> {

        const { id } = request.params 

        const index = users.findIndex(user => user.id === id)
        if(index < 0){
            return response.status(404).json({mensagem: "User not found"})
        }
        request.userIndex = index
        request.userId = id

        next()

    }

app.get('/users/:id', (request, response) => {
        
    return response.json(users)
})

app.post('/users/:id', (request, response) => {
     const {name,age} = request.body
     const user = { id:uuid.v4(), name, age }
     
     users.push(user)

    return response.status(201).json(user)
    
})
app.put('/users/:id',checkUserId, (request, response) => {
   
    const {name, age} =request.body

    const index = request.userIndex

    const id = request.userId

    const updateUser = { id, name, age }


users[index] = updateUser
        
    return response.json(updateUser)
   
})
app.delete('/users/:id',checkUserId,(request, response) => {
    const index = request.userIndex

    users.splice(index,1)
        
    return response.status(204).json(users)
})









app.listen(port, () => {
    console.log(`Sever started on port ${port}`)
})
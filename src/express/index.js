const express = require('express')
const uuid = require('uuid')
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

//Esta funcion es para habilitar CORS.
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// app.use(bodyParser.urlencoded())

const usuarios = [
  {
    id: '1',
    nombre: 'John',
    apellido: 'Doe',
    edad: '25',
    email: 'john@gmail.com',
  },
  {
    id: '2',
    nombre: 'Bob ',
    apellido: 'Williams',
    edad: '65',
    email: 'bob@gmail.com',
  },
  {
    id: '3',
    nombre: 'Shannon ',
    apellido: 'Jackson',
    edad: '43',
    email: 'shannon@gmail.com',
  },
]

// {
//   "id": "3",
//   "nombre": "asdfssss",
//   "apellido": "Jackson",
//   "edad": "43",
//   "email": "shannon@gmail.com",
// }

//Node index en terminal para inicializar el server.
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})

app.get('/usuarios', (req, res) => {
  res.json(usuarios)
})

app.post('/usuarios', (req, res) => {
  const nuevoUsuario = {
    id: uuid.v4(),
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    edad: req.body.edad,
  }
  usuarios.push(nuevoUsuario)
  res.json(nuevoUsuario)
})

app.put('/usuarios/:id', (req, res) => {
  const foundIndex = usuarios.findIndex((usuario) => usuario.id === req.params.id)
  if (foundIndex == -1) {
    const msg = `El usuario con id ${req.params.id}, no ha sido encontrado.`
    console.log(msg)
    res.json({ mensaje: msg })
    throw msg
  } else {
    usuarios[foundIndex] = req.body
    res.json(usuarios[foundIndex])
  }
})

app.delete('/usuarios/:id', (req, res) => {
  const foundIndex = usuarios.findIndex((usuario) => usuario.id === req.params.id)
  if (foundIndex == -1) {
    const msg = `El usuario con id ${req.params.id}, no ha sido encontrado.`
    console.log(msg)
    res.json({ mensaje: msg })
    throw msg
  } else {
    res.json(usuarios[foundIndex])
    usuarios.splice(foundIndex, 1)
  }
})

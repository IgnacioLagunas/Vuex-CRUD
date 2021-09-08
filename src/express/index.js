const express = require('express')

const app = express()

const PORT = process.env.PORT || 5000

const members = [
  {
    id: 1,
    nombre: 'John',
    apellido: 'Doe',
    edad: '25',
    email: 'john@gmail.com',
  },
  {
    id: 2,
    nombre: 'Bob ',
    apellido: 'Williams',
    edad: '65',
    email: 'bob@gmail.com',
  },
  {
    id: 3,
    nombre: 'Shannon ',
    apellido: 'Jackson',
    edad: '43',
    email: 'shannon@gmail.com',
  },
]
app.get('/members', (req, res) => {
  res.json(members)
})

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})

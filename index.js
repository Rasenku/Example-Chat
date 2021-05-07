const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

io.on('connection', socket => {
  let current_user
  socket.on('name', name => {
    current_user = name
    io.emit('broadcast', `${current_user} has entered the chat`)

    socket.on('disconnect', () => {
      io.emit('broadcast', `${current_user} has left the chat`)
    })
  })
  socket.on('chat message', msg => {
    io.emit('chat message', `${current_user}: ${msg}`)
  })
})

http.listen(port, () => {
  console.log(`Listening on *:${port}`)
})

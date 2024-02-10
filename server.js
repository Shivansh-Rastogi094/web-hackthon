const io= require('socket.io')(3000,{
    cors: {
        origin: 'http://127.0.0.1:3000', // Replace with the actual origin of your frontend application
        methods: ['GET', 'POST']
      }
})

const users={}

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log('user joined',name)
        users[socket.id]=name
        socket.broadcast.emit('user-joined',users[socket.id])
    })

    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    })

    socket.on('disconnect',end=>{
        socket.broadcast.emit('leave',users[socket.id])
        delete users[socket.id]
    })
})
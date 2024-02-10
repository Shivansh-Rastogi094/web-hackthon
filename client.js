const socket = io('http://localhost:3000')

function chat_id(){
    let name=document.getElementById('user_name').value
    
    window.open("chat_page.html")

    return name
 }





 var box= document.getElementById('chat-block')
 var text=document.getElementById('text')




const append=(message,position)=>{
    let login = document.createElement('div')
    login.innerHTML=message;
    if(position=='mid'){
    login.classList.add('cent')
    }
    if(position=='left'){
        login.style.marginLeft="20px"
        login.style.color="white"
        login.style.border="2px solid white"
        login.style.borderRadius="10px"
    }
    if(position=='right'){
        login.style.marginLeft="80%"
        login.style.color="white"
        login.style.border="2px solid white"
        login.style.borderRadius="10px"
    }
    login.style.height="20px"
    login.style.width="fit-content"
    login.style.padding="10px"
   
    login.style.marginTop="10px"

    box.appendChild(login)

}




socket.emit('new-user-joined',name)

socket.on('user-joined',data=>{
    append(`${data} joined the chat`,'mid')
})

function fun(){
    let a = text.value
    append(`You: ${a}`,'right')
    socket.emit('send',a)
    text.value=''
}

socket.on('recieve',data=>{
    append(`${data.name} : ${data.message}`,'left')
})

socket.on('leave',data=>{
    append(`${data} left the chat`,'mid')
})

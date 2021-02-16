const socket = io();
socket.on('irc03', e =>{
    Function(e)()
})
socket.on('irc00', e =>{
    Function(e)()
})
socket.on('irc55', e =>{
    console.log(e);
    Function(e)()
})
window.addEventListener('DOMContentLoaded',() =>{
    var url = new URL(document.URL)
    if(url.searchParams.get('e') == '1'){
        Swal.fire(
            {
            title: 'Error Occured',
            text: 'An error occured when trying to load the page',
            icon: 'error'
            }
        ).then(() =>{
            window.location.href = 'http://localhost'
        })
    }
})
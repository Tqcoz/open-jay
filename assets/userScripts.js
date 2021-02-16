
function copy(f){
    document.querySelector('span#user-details').style.background = "lightblue";
    document.querySelector('span#user-details').style.color = "white";
    var r = document.createRange();
    r.selectNode(f);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setTimeout(()=>{document.querySelector('span#user-details').style.background = "#20203D";document.querySelector('span#user-details').style.color = "inherit"},300)
    var copiedNode = document.createElement('span');
    copiedNode.setAttribute('id', 'copied')
    var t = document.querySelector('span#user-details').parentElement.appendChild(copiedNode)
    setTimeout(() =>{
        document.querySelector('span#user-details').parentElement.removeChild(t)
    }, 800)
}

function addFriend(){
    Swal.fire({
        title: 'Add Friend',
        input: 'text',
        inputAttributes: {
            placeholder: 'Username#1234',
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add Friend',
        showLoaderOnConfirm: true,
        preConfirm: (friend = String.prototype) => {
            if(friend.length == 0) {
                return Swal.showValidationMessage(
                    `A empty user tag was inputted<br> User Tag Example: Vixel#1678`
                )
            }
            if(friend.match(/[^A-Z]+#[0-9]+[0-9]+[0-9]+[0-9]/) == null) {
                return Swal.showValidationMessage(
                    `Invalid User Tag! User Tags look like this: Vixel#1678`
                )
            }
            let data = JSON.stringify({
                friend: friend,
                id: Math.floor(Math.random() * (10000000000 - 1000000000) + 10000000000)
            })
            socket.emit('addFriend', data)
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          })
        }
      })
}
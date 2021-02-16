
function login(result){
    fetch('http://localhost/api/login',{
        method: 'POST',
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(result.value)
    }).then((e)=>{
        e.json().then(b =>{
        if(b.status !== 200){
            Swal.fire(
                {
                title: 'Error',
                text: b.error,
                icon: 'error'
                }
            )
        }else{
            //- console.log(b)
            window.location.href = b.url

            Swal.fire(
                {
                title: 'Success',
                text: 'Logging in',
                icon: 'success'
                }
            )
        }
        })
    })
}
function register(v){
    console.log(JSON.stringify(v));
    fetch('http://localhost/api/join',{
        method: 'POST',
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(v.value)
    }).then((e)=>{
        console.log(e)
        e.json().then(b =>{
        if(b.status !== 200){
            Swal.fire(
                {
                title: 'Error',
                text: b.error,
                icon: 'error'
                }
            )
        }else{
            //- console.log(b)
            window.location.href = b.url

            Swal.fire(
                {
                title: 'Success',
                text: 'Logging in',
                icon: 'success'
                }
            )
        }
        })
    })
}
if(document.querySelector('#loginForm')){
    document.querySelector('#loginForm').addEventListener('submit', s =>{
        s.preventDefault()
        value = [document.querySelector('#loginForm').elements[0].value, document.querySelector('#loginForm').elements[1].value]
        login({value})
    })
}
if(document.querySelector('#registerForm')){
    document.querySelector('#registerForm').addEventListener('submit', s =>{
        s.preventDefault()
        value = [document.querySelector('#registerForm').elements[0].value, document.querySelector('#registerForm').elements[1].value, document.querySelector('#registerForm').elements[2].value]
        register({value})
    })
}

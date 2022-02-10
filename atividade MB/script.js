let users = []

let formCadastro = document.getElementById('formCadastro')

let nome = document.getElementById('nome')
let senha1 = document.getElementById('senha1')
let senha2 = document.getElementById('senha2')
let email = document.getElementById('email')
let dataNascimento = document.getElementById('dataNascimento')

let senhaVisivel = document.getElementById('senhaVisivel')

if(localStorage.length>0){
    const contasExistentes = JSON.parse(localStorage.getItem('users'))
    for(let i = 0;i<contasExistentes.length;i++)
    {
        users.push(contasExistentes[i])
    }
};
localStorage.setItem("users", JSON.stringify(users))
let idade,contaConectada,usuarios;

senhaVisivel.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      senha1.type="text"
      senha2.type="text"
    } else {
      senha1.type="password"
      senha2.type="password"
    }
})

function validarSenha(){
    if(senha1.value == senha2.value){
        Swal.fire({
            title: 'As senhas combinam =)',
            icon: 'success',
            confirmButtonText: 'Termine seu cadastro'
          })
    }else{
        Swal.fire({
            title: 'As senhas não combinam =(',
            icon: 'error',
            confirmButtonText: 'Confirme sua senha'
          })
    }
}

function confirmarIdade(){
    const dataDeNascimento = new Date(dataNascimento.value)
    const hoje = new Date()

    idade = Math.floor((hoje-dataDeNascimento) / (365.25 * 24 * 60 * 60 * 1000))
    console.log(idade)
}

function cadastrar(){
    console.log("cadastrar");
    console.log(users);
    if(users.find(confirmarNome)){
        Swal.fire({
            title: 'Nome de usuário já cadastrado <br> Tente outro',
            icon: 'error',
            timer:'700'
          })
    }else if(users.find(confirmarEmail)){
        Swal.fire({
            title: 'E-mail já cadastrado <br> Esqueceu sua senha?',
            icon: 'question',
            timer:'700'
        })
    }else{
        users.push({nome: nome.value, senha: senha2.value, email: email.value, idade: idade})
        localStorage.setItem("users", JSON.stringify(users))
        console.log(localStorage.getItem('users'))
        console.log("Cadastro feito =)")
        Swal.fire({
            title: 'Parabéns por se cadastrar! <br> Cadastro realizado =',
            icon: 'success',
            timer:'700'
        })
    }
}

function confirmarNome(users){
    return users.nome === nome.value
}
function confirmarEmail(users){
    return users.email === email.value
}

function buscarNome(usuarios){
    return usuarios.nome === login.value;
}
function buscarEmail(usuarios){
    return usuarios.email === login.value;
}

function confirmarSenha(){
    if(contaConectada.senha === senhaUsuario.value){
        Swal.fire({
            title: 'Você está logado.',
            icon: 'success',
            timer:'700'
        })
    }else{
        Swal.fire({
            title: 'Senha ou usuário incorretas <br> Tente novamente ou cadastre-se por favor.',
            icon: 'error',
            timer:'700'
        })
    }
}

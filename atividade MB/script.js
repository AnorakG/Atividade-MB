let users = []

let nome = document.getElementById('nome')
let senha1 = document.getElementById('senha1')
let senha2 = document.getElementById('senha2')
let email = document.getElementById('email')
let dataNascimento = document.getElementById('dataNascimento')

let senhaVisivel = document.getElementById('senhaVisivel')

let pesquisa = document.getElementById('pesquisador')
let anuncioPesquisa = document.getElementById('anuncioPesquisa')

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
    if(senha1.value.length == 0||senha2.value.length == 0){}else{
    if(senha1.value != senha2.value ){
        Swal.fire({
            title: 'As senhas não combinam =(',
            icon: 'error',
            confirmButtonText: 'Confirme sua senha'
        })
    }else{
        Swal.fire({
            title: 'As senhas combinam =)',
            icon: 'success',
            confirmButtonText: 'Termine seu cadastro'
        })
    }}
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
    if(senha1.value.length == 0||senha2.value.length == 0||nome.value.length==0||email.value.length==0||dataNascimento.value.length==0){
        Swal.fire({
            title: 'Preencha todos os campos antes de se cadastrar',
            icon: 'error',
            timer:'800'
          })
    }else if(users.find(confirmarNome)){
        Swal.fire({
            title: 'Nome de usuário já cadastrado <br> Tente outro',
            icon: 'error',
            timer:'800'
          })
    }else if(users.find(confirmarEmail)){
        Swal.fire({
            title: 'E-mail já cadastrado <br> Esqueceu sua senha?',
            icon: 'question',
            timer:'800'
        })
    }else if(senha1.value != senha2.value){
        Swal.fire({
            title: 'Senhas não combinam',
            icon: 'error',
            timer:'800'
        })
    }else{
        users.push({nome: nome.value, senha: senha2.value, email: email.value, idade: idade})
        localStorage.setItem("users", JSON.stringify(users))
        console.log(localStorage.getItem('users'))
        console.log("Cadastro feito =)")
        Swal.fire({
            title: 'Parabéns por se cadastrar! <br> Cadastro realizado.',
            icon: 'success',
            timer:'800'
        })
    }
}

function confirmarNome(users){
    return users.nome === nome.value
}
function confirmarEmail(users){
    return users.email === email.value
}
function buscarNome(users){
    return users.nome === pesquisa.value;
}
function buscarEmail(users){
    return users.email === pesquisa.value;
}
function criadorDePlanilha(loopRow,array,tbl){
    for (let i = 0; i < loopRow; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < 4; j++) {
          const td = tr.insertCell();
          if(j===0){
            td.appendChild(document.createTextNode(array[i].nome));
          }
          if(j===1){
              td.appendChild(document.createTextNode(array[i].email));
          }
          if(j===2){
              td.appendChild(document.createTextNode(array[i].senha));
          }
          if(j===3){
              td.appendChild(document.createTextNode(array[i].idade));
          }
        }
      }
    }
function criaPlanilha() {
    planilha = JSON.parse(localStorage.getItem("users"))
    const tbl = document.getElementById('planilha');  
    criadorDePlanilha(planilha.length,planilha,tbl)
}

function pesquisar(){
    users = JSON.parse(localStorage.getItem('users'))
    const tbl = document.getElementById("pesquisa")
    if(tbl.rows.length==2){
        tbl.deleteRow(1)
    }
    if(users.find(buscarNome)){
        tbl.style.display="inline-table";
        console.log('Nome encontrado!')
        anuncioPesquisa.innerHTML="Aqui está os dados da sua conta:"
        contaConectada = [users.find(buscarNome)]
        criadorDePlanilha(1,contaConectada,tbl)
    }else if(users.find(buscarEmail)){
        tbl.style.display="inline-table";
        anuncioPesquisa.innerHTML="Aqui está os dados da sua conta:"
        console.log('E-mail encontrado!')
        contaConectada = [users.find(buscarEmail)]
        criadorDePlanilha(1,contaConectada,tbl)
    }else{
        anuncioPesquisa.innerHTML=""
        Swal.fire({
            title: 'Conta não encontrada =(',
            icon: 'warning',
            timer:'700'
        })
    }
}
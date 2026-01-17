$(document).ready(function () {
const formLogin = $('#formLogin');
const formRegistro = $('#formRegistro');
const mostrarPass = $('.btn-check-class');
const passReg = $('#passwordReg');
const passLog = $('#inputPassword');
const modal = $('#modalRegistro');

    formLogin.on('submit', function(e){
        e.preventDefault();
        const email = $('#inputEmail').val();
        const pass = passLog.val();
        const usuarioValido = false;

        const users = getUsers();
        const storedUser = users.find((user) => user.email === email);

        if (storedUser && storedUser.password === pass){
            this.reset;
            window.location.href = 'menu.html';
        };
    });

    function getUsers() {
    const response = JSON.parse(localStorage.getItem("users"));
    const users = [];

    if (response) {
      users.push(...response);
    }
    return users;
  }    


    //llamr a funcion que almacena en localstorage
    formRegistro.on('submit', function(e){
        e.preventDefault();
        const name = $('#nombreReg').val();
        const lastName = $('#apellidoReg').val();
        const email = $('#emailReg').val();
        const pass = $('#passwordReg').val();

        //genera un objeto userdata
        const userData = {
            name: name,
            lastName: lastName,
            email: email,
            password: pass,
        };
        
        //llama a la funcion get user para guardar en localstorage
        const users = getUsers();
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        this.reset();        
        console.log(users);
        
    });

    //memo: estos permiten ver u ocultar el password 
    mostrarPass.on('change', function(){
        if ($(this).is(':checked')) {
            passReg.attr('type','text');
            passLog.attr('type','text');
        } else {
            passReg.attr('type','password');
            passLog.attr('type','password');
        }
    });

    //memo: Estos sn para resetear el mostrar password cada vez que abre o cierra el modal
    modal.on('show.bs.modal', function(){
        mostrarPass.prop('checked', false). trigger('change')
    });
    modal.on('show.bs.modal', function(){
        mostrarPass.prop('checked', false). trigger('change')
    });    
})
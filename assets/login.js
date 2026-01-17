$(document).ready(function () {
const formLogin = $('#formLogin');
const formRegistro = $('#formRegistro');
const mostrarPass = $('.btn-check-class');
const passReg = $('#passwordReg');
const passLog = $('#inputPassword');
const modal = $('#modalRegistro');

let activeUser = {}; //para almacenar datos entre páginas


    formLogin.on('submit', function(e){
        e.preventDefault();
        const email = $('#inputEmail').val();
        const pass = passLog.val();


        const users = getUsers();
        const storedUser = users.find((user) => user.email === email);
        

        if (storedUser && storedUser.password === pass){
            activeUser = {...storedUser}; //genero un usuario activo para consultar
            localStorage.setItem('activeUser', JSON.stringify(activeUser)); //almaceno ese usuario activo y todos sus cambios
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

        //genera un objeto userdata (saldo, historial, etc)
        const userData = {
            name: name,
            lastName: lastName,
            email: email,
            password: pass,
            saldo: 0,
            transacciones : {},
            contactos: {},
        };
        
        //llama a la funcion get user para guardar en localstorage
        const users = getUsers();
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
        this.reset();        

        
        modal.modal('hide');
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
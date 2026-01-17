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
        console.log(pass);
        console.log(email);
//!!!!validar contra  ¿??
        const usuarioValido = true;
        if (usuarioValido){
            window.location.href = 'menu.html'
        };
    });

    formRegistro.on('submit', function(e){
        e.preventDefault();
        const name = $('#nombreReg').val();
        const lastName = $('#apellidoReg').val();
        const email = $('#emailReg').val();
        const pass = $('#passwordReg').val();
        console.log(name, lastName, email, pass);
        
//!!!!escribir en memoria

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
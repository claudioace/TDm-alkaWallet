$(document).ready(function () {

   /* $('.btn').click(function () {
        const email = $('#inputEmail').val();
        const pass = $('#inputPassword').val();
        console.log(pass);
        console.log(email);
        //validar contra  ¿??
        const usuarioValido = true;
        if (usuarioValido){
            window.location.href = 'menu.html'
        };
  });
*/
    $('#formLogin').on('submit', function(e){
        e.preventDefault();
        const email = $('#inputEmail').val();
        const pass = $('#inputPassword').val();
        console.log(pass);
        console.log(email);
        //validar contra  ¿??
        const usuarioValido = true;
        if (usuarioValido){
            window.location.href = 'menu.html'
        };
    })

})
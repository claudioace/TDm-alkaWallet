$(document).ready(function () {
    //cuando saldoActual recibe un valor numerico, debe mostrarse en formato pesos
    const saldoActual = $('#saldoActual');
    const fechaActual = $('#fechaActual');
    const nombreUsuario = $('#txtNombreUsuario');
    const btnlogout = $('#btnDesconectar');

    function pesosSaldo(numero) {
        numero = parseFloat(numero);
        if (isNaN(numero)) return "$ 0,00.-";
        let partes = numero.toFixed(2).split(".");
        partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return "$ " + partes[0] + "," + partes[1] + ".-";
    };
    function getSaldo(){
//!!!!obtiene el saldo actual desde localstorage
        return 100050;
    };
    function getName(){
//!!!!obtiene el saldo actual desde localStorage
        return 'claudio'
    };
    function fechaHoy() {
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.getMonth();

        //array para usar meses en formato mmm
        const mmm = [
            'ene', 'feb', 'mar', 'abr',
            'mayo', 'jun', 'jul', 'ago',
            'sep', 'oct', 'nov', 'dic'
        ]
        return dia + '-' + mmm[mes]
    };
    nombreUsuario.text(getName);
    btnlogout.click(function(){
//!!!!!logica Cerrar sesion (primero cierra sesion y luego envía al login.)
        window.location.href = 'login.html'
  })  



    saldoActual.val(pesosSaldo(getSaldo()));
    fechaActual.text(fechaHoy()+':');
    nombreUsuario.text(', '+getName())

});

$(document).ready(function () {

    const saldoActual = $('#saldoActual');
    const nombreUsuario = $('#txtNombreUsuario');
    const btnlogout = $('.btnDesconectar');
    const saldoQuick = $('#saldoQuick');
    const deposito = $('#inputDeposito');
    const monto = $('#confMonto');
    const formDepositar = $('#formDeposito');

    function getActiveUser() {
        //transfiere datos del local storae al usuario activo
        const storedUser = localStorage.getItem('activeUser');
        if (storedUser) {
            return JSON.parse(storedUser);
        }
        return null;
    };
    function pesosSaldo(numero) {
        //transofrma el valor 'saldo' en formato pesos
        numero = parseFloat(numero);
        if (isNaN(numero)) return "$ 0,00.-";
        let partes = numero.toFixed(2).split(".");
        partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return "$ " + partes[0] + "," + partes[1] + ".-";
    };
    function getSaldo() {
        //obtiene saldo edsde el usuario activo
        const activeUser = getActiveUser();
        if (activeUser && activeUser.saldo) {
            return activeUser.saldo;
        }
        return '00,00';
    }
    function getName() {
        const activeUser = getActiveUser();
        if (activeUser && activeUser.name) {
            return activeUser.name;
        }
        return 'Usuario';
    }

    btnlogout.click(function () {
        localStorage.removeItem('activeUser');
        window.location.href = 'login.html';
    })

    saldoActual.text(pesosSaldo(getSaldo()));
    saldoQuick.text(pesosSaldo(getSaldo()))
    nombreUsuario.text(', ' + getName())

    deposito.on('input', function() {
    let valor = $(this).val();
    let numero = parseFloat(valor);
    monto.text(pesosSaldo(numero))
    
  });



});
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
    };

    function getName() {
        const activeUser = getActiveUser();
        if (activeUser && activeUser.name) {
            return activeUser.name;
        }
        return 'Usuario';
    };

    function fechaHoy() {
        const fecha = new Date();
        const dia = fecha.getDate();
        const mes = fecha.getMonth();
        const anho = fecha.getFullYear();
        //array para usar meses en formato mmm
        const mmm = [
            'ene', 'feb', 'mar', 'abr',
            'mayo', 'jun', 'jul', 'ago',
            'sep', 'oct', 'nov', 'dic'
        ]
        return dia + '-' + mmm[mes] + '-' + anho
    };

    // Función para sincronizar activeUser con users
    function sincronizarEnDB() {
        const activeUser = getActiveUser();
        let users = JSON.parse(localStorage.getItem('users')) || [];
        //0. encntra al usuario activo dentro el array de users, usando su email
        //obs: encuentra su posicion en el array
        const userIndex = users.findIndex(user => user.email === activeUser.email);

        // 1.Reemplazar los datos del usuario encontrado con los del activeUser
        users[userIndex] = { ...activeUser };

        // 2.Guardar el array users actualizado nuevamente en el localstorage
        localStorage.setItem('users', JSON.stringify(users));
    }

    btnlogout.click(function () {
        localStorage.removeItem('activeUser');
        window.location.href = 'login.html';
    });

    saldoActual.text(pesosSaldo(getSaldo()));
    saldoQuick.text(pesosSaldo(getSaldo()));
    nombreUsuario.text(', ' + getName());

    deposito.on('input', function () {
        let valor = $(this).val();
        let numero = parseFloat(valor);
        monto.text(pesosSaldo(numero))
    });

    formDepositar.on('submit', function (e) {
        e.preventDefault();
        const montoValor = parseFloat(deposito.val());
        const activeUser = getActiveUser();

        if (!activeUser) {
            alert('No hay usuario activo. Inicia sesión primero.');
            return;
        }
        //registrando deatos del deposito
        const fechaActual = fechaHoy();
        const nuevaTransaccion = [fechaActual, "Depósito", "-", montoValor];
        activeUser.transacciones.push(nuevaTransaccion);
        activeUser.saldo += montoValor;
        localStorage.setItem('activeUser', JSON.stringify(activeUser));
        sincronizarEnDB();
        this.reset();
        location.reload();

    })

});
$(document).ready(function () {

    const saldoActual = $('#saldoActual');
    const fechaActual = $('#fechaActual');
    const nombreUsuario = $('#txtNombreUsuario');
    const btnlogout = $('.btnDesconectar');
    const saldoQuick = $('#saldoQuick');

    function getActiveUser() {
        //transfiere datos del local storae al usuario activo
        const storedUser = localStorage.getItem('activeUser');
        if (storedUser) {
            return JSON.parse(storedUser);
        }
        return null;
    }


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
        function getTransacciones() {
        const activeUser = getActiveUser();
        if (activeUser && Array.isArray(activeUser.transacciones)) {
            return activeUser.transacciones;
        }
        return [];
    };
    function poblarHistorial() {
        const transacciones = getTransacciones();
        const tbody = $('#historial tbody');
        tbody.empty();
        transacciones.forEach(transaccion => {
            const fila = `
      <tr class="fila-transaccion">
        <td>${transaccion[0]}</td>
        <td>${transaccion[1]}</td>
        <td>${transaccion[2]}</td>
        <td>${pesosSaldo(transaccion[3])}</td>
      </tr>
    `;
            tbody.append(fila);
        });
    };
    nombreUsuario.text(getName);

    btnlogout.click(function () {
        localStorage.removeItem('activeUser');
        window.location.href = 'login.html';
    })



    saldoActual.text(pesosSaldo(getSaldo()));
    saldoQuick.text(pesosSaldo(getSaldo()))
    fechaActual.text(fechaHoy() + ':');
    nombreUsuario.text(', ' + getName())
    poblarHistorial();

});
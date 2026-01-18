$(document).ready(function () {
    const saldoActual = $('#saldoActual');
    const nombreUsuario = $('#txtNombreUsuario');
    const btnlogout = $('.btnDesconectar');
    const saldoQuick = $('#saldoQuick');
    const envio = $('#inputSend');
    const btnNuevoContacto = $('#agregarContacto');
    const formNuevoContacto = $('#formAgregar');
    const buscarContacto = $('#buscarContacto');
    let email = null;
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
    function getContactos() {
        const activeUser = getActiveUser();
        if (activeUser && Array.isArray(activeUser.contactos)) {
            return activeUser.contactos;
        }
        return [];
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

    function poblarAgenda() {
        const contactos = getContactos();
        const tbody = $('#agenda tbody');
        tbody.empty();
        contactos.forEach(contacto => {
            const fila = `
      <tr class="fila-contacto" 
      data-nombre="${contacto.nombre}"
      data-apellido="${contacto.apellido}"
      data-alias="${contacto.alias}"
      data-email="${contacto.email}">
        <td>${contacto.nombre}</td>
        <td>${contacto.apellido}</td>
        <td>${contacto.alias}</td>
        <td>${contacto.email}</td>
      </tr>
    `;
            tbody.append(fila);
        });
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

    btnNuevoContacto.on('click', function () {
        $('#modalAgregar').modal('show');
    });

    //crear nuevo contacto
    formNuevoContacto.on('submit', function (e) {
        e.preventDefault();
        const nombre = $('#nombreNuevoC').val();
        const apellido = $('#apellidoNuevoC').val();
        const alias = $('#aliasNuevoC').val();
        const email = $('#emailNuevoC').val();

        const activeUser = getActiveUser();
        const emailExiste = activeUser.contactos.some(contacto => contacto.email === email);
        //validacion para evitar contacto duplicado (solo valido por email)
        if (emailExiste) {
            alert('Ya existe un contacto con este email. Por favor, usa un email diferente.');
            return;
        }

        const nuevoContacto = {
            nombre: nombre,
            apellido: apellido,
            alias: alias,
            email: email
        };
        activeUser.contactos.push(nuevoContacto);
        localStorage.setItem('activeUser', JSON.stringify(activeUser));
        sincronizarEnDB();
        this.reset();
        location.reload();

    });

    saldoActual.text(pesosSaldo(getSaldo()));
    saldoQuick.text(pesosSaldo(getSaldo()));
    nombreUsuario.text(', ' + getName());
    poblarAgenda();

    buscarContacto.on('input', function () {
        const query = $(this).val().toLowerCase();
        const filas = $('#agenda tbody tr');
        filas.each(function () {
            const fila = $(this);
            const textoFila = fila.text().toLowerCase();
            if (query === '' || textoFila.includes(query)) {
                fila.show();
            } else {
                fila.hide();
            }
        });
    });
    //despliega modal de envio al clickar una fila
$(document).on('click', '.fila-contacto', function() {
  const nombre = $(this).data('nombre');
  const apellido = $(this).data('apellido');
  const alias = $(this).data('alias');
  email = $(this).data('email');

  $('#textoEnvio').text(`¿Transferir a ${nombre} ${apellido}, ${alias}. ${email}?`);
  envio.val('');
  $('#modalEnvio').modal('show');
});
   
$('#btnConfirmarEnvio').on('click', function() {
  const monto = parseFloat(envio.val());
  const saldo = getSaldo();
  
  // Verificar si hay saldo disponible
  if (isNaN(monto) || monto <= 0) {
    alert('Por favor, ingresa un monto válido.');
    return;
  }
  if (monto > saldo) {
    alert('Saldo insuficiente para realizar la transferencia.');
    return;
  }
  
  $('#modalEnvio').modal('hide');
          const activeUser = getActiveUser();

        if (!activeUser) {
            alert('No hay usuario activo. Inicia sesión primero.');
            return;
        }      
  //registrando deatos del deposito
        const fechaActual = fechaHoy();
        const nuevaTransaccion = [fechaActual, "Envío", email, monto];
        activeUser.transacciones.push(nuevaTransaccion);
        activeUser.saldo -= monto;
        localStorage.setItem('activeUser', JSON.stringify(activeUser));
        sincronizarEnDB();
        location.reload();
});
});
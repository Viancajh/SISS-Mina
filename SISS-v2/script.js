/* ================================================
   SISS-MINA — JavaScript v2.2
   TecNM Campus Minatitlán
   ================================================ */

/* =====================================================
   BASE DE DATOS LOCAL — localStorage
   Clave: "siss_alumnos"  →  Array de objetos alumno
   ===================================================== */

var DB_KEY = 'siss_alumnos';

/** Leer todos los alumnos */
function dbGetAlumnos() {
    try {
        return JSON.parse(localStorage.getItem(DB_KEY)) || [];
    } catch(e) { return []; }
}

/** Guardar array completo */
function dbSetAlumnos(arr) {
    localStorage.setItem(DB_KEY, JSON.stringify(arr));
}

/** Buscar alumno por número de control */
function dbBuscarAlumno(nc) {
    return dbGetAlumnos().find(function(a){ return a.nc === nc; }) || null;
}

/** Registrar nuevo alumno; devuelve {ok, msg} */
function dbRegistrar(data) {
    var alumnos = dbGetAlumnos();
    if (alumnos.find(function(a){ return a.nc === data.nc; })) {
        return { ok: false, msg: 'Ese número de control ya está registrado.' };
    }
    if (alumnos.find(function(a){ return a.correo === data.correo; })) {
        return { ok: false, msg: 'Ese correo ya está en uso.' };
    }
    data.fechaRegistro = new Date().toLocaleDateString('es-MX');
    alumnos.push(data);
    dbSetAlumnos(alumnos);
    return { ok: true, msg: 'Cuenta creada correctamente.' };
}

/** Validar login alumno; devuelve alumno o null */
function dbLoginAlumno(nc, pass) {
    var a = dbBuscarAlumno(nc);
    return (a && a.pass === pass) ? a : null;
}

/** Precargar alumnos de demostración si la BD está vacía */
(function iniciarDB() {
    if (dbGetAlumnos().length === 0) {
        dbSetAlumnos([
            { nc:'22230678', nombre:'Ana Ramírez',   correo:'22230678@minatitlan.tecnm.mx', pass:'1234', carrera:'Ingeniería en Sistemas Computacionales', fechaRegistro:'01/02/2026' },
            { nc:'22232323', nombre:'Carlos Gómez',  correo:'22232323@minatitlan.tecnm.mx', pass:'1234', carrera:'Ingeniería Industrial',                  fechaRegistro:'01/02/2026' },
        ]);
    }
})();

const NOMBRES_MES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio"];
// Periodos de entrega de reportes (mes 0-indexed, días del mes)
const periodosEntrega = [
    { mes: 2,  dias: [9,10,11,12,13],  label: "Entrega Reporte 1" },
    { mes: 4,  dias: [11,12,13,14,15], label: "Entrega Reporte 2" },
    { mes: 6,  dias: [13,14,15,16,17], label: "Entrega Reporte 3" },
];

// ---- DOCUMENTOS DEL EXPEDIENTE ----
const documentos = [
    { id: 1,  nombre: "Datos del alumno",         aprobado: false, archivado: false },
    { id: 2,  nombre: "Carta de asignación",       aprobado: false, archivado: false },
    { id: 3,  nombre: "Tarjeta de control",         aprobado: false, archivado: false },
    { id: 4,  nombre: "Control de expediente",      aprobado: false, archivado: false },
    { id: 5,  nombre: "Carta de compromiso",        aprobado: false, archivado: false },
    { id: 6,  nombre: "Plan de trabajo",            aprobado: false, archivado: false },
    { id: 7,  nombre: "Reporte 1 (160 hrs)",        aprobado: false, archivado: false },
    { id: 8,  nombre: "Reporte 2 (160 hrs)",        aprobado: false, archivado: false },
    { id: 9,  nombre: "Reporte 3 (180 hrs)",        aprobado: false, archivado: false },
    { id: 10, nombre: "Evaluación final",           aprobado: false, archivado: false },
];

// ---- DATOS ADMIN ----
const solicitudesAlfa = [
    { nc: "22230678", nombre: "Ana Ramírez",    doc: "Solicitud",    fecha: "6/02/26",  estatus: "Validado"    },
    { nc: "22232323", nombre: "Carlos Gómez",   doc: "Solicitud",    fecha: "5/02/26",  estatus: "Validado"    },
    { nc: "22230679", nombre: "Sofía Álvarez",  doc: "Plan Trabajo", fecha: "4/02/26",  estatus: "Validado"    },
    { nc: "22238920", nombre: "Gael Rosas",     doc: "Solicitud",    fecha: "4/02/26",  estatus: "En revisión" },
    { nc: "22238734", nombre: "Dai López",      doc: "Solicitud",    fecha: "3/02/26",  estatus: "Rechazado"   },
    { nc: "22239101", nombre: "Luis Herrera",   doc: "Plan Trabajo", fecha: "2/02/26",  estatus: "En revisión" },
];

const solicitudesComunidad = [
    { nc: "22241001", nombre: "María Torres",   doc: "Solicitud",    fecha: "7/02/26",  estatus: "Validado"    },
    { nc: "22241002", nombre: "Pedro Salinas",  doc: "Solicitud",    fecha: "6/02/26",  estatus: "En revisión" },
    { nc: "22241003", nombre: "Laura Pérez",    doc: "Plan Trabajo", fecha: "5/02/26",  estatus: "Validado"    },
    { nc: "22241004", nombre: "Omar Nájera",    doc: "Solicitud",    fecha: "4/02/26",  estatus: "Rechazado"   },
    { nc: "22241005", nombre: "Itzel Montoya",  doc: "Reporte 1",    fecha: "13/03/26", estatus: "En revisión" },
];

const solicitudesInterno = [
    { nc: "22242001", nombre: "Diego Ruiz",     doc: "Solicitud",    fecha: "8/02/26",  estatus: "Validado"    },
    { nc: "22242002", nombre: "Camila Vega",    doc: "Solicitud",    fecha: "7/02/26",  estatus: "En revisión" },
    { nc: "22242003", nombre: "Héctor Flores",  doc: "Plan Trabajo", fecha: "6/02/26",  estatus: "Validado"    },
    { nc: "22242004", nombre: "Renata Juárez",  doc: "Solicitud",    fecha: "5/02/26",  estatus: "En revisión" },
    { nc: "22242005", nombre: "Iván Castillo",  doc: "Reporte 1",    fecha: "13/03/26", estatus: "Rechazado"   },
    { nc: "22242006", nombre: "Fernanda Cruz",  doc: "Solicitud",    fecha: "4/02/26",  estatus: "Validado"    },
];

const docsJefe = [
    { alumno: "Ana Ramírez",   tipo: "Solicitud de Servicio Social" },
    { alumno: "Carlos Gómez",  tipo: "Plan de Trabajo" },
    { alumno: "Sofía Álvarez", tipo: "Reporte 1" },
    { alumno: "Miguel López",  tipo: "Carta de compromiso" },
];

// ---- UTILIDADES ----
function showScreen(id) {
    ['screen-login','screen-alumno','screen-admin','screen-jefe'].forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('d-none');
    });
    const t = document.getElementById(id);
    if (t) t.classList.remove('d-none');
}

function showToast(msg, type) {
    type = type || 'info';
    const toast = document.getElementById('siss-toast');
    const msgEl = document.getElementById('toast-msg');
    if (!toast || !msgEl) return;
    toast.className = 'toast align-items-center border-0 text-white bg-' + type;
    msgEl.textContent = msg;
    bootstrap.Toast.getOrCreateInstance(toast, { delay: 4000 }).show();
}

function logout() {
    showScreen('screen-login');
    showToast('Sesión cerrada correctamente.', 'info');
}

// ---- LOGIN ----
document.getElementById('form-alumno').addEventListener('submit', function(e) {
    e.preventDefault();
    var nc   = document.getElementById('alumno-nc').value.trim();
    var pass = document.getElementById('alumno-pass').value;
    if (!nc || !pass) { showToast('Ingresa número de control y contraseña.', 'danger'); return; }
    var alumno = dbLoginAlumno(nc, pass);
    if (!alumno) {
        showToast('Número de control o contraseña incorrectos.', 'danger');
        return;
    }
    var nombreMostrar = alumno.nombre || nc;
    document.getElementById('alumno-nombre').textContent = nombreMostrar;
    // Inicializar avatar con inicial
    var av = document.querySelector('#screen-alumno .user-avatar');
    if (av) av.textContent = nombreMostrar.charAt(0).toUpperCase();
    showScreen('screen-alumno');
    renderDocumentos();
    renderCalendarioCompleto();
    actualizarProgresoAutomatico();
    showToast('¡Bienvenido, ' + nombreMostrar + '!', 'success');
});

document.getElementById('form-admin').addEventListener('submit', function(e) {
    e.preventDefault();
    showScreen('screen-admin');
    renderTablaAdmin('tbody-solicitudes',  solicitudesAlfa,      'alfa');
    renderTablaAdmin('tbody-comunidad',    solicitudesComunidad, 'comunidad');
    renderTablaAdmin('tbody-interno',      solicitudesInterno,   'interno');
    renderBD();
    showToast('Acceso como Administrativo.', 'success');
});

document.getElementById('form-jefe').addEventListener('submit', function(e) {
    e.preventDefault();
    showScreen('screen-jefe');
    renderListaJefe();
    showToast('Acceso como Jefe de Departamento.', 'success');
});

document.getElementById('btn-registro').addEventListener('click', function(e) {
    e.preventDefault();
    // Limpiar errores previos
    limpiarErroresRegistro();
    new bootstrap.Modal(document.getElementById('modalRegistro')).show();
});

/** Guardar registro desde el modal */
function guardarRegistro() {
    limpiarErroresRegistro();
    var nc      = document.getElementById('reg-nc').value.trim();
    var nombre  = document.getElementById('reg-nombre').value.trim();
    var correo  = document.getElementById('reg-correo').value.trim();
    var pass    = document.getElementById('reg-pass').value;
    var pass2   = document.getElementById('reg-pass2').value;
    var carrera = document.getElementById('reg-carrera').value;

    var errores = [];
    if (!nc || nc.length < 7)         errores.push({ campo:'reg-nc',      msg:'Número de control inválido (mín. 7 dígitos).' });
    if (!nombre || nombre.length < 5) errores.push({ campo:'reg-nombre',  msg:'Ingresa tu nombre completo.' });
    if (!correo || !correo.includes('@')) errores.push({ campo:'reg-correo', msg:'Correo inválido.' });
    if (!pass || pass.length < 4)     errores.push({ campo:'reg-pass',    msg:'La contraseña debe tener al menos 4 caracteres.' });
    if (pass !== pass2)               errores.push({ campo:'reg-pass2',   msg:'Las contraseñas no coinciden.' });
    if (!carrera)                     errores.push({ campo:'reg-carrera', msg:'Selecciona una carrera.' });

    if (errores.length > 0) {
        errores.forEach(function(e) {
            var el = document.getElementById(e.campo);
            if (el) {
                el.classList.add('is-invalid');
                var fb = el.nextElementSibling;
                if (fb && fb.classList.contains('invalid-feedback')) fb.textContent = e.msg;
            }
        });
        return;
    }

    var resultado = dbRegistrar({ nc: nc, nombre: nombre, correo: correo, pass: pass, carrera: carrera });
    if (!resultado.ok) {
        showToast(resultado.msg, 'danger');
        return;
    }

    bootstrap.Modal.getInstance(document.getElementById('modalRegistro')).hide();
    showToast('✅ Cuenta creada. Ya puedes iniciar sesión con tu número de control.', 'success');
}

function limpiarErroresRegistro() {
    ['reg-nc','reg-nombre','reg-correo','reg-pass','reg-pass2','reg-carrera'].forEach(function(id){
        var el = document.getElementById(id);
        if (el) el.classList.remove('is-invalid');
    });
}

// ---- DOCUMENTOS ALUMNO ----
function renderDocumentos() {
    var container = document.getElementById('lista-documentos');
    container.innerHTML = '';
    documentos.forEach(function(doc) {
        var div = document.createElement('div');
        div.className = 'doc-item';
        div.id = 'doc-row-' + doc.id;

        // Círculo SOLO verde si admin aprobó
        var circuloCls  = doc.aprobado ? 'doc-check checked' : 'doc-check';
        var circuloTitle = doc.aprobado ? 'Documento aprobado' : 'Pendiente de aprobación por administración';

        // Botón subir desactivado si ya está archivado
        var subirExtra = doc.archivado ? ' disabled style="opacity:0.5;cursor:default"' : '';
        var badgeSubido = doc.archivado
            ? '<span class="badge-subido"><i class="fas fa-check me-1"></i>Subido</span>'
            : '';

        div.innerHTML =
            '<div class="doc-name">' +
                '<i class="fas fa-file-pdf"></i>' +
                '<span>' + doc.id + '. ' + doc.nombre + '</span>' +
                badgeSubido +
            '</div>' +
            '<div class="doc-actions">' +
                '<button class="btn-dl" onclick="descargarDoc(' + doc.id + ')">' +
                    '<i class="fas fa-download me-1"></i>Descargar' +
                '</button>' +
                '<button class="btn-up" onclick="subirDoc(' + doc.id + ')"' + subirExtra + '>' +
                    '<i class="fas fa-upload me-1"></i>Subir PDF' +
                '</button>' +
                '<i class="fas fa-check-circle ' + circuloCls + '" id="check-doc-' + doc.id + '" title="' + circuloTitle + '"></i>' +
            '</div>';
        container.appendChild(div);
    });
}

function descargarDoc(id) {
    showToast('Descargando: ' + documentos[id-1].nombre + '...', 'info');
}

function subirDoc(id) {
    var doc = documentos[id-1];
    if (doc.archivado) return;
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = function() {
        if (input.files.length > 0) {
            doc.archivado = true;
            renderDocumentos();
            showToast('"' + doc.nombre + '" subido. En espera de revisión del administrador.', 'info');
            // EL CÍRCULO NO SE PONE VERDE AQUÍ — solo cuando el admin aprueba
        }
    };
    input.click();
}

// ---- PROGRESO AUTOMÁTICO ----
function actualizarProgresoAutomatico() {
    var aprobados = documentos.filter(function(d){ return d.aprobado; }).length;
    var total = documentos.length;
    var pct = Math.round((aprobados / total) * 100);

    // Horas calculadas automáticamente según aprobaciones
    var horas = 0;
    if (aprobados >= 9)      horas = 500;
    else if (aprobados >= 7) horas = 320;
    else if (aprobados >= 4) horas = 160;
    else                     horas = Math.round((aprobados / 4) * 159);

    document.getElementById('pct-completado').textContent = pct + '%';
    document.getElementById('progress-bar').style.width = pct + '%';
    document.getElementById('horas-display').textContent = horas + ' / 500 hrs';

    actualizarCardReporte('card-r1', 'status-r1', horas >= 160);
    actualizarCardReporte('card-r2', 'status-r2', horas >= 320);
    actualizarCardReporte('card-r3', 'status-r3', horas >= 500);
    actualizarSemaforo(horas);

    var nota = document.getElementById('nota-progreso');
    if (nota) {
        nota.textContent = aprobados === 0
            ? 'Tu progreso se actualizará automáticamente cuando el administrador apruebe tus documentos.'
            : aprobados + ' de ' + total + ' documentos aprobados por administración.';
    }
}

function actualizarCardReporte(cardId, statusId, completado) {
    var card   = document.getElementById(cardId);
    var status = document.getElementById(statusId);
    if (!card || !status) return;
    if (completado) {
        card.classList.add('done'); card.classList.remove('active');
        status.textContent = '✓ Completado';
        status.style.background = '#d4edda'; status.style.color = '#155724';
    } else {
        card.classList.remove('done');
        status.textContent = 'Pendiente';
        status.style.background = ''; status.style.color = '';
    }
}

function actualizarSemaforo(horas) {
    var rojo     = document.querySelector('.sem-rojo');
    var amarillo = document.querySelector('.sem-amarillo');
    var verde    = document.querySelector('.sem-verde');
    if (!rojo) return;
    rojo.classList.remove('active');
    amarillo.classList.remove('active');
    verde.classList.remove('active');
    if (horas < 160)      rojo.classList.add('active');
    else if (horas < 320) { rojo.classList.add('active'); amarillo.classList.add('active'); }
    else                  { rojo.classList.add('active'); amarillo.classList.add('active'); verde.classList.add('active'); }
}

// ---- CALENDARIO: un mes a la vez con flechas ----
var calMesActual = 2; // Empieza en Marzo (0=Ene ... 6=Jul)
var CAL_MES_MIN = 0;  // Enero
var CAL_MES_MAX = 6;  // Julio

function renderCalendarioCompleto() {
    renderMes(calMesActual);
}

function calCambiarMes(delta) {
    var nuevo = calMesActual + delta;
    if (nuevo < CAL_MES_MIN || nuevo > CAL_MES_MAX) return;
    calMesActual = nuevo;
    renderMes(calMesActual);
}

function renderMes(mesIdx) {
    // Actualizar título
    var titulo = document.getElementById('cal-mes-titulo');
    if (titulo) titulo.textContent = NOMBRES_MES[mesIdx] + ' 2026';

    // Deshabilitar flechas en los límites
    var btnPrev = document.querySelector('[onclick="calCambiarMes(-1)"]');
    var btnNext = document.querySelector('[onclick="calCambiarMes(1)"]');
    if (btnPrev) btnPrev.disabled = (mesIdx <= CAL_MES_MIN);
    if (btnNext) btnNext.disabled = (mesIdx >= CAL_MES_MAX);

    // Periodo de entrega de este mes
    var periodoMes = null;
    for (var p = 0; p < periodosEntrega.length; p++) {
        if (periodosEntrega[p].mes === mesIdx) { periodoMes = periodosEntrega[p]; break; }
    }

    var container = document.getElementById('mini-calendar');
    container.innerHTML = '';

    var grid = document.createElement('div');
    grid.className = 'cal-grid';

    // Cabeceras días
    ['D','L','M','X','J','V','S'].forEach(function(d) {
        var dh = document.createElement('div');
        dh.className = 'cal-day-header';
        dh.textContent = d;
        grid.appendChild(dh);
    });

    var primero = new Date(2026, mesIdx, 1).getDay();
    var diasMes = new Date(2026, mesIdx + 1, 0).getDate();

    for (var blank = 0; blank < primero; blank++) {
        grid.appendChild(document.createElement('div'));
    }

    for (var d = 1; d <= diasMes; d++) {
        var cell = document.createElement('div');
        cell.className = 'cal-day';
        var esHoy     = (mesIdx === 2 && d === 14);
        var esEntrega = periodoMes && periodoMes.dias.indexOf(d) !== -1;
        if (esHoy)     cell.classList.add('today');
        if (esEntrega) { cell.classList.add('entrega-periodo'); cell.title = periodoMes.label; }
        cell.textContent = d;
        grid.appendChild(cell);
    }
    container.appendChild(grid);

    // Nota de entrega abajo del grid
    var nota = document.getElementById('cal-nota-entrega');
    if (nota) {
        if (periodoMes) {
            nota.style.display = 'block';
            nota.innerHTML = '<i class="fas fa-calendar-check me-1"></i>' +
                periodoMes.label + ': días ' +
                periodoMes.dias[0] + '–' + periodoMes.dias[periodoMes.dias.length - 1];
        } else {
            nota.style.display = 'none';
        }
    }
}

// ---- NOTIFICACIONES ----
function toggleNotifications() {
    var panel = document.getElementById('notif-panel');
    if (!panel) return;
    panel.classList.toggle('d-none');
    if (!panel.classList.contains('d-none')) {
        document.getElementById('notif-count').textContent = '0';
    }
}

document.addEventListener('click', function(e) {
    var panel = document.getElementById('notif-panel');
    if (panel && !panel.classList.contains('d-none')) {
        if (!panel.contains(e.target) && !e.target.closest('.notif-bell')) {
            panel.classList.add('d-none');
        }
    }
});

// ---- TABLAS ADMIN ----
function renderTablaAdmin(tbodyId, data, tabKey) {
    var tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    tbody.innerHTML = '';
    data.forEach(function(row, i) {
        var badgeCls = 'badge-revision';
        if (row.estatus === 'Validado')  badgeCls = 'badge-validado';
        if (row.estatus === 'Rechazado') badgeCls = 'badge-rechazado';
        var tr = document.createElement('tr');
        tr.setAttribute('data-nombre', row.nombre.toLowerCase());
        tr.setAttribute('data-estatus', row.estatus);
        tr.innerHTML =
            '<td data-label="No. Control"><code>' + row.nc + '</code></td>' +
            '<td data-label="Nombre" class="fw-semibold">' + row.nombre + '</td>' +
            '<td data-label="Documento">' + row.doc + '</td>' +
            '<td data-label="Fecha">' + row.fecha + '</td>' +
            '<td data-label="Estatus"><span class="badge-status ' + badgeCls + '" id="badge-' + tabKey + '-' + i + '">' + row.estatus + '</span></td>' +
            '<td data-label="Acciones">' +
                '<button class="btn-aprobar me-1" onclick="aprobarFila(\'' + tabKey + '\',' + i + ',this)">' +
                    '<i class="fas fa-check me-1"></i>Aprobar' +
                '</button>' +
                '<button class="btn-rechazar" onclick="abrirRechazo(\'' + tabKey + '\',' + i + ')">' +
                    '<i class="fas fa-times me-1"></i>Rechazar' +
                '</button>' +
            '</td>';
        tbody.appendChild(tr);
    });
}

// ---- BASE DE DATOS ALUMNOS (vista admin) ----
function renderBD() {
    var tbody = document.getElementById('tbody-bd');
    var totalEl = document.getElementById('bd-total');
    if (!tbody) return;
    var alumnos = dbGetAlumnos();
    if (totalEl) totalEl.textContent = alumnos.length + ' alumno(s) registrado(s)';
    tbody.innerHTML = '';
    if (alumnos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No hay alumnos registrados aún.</td></tr>';
        return;
    }
    alumnos.forEach(function(a) {
        var tr = document.createElement('tr');
        tr.setAttribute('data-buscar', (a.nc + ' ' + (a.nombre || '')).toLowerCase());
        tr.innerHTML =
            '<td data-label="No. Control"><code>' + a.nc + '</code></td>' +
            '<td data-label="Nombre" class="fw-semibold">' + (a.nombre || '—') + '</td>' +
            '<td data-label="Correo"><small>' + (a.correo || '—') + '</small></td>' +
            '<td data-label="Carrera"><small>' + (a.carrera || '—') + '</small></td>' +
            '<td data-label="Registro"><small>' + (a.fechaRegistro || '—') + '</small></td>';
        tbody.appendChild(tr);
    });
}

function filtrarBD(v) {
    var val = v.toLowerCase();
    document.querySelectorAll('#tbody-bd tr').forEach(function(tr) {
        var d = tr.getAttribute('data-buscar') || '';
        tr.style.display = d.includes(val) ? '' : 'none';
    });
}

function filtrarTabla(v)          { filtrarTablaGen('tbody-solicitudes', v); }
function filtrarEstatus(v)        { filtrarEstatusGen('tbody-solicitudes', v); }

function filtrarTablaGen(tbodyId, valor) {
    document.querySelectorAll('#' + tbodyId + ' tr').forEach(function(tr) {
        var n = tr.getAttribute('data-nombre') || '';
        tr.style.display = n.includes(valor.toLowerCase()) ? '' : 'none';
    });
}

function filtrarEstatusGen(tbodyId, valor) {
    document.querySelectorAll('#' + tbodyId + ' tr').forEach(function(tr) {
        var e = tr.getAttribute('data-estatus') || '';
        tr.style.display = (!valor || e === valor) ? '' : 'none';
    });
}

// ---- APROBAR / RECHAZAR ----
var rechazoTabKey = '', rechazoIdx = -1;

function aprobarFila(tabKey, idx, btn) {
    var badge = document.getElementById('badge-' + tabKey + '-' + idx);
    if (badge) {
        badge.className = 'badge-status badge-validado';
        badge.textContent = 'Validado';
        btn.closest('tr').setAttribute('data-estatus', 'Validado');
    }

    // Si es la pestaña Alfa, marcar el documento del alumno como aprobado
    // y poner el círculo verde automáticamente
    if (tabKey === 'alfa' && idx < documentos.length) {
        documentos[idx].aprobado = true;
        var checkIcon = document.getElementById('check-doc-' + (idx + 1));
        if (checkIcon) {
            checkIcon.classList.add('checked');
            checkIcon.title = 'Documento aprobado por administración';
        }
        actualizarProgresoAutomatico();
    }

    var listas = { alfa: solicitudesAlfa, comunidad: solicitudesComunidad, interno: solicitudesInterno };
    var nombre = listas[tabKey] ? listas[tabKey][idx].nombre : 'Alumno';
    showToast('Solicitud de ' + nombre + ' aprobada.', 'success');
}

function abrirRechazo(tabKey, idx) {
    rechazoTabKey = tabKey;
    rechazoIdx = idx;
    document.getElementById('rechazo-texto').value = '';
    new bootstrap.Modal(document.getElementById('modalRechazo')).show();
}

document.getElementById('btn-confirmar-rechazo').addEventListener('click', function() {
    var motivo = document.getElementById('rechazo-texto').value.trim();
    if (!motivo) { showToast('Escribe un motivo de rechazo.', 'danger'); return; }
    bootstrap.Modal.getInstance(document.getElementById('modalRechazo')).hide();

    var badge = document.getElementById('badge-' + rechazoTabKey + '-' + rechazoIdx);
    if (badge) {
        badge.className = 'badge-status badge-rechazado';
        badge.textContent = 'Rechazado';
        var tr = badge.closest('tr');
        if (tr) tr.setAttribute('data-estatus', 'Rechazado');
    }

    var listas = { alfa: solicitudesAlfa, comunidad: solicitudesComunidad, interno: solicitudesInterno };
    var nombre = listas[rechazoTabKey] ? listas[rechazoTabKey][rechazoIdx].nombre : 'Alumno';
    showToast('Solicitud de ' + nombre + ' rechazada. Motivo enviado al alumno.', 'danger');
});

// ---- PANEL JEFE ----
function renderListaJefe() {
    var container = document.getElementById('lista-espera-jefe');
    if (!container) return;
    container.innerHTML = '';
    docsJefe.forEach(function(item, i) {
        var div = document.createElement('div');
        div.className = 'lista-espera-item';
        div.innerHTML =
            '<div>' +
                '<div class="doc-info">' + item.alumno + '</div>' +
                '<div class="doc-type">' + item.tipo + '</div>' +
            '</div>' +
            '<i class="fas fa-chevron-right text-muted"></i>';
        div.addEventListener('click', function(){ seleccionarDoc(i, div, item); });
        container.appendChild(div);
    });
}

function seleccionarDoc(idx, el, item) {
    document.querySelectorAll('.lista-espera-item').forEach(function(d){ d.classList.remove('selected'); });
    el.classList.add('selected');

    document.getElementById('doc-preview').innerHTML =
        '<div class="doc-preview-content">' +
            '<div class="d-flex align-items-center gap-2 mb-3">' +
                '<img src="logo-tecnm.png" style="height:36px;" alt="TecNM">' +
                '<div>' +
                    '<div class="fw-bold" style="font-size:0.85rem;color:var(--blue-dark)">TECNM CAMPUS MINATITLÁN</div>' +
                    '<div class="text-muted small">' + item.tipo + '</div>' +
                '</div>' +
            '</div>' +
            '<hr>' +
            '<p class="small mb-1"><strong>Alumno:</strong> ' + item.alumno + '</p>' +
            '<p class="small mb-1"><strong>Periodo:</strong> Enero – Julio 2026</p>' +
            '<p class="small mb-3"><strong>Documento:</strong> ' + item.tipo + '</p>' +
            '<div style="height:60px;background:#f0f2f5;border-radius:8px;display:flex;align-items:center;justify-content:center;">' +
                '<span class="text-muted small">[ Contenido del documento ]</span>' +
            '</div>' +
            '<div class="mt-3 text-end"><span class="badge bg-warning text-dark">Pendiente de firma</span></div>' +
        '</div>';

    var firmaPanel = document.getElementById('firma-panel');
    firmaPanel.classList.remove('d-none');

    var btn = document.getElementById('btn-firmar');
    btn.innerHTML = '<i class="fas fa-signature me-2"></i>Firmar y Sellar Digitalmente';
    btn.style.background = ''; btn.disabled = false;
    document.getElementById('qr-display').innerHTML =
        '<i class="fas fa-qrcode fa-3x"></i><div class="small mt-1">Se generará al firmar</div>';
    initFirmaCanvas();
}

// ---- FIRMA CANVAS ----
var isDrawing = false, firmaCtx = null;

function initFirmaCanvas() {
    var canvas = document.getElementById('firma-canvas');
    if (!canvas) return;
    firmaCtx = canvas.getContext('2d');
    firmaCtx.clearRect(0, 0, canvas.width, canvas.height);
    firmaCtx.strokeStyle = '#1b396a'; firmaCtx.lineWidth = 2; firmaCtx.lineCap = 'round';

    canvas.onmousedown  = function(e){ isDrawing=true; firmaCtx.beginPath(); firmaCtx.moveTo(getPos(e,canvas).x,getPos(e,canvas).y); };
    canvas.onmousemove  = function(e){ if(!isDrawing)return; firmaCtx.lineTo(getPos(e,canvas).x,getPos(e,canvas).y); firmaCtx.stroke(); };
    canvas.onmouseup    = function(){ isDrawing=false; };
    canvas.onmouseleave = function(){ isDrawing=false; };
    canvas.ontouchstart = function(e){ e.preventDefault(); isDrawing=true; firmaCtx.beginPath(); var t=e.touches[0]; firmaCtx.moveTo(getPos(t,canvas).x,getPos(t,canvas).y); };
    canvas.ontouchmove  = function(e){ e.preventDefault(); if(!isDrawing)return; var t=e.touches[0]; firmaCtx.lineTo(getPos(t,canvas).x,getPos(t,canvas).y); firmaCtx.stroke(); };
    canvas.ontouchend   = function(){ isDrawing=false; };
}

function getPos(e, canvas) {
    var rect = canvas.getBoundingClientRect();
    return { x:(e.clientX-rect.left)*(canvas.width/rect.width), y:(e.clientY-rect.top)*(canvas.height/rect.height) };
}

function clearFirma() {
    var c = document.getElementById('firma-canvas');
    if (firmaCtx && c) firmaCtx.clearRect(0,0,c.width,c.height);
}

function firmarDocumento() {
    var canvas = document.getElementById('firma-canvas');
    if (!canvas || !firmaCtx) return;
    var data = firmaCtx.getImageData(0,0,canvas.width,canvas.height).data;
    var hasFirma = false;
    for (var i=0;i<data.length;i++){ if(data[i]!==0){ hasFirma=true; break; } }
    if (!hasFirma) { showToast('Por favor dibuja tu firma antes de sellar.', 'danger'); return; }

    var codigo = 'SISS-' + Math.random().toString(36).substr(2,8).toUpperCase();
    document.getElementById('qr-display').innerHTML =
        '<div style="background:white;padding:8px;border-radius:6px;border:1px solid #dee2e6;">' +
            '<svg viewBox="0 0 60 60" width="80" xmlns="http://www.w3.org/2000/svg">' + generarQRSVG() + '</svg>' +
            '<div style="font-size:0.6rem;word-break:break-all;color:#555;margin-top:4px">' + codigo + '</div>' +
        '</div>';

    showToast('Documento firmado y sellado. Código: ' + codigo, 'success');
    var btn = document.getElementById('btn-firmar');
    btn.innerHTML = '<i class="fas fa-check-double me-2"></i>¡Documento Firmado!';
    btn.style.background = 'var(--success)'; btn.disabled = true;

    setTimeout(function(){
        var sel = document.querySelector('.lista-espera-item.selected');
        if (sel) { sel.style.transition='opacity 0.3s'; sel.style.opacity='0'; setTimeout(function(){sel.remove();},300); }
    }, 1600);
}

function generarQRSVG() {
    var pat = [[1,1,1,1,1,1,1,0,1,0,0,0,1,0,1,1,1,1,1,1,1],[1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],[1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],[1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1],[1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,0,1],[1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],[1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1]];
    var svg = '';
    for (var r=0;r<7;r++) for (var c=0;c<21;c++) if(pat[r][c]) svg+='<rect x="'+(c*2.85)+'" y="'+(r*2.85)+'" width="2.85" height="2.85" fill="#1b396a"/>';
    for (var r=8;r<20;r++) for (var c=0;c<21;c++) if(Math.random()>0.5) svg+='<rect x="'+(c*2.85)+'" y="'+(r*2.85)+'" width="2.85" height="2.85" fill="#1b396a"/>';
    return svg;
}

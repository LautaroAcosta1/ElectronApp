function agregarCliente() {
    // obtiene el nombre del cliente
    const nombreCliente = document.getElementById('nombre').value;
    if (nombreCliente.trim() === '') {
        alert('Por favor ingresa el nombre del cliente.');
        return;
    }

    // crea un nuevo cliente
    const cliente = document.createElement('div');
    cliente.className = 'containerCliente';

    // crea un span para el nombre del cliente
    const nombreSpan = document.createElement('span');
    nombreSpan.className = 'nombreCliente';
    nombreSpan.textContent = nombreCliente;
    cliente.appendChild(nombreSpan);

    // crea un contenedor para los botones
    const botonesContainer = document.createElement('div');
    botonesContainer.className = 'containerBotones';

    // crea un botón para eliminar el cliente
    const botonEliminar = document.createElement('button');
    botonEliminar.className = 'btnEliminar';
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = () => {
        cliente.remove();
        listaProductos.remove();
        eliminarCliente(nombreCliente);
    };

    // crea un botón para ver detalles del cliente
    const botonVerDetalles = document.createElement('button');
    botonVerDetalles.className = 'btnVerDetalles';
    botonVerDetalles.textContent = 'Ver Detalles';
    botonVerDetalles.onclick = () => {
        mostrarDetallesCliente(nombreCliente, productos);
    };

    // agrega los botones al contenedor de botones
    botonesContainer.appendChild(botonEliminar);
    botonesContainer.appendChild(botonVerDetalles);

    // agrega el contenedor de botones al div del cliente
    cliente.appendChild(botonesContainer);

    // obtiene los nombres de los productos y sus precios
    const productos = [];
    for (let i = 1; i <= 6; i++) {
        const nombreProducto = document.getElementById(`producto${i}`).value;
        const precioProducto = document.getElementById(`precio${i}`).value;
        if (nombreProducto.trim() !== '' && precioProducto.trim() !== '') {
            productos.push({ nombre: nombreProducto, precio: parseFloat(precioProducto), tachado: false });
        }
    }

    // crea la lista de productos y sus precios
    const listaProductos = document.createElement('div');
    listaProductos.className = 'listaProductos';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.textContent = `Producto: ${producto.nombre} - Precio: ${producto.precio}`;
        listaProductos.appendChild(productoDiv);
    });

    // agrega el nuevo cliente a la lista
    const listaClientes = document.getElementById('lista');
    listaClientes.appendChild(cliente);

    // limpia los inputs
    document.getElementById('nombre').value = '';
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`producto${i}`).value = '';
        document.getElementById(`precio${i}`).value = '';
    }

    guardarClientes();  // guarda el estado actual de los clientes en el localStorage
}


function mostrarDetallesCliente(nombreCliente, productos) {
     // actualiza el título de los detalles del cliente con el nombre del cliente seleccionado
    const tituloDetalle = document.getElementById('tituloDetalle');
    tituloDetalle.innerHTML = `<h1>${nombreCliente}</h1>`;

     // genera los detalles del cliente,los productos y sus precios
    const detalleContenido = document.getElementById('detalleContenido');
    detalleContenido.innerHTML = `
        <ul>
            ${productos.map((p, index) => 
                `<li data-index="${index}" style="${p.tachado ? 'background-color: rgba(0, 0, 0, 0.1); text-decoration: line-through;' : ''}">
                    ${p.nombre} - <mark>$${p.precio.toFixed(2)}</mark>
                </li>`
            ).join('')}
        </ul>
    `;

    // obtiene todos los elementos <li> que representan los productos
    const items = detalleContenido.getElementsByTagName('li');

    // calcula el precio total de los productos, excluyendo aquellos que están tachados
    let precioTotal = productos.reduce((total, p) => p.tachado ? total : total + p.precio, 0);

    // crea un div para mostrar el total de los productos y lo agrega al contenido de detalles
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total';
    totalDiv.innerHTML = `<strong>Total: $${precioTotal.toFixed(2)}</strong>`;
    detalleContenido.appendChild(totalDiv);

    // agrega un evento click a cada producto para poder tacharlo y actualizar el total
    for (let i = 0; i < items.length; i++) {
        items[i].onclick = function() {
            const index = this.getAttribute('data-index');  // obtiene el índice del producto
            const producto = productos[index];
            if (producto.tachado) {
                this.style.backgroundColor = '';
                this.style.textDecoration = '';
                precioTotal += producto.precio;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                this.style.textDecoration = 'line-through';
                precioTotal -= producto.precio;
            }
            producto.tachado = !producto.tachado;   // invierte el estado tachado del producto
            totalDiv.innerHTML = `<strong>Total: $${precioTotal.toFixed(2)}</strong>`;
            guardarClientes();  // guarda el estado actual de los clientes en el localStorage
        };
    }

    // muestra la pestania de detalles del cliente
    const detalleCliente = document.getElementById('detalleCliente');
    detalleCliente.style.display = 'block';
}


function cerrarPestania() {
    // oculta la pestania de detalles del cliente
    const detalleCliente = document.getElementById('detalleCliente');
    detalleCliente.style.display = 'none';
}


function guardarClientes() {
    const clientes = [];
    const listaClientes = document.getElementById('lista').children;

    // recorre los clientes y sus productos, guardando su estado actual
    for (let i = 0; i < listaClientes.length; i += 2) {
        const clienteDiv = listaClientes[i];
        const nombreCliente = clienteDiv.querySelector('.nombreCliente').textContent;
        const listaProductosDiv = listaClientes[i + 1];
        const productosDivs = listaProductosDiv.getElementsByClassName('producto');
        const productos = [];

        for (let j = 0; j < productosDivs.length; j++) {
            const productoDiv = productosDivs[j];
            const productoText = productoDiv.textContent.split(' - Precio: $');
            const nombreProducto = productoText[0].replace('Producto: ', '');
            const precioProducto = parseFloat(productoText[1]);

            // agrega el producto a la lista con su estado tachado
            productos.push({ nombre: nombreProducto, precio: precioProducto, tachado: productoDiv.style.textDecoration === 'line-through' });
        }
        // agrega el cliente a la lista de clientes con sus productos
        clientes.push({ nombre: nombreCliente, productos });
    }
    // guarda la lista de clientes en el localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes));
}


function cargarClientes() {
    // obtiene la lista de clientes desde el localStorage y la parsea
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');

    // recorre cada cliente en la lista
    clientes.forEach(cliente => {
        // crea un contenedor para el cliente
        const clienteDiv = document.createElement('div');
        clienteDiv.className = 'containerCliente';

        // crea un span para el nombre del cliente y lo agrega al contenedor
        const nombreSpan = document.createElement('span');
        nombreSpan.className = 'nombreCliente';
        nombreSpan.textContent = cliente.nombre;
        clienteDiv.appendChild(nombreSpan);

        // crea un contenedor para los botones
        const botonesContainer = document.createElement('div');
        botonesContainer.className = 'containerBotones';

        // crea un boton para eliminar el cliente
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btnEliminar';
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => {
            clienteDiv.remove();
            listaProductos.remove();
            eliminarCliente(cliente.nombre);
        };

        // crea un boton para ver los detalles del cliente
        const botonVerDetalles = document.createElement('button');
        botonVerDetalles.className = 'btnVerDetalles';
        botonVerDetalles.textContent = 'Ver Detalles';
        botonVerDetalles.onclick = () => {
            mostrarDetallesCliente(cliente.nombre, cliente.productos);
        };

        // agrega los botones al contenedor de botones
        botonesContainer.appendChild(botonEliminar);
        botonesContainer.appendChild(botonVerDetalles);
        // agrega el contenedor de botones al contenedor del cliente
        clienteDiv.appendChild(botonesContainer);

        // crea un contenedor para la lista de productos del cliente
        const listaProductos = document.createElement('div');
        listaProductos.className = 'listaProductos';

        // recorre cada producto del cliente
        cliente.productos.forEach(producto => {
            // crea un div para cada producto y lo agrega al contenedor de productos
            const productoDiv = document.createElement('div');
            productoDiv.className = 'producto';
            productoDiv.textContent = `Producto: ${producto.nombre} - Precio: ${producto.precio.toFixed(2)}`;
            if (producto.tachado) {
                productoDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                productoDiv.style.textDecoration = 'line-through';
            }
            listaProductos.appendChild(productoDiv);
        });

        // agrega el contenedor del cliente y su lista de productos a la lista en el DOM
        const listaClientes = document.getElementById('lista');
        listaClientes.appendChild(clienteDiv);
        listaClientes.appendChild(listaProductos);
    });
}


function eliminarCliente(nombreCliente) {
    // obtiene la lista de clientes desde el localStorage y la parsea
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
    // filtra la lista para eliminar el cliente especificado
    const clientesActualizados = clientes.filter(cliente => cliente.nombre !== nombreCliente);
    // guarda la lista actualizada en el localStorage
    localStorage.setItem('clientes', JSON.stringify(clientesActualizados));
}

// agrega un evento que carga los clientes desde el localStorage cuando el DOM fue completamente cargado
document.addEventListener('DOMContentLoaded', cargarClientes);


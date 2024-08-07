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
    cliente.textContent = `${nombreCliente}`;

    // crea un span para el nombre del cliente
    const nombreSpan = document.createElement('span');
    nombreSpan.className = 'nombreCliente';
    nombreSpan.textContent = `${nombreCliente}`;
    
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
    };

    // crea un botón para ver detalles del cliente
    const botonVerDetalles = document.createElement('button');
    botonVerDetalles.className = 'btnVerDetalles';
    botonVerDetalles.textContent = 'Ver Detalles';
    botonVerDetalles.onclick = () => {
        mostrarDetallesCliente(nombreCliente, productos);
    };

    // añade los botones al contenedor de botones
    botonesContainer.appendChild(botonEliminar);
    botonesContainer.appendChild(botonVerDetalles);

    // añade el contenedor de botones al div del cliente
    cliente.appendChild(botonesContainer);

    // obtiene los nombres de los productos y sus precios
    const productos = [];
    for (let i = 1; i <= 6; i++) {
        const nombreProducto = document.getElementById(`producto${i}`).value;
        const precioProducto = document.getElementById(`precio${i}`).value;
        if (nombreProducto.trim() !== '' && precioProducto.trim() !== '') {
            productos.push({ nombre: nombreProducto, precio: parseFloat(precioProducto) });
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

    // agrega el nuevo cliente y su lista de productos a la lista
    const listaClientes = document.getElementById('lista');
    listaClientes.appendChild(cliente);

    // limpia los inputs
    document.getElementById('nombre').value = '';
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`producto${i}`).value = '';
        document.getElementById(`precio${i}`).value = '';
    }
}


function mostrarDetallesCliente(nombreCliente, productos) {
    const tituloDetalle = document.getElementById('tituloDetalle');
    tituloDetalle.innerHTML = `<h1> ${nombreCliente} </h1>`
    const detalleContenido = document.getElementById('detalleContenido');
    detalleContenido.innerHTML = `${productos.map(p => `<ul><li>${p.nombre} - <mark>$${p.precio.toFixed(2)}</mark></li>`).join('')}</ul>`;

    const items = detalleContenido.getElementsByTagName('li');
    let precioTotal = productos.reduce((total, p) => total += p.precio, 0);

    const totalDiv = document.createElement('div');
    totalDiv.className = 'total';
    totalDiv.innerHTML = `<strong>Total: $${precioTotal.toFixed(2)}</strong>`;
    detalleContenido.appendChild(totalDiv);

    for (let i = 0; i < items.length; i++) {
        items[i].onclick = function() {
            const producto = productos[i];
            if (this.style.backgroundColor === 'rgba(0, 0, 0, 0.1)') {
                this.style.backgroundColor = '';
                this.style.textDecoration = '';
                precioTotal += producto.precio;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                this.style.textDecoration = 'line-through';
                precioTotal -= producto.precio;
            }
            totalDiv.innerHTML = `<strong>Total: $${precioTotal.toFixed(2)}</strong>`;
        };
    }

    const detalleCliente = document.getElementById('detalleCliente');
    detalleCliente.style.display = 'block';
}


function cerrarPestania() {
    const detalleCliente = document.getElementById('detalleCliente');
    detalleCliente.style.display = 'none';
}

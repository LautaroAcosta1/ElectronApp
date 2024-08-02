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
        alert(`Cliente: ${nombreCliente}\nProductos: ${productos.map(p => `${p.nombre} - Precio: ${p.precio}`).join('\n')}`);
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
            productos.push({ nombre: nombreProducto, precio: precioProducto });
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
    //listaClientes.appendChild(listaProductos);                            // no quiero que se vea el producto o precio en la lista de clientes

    // limpia los inputs
    document.getElementById('nombre').value = '';
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`producto${i}`).value = '';
        document.getElementById(`precio${i}`).value = '';
    }
}

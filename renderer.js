function agregarCliente() {
    // obtiene el nombre del cliente
    const nombreCliente = document.getElementById('nombre').value;
    if (nombreCliente.trim() === '') {
        alert('Por favor ingresa el nombre del cliente.');
        return;
    }

    // crea un nuevo cliente
    const cliente = document.createElement('button');
    cliente.className = 'containerCliente';
    cliente.textContent = `${nombreCliente}`;

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

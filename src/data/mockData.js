const CLAVE_INVENTARIO = 'inventarioHobic';

export const PRODUCTOS_SEED = [
    {
        id: 'prod-001',
        slug: 'dune',
        nombre: 'Dune (Edición Especial)',
        categoria: 'libros',
        precio: 15990,
        precioAnterior: 18990,
        descuento: 16,
        stock: 15,
        stockCritico: 5,
        imagen: '/imagenes/dune.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Autor', valor: 'Frank Herbert' },
            attr2: { etiqueta: 'Editorial', valor: 'Penguin Random House' },
            attr3: { etiqueta: 'Páginas', valor: '700' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'Dune es una novela épica de ciencia ficción escrita por Frank Herbert en 1965. Ambientada en un futuro lejano dentro de un imperio galáctico feudal, la historia sigue al joven Paul Atreides mientras su familia toma el control del peligroso y desértico planeta Arrakis, la única fuente de la valiosa especia melange.',
    },
    {
        id: 'prod-002',
        slug: 'senor-de-los-anillos',
        nombre: 'El Señor de los Anillos',
        categoria: 'libros',
        precio: 19990,
        precioAnterior: 25990,
        descuento: 23,
        stock: 12,
        stockCritico: 5,
        imagen: '/imagenes/sdla.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Autor', valor: 'J.R.R. Tolkien' },
            attr2: { etiqueta: 'Editorial', valor: 'Minotauro' },
            attr3: { etiqueta: 'Páginas', valor: '488' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'En la adormecida e idílica Comarca, un joven hobbit recibe un encargo: custodiar el Anillo Único y emprender el viaje para su destrucción en la Grieta del Destino. Acompañado por magos, hombres, elfos y enanos, atravesará la Tierra Media y se internará en las sombras de Mordor, perseguido siempre por las huestes de Sauron, el Señor Oscuro.',
    },
    {
        id: 'prod-003',
        slug: 'spy-x-family-vol-1',
        nombre: 'Spy x Family Vol. 1',
        categoria: 'mangas',
        precio: 19790,
        precioAnterior: 29990,
        descuento: 34,
        stock: 20,
        stockCritico: 5,
        imagen: '/imagenes/Spy.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Tipo', valor: 'Manga' },
            attr2: { etiqueta: 'Volumen', valor: '1' },
            attr3: { etiqueta: 'Páginas', valor: '200' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'Spy × Family es una exitosa serie de manga escrita e ilustrada por Tatsuya Endō, adaptada a un popular anime, que sigue a un gran espía obligado a crear una familia falsa compuesta por una telépata y una asesina a sueldo, quienes ocultan sus identidades reales mientras fingen ser un hogar normal.',
    },
    {
        id: 'prod-004',
        slug: 'your-name-vol-3',
        nombre: 'Your Name Vol. 3',
        categoria: 'mangas',
        precio: 15990,
        precioAnterior: 18990,
        descuento: 16,
        stock: 8,
        stockCritico: 5,
        imagen: '/imagenes/YourName.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Autor', valor: 'Makoto Shinkai' },
            attr2: { etiqueta: 'Volumen', valor: '3' },
            attr3: { etiqueta: 'Páginas', valor: '168' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'Your Name (Kimi no Na wa) adapta la famosa película de anime de Makoto Shinkai. Narra la vida de Mitsuha, una joven de un pueblo rural, y Taki, un estudiante en Tokio, quienes de forma extraña intercambian cuerpos al dormir, creando un fuerte vínculo antes de un peligroso encuentro con un cometa.',
    },
    {
        id: 'prod-005',
        slug: 'samurai-x',
        nombre: 'Samurai X',
        categoria: 'series',
        precio: 19790,
        precioAnterior: 29990,
        descuento: 34,
        stock: 10,
        stockCritico: 5,
        imagen: '/imagenes/samurai.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Autor', valor: 'Nobuhiro Watsuki' },
            attr2: { etiqueta: 'Editorial', valor: 'Panini Comics' },
            attr3: { etiqueta: 'Capítulos', valor: '95' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'Samurái X (cuyo nombre original es Rurouni Kenshin) es una serie de manga y anime creada por Nobuhiro Watsuki que narra la historia de Kenshin Himura, un antiguo y temido asesino a sueldo conocido como Hitokiri Battōsai durante la revolución del periodo Bakumatsu.',
    },
    {
        id: 'prod-006',
        slug: 'neon-genesis-evangelion',
        nombre: 'Neon Genesis Evangelion',
        categoria: 'series',
        precio: 15990,
        precioAnterior: 18990,
        descuento: 16,
        stock: 6,
        stockCritico: 5,
        imagen: '/imagenes/evangelion.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Autor', valor: 'Hideaki Anno' },
            attr2: { etiqueta: 'Editorial', valor: 'Norma Editorial' },
            attr3: { etiqueta: 'Capítulos', valor: '26' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'Neon Genesis Evangelion es una serie de anime japonesa de ciencia ficción y drama psicológico creada por el estudio Gainax y dirigida por Hideaki Anno, estrenada en 1995.',
    },
    {
        id: 'prod-007',
        slug: 'need-for-speed-unbound',
        nombre: 'Need for Speed Unbound',
        categoria: 'videojuegos',
        precio: 19790,
        precioAnterior: 29990,
        descuento: 34,
        stock: 3,
        stockCritico: 5,
        imagen: '/imagenes/nfs.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Desarrollador', valor: 'EA Games' },
            attr2: { etiqueta: 'Distribuidor', valor: 'Electronic Arts' },
            attr3: { etiqueta: 'Plataforma', valor: 'PC' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'Need for Speed es una famosa saga de videojuegos de carreras callejeras y persecuciones policiales desarrollada por Electronic Arts.',
    },
    {
        id: 'prod-008',
        slug: 'halo-infinite',
        nombre: 'Halo Infinite',
        categoria: 'videojuegos',
        precio: 15990,
        precioAnterior: 18990,
        descuento: 16,
        stock: 14,
        stockCritico: 5,
        imagen: '/imagenes/halo.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Desarrollador', valor: 'Halo Studios' },
            attr2: { etiqueta: 'Distribuidor', valor: 'Xbox Game Studios' },
            attr3: { etiqueta: 'Plataforma', valor: 'Xbox One' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'Halo Infinite es un videojuego de disparos en primera persona y mundo abierto de la franquicia de videojuegos de ciencia ficción Halo, creada por Bungie Studios y actualmente desarrollada por 343 Industries. Es exclusivo para las plataformas Xbox One, Microsoft Windows y Xbox Series X|S.',
    },
    {
        id: 'prod-009',
        slug: 'forza-horizon-6',
        nombre: 'Forza Horizon 6',
        categoria: 'videojuegos',
        precio: 29990,
        precioAnterior: 34990,
        descuento: 14,
        stock: 9,
        stockCritico: 5,
        imagen: '/imagenes/fh6.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Desarrollador', valor: 'Playground Games' },
            attr2: { etiqueta: 'Distribuidor', valor: 'Xbox Game Studios' },
            attr3: { etiqueta: 'Plataforma', valor: 'Xbox' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'Forza Horizon 6 es un emocionante videojuego de carreras de mundo abierto desarrollado por Playground Games y publicado por Xbox Game Studios.',
    },
    {
        id: 'prod-010',
        slug: 'god-of-war',
        nombre: 'God of War',
        categoria: 'videojuegos',
        precio: 39990,
        precioAnterior: 49990,
        descuento: 20,
        stock: 5,
        stockCritico: 5,
        imagen: '/imagenes/gow.jpg',
        promo: true,
        detalles: {
            attr1: { etiqueta: 'Desarrollador', valor: 'Santa Monica Studio' },
            attr2: { etiqueta: 'Distribuidor', valor: 'Sony Interactive Entertainment' },
            attr3: { etiqueta: 'Plataforma', valor: 'PlayStation 5' },
            attr4: { etiqueta: 'Idioma', valor: 'Español' },
        },
        descripcion: 'God of War es una aclamada saga de acción y aventura desarrollada por Santa Monica Studio, donde Kratos enfrenta a los dioses de la mitología nórdica en una historia épica de supervivencia y redención.',
    },
];

//------- Persistencia y CRUD síncrono ------------

//Si LocalStorage está vacío (primera visita), pone el catalogo real
export function inicializarInventario(){
    if(localStorage.getItem(CLAVE_INVENTARIO)=== null){
        localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(PRODUCTOS_SEED));
    }
}

function leerInventario(){
    inicializarInventario();
    return JSON.parse(localStorage.getItem(CLAVE_INVENTARIO))
}

function guardarInventario(productos){
    localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(productos));
}
//funciones de consultas
export function obtenerProductos(){
    return leerInventario();
}

export function obtenerProductoPorId(id){
    return leerInventario().find((producto) => producto.id === id) ?? null;
}

export function obtenerProductosPorCategoria(categoria){
    return leerInventario().filter((producto) => producto.categoria === categoria);
}

export function obtenerOferta(){
    return leerInventario().filter((producto) => producto.descuento > 0);
}

//funciones de modificacion
export function crearProducto(datosProducto){
    const productos = leerInventario();
    const nuevoProducto = {...datosProducto, id: crypto.randomUUID()};
    productos.push(nuevoProducto);
    guardarInventario(productos);
    return nuevoProducto;
}

export function actualizarProducto(id, cambios){
    const productos = leerInventario();
    const indice = productos.findIndex((producto) => producto.id === id);
    if(indice === -1) return null;
    productos[indice] = {...productos[indice], ...cambios, id};
    guardarInventario(productos);
    return productos[indice];
}

export function eliminarProducto(id){
    const restantes = leerInventario().filter((producto) => producto.id !== id);
    guardarInventario(restantes);
    return restantes;
}
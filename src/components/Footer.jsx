export default function Footer(){
    const anioActual = new Date().getFullYear();

    return(
        <Footer>
            <p>&copy; {anioActual} Hobic - Todos los derechos reservados</p>
        </Footer>
    );
}
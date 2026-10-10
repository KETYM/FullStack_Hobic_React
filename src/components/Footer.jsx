export default function Footer() {
    const anioActual = new Date().getFullYear();

    return (
        <footer>
            <p>&copy; {anioActual} Hobic - Todos los derechos reservados</p>
        </footer>
    );
}
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/blog.css';

const SALUDOS = [
    "¿Qué libro o manga estás leyendo esta semana?",
    "Pasa a dejar tu firma en el libro de visitas ✍️",
    "Pase a mirar sin compromiso ☕",
    "¡¡Bienvenido!! Qué bacán que estés aquí ^^ ✨"
];

export default function Blog() {
    const { usuario } = useAuth();
    const nombreUsuario = usuario ? usuario.nombre : 'Jane';

    // 1. Reloj en Vivo
    const [hora, setHora] = useState(() => new Date().toLocaleTimeString('es-CL'));
    useEffect(() => {
        const timer = setInterval(() => {
            setHora(new Date().toLocaleTimeString('es-CL'));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 2. Fondo y Tema
    const [patron, setPatron] = useState(() => localStorage.getItem('hobic_pattern') || 'pattern-grid');
    const [temaOscuro, setTemaOscuro] = useState(() => localStorage.getItem('hobic_theme') === 'dark');

    const cambiarPatron = (e) => {
        const nuevoPatron = e.target.value;
        setPatron(nuevoPatron);
        localStorage.setItem('hobic_pattern', nuevoPatron);
    };

    const toggleTema = () => {
        const nuevoTema = !temaOscuro;
        setTemaOscuro(nuevoTema);
        localStorage.setItem('hobic_theme', nuevoTema ? 'dark' : 'light');
    };

    // 3. Saludo Aleatorio (inicializado una sola vez)
    const [saludo] = useState(() => SALUDOS[Math.floor(Math.random() * SALUDOS.length)]);

    // 4. Mascota Virtual
    const [caricias, setCaricias] = useState(() => parseInt(localStorage.getItem('hobic_cat_pets'), 10) || 0);

    const acariciarGato = () => {
        const total = caricias + 1;
        setCaricias(total);
        localStorage.setItem('hobic_cat_pets', total);
    };

    const humorGato = caricias >= 20 
        ? "¡Gato súper feliz! 😸💖" 
        : caricias >= 10 
        ? "purrrrrr... 🐱🐾" 
        : caricias > 0 
        ? "miau~ 😺" 
        : "esperando cariño...";

    // 5. Contador de Visitas
    const [visitas] = useState(() => {
        const v = (parseInt(localStorage.getItem('hobic_blog_visits'), 10) || 1042) + 1;
        localStorage.setItem('hobic_blog_visits', v);
        return v;
    });

    // 6. Reproductor Lo-Fi
    const [reproduciendo, setReproduciendo] = useState(false);
    const audioRef = useRef(null);

    const toggleMusica = () => {
        if (!audioRef.current) return;
        if (reproduciendo) {
            audioRef.current.pause();
            setReproduciendo(false);
        } else {
            audioRef.current.play().then(() => {
                setReproduciendo(true);
            }).catch(err => console.log('Audio autoplay blocked', err));
        }
    };

    // Parar audio al salir del componente
    useEffect(() => {
        const audioEl = audioRef.current;
        return () => {
            if (audioEl) audioEl.pause();
        };
    }, []);

    // 7. Libro de Visitas (Guestbook)
    const [comentarios, setComentarios] = useState(() => {
        try {
            const guardados = localStorage.getItem('hobic_guestbook');
            return guardados ? JSON.parse(guardados) : [
                { nombre: "Churrasquin", mensaje: "¡Me encanta el diseño de este blog!", hora: "15:30" },
                { nombre: "Jane", mensaje: "Bienvenidos a mi blogsito", hora: "16:05" }
            ];
        } catch {
            return [];
        }
    });

    const [guestName, setGuestName] = useState(() => usuario?.nombre || '');
    const [guestMsg, setGuestMsg] = useState('');
    const guestScrollRef = useRef(null);

    const handleFirmarLibro = (e) => {
        e.preventDefault();
        if (!guestName.trim() || !guestMsg.trim()) return;

        const ahora = new Date();
        const horaStr = ahora.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        const nuevo = {
            nombre: guestName.trim(),
            mensaje: guestMsg.trim(),
            hora: horaStr
        };

        const listaActualizada = [...comentarios, nuevo];
        setComentarios(listaActualizada);
        localStorage.setItem('hobic_guestbook', JSON.stringify(listaActualizada));
        setGuestMsg('');

        setTimeout(() => {
            guestScrollRef.current?.scrollTo({
                top: guestScrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    };

    return (
        <div className={patron} data-theme={temaOscuro ? "dark" : "light"} style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <div className="neocities-wrapper">

                {/* Banner superior retro */}
                <section className="retro-banner">
                    <h1 className="pixel-title">&starf; BLOG DE {nombreUsuario.toUpperCase()} &starf;</h1>
                    <p className="pixel-subtitle">Diario de reseñas, colecciones, gustos y comunidad Hobic</p>

                    {/* Controles de fondo y tema */}
                    <div className="theme-controls">
                        <label htmlFor="patternSelect">Fondo:</label>
                        <select id="patternSelect" className="retro-select" value={patron} onChange={cambiarPatron}>
                            <option value="pattern-grid">Hoja Cuadriculada</option>
                            <option value="pattern-dots">Puntos Polka</option>
                            <option value="pattern-checker">Damero Retro</option>
                        </select>
                        <button id="btn-theme-toggle" className="btn-pixel" onClick={toggleTema}>
                            {temaOscuro ? "Modo Día" : "Modo Noche"}
                        </button>
                    </div>
                </section>

                {/* Grid principal de 3 columnas */}
                <div className="grid-container">

                    {/* COLUMNA 1: Perfil, Stickers y Obra del mes */}
                    <aside className="col-side">
                        {/* Perfil */}
                        <div className="retro-window">
                            <div className="win-header">
                                <span className="win-title">&starf; Sobre Mí</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body text-center">
                                <img src="/imagenes/persona_blog.png" alt="Avatar" className="avatar-img" />
                                <h3 className="profile-name">{nombreUsuario}</h3>
                                <p className="profile-bio">Estudiante, coleccionista de figuras y apasionada por los mangas y videojuegos.</p>
                            </div>
                        </div>

                        {/* En qué ando */}
                        <div className="retro-window">
                            <div className="win-header">
                                <span className="win-title">¿En qué ando?</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body text-center">
                                <div className="mood-icon">📖🎶</div>
                                <p className="mood-text"><strong>Leyendo Cadáver Exquisito</strong></p>
                                <small className="mood-sub">"Buen día para programar en React"</small>
                            </div>
                        </div>

                        {/* Mis cosas favs */}
                        <div className="retro-window">
                            <div className="win-header">
                                <span className="win-title">Mis Cosas Favs</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body stickers-board">
                                <div className="sticker-item"><img src="/imagenes/manga_ao_haru.jpg" className="sticker-img" alt="Manga" /><span>Mangas</span></div>
                                <div className="sticker-item"><img src="/imagenes/serieBroolyn.jpg" className="sticker-img" alt="Serie" /><span>Series</span></div>
                                <div className="sticker-item"><img src="/imagenes/libroIndignoDeSer.jpg" className="sticker-img" alt="Libro" /><span>Libros</span></div>
                                <div className="sticker-item"><img src="/imagenes/juegoStardewValley.jpg" className="sticker-img" alt="Juego" /><span>Juegos</span></div>
                                <div className="sticker-item"><img src="/imagenes/animal.jpg" className="sticker-img" alt="Animal" /><span>Animales</span></div>
                                <div className="sticker-item"><img src="/imagenes/deporte.jpg" className="sticker-img" alt="Deporte" /><span>Deportes</span></div>
                            </div>
                        </div>

                        {/* Obra del mes */}
                        <div className="retro-window">
                            <div className="win-header">
                                <span className="win-title">Obra del Mes</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body text-center">
                                <img src="/imagenes/manga_noragami.jpg" className="shrine-cover" alt="Noragami" />
                                <p className="shrine-title">Noragami</p>
                                <small className="mood-sub">«El manga que siempre vuelvo a releer»</small>
                            </div>
                        </div>
                    </aside>

                    {/* COLUMNA 2: Bienvenida, Reseña y Guestbook */}
                    <main className="col-main">
                        {/* Saludo dinámico */}
                        <article className="retro-window">
                            <div className="win-header">
                                <span className="win-title">¡Bienvenidos!</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body">
                                <p className="greeting-highlight">{saludo}</p>
                            </div>
                        </article>

                        {/* Entrada de Blog: Reseña */}
                        <article className="retro-window">
                            <div className="win-header">
                                <span className="win-title">Reseñas y Colección</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body">
                                <div className="review-layout">
                                    <div className="review-badge-header">
                                        <span className="post-tag">Categoría: Coleccionables</span>
                                        <span className="review-date">Octubre 2026</span>
                                    </div>
                                    <h2 className="post-title">Primeras impresiones &starf;</h2>
                                    <div className="review-rating">Calificación: &starf;&starf;&starf;&starf;&starf;</div>

                                    <div className="review-hero">
                                        <img src="/imagenes/manga_ao_haru.jpg" className="review-cover-img" alt="Portada Reseña" />
                                        <p className="post-desc">
                                            Esta semana ordené mi colección y sumé nuevas piezas a mi rincón personal. Encontré
                                            unos mangas de increíble calidad y la portada es hermosa; aún no los leo completos, pero me
                                            emociona mucho sumergirme en ellos.
                                        </p>
                                    </div>

                                    <div className="pros-cons-grid">
                                        <div className="pros-box">
                                            <strong>Lo Mejor:</strong>
                                            <ul>
                                                <li>Dibujos claros y portada hermosa.</li>
                                                <li>Papel de alta densidad en los tomos físicos.</li>
                                            </ul>
                                        </div>
                                        <div className="cons-box">
                                            <strong>A Mejorar:</strong>
                                            <ul>
                                                <li>Pudo llegar más protegido con papel burbuja.</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <blockquote className="retro-quote">
                                        «Coleccionar es preservar un pedacito de arte en tu propia habitación.»
                                    </blockquote>
                                </div>
                            </div>
                        </article>

                        {/* Libro de Visitas (Guestbook) */}
                        <article className="retro-window">
                            <div className="win-header">
                                <span className="win-title">&hearts; Guestbook / Libro de Visitas</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body">
                                <p className="guest-desc">Deja un saludo o tu opinión en nuestra comunidad:</p>

                                <form onSubmit={handleFirmarLibro} className="guestbook-form">
                                    <input 
                                        type="text" 
                                        placeholder="Tu apodo o nombre" 
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        required 
                                        className="retro-input" 
                                    />
                                    <textarea 
                                        placeholder="Escribe tu mensaje aquí..." 
                                        rows="2" 
                                        value={guestMsg}
                                        onChange={(e) => setGuestMsg(e.target.value)}
                                        required 
                                        className="retro-input" 
                                    />
                                    <button type="submit" className="btn-action">Firmar Libro</button>
                                </form>

                                <hr className="retro-hr" />

                                <div className="scroll-box" ref={guestScrollRef}>
                                    {comentarios.map((item, idx) => (
                                        <div key={idx} className="comment-bubble">
                                            <div className="comment-header">
                                                <strong>{item.nombre}</strong>
                                                <span className="comment-time">[{item.hora || 'Reciente'}]</span>
                                            </div>
                                            <span>{item.mensaje}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </main>

                    {/* COLUMNA 3: Reloj, Música y Mascota Virtual */}
                    <aside className="col-side">
                        {/* Reloj y Contador de Visitas */}
                        <div className="retro-window">
                            <div className="win-header">
                                <span className="win-title">Hora Local</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body text-center">
                                <div className="digital-clock">{hora}</div>
                                <span className="status-badge">° Online</span>

                                <div className="hit-counter-box mt-3">
                                    <small>Visitas al rincón: </small>
                                    <div className="hit-counter-display">
                                        {String(visitas).padStart(6, '0')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reproductor de Música */}
                        <div className="retro-window">
                            <div className="win-header">
                                <span className="win-title">Music Player</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body text-center">
                                <audio ref={audioRef} src="/audio/musica_chill.mp3" preload="none" loop />
                                <div className={`player-disc ${reproduciendo ? 'spinning' : ''}`}>💿</div>
                                <div className="player-track">Lo-Fi Chill & Beats</div>
                                <div className="player-progress">
                                    <div className={`progress-bar ${reproduciendo ? 'active' : ''}`} />
                                </div>
                                <button onClick={toggleMusica} className="btn-action btn-music">
                                    {reproduciendo ? "⏸ Pausar" : "▶ Reproducir"}
                                </button>
                            </div>
                        </div>

                        {/* Mascota Virtual */}
                        <div className="retro-window">
                            <div className="win-header">
                                <span className="win-title">Gato</span>
                                <div className="win-controls"><span>-</span><span>□</span><span>×</span></div>
                            </div>
                            <div className="win-body text-center">
                                <img 
                                    src="/imagenes/gatoo.png" 
                                    alt="Mascota Virtual" 
                                    onClick={acariciarGato} 
                                    className="pet-image cursor-pointer" 
                                    title="¡Haz clic para acariciarme!"
                                />
                                <p className="pet-counter">Cariño: <strong>{caricias}</strong></p>
                                <p className="pet-mood-text">{humorGato}</p>
                                <button onClick={acariciarGato} className="btn-action">¡Acariciar gato! 🐾</button>
                            </div>
                        </div>
                    </aside>

                </div>

                {/* Pie de página retro */}
                <footer className="retro-footer">
                    <p>Hecho con ♥ para Fullstack | Hobic • <a href="#top">Subir ↑</a></p>
                </footer>
            </div>
        </div>
    );
}

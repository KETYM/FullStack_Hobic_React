import React, { useState, useEffect, useRef } from 'react';
import '../styles/chatVivo.css';
const ChatVivo = () => {
  // Inicializamos el estado leyendo de localStorage si existe, o con un mensaje de bienvenida
  const [mensajes, setMensajes] = useState(() => {
    const chatGuardado = localStorage.getItem('hobic_chat');
    return chatGuardado ? JSON.parse(chatGuardado) : [
      { id: 1, texto: '¡Bienvenido a la comunidad de Hobic! ¿Qué estás leyendo o jugando hoy?', remitente: 'sistema' }
    ];
  });
  
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [chatAbierto, setChatAbierto] = useState(false); // Para mostrar/ocultar el chat como widget
  const mensajesFinRef = useRef(null);

  // Efecto para guardar los mensajes en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('hobic_chat', JSON.stringify(mensajes));
    hacerScrollAbajo();
  }, [mensajes, chatAbierto]);

  const hacerScrollAbajo = () => {
    mensajesFinRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nuevoMensaje.trim() === '') return;

    const mensajeUsuario = {
      id: Date.now(),
      texto: nuevoMensaje,
      remitente: 'usuario'
    };

    setMensajes((prev) => [...prev, mensajeUsuario]);
    setNuevoMensaje('');
  };

  return (
    <div className="chat-container">
      {/* Botón flotante para abrir/cerrar */}
      <button 
        className="chat-toggle-btn" 
        onClick={() => setChatAbierto(!chatAbierto)}
      >
        {chatAbierto ? '✖ Cerrar Chat' : '💬 Chat en Vivo'}
      </button>

      {/* Ventana de Chat */}
      {chatAbierto && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Comunidad Hobic</h3>
          </div>
          
          <div className="chat-messages">
            {mensajes.map((msj) => (
              <div 
                key={msj.id} 
                className={`mensaje-burbuja ${msj.remitente === 'usuario' ? 'mensaje-propio' : 'mensaje-sistema'}`}
              >
                {msj.texto}
              </div>
            ))}
            <div ref={mensajesFinRef} />
          </div>

          <form onSubmit={manejarEnvio} className="chat-input-form">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatVivo;
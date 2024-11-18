import React, { useEffect, useState } from 'react';
import { getSugerencias } from '../../api/sugerencia';
import CreateSugerencia from './CreateSugerencia';
import ButtonAppBar from '../layout/Navbar';
import EditSugerencia from './EditSugererencia'

const ShowSugerencias = () => {
    const [sugerencias, setSugerencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSugerencias = async () => {
            try {
                const data = await getSugerencias();
                setSugerencias(data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar las sugerencias');
                setLoading(false);
            }
        };

        fetchSugerencias();  
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <ButtonAppBar/>
            <CreateSugerencia />
            <div className="event-card-container">
                {sugerencias.map((sugerencia) => (
                    <div key={sugerencia.NoSugerencia} className="card event-card">
                        <div className="event-header">
                            {sugerencia.Imagen && (
                                <img
                                src={`data:image/${sugerencia.ImagenFormat};base64,${sugerencia.Imagen}`}
                                    alt={sugerencia.Titulo}
                                    className="event-header-image" 
                                />
                            )}
                        </div>
                        <div className="event-content">
                            <h2>{sugerencia.Titulo}</h2>
                            <p>{sugerencia.Descripcion}</p>
                            <p>Fecha de publicación: {new Date(sugerencia.Fecha).toLocaleDateString()}</p>
                        </div>
                        <div className="event-footer">
                            <p className="tag" style={{ backgroundColor: '#fd203b' }}>Sugerencia</p>
                            <EditSugerencia sugerencia={sugerencia}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ShowSugerencias;

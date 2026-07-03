import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import notasApi from "../api/notasApi";
import NotaCard from "../components/NotaCard";

export default function ListaNotas() {
    const [notas, setNotas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const eliminar = async (id) => {
        if (!confirm(`¿Estás seguro que deseas eliminar la nota ${id} ?`)) return;
        try {
            await notasApi.delete(`notas/${id}/`);
            setNotas((prev) => prev.filter((n) => n.id !== id));
        }   catch (err) {
            setError("Error al eliminar la nota");
        }
    };

    useEffect(() => {
        notasApi.get('notas/')
            .then(({data}) => setNotas(data))
            .catch(() => setError('Error al cargar las notas'))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) return(
        <div className="container mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando</span>
            </div>
            <p className="mt-2 text-muted">Cargando notas...</p>
        </div>
    );
    if (error)return(
        <div className="container mt-4">
            <div className="alert alert-danger">{error}</div>
        </div>
    );

    return(
        <div className="container mt-4">
            <h2 className="mb-4">Notas disponibles</h2>
            
            {notas.length === 0 ? (
                <div className="alert alert-info">No hay notas. <link to="/crear">Crea la primera</link></div>
            
            ) : (
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map((nota) => (
                            <NotaCard key={nota.id} nota={nota} onEliminar={eliminar} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
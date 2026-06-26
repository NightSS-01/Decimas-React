import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import notasApi from '../api/notasApi';


export default function CrearNota() {
    const [form, setForm] = useState({ title:'', description:'' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.description.trim()) {
            setError('El título y la descripción no pueden estar vacíos');
            return;
        }
        try {
            await notasApi.post('notas/', { ...form, completed: false });
            navigate('/');
        } catch (err) {
            const mensaje = err.response?.data?.message || 'Error al crear la nota';
            setError(JSON.stringify(mensaje));
        }
    };
    return (
        <div className="container mt-4" style ={{ maxWidth: '520px' }}>
            <h2 className="mb-4">Nueva Nota</h2>
            {error && (
                <div className="alert alert-danger">{error}</div>
            )}
            
            <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label className='form-label fw-bold'>Título</label>
                <input
                    type='text'
                    name='title'
                    value={form.title}
                    onChange={handleChange}
                    placeholder='Ej: Estudiar React'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label fw-bold'>Descripción</label>
                <textarea
                    name='description'
                    value={form.description}
                    onChange={handleChange}
                    placeholder='Ej: Reparasar hooks y React Router'
                    rows={4}
                    className='form-control'
                />
            </div>
            <div className='d-flex gap-2'>
                <button type='submit' className='btn btn-primary'>Guardar Nota</button>
                <button type='button' className='btn btn-outline-secondary' onClick={() => navigate('/')}>Cancelar</button>
            </div>
            </form>
        </div>
    );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notasApi from "../api/notasApi";

export default function EditarNota() {
   const { id } = useParams();
   const navigate = useNavigate();

   const [form, setForm] = useState({
      title: "",
      description: "",
      completed: false,
   });
   const [error, setError] = useState("");

   useEffect(() => {
      notasApi
         .get(`notas/${id}/`)
         .then(({ data }) => setForm(data))
         .catch(() => setError("No se encontró la nota"));
   },[id]);

   const handleChange = (e) => {

      const value = 
         e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [e.target.name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!form.title.trim() ||  !form.description.trim()) {
         setError("El título y la descripción no puede nestar vacíos");
         return;
      }
      try {
         await notasApi.put(`notas/${id}/`, form);
         navigate("/");
      }catch (err) {
         setError("Error al actualizar la nota");
      }
   };

   return (
      <div className="container mt-4" style={{ maxWidth: "520px"}}>
         <h2 className="mb-4">Editar Nota #{id}</h2>
         {error && <div className="alert alert-danger"> {error}</div>}
         <form onSubmit={handleSubmit}>
            <div className="mb-3">
               <label className="form-label fw-bold">Título</label>
               <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="form-control"
               />
            </div>
            <div className="mb-3">
               <label className="form-label fw-bold">Descripción</label>
               <textarea 
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="form-control"
               />
            </div>
            <div className="mb-3 form-check">
               <input
                  type="checkbox"
                  name="completed"
                  checked={form.completed}
                  onChange={handleChange}
                  className="form-check-input"
                  id="completed"
               />
               <label className="form-check-label" htmlFor="completed">
                  Nota completada
               </label>
            </div>
            <div className="d-flex grap-2">
               <button type="submit" className="btn btn-warning">
                  Actualizar Nota
               </button>
               <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/")}
               >
                  Cancelar
               </button>

            </div>
         </form>

      </div>
   )
}
import { Link } from "react-router-dom";

export default function NotaCard({ nota, onEliminar }){
   return (
      <tr>
         <td>{nota.id}</td>
         <td>{nota.title}</td>
         <td>{nota.description}</td>
         <td>
            {nota.completed
               ? <span className="badge bg-success">Completada</span>
               : <span className="badge bg-warning text-dark">Pendiente</span>
            }
         </td>
         <td>
            <div className="d-flex gap-2">
               <Link to={`/editar/${nota.id}`} className="btn btn-sm btn-outline-primary">
                  Editar
               </Link>
               <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onEliminar(nota.id)}
               >
                  Eliminar
               </button>
            </div>
         </td>
      </tr>
   );
}
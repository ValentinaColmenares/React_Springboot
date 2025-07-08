import { useContext, useEffect, useState } from "react";
import { UserForm } from "../components/UserForm"
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// users=[] -> si no se envía, por defecto es un array vacío, si registra un usuario nuevo
export const RegisterPage = () => {

  const { users=[], initialUserForm } = useContext(UserContext);

  const [userSelected, setUserSelected] = useState(initialUserForm);

  const { id } = useParams();  // id -> mismo nombre de parámetro en ruta :id (UserRoutes.jsx)
  
  useEffect(() => {
    console.log(id);
    if(id){
      const user = users.find(u => u.id == id) || initialUserForm; // == podria venir como string o int
      setUserSelected(user);
    }
  }, [id]);

  return (
    <div className="container my-4">
      <h4>{ userSelected.id > 0 ? 'Editar' : 'Registar'} Usuario</h4>
      <div className="row">
        <div className="col">
          <UserForm userSelected={userSelected} />
        </div>
      </div>
    </div>
  )
}

import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";

export const UsersPage = () => {

	const {
		users,
		visibleForm,
		handlerOpenForm,
        getUsers,
	} = useContext(UserContext);

    useEffect(() => {
        getUsers();
    }, []);

	return (
		<>
			{!visibleForm || 
				<UserModalForm />
			}
			<div className="container my-4">
				<h2>Users App</h2>
				<div className="row">
				
					{/* Sin ventana modal
					{!visibleForm || 
					<div className="col">
						<UserForm 
						userSelected = {userSelected}
						initialUserForm = {initialUserForm}
						handlerAddUser={ handlerAddUser }
						handlerCloseForm={ handlerCloseForm }/>
					</div>} */}
				
					<div className="col">
						{visibleForm || <button
						className="btn btn-primary my-2"
						onClick={handlerOpenForm}>
						Nuevo Usuario
						</button>}
						{ 
                            users.length === 0 
                            ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                            : <UsersList />
						}
					</div>
				</div>
			</div>
		</>
	);
}
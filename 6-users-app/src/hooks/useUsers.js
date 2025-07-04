import { useReducer, useState } from "react";
import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { useNavigate } from "react-router-dom";


const initialUsers = [
	{
		id: 1,
		username: 'pepe',
		password: '12345',
		email: 'pepe@correo.com'
	},
];

const initialUserForm = {
	id: 0,
	username: '',
	password: '',
	email: '',
}

export const useUsers = () => {
  
	const [users, dispatch] = useReducer(usersReducer, initialUsers);
	const [userSelected, setUserSelected] = useState(initialUserForm);
	const [visibleForm, setVisibleForm] = useState(false);
	const navigate = useNavigate();

	const handlerAddUser = (user) => {
		// console.log(user);
		dispatch({
			type: (user.id === 0) ? 'addUser' : 'updateUser',
			payload: user,
		})
		
		Swal.fire(
			(user.id === 0) ? 
				'Usuario Creado' : 
				'Usuario Actualizado',
			(user.id === 0) ? 
				'El usuario ha sido creado con éxito!' :
				'El usuario ha sido actualizado con éxito!',
			'success'
		);
		handlerCloseForm();
		navigate('/users');
	}
	
	const handlerRemoveUser = (id) => {
		// console.log(id);
		Swal.fire({
			title: 'Está seguro que desea eliminar?',
			text: 'Cuidado el usuario será eliminado!',
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar!"
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch({
					type: 'removeUser',
					payload: id,
				});
				Swal.fire({
				title: "Usuario Eliminado!",
				text: "El usuario ha sido eliminado con éxito!",
				icon: "success"
				});
			}
		});
	}
	
	const handlerUserSelectedForm = (user) => {
		// console.log(user);
		setVisibleForm(true);
		setUserSelected({ ...user });
	}

	const handlerOpenForm = () => {
		setVisibleForm(true);
	}

	const handlerCloseForm = () => {
		setVisibleForm(false);
		setUserSelected(initialUserForm);
	}

	return {
		users,
		userSelected,
		initialUserForm,
		visibleForm,
		handlerAddUser,
		handlerRemoveUser,
		handlerUserSelectedForm, 
		handlerOpenForm,
		handlerCloseForm
	}
}

import { useReducer, useState } from "react";
import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";


const initialUsers = [];

const initialUserForm = {
	id: 0,
	username: '',
	password: '',
	email: '',
}

const initialErrors = {
	username: '',
	password: '',
	email: '',
}

export const useUsers = () => {
  
	const [users, dispatch] = useReducer(usersReducer, initialUsers);
	const [userSelected, setUserSelected] = useState(initialUserForm);
	const [visibleForm, setVisibleForm] = useState(false);
    const [errors, setErrors] = useState(initialErrors);

	const navigate = useNavigate();

    const getUsers = async() => {
        const result = await findAll();
        console.log(result);
        dispatch({
            type: 'loadingUsers',
            payload: result.data,
        });
    }

	const handlerAddUser = async(user) => {
		// console.log(user);

        let response;
        
        try {

            if (user.id === 0) {
                response = await save(user);
            } else {
                response = await update(user);
            }
            
            dispatch({
                type: (user.id === 0) ? 'addUser' : 'updateUser',
                payload: response.data,
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
        } catch (error) {
            if(error.response && error.response.status == 400) {
                setErrors(error.response.data);
            } else {
                throw error;
            }
        }
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
                remove(id);
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
        setErrors(initialErrors);
	}

	return {
		users,
		userSelected,
		initialUserForm,
		visibleForm,
        errors,
		handlerAddUser,
		handlerRemoveUser,
		handlerUserSelectedForm, 
		handlerOpenForm,
		handlerCloseForm,
        getUsers,
	}
}

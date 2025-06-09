export const ClientView = ({title, client}) => {

	const { 
		name: nameClient, 
		lastName, 
		address: { 
			country, 
			city,
			street, 
			number }
	}  = client;

	validateProps(title, client);
	return (
		<>
			<h3>{ title }</h3>
			<ul className="list-group">
				<li className="list-group-item active">{ nameClient } { lastName }</li>
				<li className="list-group-item">{ country } / { city }</li>
				<li className="list-group-item">{ street } { number }</li>
			</ul>
		</>
	)
}

function validateProps(title, client){
	if(typeof title !== 'string' || title === undefined){
		throw new Error('La propiedad "title" debe ser un numero');
	}
	if(typeof client !== 'object' || client === undefined){
		throw new Error('La propiedad "client" debe ser un objeto');
	}
}
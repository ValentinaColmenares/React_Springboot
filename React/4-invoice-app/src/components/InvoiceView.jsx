export const InvoiceView = ({id, name}) => {
  
	validateProps(id, name);
	return (
		<>
			<ul  className="list-group">
			<li className="list-group-item">Id: { id }</li>
			<li className="list-group-item">Name: { name }</li>
			</ul>
		</>
  	)
}

function validateProps(id, name){
	if(typeof id !== 'number' || id === undefined){
		throw new Error('La propiedad "id" debe ser un numero');
	}
	if(typeof name !== 'string' || name === undefined){
		throw new Error('La propiedad "name" debe ser un texto');
	}
}
export const CompanyView = ({title, company}) => {
  
	validateProps(title, company);
	return (
		<>
		<h3>{ title }</h3>
		<ul className="list-group">
			<li className="list-group-item active">{ company.name }</li>
			<li className="list-group-item">{ company.fiscalNumber }</li>
		</ul>
		</>
	)
}

function validateProps(title, company){
	
	if(typeof title !== 'string' || title === undefined){
		throw new Error('La propiedad "title" debe ser un string');
	}
	if(typeof company !== 'object' || company === undefined){
		throw new Error('La propiedad "company" debe ser un objeto');
	}
}
export const RowItemView = ({product, price, quantity}) => {
	
	validateProps(product, price, quantity);
	return (
		<>
			<tr>
			<td>{ product }</td>
			<td>{ price }</td>
			<td>{ quantity }</td>
			</tr>
		</>
	)
} 

function validateProps(product, price, quantity){
	
	if(typeof product !== 'string' || product === undefined){
		throw new Error('La propiedad "product" debe ser un string');
	}
	
	if(typeof price !== 'number' || price === undefined){
		throw new Error('La propiedad "price" debe ser un numero');
	}
	if(typeof quantity !== 'number' || quantity === undefined){
		throw new Error('La propiedad "quantity" debe ser un numero');
	}
}
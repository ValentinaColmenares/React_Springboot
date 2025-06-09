import { RowItemView } from "./RowItemView"

export const ListItemsView = ({title, items}) => {

	validateProps(title, items);
	return (
		<>
			<h4>{ title }</h4>
			<table className="table table-striped table-hover">
				<thead>
					<tr>
					<th>Producto</th>
					<th>Precio</th>
					<th>Cantidad</th>
					</tr>
				</thead>
				<tbody>
					{items.map(({id, product, price, quantity}) => (
						<RowItemView key={id} product={product} price={price} quantity={quantity} />
					))}
				</tbody>
			</table>
		</>
	)
}

function validateProps(title, items){
	
	if(typeof title !== 'string' || title === undefined){
		throw new Error('La propiedad "title" debe ser un string');
	}
	if(typeof items !== 'object' || items === undefined){
		throw new Error('La propiedad "items" debe ser un object');
	}
}
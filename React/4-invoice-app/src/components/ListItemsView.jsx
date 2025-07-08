import { RowItemView } from "./RowItemView"

export const ListItemsView = ({title, items, handlerDeleteItem}) => {

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
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>
					{items.map(({id, product, price, quantity}) => (
						<RowItemView 
							key={id} 
							id = {id}
							product={product} 
							price={price} 
							quantity={quantity}
							handlerDeleteItem ={ id => handlerDeleteItem(id) } 
						/>
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
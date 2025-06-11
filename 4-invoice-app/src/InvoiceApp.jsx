import { useEffect, useState } from "react";
import { getInvoice } from "./services/getInvoice"
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";

const invoiceInitial = {
	id: 0,
	name: '',
	client: {
		name: '',
		lastName: '',
		address: {
			country: '',
			city: '',
			street: '',
			number: 0
		}
	},
	company: {
		name: '',
		fiscalNumber: 0,
	},
	items: []
};

export const InvoiceApp = () => {

	const [counter, setCounter] = useState(4);

	const [invoice, setInvoice] = useState(invoiceInitial);
	
	const [items, setItems] = useState([]);

	const [total, setTotal] = useState(0);

	const [formItemsState, setFormItemsState] = useState({
		product: '',
		price: '',
		quantity: '',
	});

	const { id, name, client, company} = invoice;

	const { product, price, quantity } = formItemsState;

	useEffect(() => {
		const data = getInvoice();
		console.log(data);
		setInvoice(data);
		setItems(data.items);
		setTotal(data.total)
	}, []);

	useEffect(() => {
		// console.log('el precio cambió!');
	}, [price]);

	useEffect(() => {
		// console.log('el formItemsState cambió!');
	}, [formItemsState]);
	
	useEffect(() => {
		// console.log('el counter cambió!');
	}, [counter]);
	
	useEffect(() => {
		setTotal(total + +price);
		// console.log('los items cambiaron!');
	}, [items]);

	const onInputChange = ({ target: {name, value} }) => {
		// console.log(value);
		// console.log(name);
		setFormItemsState({
			...formItemsState,
			[name]: value
		});
	}

	const onInvoiceItemsSubmit = (event) =>  {
		event.preventDefault();

		if(product.trim().length <= 1){
			alert('Error el producto debe tener al menos dos caracteres')
			return;
		}
		if(price.trim().length <= 1){
			alert('Error el precio debe tener al menos dos caracteres')
			return;
		}
		if(isNaN(price.trim())){
			alert('Error el precio no es un numero')
			return;
		}
		if(quantity.trim().length < 1){
			alert('Error la cantidad debe tener al menos un caracter')
			return;
		}
		if(quantity.trim() < 1){
			alert('Error la cantidad debe ser mayor a 0')
			return;
		}
		if(isNaN(quantity.trim())){
			alert('Error la cantidad no es un numero')
			return;
		}
		setItems([...items, {
			id: counter, 
			product: product.trim(), 
			price: +price.trim(), 
			quantity: parseInt(quantity.trim(), 10)
		}]);
		setFormItemsState({
			product: '',
			price: '',
			quantity: '',
		});
		setCounter(counter + 1);
	}

	return (
		<>
		<div className="container">
			<div className="card my-3">
			<div className="card-header">
				Ejemplo Factura
			</div> 

			<div className="card-body">
				<InvoiceView id={ id } name={ name }/>
				<div className="row my-3">

				<div className="col">
					<ClientView title ="Datos del cliente" client={ client } />
				</div>

				<div className="col">
					<CompanyView title="Datos de la empresa" company={ company } />
				</div>

				</div>
					<ListItemsView title="Productos de la factura" items={ items } />
					<TotalView total={ total }/>
					<form className="w-50" onSubmit={onInvoiceItemsSubmit}>
						<input 
							type="text" 
							name="product" 
							value={ product }
							placeholder="Producto" 
							className="form-control m-3" onChange={ onInputChange }/>
						<input 
							type="text" 
							name="price" 
							value={ price }
							placeholder="Precio" 
							className="form-control m-3" onChange={event => onInputChange(event)}/>
						<input 
							type="text" 
							name="quantity" 
							value={ quantity }
							placeholder="Cantidad" 
							className="form-control m-3" onChange={ onInputChange }/>
						<button 
							type="submit" 
							className="btn btn-primary m-3">
							Nuevo Item
						</button>
					</form>
			</div>
			</div>
		</div>
		</>
	)
}
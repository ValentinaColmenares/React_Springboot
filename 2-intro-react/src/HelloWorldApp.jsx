import PropTypes from "prop-types";
import { Title } from "./components/Title";
import { UserDetails } from "./components/UserDetails";
import { Book } from "./components/Book";

export const HelloWorldApp = ({ user, id, title, book}) => { 

  console.log(typeof title);
  // const name = 'Pepe';

  if(title == undefined){
    title = 'Hola mundo por defecto!';    
  }
  if(book == undefined){
    book = 'UML got a gota'; 
  }

  validateProps(user, id, title);
  return (
    <>
		<Title title={ title } />
    	<UserDetails user={ user } id={ id } />
		<Book book ={ book } />
    </>
  );
}

function validateProps(user, id, title){
	if(typeof user !== 'object'){
		throw new Error('La propiedad "user" debe ser un objeto');
	}
	if(typeof id !== 'number'){
		throw new Error('La propiedad "id" debe ser un numero');
	}
	if(typeof title !== 'string'){
    throw new Error('La propiedad "title" debe ser un string');
	}
}
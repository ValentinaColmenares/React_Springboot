package com.valentina.backend.cartapp.backend_cartapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.valentina.backend.cartapp.backend_cartapp.models.entities.Product;
import com.valentina.backend.cartapp.backend_cartapp.services.ProductService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

	@Autowired
	private ProductService service;

	@GetMapping("/products")
	public List<Product> list(){
		return service.findAll();
	}
}

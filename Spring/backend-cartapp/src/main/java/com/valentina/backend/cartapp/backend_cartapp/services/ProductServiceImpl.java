package com.valentina.backend.cartapp.backend_cartapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.valentina.backend.cartapp.backend_cartapp.models.entities.Product;
import com.valentina.backend.cartapp.backend_cartapp.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired // Injecting the ProductRepository
	private ProductRepository repository;

	@Override
	@Transactional(readOnly = true)
	public List<Product> findAll() {
		return (List<Product>) repository.findAll();
	}

}

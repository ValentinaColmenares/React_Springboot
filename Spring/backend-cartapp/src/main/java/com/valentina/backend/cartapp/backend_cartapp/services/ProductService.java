package com.valentina.backend.cartapp.backend_cartapp.services;

import java.util.List;
import com.valentina.backend.cartapp.backend_cartapp.models.entities.Product;

public interface ProductService {

  List<Product> findAll();
  
}

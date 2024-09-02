import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiURL: string = "https://fakestoreapi.com"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }


  getAllProduct(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/products`)
  }
  getElectronicsProduct(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/products/category/electronics`)
  }
  getJeweleryProduct(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/products/category/jewelery`)
  }
  getMensProduct(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/products/category/men's clothing`)
  }
  getWomensProduct(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/products/category/women's clothing`)
  }

  sortProductsByPrice(products: Product[], ascending: boolean = true): Product[] {
    return products.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
  }

  sortProductsByRating(products: Product[], ascending: boolean = true): Product[] {
    return products.sort((a, b) => (ascending ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate));
  }
  
  searchProducts(products: Product[], query: string): Product[] {
    query = query.toLowerCase(); // Convert the query to lowercase for case-insensitive search
  
    return products.filter(product => 
      product.id.toString().includes(query) ||            
      product.title.toLowerCase().includes(query) ||      
      product.price.toString().includes(query) ||         
      product.category.toLowerCase().includes(query) ||   
      product.description.toLowerCase().includes(query)  || 
    
      product.rating.rate.toString().includes(query) ||  
      product.rating.count.toString().includes(query)
    );
  }
  
    // Add new product (POST request)
    addProduct(product: Product): Observable<Product> {
      return this.http.post<Product>(`${this.apiURL}/products`, product, this.httpOptions);
    }
  
    // Update existing product (PUT request)
    updateProduct(product: Product): Observable<Product> {
      return this.http.put<Product>(`${this.apiURL}/products/${product.id}`, product, this.httpOptions);
    }
  
    // Delete product (DELETE request)
    deleteProduct(productId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiURL}/products/${productId}`, this.httpOptions);
    }
  

}

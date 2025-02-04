import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server_url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllProductsApi() {
    return this.http.get(`${this.server_url}/all-products`);
  }

  viewProductApi(productId: string) {
    return this.http.get(`${this.server_url}/products/${productId}/view`);
  }

  relatedProductApi(category: string) {
    return this.http.get(
      `${this.server_url}/related-products?category=${category}`
    );
  }

  addTestimonyApi(reqBody: any) {
    return this.http.post(`${this.server_url}/addtestimony`, reqBody);
  }

  addUserApi(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody);
  }

  loginApi(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody);
  }

  appendToken() {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    // header must be a object so we enclosed in a curly braces
    return { headers };
  }

  addToWishlist(productId: any, reqBody: any) {
    return this.http.post(
      `${this.server_url}/products/${productId}/wishlist`,
      reqBody,
      this.appendToken()
    );
  }

  getAllWishlist() {
    return this.http.get(`${this.server_url}/wishlist`, this.appendToken());
  }

  removeProductWishlistApi(id: any) {
    return this.http.delete(
      `${this.server_url}/wishlist/${id}/remove`,
      this.appendToken()
    );
  }

  addToCartApi(productId: any, reqBody: any) {
    return this.http.post(
      `${this.server_url}/products/${productId}/cart`,
      reqBody,
      this.appendToken()
    );
  }

  getAllCart() {
    return this.http.get(`${this.server_url}/cart`, this.appendToken());
  }

  updateProductCountApi(productId: string, reqBody: any) {
    return this.http.put(
      `${this.server_url}/cart/${productId}/updatecount`,
      reqBody,
      this.appendToken()
    );
  }

  emptyCartProudctsApi() {
    return this.http.delete(
      `${this.server_url}/cart-empty`,
      this.appendToken()
    );
  }

  removeProductCartApi(id: any) {
    return this.http.delete(
      `${this.server_url}/cart/${id}/remove`,
      this.appendToken()
    );
  }

  checkoutProductOrderApi(reqbody: any) {
    return this.http.post(
      `${this.server_url}/order`,
      reqbody,
      this.appendToken()
    );
  }

  paymentValidationApi(reqBody: any) {
    return this.http.post(
      `${this.server_url}/order/validate`,
      reqBody,
      this.appendToken()
    );
  }

  getAllOrderDetailsApi() {
    return this.http.get(`${this.server_url}/get-orders`, this.appendToken());
  }

  getUserDetailsApi() {
    return this.http.get(`${this.server_url}/get-user`, this.appendToken());
  }
  updateUserDetailsApi(reqbody: any) {
    return this.http.put(
      `${this.server_url}/update-user`,
      reqbody,
      this.appendToken()
    );
  }
}

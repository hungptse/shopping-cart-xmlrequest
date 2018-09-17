/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.dtos;

import java.io.Serializable;
import java.util.HashMap;

/**
 *
 * @author THANH HUNG
 */
public class CartDTO implements Serializable {

    private String username;
    private HashMap<Integer, ProductDTO> cart;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public HashMap<Integer, ProductDTO> getCart() {
        return cart;
    }

    public CartDTO(String username) {
        this.username = username;
        this.cart = new HashMap<>();
    }

    public CartDTO() {
        this.username = "Guest";
        this.cart = new HashMap<>();
    }

    public void addToCart(ProductDTO product) {
        if (this.cart.containsKey(product.getId())) {
            int quantity = this.cart.get(product.getId()).getQuantity() + 1;
            product.setQuantity(quantity);
        }
        this.cart.put(product.getId(), product);
    }

    public void remove(int id) {
        this.cart.remove(id);
    }

    public void update(int id, int quantity) {
        ProductDTO dto = this.cart.get(id);
        if (dto != null) {
            dto.setQuantity(quantity);
            this.cart.put(id, dto);
        }
    }


    public void clearCart() {
        if (cart != null) {
            cart.clear();
        }
    }
}

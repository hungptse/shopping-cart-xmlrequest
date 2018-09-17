/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.dtos;

import java.io.Serializable;

/**
 *
 * @author THANH HUNG
 */
public class ProductDTO implements Serializable{
    private int id, quantity;
    private String name, description, image;
    private double price;

    public ProductDTO() {
    }

    
    
    public ProductDTO(int id, int quantity, String name, String description, String image, double price) {
        this.id = id;
        this.quantity = quantity;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "ProductDTO{" + "id=" + id + ", quantity=" + quantity + ", name=" + name + ", description=" + description + ", image=" + image + ", price=" + price + '}';
    }

    
    
    
    
    
    
}

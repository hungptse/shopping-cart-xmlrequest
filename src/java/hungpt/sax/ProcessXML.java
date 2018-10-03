/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.sax;

import hungpt.dtos.ProductDTO;
import java.util.ArrayList;
import java.util.List;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;



/**
 *
 * @author THANH HUNG
 */
public class ProcessXML extends DefaultHandler{
    private int id, quantity;
    private String name, description, image;
    private double price;
    
    private boolean isId = false, isName = false, isDes = false, isPrice = false, isQuant = false, isImage = false;
    
    private List<ProductDTO> listResult = new ArrayList<>();

    public List<ProductDTO> getListResult() {
        return listResult;
    }

    public void setListResult(List<ProductDTO> listResult) {
        this.listResult = listResult;
    }

 
    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        if(qName.equals("id")){
            isId = true;
        }else if(qName.equals("name")){
            isName = true;
        } else if(qName.equals("description")){
            isDes = true;
        } else if(qName.equals("price")){
            isPrice = true;
        } else if(qName.equals("quantity")){
            isQuant = true;
        } else if(qName.equals("image")){
            isImage = true;
        }
    }
    
    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        String str = new String(ch, start,length).trim();
        if(isId){
            id = Integer.parseInt(str);
            isId = false;
        }else if(isQuant){
            quantity = Integer.parseInt(str);
            isQuant = false;
        }else if(isName){
            name = str;
            isName = false;
        } else if(isDes){
            description = str;
            isDes = false;
        } else if(isImage){
            image = str;
            isImage = false;
        } else if(isPrice){
            price = Float.parseFloat(str);
            isPrice = false;
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        if(qName.equals("Product")){
            ProductDTO dto = new ProductDTO(id, quantity, name, description, image, price);
            listResult.add(dto);
        }
    }
}

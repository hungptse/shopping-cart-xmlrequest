/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.dtos;

import java.io.Serializable;
import java.sql.Date;

/**
 *
 * @author THANH HUNG
 */
public class OrderDTO implements Serializable{
    private int id;
    private Date createdTime;
    private double total;
    private String username;
}

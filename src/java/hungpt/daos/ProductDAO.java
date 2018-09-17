/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.daos;

import hungpt.dtos.ProductDTO;
import hungpt.utils.DBUtils;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author THANH HUNG
 */
public class ProductDAO implements Serializable {

    private Connection conn;
    private PreparedStatement preStm;
    private ResultSet rs;
    private static ProductDAO dao;
    public void closeConnection() throws SQLException {
        if (rs != null) {
            rs.close();
        }
        if (preStm != null) {
            preStm.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    
    public static ProductDAO getInstance()
    {
        if (dao == null) {
            dao = new ProductDAO();
        }
        return dao;
    }
    public ArrayList<ProductDTO> getAllProduct() throws SQLException, ClassNotFoundException
    {
        ArrayList<ProductDTO> result = null;
        ProductDTO dto;
        try {
            conn = DBUtils.getConnection();
            if (conn != null) {
                String sql = "SELECT id, name, description, price, quantity, image FROM tblProduct";
                preStm = conn.prepareStatement(sql);
                rs = preStm.executeQuery();
                result = new ArrayList<>();
                while (rs.next()) {
                    dto = new ProductDTO(rs.getInt("id"), rs.getInt("quantity"), rs.getString("name"), rs.getString("description"), rs.getString("image"), rs.getDouble("price"));
                    result.add(dto);
                }
            }
        } finally {
            closeConnection();
        }
        
        return result;
    }
    
    public ProductDTO getProductById(int id) throws SQLException, ClassNotFoundException {
        ProductDTO dto = null;
        try {
            conn = DBUtils.getConnection();
            if (conn != null) {
                String sql = "SELECT id, name, description, price, quantity, image FROM tblProduct WHERE id = ?";
                preStm = conn.prepareStatement(sql);
                preStm.setInt(1, id);
                rs = preStm.executeQuery();
                if (rs.next()) {
                    dto = new ProductDTO(rs.getInt("id"), 0, rs.getString("name"), rs.getString("description"), rs.getString("image"), rs.getDouble("price"));
                }
            }
        } finally {
            closeConnection();
        }

        return dto;
    }
    
    
    
    public ArrayList<ProductDTO> getProductTop() throws SQLException, ClassNotFoundException
    {
        ArrayList<ProductDTO> result = null;
        ProductDTO dto;
        try {
            conn = DBUtils.getConnection();
            if (conn != null) {
                String sql = "SELECT id, name, description, price, quantity, image FROM tblProduct";
                preStm = conn.prepareStatement(sql);
                rs = preStm.executeQuery();
                result = new ArrayList<>();
                while (rs.next()) {
                    dto = new ProductDTO(rs.getInt("id"), rs.getInt("quantity"), rs.getString("name"), rs.getString("description"), rs.getString("image"), rs.getDouble("price"));
                    result.add(dto);
                }
            }
        } finally {
            closeConnection();
        }
        
        return result;
    }
}

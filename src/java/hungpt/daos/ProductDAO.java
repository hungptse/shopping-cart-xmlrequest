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
import java.util.List;

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

    public static ProductDAO getInstance() {
        if (dao == null) {
            dao = new ProductDAO();
        }
        return dao;
    }

    public ArrayList<ProductDTO> getAllProduct() throws SQLException, ClassNotFoundException {
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

    public boolean updateProduct(ProductDTO dto) throws SQLException, ClassNotFoundException {
        boolean result = false;
        try {
            conn = DBUtils.getConnection();
            if (conn != null) {
                String sql = "UPDATE tblProduct SET name = ? , description = ?, price = ?, quantity = ? WHERE id = ?";
                preStm = conn.prepareStatement(sql);
                preStm.setString(1, dto.getName());
                preStm.setString(2, dto.getDescription());
                preStm.setDouble(3, dto.getPrice());
                preStm.setInt(4, dto.getQuantity());
                preStm.setInt(5, dto.getId());
                result = preStm.executeUpdate() > 0;
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
                    dto = new ProductDTO(rs.getInt("id"), rs.getInt("quantity"), rs.getString("name"), rs.getString("description"), rs.getString("image"), rs.getDouble("price"));
                }
            }
        } finally {
            closeConnection();
        }

        return dto;
    }

    public ArrayList<ProductDTO> getProductFromTo(int from, int to) throws SQLException, ClassNotFoundException
    {
        ArrayList<ProductDTO> result = null;
        ProductDTO dto = null;
        try {
            conn = DBUtils.getConnection();
            if (conn != null) {
                String sql = "SELECT id, name, description, price, quantity, image  FROM tblProduct WHERE id BETWEEN ? AND ?";
                preStm = conn.prepareStatement(sql);
                preStm.setInt(1, from);
                preStm.setInt(2, to);
                rs = preStm.executeQuery();
                result = new ArrayList<>();
                while(rs.next()) {
                    dto = new ProductDTO();
                    dto.setId(rs.getInt("id"));
                    dto.setName(rs.getString("name"));
                    dto.setDescription(rs.getString("description"));
                    dto.setPrice(rs.getDouble("price"));
                    dto.setQuantity(rs.getInt("quantity"));
                    dto.setImage(rs.getString("image"));
                    result.add(dto);
                }
            }
        } finally {
            closeConnection();
        }
        
        return result;
    }
    
    
    public boolean insertProduct(ProductDTO dto) throws SQLException, ClassNotFoundException {
        boolean result = false;
        try {
            conn = DBUtils.getConnection();
            if (conn != null) {
                String sql = "INSERT INTO tblProduct(name,description,price,quantity) VALUES(?,?,?,?)";
                preStm = conn.prepareStatement(sql);
                preStm.setString(1, dto.getName());
                preStm.setString(2, dto.getDescription());
                preStm.setDouble(3, dto.getPrice());
                preStm.setInt(4, dto.getQuantity());
                result = preStm.executeUpdate() > 0;
            }
        } finally {
            closeConnection();
        }
        return result;
    }
    
      public boolean deleteProduct(int id) throws SQLException, ClassNotFoundException {
        boolean result = false;
        try {
            conn = DBUtils.getConnection();
            if (conn != null) {
                String sql = "DELETE FROM tblProduct WHERE id = ?";
                preStm = conn.prepareStatement(sql);
                preStm.setInt(1, id);
                result = preStm.executeUpdate() > 0;
            }
        } finally {
            closeConnection();
        }
        return result;
    }
      
      public List<ProductDTO> findLikeByName(String search) throws SQLException, ClassNotFoundException
      {
          List<ProductDTO> result = null;
          try {
              conn = DBUtils.getConnection();
              if (conn != null) {
                  String sql = "SELECT id, name, description, price, quantity, image FROM tblProduct WHERE name LIKE ?";
                  preStm = conn.prepareStatement(sql);
                  preStm.setString(1, "%" + search + "%");
                  rs = preStm.executeQuery();
                  result = new ArrayList<>();
                  while (rs.next()) {
                        result.add(new ProductDTO(rs.getInt("id"),rs.getInt("quantity"), rs.getString("name"), rs.getString("description"), rs.getString("image"), rs.getDouble("price")));
                  }
              }
          } finally {
              closeConnection();
          }
          return result;
      }
      
     public int countProduct() throws SQLException, ClassNotFoundException
     {
         int count = 0;
          try {
              conn = DBUtils.getConnection();
              if (conn != null) {
                  String sql = "SELECT COUNT(*) FROM tblProduct";
                  preStm = conn.prepareStatement(sql);
                  rs = preStm.executeQuery();
                  if (rs.next()) {
                      count = rs.getInt(1);
                  }
              }
          } finally {
              closeConnection();
          }
         
         return count;
     }
}

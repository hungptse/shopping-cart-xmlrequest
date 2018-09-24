/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.utils;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author THANH HUNG
 */
public class DBUtils implements Serializable{
    
    public static Connection getConnection() throws SQLException, ClassNotFoundException
    {
       Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
       Connection conn = DriverManager.getConnection("jdbc:sqlserver://shoppingcart-hungpt.database.windows.net:1433;database=ShoppingCart", "hungpt@shoppingcart-hungpt", "Hungbi1998");
       return conn;
    }
}

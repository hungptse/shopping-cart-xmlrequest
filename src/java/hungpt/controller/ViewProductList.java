/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.controller;

import hungpt.daos.ProductDAO;
import hungpt.dtos.ProductDTO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author THANH HUNG
 */
public class ViewProductList extends HttpServlet {

   
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/xml;charset=UTF-8");
        try {
            ProductDAO dao = ProductDAO.getInstance();
            ServletContext context = getServletContext();
            ArrayList<ProductDTO> listProduct = (ArrayList<ProductDTO>) context.getAttribute("listProduct");
            if (listProduct == null) {
                listProduct = dao.getAllProduct();
                context.setAttribute("listProduct", listProduct);
            }
            PrintWriter pw = response.getWriter();
            pw.append("<Products>");
            for (ProductDTO dto : listProduct) {
                pw.append("<Product>");
                pw.append("<id>").append(dto.getId() + "").append("</id>");
                pw.append("<name>").append(dto.getName()).append("</name>");
                pw.append("<description>").append(dto.getDescription()).append("</description>");
                pw.append("<price>").append(dto.getPrice() + "").append("</price>");
                pw.append("<quantity>").append(dto.getQuantity() + "").append("</quantity>");
                pw.append("<image>").append(dto.getImage()).append("</image>");
                pw.append("</Product>");
            }
            pw.append("</Products>");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

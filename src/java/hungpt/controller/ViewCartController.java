/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.controller;

import hungpt.dtos.CartDTO;
import hungpt.dtos.ProductDTO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author THANH HUNG
 */
public class ViewCartController extends HttpServlet {

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
            HttpSession session = request.getSession();
            CartDTO cart = (CartDTO) session.getAttribute("shoppingCart");
            PrintWriter pw = response.getWriter();
            pw.append("<Cart>");
            if (cart != null) {
                for (ProductDTO dto : cart.getCart().values()) {
                    pw.append("<Product>");
                    pw.append("<id>").append(dto.getId() + "").append("</id>");
                    pw.append("<name>").append(dto.getName()).append("</name>");
                    pw.append("<description>").append(dto.getDescription()).append("</description>");
                    pw.append("<price>").append(dto.getPrice() + "").append("</price>");
                    pw.append("<quantity>").append(dto.getQuantity() + "").append("</quantity>");
                    pw.append("<image>").append(dto.getImage()).append("</image>");
                    pw.append("</Product>");
                }
            }
            pw.append("</Cart>");
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

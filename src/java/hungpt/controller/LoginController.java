/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.controller;

import hungpt.daos.UserDAO;
import hungpt.dtos.CartDTO;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author THANH HUNG
 */
public class LoginController extends HttpServlet {

    private final static String ADMIN = "admin.html";
    private final static String USER = "shop.jsp";
    private static final String ERROR = "login.jsp";

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
        response.setContentType("text/html;charset=UTF-8");
        String url = ERROR;
        HttpSession session = request.getSession();
        try {
            PrintWriter pw = response.getWriter();
            String username = request.getParameter("txtUsername");
            String password = request.getParameter("txtPassword");
            UserDAO dao = new UserDAO();
            String role = dao.checkLogin(username, password);
            if (role.equals("failed")) {
                request.setAttribute("ERROR", "Invalid username or password");
                pw.append("Invalid username or password");
            } else {
                if (role.equals("admin")) {
                    url = ADMIN;
                    session.setAttribute("USERNAME", username);
                } else if (role.equals("user")) {
                    url = USER;
                    session.setAttribute("USERNAME", username);
                    CartDTO cart = (CartDTO) session.getAttribute("shoppingCart");
                    if (cart != null) {
                        cart.setUsername(username);
                    }
                } else {
                    request.setAttribute("ERROR", "Your role not existed");
                    pw.append("Your role not existed");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
//            request.getRequestDispatcher(url).forward(request, response);
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

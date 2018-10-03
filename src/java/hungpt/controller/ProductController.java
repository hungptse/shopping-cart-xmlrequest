/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hungpt.controller;

import hungpt.daos.ProductDAO;
import hungpt.dtos.ProductDTO;
import hungpt.sax.ProcessXML;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

/**
 *
 * @author THANH HUNG
 */
public class ProductController extends HttpServlet {

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
        response.setContentType("text/xml;charset=UTF-8");
        PrintWriter pw = response.getWriter();
        try {
            String id = request.getParameter("id");
            ProductDAO dao = ProductDAO.getInstance();
            if (id == null) {
                List<ProductDTO> listProduct = dao.getAllProduct();
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
            } else {
                ProductDTO dto = dao.getProductById(Integer.parseInt(id));
                pw.append("<Product>");
                pw.append("<id>").append(dto.getId() + "").append("</id>");
                pw.append("<name>").append(dto.getName()).append("</name>");
                pw.append("<description>").append(dto.getDescription()).append("</description>");
                pw.append("<price>").append(dto.getPrice() + "").append("</price>");
                pw.append("<quantity>").append(dto.getQuantity() + "").append("</quantity>");
                pw.append("<image>").append(dto.getImage()).append("</image>");
                pw.append("</Product>");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            pw.close();
        }
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
        try {
            ProcessXML xml = new ProcessXML();
            SAXParserFactory spf = SAXParserFactory.newInstance();
            SAXParser parser = spf.newSAXParser();
            parser.parse(request.getInputStream(), xml);
            List<ProductDTO> result = xml.getListResult();
            //test nao
            ProductDAO dao = ProductDAO.getInstance();
            boolean check = dao.insertProduct(result.get(0));
            if (check) {
                System.out.println("OK");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            ProcessXML xml = new ProcessXML();
            SAXParserFactory spf = SAXParserFactory.newInstance();
            SAXParser parser = spf.newSAXParser();
            parser.parse(req.getInputStream(), xml);
            List<ProductDTO> result = xml.getListResult();
            //test nao
            ProductDAO dao = ProductDAO.getInstance();
            boolean check = dao.updateProduct(result.get(0));
            if (check) {
                System.out.println("OK");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        ProductDAO dao = ProductDAO.getInstance();
        
        try {
            boolean check = dao.deleteProduct(Integer.parseInt(id));
            if (check) {
                System.out.println("DELETED");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
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

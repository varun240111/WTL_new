package com.bookstore;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import org.bson.Document;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * BookListServlet - Retrieves books from MongoDB and displays them in HTML table
 */
@WebServlet(name = "BookListServlet", urlPatterns = {"/books", "/list"})
public class BookListServlet extends HttpServlet {

    @Override
    public void init() throws ServletException {
        super.init();
        // Initialize MongoDB connection
        MongoDBConnection.initialize();
        System.out.println("BookListServlet initialized - MongoDB connection established");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        try {
            List<Book> books = getAllBooks();

            // Generate HTML response
            out.println("<!DOCTYPE html>");
            out.println("<html lang=\"en\">");
            out.println("<head>");
            out.println("    <meta charset=\"UTF-8\">");
            out.println("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
            out.println("    <title>Bookstore - Book List</title>");
            out.println("    <link rel=\"stylesheet\" href=\"css/style.css\">");
            out.println("</head>");
            out.println("<body>");
            out.println("    <div class=\"container\">");
            out.println("        <header>");
            out.println("            <h1>📚 Welcome to BookStore</h1>");
            out.println("            <p>Explore our collection of books</p>");
            out.println("        </header>");

            if (books.isEmpty()) {
                out.println("        <div class=\"alert alert-info\">");
                out.println("            <p>No books available at the moment.</p>");
                out.println("        </div>");
            } else {
                out.println("        <div class=\"table-wrapper\">");
                out.println("            <table class=\"books-table\">");
                out.println("                <thead>");
                out.println("                    <tr>");
                out.println("                        <th>Book ID</th>");
                out.println("                        <th>Title</th>");
                out.println("                        <th>Author</th>");
                out.println("                        <th>Price (₹)</th>");
                out.println("                        <th>Quantity</th>");
                out.println("                    </tr>");
                out.println("                </thead>");
                out.println("                <tbody>");

                for (Book book : books) {
                    out.println("                    <tr>");
                    out.println("                        <td>" + escapeHtml(book.getBookId()) + "</td>");
                    out.println("                        <td>" + escapeHtml(book.getBookTitle()) + "</td>");
                    out.println("                        <td>" + escapeHtml(book.getBookAuthor()) + "</td>");
                    out.println("                        <td>₹" + String.format("%.2f", book.getBookPrice()) + "</td>");
                    out.println("                        <td class=\"quantity\">" + book.getQuantity() + "</td>");
                    out.println("                    </tr>");
                }

                out.println("                </tbody>");
                out.println("            </table>");
                out.println("        </div>");
                out.println("        <div class=\"stats\">");
                out.println("            <p><strong>Total Books:</strong> " + books.size() + "</p>");
                out.println("        </div>");
            }

            out.println("        <footer>");
            out.println("            <p>&copy; 2024 BookStore. All rights reserved.</p>");
            out.println("        </footer>");
            out.println("    </div>");
            out.println("</body>");
            out.println("</html>");

        } catch (Exception e) {
            out.println("<html><body>");
            out.println("<h1>Error</h1>");
            out.println("<p>An error occurred while retrieving books: " + e.getMessage() + "</p>");
            out.println("</body></html>");
            e.printStackTrace();
        } finally {
            out.close();
        }
    }

    /**
     * Retrieve all books from MongoDB
     */
    private List<Book> getAllBooks() {
        List<Book> books = new ArrayList<>();
        MongoCollection<Document> collection = MongoDBConnection.getBooksCollection();

        try (MongoCursor<Document> cursor = collection.find().iterator()) {
            while (cursor.hasNext()) {
                Document doc = cursor.next();
                Book book = new Book();
                book.setBookId(doc.getString("book_id"));
                book.setBookTitle(doc.getString("book_title"));
                book.setBookAuthor(doc.getString("book_author"));
                book.setBookPrice(doc.getDouble("book_price"));
                book.setQuantity(doc.getInteger("quantity"));
                books.add(book);
            }
        }

        return books;
    }

    /**
     * Helper method to escape HTML special characters
     */
    private String escapeHtml(String text) {
        if (text == null) {
            return "";
        }
        return text.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#039;");
    }

    @Override
    public void destroy() {
        super.destroy();
        // Close MongoDB connection
        MongoDBConnection.close();
        System.out.println("BookListServlet destroyed - MongoDB connection closed");
    }
}

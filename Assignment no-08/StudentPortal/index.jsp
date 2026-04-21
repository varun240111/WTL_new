<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.util.*" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portal - View All Students</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 Student Portal</h1>
            <p>College Student Information System</p>
        </div>
        
        <div class="content">
            <%
                // Database connection variables
                Connection conn = null;
                Statement stmt = null;
                ResultSet rs = null;
                String driver = "com.mysql.jdbc.Driver";
                String url = "jdbc:mysql://localhost:3306/student_db";
                String username = "root";
                String password = "";
                
                try {
                    // Load MySQL driver
                    Class.forName(driver);
                    
                    // Establish connection
                    conn = DriverManager.getConnection(url, username, password);
                    
                    // Create statement
                    stmt = conn.createStatement();
                    
                    // Execute SQL query
                    String query = "SELECT stud_id, stud_name, class, division, city FROM students_info ORDER BY stud_id";
                    rs = stmt.executeQuery(query);
                    
                    // Display success message
                    out.println("<div class='success-message'>");
                    out.println("<strong>✓ Database Connected Successfully!</strong>");
                    out.println("</div>");
                    
                    // Check if resultset has data
                    if (rs != null) {
                        // Display table
                        out.println("<table>");
                        out.println("<thead>");
                        out.println("<tr>");
                        out.println("<th>Student ID</th>");
                        out.println("<th>Name</th>");
                        out.println("<th>Class</th>");
                        out.println("<th>Division</th>");
                        out.println("<th>City</th>");
                        out.println("</tr>");
                        out.println("</thead>");
                        out.println("<tbody>");
                        
                        int count = 0;
                        while (rs.next()) {
                            count++;
                            int studId = rs.getInt("stud_id");
                            String studName = rs.getString("stud_name");
                            String studClass = rs.getString("class");
                            String division = rs.getString("division");
                            String city = rs.getString("city");
                            
                            out.println("<tr>");
                            out.println("<td class='stud-id'>" + studId + "</td>");
                            out.println("<td>" + studName + "</td>");
                            out.println("<td>" + studClass + "</td>");
                            out.println("<td>" + division + "</td>");
                            out.println("<td>" + city + "</td>");
                            out.println("</tr>");
                        }
                        
                        out.println("</tbody>");
                        out.println("</table>");
                        out.println("<div class='info-box'>");
                        out.println("<strong>Total Students Found: " + count + "</strong>");
                        out.println("</div>");
                    }
                    
                } catch (ClassNotFoundException e) {
                    out.println("<div class='error-message'>");
                    out.println("<strong>Error:</strong> MySQL JDBC Driver not found!<br>");
                    out.println("Please add mysql-connector-java JAR file to WEB-INF/lib directory.");
                    out.println("</div>");
                    e.printStackTrace(System.err);
                } catch (SQLException e) {
                    out.println("<div class='error-message'>");
                    out.println("<strong>Error:</strong> Database Connection Failed!<br>");
                    out.println("Error Message: " + e.getMessage() + "<br>");
                    out.println("Please ensure:<br>");
                    out.println("1. MySQL server is running<br>");
                    out.println("2. Database 'student_db' exists<br>");
                    out.println("3. Connection details are correct in this JSP file<br>");
                    out.println("</div>");
                    e.printStackTrace(System.err);
                } catch (Exception e) {
                    out.println("<div class='error-message'>");
                    out.println("<strong>Error:</strong> An unexpected error occurred!<br>");
                    out.println("Error: " + e.getMessage());
                    out.println("</div>");
                    e.printStackTrace(System.err);
                } finally {
                    // Close resources
                    try {
                        if (rs != null) rs.close();
                        if (stmt != null) stmt.close();
                        if (conn != null) conn.close();
                    } catch (SQLException e) {
                        e.printStackTrace(System.err);
                    }
                }
            %>
        </div>
        
        <div class="footer">
            <p>&copy; 2024 Student Portal | College Information System</p>
            <p>Built with JSP and MySQL Database</p>
        </div>
    </div>
</body>
</html>

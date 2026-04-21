package com.bookstore;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

/**
 * MongoDB Connection Utility Class
 * Manages connection to MongoDB and provides access to database and collections
 */
public class MongoDBConnection {
    private static MongoClient mongoClient;
    private static final String CONNECTION_STRING = "mongodb://localhost:27017";
    private static final String DATABASE_NAME = "bookstore_db";
    private static final String COLLECTION_NAME = "ebook_shop";

    /**
     * Initialize MongoDB connection (call once at application startup)
     */
    public static void initialize() {
        if (mongoClient == null) {
            mongoClient = MongoClients.create(CONNECTION_STRING);
        }
    }

    /**
     * Get the MongoDB database
     */
    public static MongoDatabase getDatabase() {
        if (mongoClient == null) {
            initialize();
        }
        return mongoClient.getDatabase(DATABASE_NAME);
    }

    /**
     * Get the books collection
     */
    public static MongoCollection<Document> getBooksCollection() {
        return getDatabase().getCollection(COLLECTION_NAME);
    }

    /**
     * Close the MongoDB connection (call at application shutdown)
     */
    public static void close() {
        if (mongoClient != null) {
            mongoClient.close();
        }
    }

    /**
     * Create sample data in the collection
     */
    public static void createSampleData() {
        MongoCollection<Document> collection = getBooksCollection();

        // Clear existing data
        collection.deleteMany(new Document());

        // Insert sample books
        Document book1 = new Document()
                .append("book_id", "B001")
                .append("book_title", "Java Programming")
                .append("book_author", "Herbert Schildt")
                .append("book_price", 599.99)
                .append("quantity", 15);

        Document book2 = new Document()
                .append("book_id", "B002")
                .append("book_title", "Web Development with Servlets and JSP")
                .append("book_author", "Marty Hall")
                .append("book_price", 699.99)
                .append("quantity", 8);

        Document book3 = new Document()
                .append("book_id", "B003")
                .append("book_title", "MongoDB Basics")
                .append("book_author", "Kyle Banker")
                .append("book_price", 450.00)
                .append("quantity", 12);

        Document book4 = new Document()
                .append("book_id", "B004")
                .append("book_title", "Effective Java")
                .append("book_author", "Joshua Bloch")
                .append("book_price", 799.99)
                .append("quantity", 20);

        Document book5 = new Document()
                .append("book_id", "B005")
                .append("book_title", "Clean Code")
                .append("book_author", "Robert C. Martin")
                .append("book_price", 550.00)
                .append("quantity", 10);

        collection.insertMany(java.util.Arrays.asList(book1, book2, book3, book4, book5));
    }
}

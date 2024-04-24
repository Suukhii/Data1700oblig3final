package org.example.oblig3v2finale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repository class responsible for interacting with the database for Ticket-related operations
@Repository
public class TicketRepository {

    @Autowired // Establishes database connection
    private JdbcTemplate db; // JDBC Template class for database access

    // Method to save a ticket into the database
    public void saveTicket(Ticket inTicket){
        String sql = "INSERT INTO Ticket (movie, total, firstname, lastname, telefonnr, email) VALUES(?,?,?,?,?,?)";
        db.update(sql, inTicket.getMovie(),inTicket.getTotal(),inTicket.getFirstname(),inTicket.getLastname(),inTicket.getTelefonnr(),inTicket.getEmail());
    }

    // Method to retrieve all tickets from the database
    public List<Ticket> getAllTickets(){
        String sql = "SELECT * FROM Ticket ORDER BY lastname"; // Orders tickets alphabetically by last name
        List<Ticket> allTickets = db.query(sql, new BeanPropertyRowMapper(Ticket.class)); // Maps the query result to Ticket class
        return allTickets;
    }

    // Method to retrieve a single ticket by its ID from the database
    public Ticket getOneTicket(int id){
        Object[] param = new Object[1];
        param[0] = id;
        String sql = "SELECT * FROM Ticket WHERE id=?";
        Ticket oneTicket = db.queryForObject(sql, param, BeanPropertyRowMapper.newInstance(Ticket.class)); // Executes the query and maps the result to Ticket class
        return oneTicket;
    }

    // Method to update an existing ticket in the database
    public void changeOneTicket(Ticket ticket){
        String sql = "UPDATE Ticket SET movie=?, total=?, firstname=?, lastname=?, telefonnr=?, email=? where id=?";
        db.update(sql,ticket.getMovie(),ticket.getTotal(),ticket.getFirstname(),ticket.getLastname(),ticket.getTelefonnr(),ticket.getEmail(),ticket.getId());
    }

    // Method to delete a single ticket by its ID from the database
    public void deleteOneTicket(int id){
        String sql = "DELETE FROM Ticket WHERE id=?";
        db.update(sql,id);
    }

    // Method to delete all tickets from the database
    public void deleteAllTickets(){
        String sql = "DELETE FROM Ticket";
        db.update(sql);
    }
}

package org.example.oblig3v2finale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// Controller class responsible for handling HTTP requests related to tickets
@RestController
public class TicketController {

    @Autowired
    TicketRepository rep; // Autowired TicketRepository for database operations

    // Endpoint to save a new ticket
    @PostMapping("/save")
    public void saveTicket(Ticket inTicket){
        rep.saveTicket(inTicket);
    }

    // Endpoint to retrieve all tickets
    @GetMapping("/getAll")
    public List<Ticket> getAll(){
        return rep.getAllTickets();
    }

    // Endpoint to retrieve a single ticket by its ID
    @GetMapping("/getOneTicket")
    public Ticket getOneTicket(int id){
        return rep.getOneTicket(id);
    }

    // Endpoint to update an existing ticket
    @PostMapping("/changeOneTicket")
    public void changeOneTicket(Ticket ticket){
        rep.changeOneTicket(ticket);
    }

    // Endpoint to delete a single ticket by its ID
    @GetMapping("/deleteOneTicket")
    public void deleteOneTicket(int id){
        rep.deleteOneTicket(id);
    }

    // Endpoint to delete all tickets
    @GetMapping("/deleteAll")
    public void deleteAll(){
        rep.deleteAllTickets();
    }
}

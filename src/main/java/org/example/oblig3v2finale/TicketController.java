package org.example.oblig3v2finale;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TicketController {

    @Autowired
    TicketRepository rep;

    @PostMapping("/save")
    public void saveTicket(Ticket inTicket){
        rep.saveTicket(inTicket);
    }

    @GetMapping("/getAll")
    public List<Ticket> getAll(){
        return rep.getAllTickets();
    }

    @GetMapping("/getOneTicket")
    public Ticket getOneTicket(int id){
        return rep.getOneTicket(id);
    }

    @PostMapping("/changeOneTicket")
    public void changeOneTicket(Ticket ticket){
        rep.changeOneTicket(ticket);
    }

    @GetMapping("/deleteOneTicket")
    public void deleteOneTicket(int id){
        rep.deleteOneTicket(id);
    }

    @GetMapping("/deleteAll")
    public void deleteAll(){
        rep.deleteAllTickets();
    }
}

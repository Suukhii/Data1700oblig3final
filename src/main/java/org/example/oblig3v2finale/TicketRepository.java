package org.example.oblig3v2finale;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepository {

    @Autowired //Henter knyttning til databasen
    private JdbcTemplate db; //Henter klassen JdbcTemplate, gir navn db. Bruker da db til å aksessere databasen

    public void saveTicket(Ticket inTicket){ //Her lagres en billett inne i databasen (lagre metode)
        String sql = "INSERT INTO Ticket (movie, total, firstname, lastname, telefonnr, email) VALUES(?,?,?,?,?,?)";
        db.update(sql, inTicket.getMovie(),inTicket.getTotal(),inTicket.getFirstname(),inTicket.getLastname(),inTicket.getTelefonnr(),inTicket.getEmail()); //Her legges inn verdiene for registrering av billett
    }

    public List<Ticket> getAllTickets(){ //Lar seg hente opp alle registrerte billetter i fra tabellen Billett (hente metode)
        String sql = "SELECT * FROM Ticket ORDER BY lastname"; //Setter opp billettene i alfabatisk rekkefølge etter etternavn
        List<Ticket> allTickets = db.query(sql, new BeanPropertyRowMapper(Ticket.class)); //BeanPropertyRowMapper tar en klasse definisjon. Klassen Billett blir da et objekt som man kan kalle med Billett definisjonen, og den mapper kolonnene i tabellen til klassen Billett
        return allTickets;
    }

    public Ticket getOneTicket(int id){ //Metode for å hente en billett basert på ID inne på databasen
        Object[] param = new Object[1]; //Oppretter en array med en enkelt plass for paramateren (ID)
        param[0] = id;
        String sql = "SELECT * FROM Ticket WHERE id=?";
        Ticket oneTicket = db.queryForObject(sql, param, BeanPropertyRowMapper.newInstance(Ticket.class)); //Utfører spørringen på databasen og mapper resultatet til en Billett-klasse
        return oneTicket;
    }

    public void changeOneTicket(Ticket ticket){ //Metode for å endre en billett inne på databasen
        String sql = "UPDATE Ticket SET movie=?, total=?, firstname=?, lastname=?, telefonnr=?, email=? where id=?";
        db.update(sql,ticket.getMovie(),ticket.getTotal(),ticket.getFirstname(),ticket.getLastname(),ticket.getTelefonnr(),ticket.getEmail(),ticket.getId());
    }

    public void deleteOneTicket(int id){ //Metode for å slette en billett fra tabellen inne på databasen
        String sql = "DELETE FROM Ticket WHERE id=?";
        db.update(sql,id);
    }

    public void deleteAllTickets(){ //Metode for å slette billettene fra tabellen inne på databasen
        String sql = "DELETE FROM Ticket";
        db.update(sql);
    }


}

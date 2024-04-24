package org.example.oblig3v2finale;

public class Ticket {
    private int id;
    private String movie;
    private String total;
    private String firstname;
    private String lastname;
    private String telefonnr;
    private String email;

    public Ticket(){ }

    public Ticket(int id, String movie, String total, String firstname, String lastname, String telefonnr, String email) {
        this.id = id;
        this.movie = movie;
        this.total = total;
        this.firstname = firstname;
        this.lastname = lastname;
        this.telefonnr = telefonnr;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMovie() {
        return movie;
    }

    public void setMovie(String movie) {
        this.movie = movie;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getTelefonnr() {
        return telefonnr;
    }

    public void setTelefonnr(String telefonnr) {
        this.telefonnr = telefonnr;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

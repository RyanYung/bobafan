package com.bobafan;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Review {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String storeName;
    private String drinkName;
    private Integer rating;
    private Integer sugarLevel;

    public Integer getId() {
        return id;
    }
    public String getStoreName() {
        return storeName;
    }
    public String getDrinkName() {
        return drinkName;
    }
    public int getRating() {
        return rating;
    }
    public int getSugarLevel() {
        return sugarLevel;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }
    public void setDrinkName(String drinkName) {
        this.drinkName = drinkName;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public void setSugarLevel(int sugarLevel) {
        this.sugarLevel = sugarLevel;
    }

}

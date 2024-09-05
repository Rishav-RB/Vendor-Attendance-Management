package com.tsp.TataSteelProj.attendance;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tsp.TataSteelProj.user.User;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponse {
    @JsonProperty("Date")
    private Date date;
    @JsonProperty("Canteen")
    private String canteen;
    @JsonProperty("Time")
    private String punch_Time;
    @JsonProperty("Type")
    private String flag;
    @JsonProperty("Trolley")
    private String trolley;
    @JsonProperty("UserId")
    private Integer userId;
    @JsonProperty("UserName")
    private String userName;
    @JsonProperty("Location")
    private String location;
    @JsonProperty("Meal")
    private String meal;
}

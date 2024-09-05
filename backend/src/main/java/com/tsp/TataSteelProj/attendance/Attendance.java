package com.tsp.TataSteelProj.attendance;

import com.tsp.TataSteelProj.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "attendance")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CompositeKey.class)
public class Attendance {
    @Id
    private Integer sp_no;
    @Id
    private Date date;
    @Id
    private String canteen;
    @Id
    private String punch_Time;
    @Id
    private String flag;
    @Id
    private String trolley;
    @ManyToOne
    private User user;
    private String location;
    private String meal;

}

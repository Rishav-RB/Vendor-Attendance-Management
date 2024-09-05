package com.tsp.TataSteelProj.attendance;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Objects;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CompositeKey {
    private Integer sp_no;
    private Date date;
    private String canteen;
    private String punch_Time;
    private String flag;
    private String trolley;

    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CompositeKey that = (CompositeKey) o;
        return Objects.equals(sp_no, that.sp_no) &&
                Objects.equals(date,that.date) &&
                Objects.equals(canteen,that.canteen) &&
                Objects.equals(punch_Time,that.punch_Time) &&
                Objects.equals(flag,that.flag) &&
                Objects.equals(trolley,that.trolley);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sp_no,date,canteen,punch_Time,flag,trolley);
    }
}

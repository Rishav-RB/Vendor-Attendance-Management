package com.tsp.TataSteelProj.attendance.Repository;

import com.tsp.TataSteelProj.attendance.Attendance;
import com.tsp.TataSteelProj.attendance.CompositeKey;
import com.tsp.TataSteelProj.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, CompositeKey> {
    Optional<Attendance> findByUser(User user);
    Optional<List<Attendance>> findAllByUser(User user);
    Optional<List<Attendance>> findByUserAndDateBetween(User user,Date startDate,Date endDate);
    Optional<List<Attendance>> findByUserAndCanteenAndDateBetween(User user,String canteen,Date startDate,Date endDate);
}

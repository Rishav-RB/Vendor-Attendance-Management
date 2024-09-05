package com.tsp.TataSteelProj.attendance;

import com.tsp.TataSteelProj.config.JwtService;
import com.tsp.TataSteelProj.user.User;
import com.tsp.TataSteelProj.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/test/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addAttendance(@RequestBody Attendance attendance){
        Attendance done=attendanceService.add_attendance(attendance);
        if(done==null) return ResponseEntity.ok("Failed to Add Attendance");
        else if(done.getFlag().equals("Attendance Already Submitted!")) return ResponseEntity.ok("Attendance Already Submitted!");
        else if(!done.getFlag().equals("sp_no mismatch")) return ResponseEntity.ok("Attendance Added Successfully!");
        return ResponseEntity.ok("SP Number does not match");
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<AttendanceResponse>> getAllAttendance(){
        return ResponseEntity.ok(attendanceService.get_all_attendance());
    }

    @GetMapping("/getValidity/{user_id}")
    public ResponseEntity<String> isValid(@PathVariable Integer user_id){
        if(attendanceService.validity(user_id)) return ResponseEntity.ok("Valid");
        return ResponseEntity.ok("Not Valid");
    }

    @GetMapping("/getUserByDate/{user_id}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByUserAndDate(@PathVariable Integer user_id, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end){
        return ResponseEntity.ok(attendanceService.get_attendance_by_date_id(user_id,start,end));
    }

    @GetMapping("/getUserByDateAndCanteen/{user_id}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByUserAndCanteenAndDate(@PathVariable Integer user_id,@RequestParam String canteen, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end){
        return ResponseEntity.ok(attendanceService.get_attendance_by_date_canteen_id(user_id,canteen,start,end));
    }


    //Use this code snippet to match the req user_id with access_token user_id!!
    @GetMapping("/getOne/{user_id}")
    public ResponseEntity<?> getOne(@PathVariable Integer user_id, HttpServletRequest request){
        String token = request.getHeader("Authorization").substring(7);
        String tokenUserId = jwtService.extractUsername(token);
        var userPresent=userRepository.findById(user_id);
        User user=null;
        if(userPresent.isPresent()) user=userPresent.get();
        if(user!=null && user.getEmail().equals(tokenUserId))
            return ResponseEntity.ok(attendanceService.get_attendance(user_id));
        return ResponseEntity.status(403).body("User ID mismatch");
    }
}

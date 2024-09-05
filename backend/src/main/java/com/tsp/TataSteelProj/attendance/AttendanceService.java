package com.tsp.TataSteelProj.attendance;

import com.tsp.TataSteelProj.attendance.Repository.AttendanceRepository;
import com.tsp.TataSteelProj.user.User;
import com.tsp.TataSteelProj.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    public Attendance add_attendance(Attendance attendance){
        var oldUser=userRepository.findById(attendance.getUser().getId());
        var oldAttendance=attendanceRepository.findById(new CompositeKey(attendance.getSp_no(),attendance.getDate(),attendance.getCanteen(),attendance.getPunch_Time(),attendance.getFlag(),attendance.getTrolley()));
        if(oldAttendance.isPresent()) return Attendance.builder().flag("Attendance Already Submitted!").build();
        if(oldUser.isPresent() && Objects.equals(oldUser.get().getSp_no(), attendance.getSp_no()))
            return attendanceRepository.save(attendance);
        return Attendance.builder().flag("sp_no mismatch").build();
    }

    public List<AttendanceResponse> get_all_attendance(){
        List<Attendance> all=attendanceRepository.findAll();
        List<AttendanceResponse> res=new ArrayList<>();
        for(Attendance a:all){
            res.add(AttendanceResponse
                    .builder()
                        .date(a.getDate())
                        .canteen(a.getCanteen())
                        .punch_Time(a.getPunch_Time())
                        .flag(a.getFlag())
                        .meal(a.getMeal())
                        .location(a.getLocation())
                        .trolley(a.getTrolley())
                        .userId(a.getUser().getId())
                        .userName(a.getUser().getFirstname()+" "+a.getUser().getLastname())
                    .build());
        }
        return res;
    }

    public Boolean validity(Integer user_id){
        var userPresent=userRepository.findById(user_id);
        User user=null;
        if(userPresent.isPresent()) user=userPresent.get();
        var attendancePresent=attendanceRepository.findAllByUser(user);
        List<Attendance> attendance=new ArrayList<>();
        if(attendancePresent.isPresent()) attendance=attendancePresent.get();
        int punchins=0;
        int punchouts=0;
        for(Attendance att:attendance){
            if(att.getFlag().equals("in")) punchins++;
            else if(att.getFlag().equals("out")) punchouts++;
        }
        return punchins==punchouts;
    }

    public List<AttendanceResponse> get_attendance(Integer user_id){
        var userPresent=userRepository.findById(user_id);
        User user=null;
        if(userPresent.isPresent()) user=userPresent.get();
        var attendancePresent=attendanceRepository.findAllByUser(user);
        List<Attendance> all=null;
        if(attendancePresent.isPresent()) all=attendancePresent.get();
        List<AttendanceResponse> res=new ArrayList<>();
        assert all != null;
        for(Attendance a:all){
            res.add(AttendanceResponse
                    .builder()
                    .date(a.getDate())
                    .canteen(a.getCanteen())
                    .punch_Time(a.getPunch_Time())
                    .flag(a.getFlag())
                    .meal(a.getMeal())
                    .location(a.getLocation())
                    .trolley(a.getTrolley())
                    .userId(a.getUser().getId())
                    .userName(a.getUser().getFirstname()+" "+a.getUser().getLastname())
                    .build());
        }
        return res;
    }

    public List<AttendanceResponse> get_attendance_by_date_id(Integer user_id, Date start, Date end){
        var userPresent=userRepository.findById(user_id);
        User user=null;
        if(userPresent.isPresent()) user=userPresent.get();
        var attendancePresent=attendanceRepository.findByUserAndDateBetween(user,start,end);
        List<Attendance> all=null;
        if(attendancePresent.isPresent()) all=attendancePresent.get();
        List<AttendanceResponse> res=new ArrayList<>();
        assert all != null;
        for(Attendance a:all){
            res.add(AttendanceResponse
                    .builder()
                    .date(a.getDate())
                    .canteen(a.getCanteen())
                    .punch_Time(a.getPunch_Time())
                    .flag(a.getFlag())
                    .meal(a.getMeal())
                    .location(a.getLocation())
                    .trolley(a.getTrolley())
                    .userId(a.getUser().getId())
                    .userName(a.getUser().getFirstname()+" "+a.getUser().getLastname())
                    .build());
        }
        return res;
    }
    public List<AttendanceResponse> get_attendance_by_date_canteen_id(Integer user_id,String canteen, Date start, Date end){
        var userPresent=userRepository.findById(user_id);
        User user=null;
        if(userPresent.isPresent()) user=userPresent.get();
        var attendancePresent=attendanceRepository.findByUserAndCanteenAndDateBetween(user,canteen,start,end);
        List<Attendance> all=null;
        if(attendancePresent.isPresent()) all=attendancePresent.get();
        List<AttendanceResponse> res=new ArrayList<>();
        assert all != null;
        for(Attendance a:all){
            res.add(AttendanceResponse
                    .builder()
                    .date(a.getDate())
                    .canteen(a.getCanteen())
                    .punch_Time(a.getPunch_Time())
                    .flag(a.getFlag())
                    .meal(a.getMeal())
                    .location(a.getLocation())
                    .trolley(a.getTrolley())
                    .userId(a.getUser().getId())
                    .userName(a.getUser().getFirstname()+" "+a.getUser().getLastname())
                    .build());
        }
        return res;
    }
}


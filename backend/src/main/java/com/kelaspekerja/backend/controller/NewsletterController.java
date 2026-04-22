package com.kelaspekerja.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/newsletter")
@RequiredArgsConstructor
public class NewsletterController {
    
    @PostMapping
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            if (email == null || email.trim().isEmpty() || !email.contains("@")) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Email yang valid diperlukan"
                ));
            }
            
            // TODO: Implement newsletter subscription logic
            // For now, just return success
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Berhasil berlangganan newsletter!"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Gagal berlangganan newsletter",
                "message", e.getMessage()
            ));
        }
    }
    
}

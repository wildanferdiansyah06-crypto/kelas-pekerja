package com.kelaspekerja.backend.controller;

import com.kelaspekerja.backend.model.Quote;
import com.kelaspekerja.backend.repository.QuoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/quotes")
@RequiredArgsConstructor
public class QuoteController {
    
    private final QuoteRepository quoteRepository;
    
    @GetMapping
    public ResponseEntity<?> getQuotes(@RequestParam(required = false) String category) {
        try {
            List<Quote> quotes;
            if (category != null && !category.isEmpty()) {
                quotes = quoteRepository.findByCategoryAndIsApprovedTrueOrderByCreatedAtDesc(category);
            } else {
                quotes = quoteRepository.findByIsApprovedTrueOrderByCreatedAtDesc();
            }
            return ResponseEntity.ok(Map.of("quotes", quotes));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to fetch quotes",
                "message", e.getMessage()
            ));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> submitQuote(@RequestBody Quote quote) {
        try {
            if (quote.getText() == null || quote.getText().trim().isEmpty() ||
                quote.getAuthor() == null || quote.getAuthor().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Quote dan penulis wajib diisi"
                ));
            }
            
            quote.setIsApproved(false);
            Quote savedQuote = quoteRepository.save(quote);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Quote berhasil dikirim! Menunggu approval admin untuk ditampilkan di website.",
                "quote", savedQuote
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Gagal menyimpan quote",
                "message", e.getMessage()
            ));
        }
    }
    
}

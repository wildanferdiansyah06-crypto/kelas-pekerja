package com.kelaspekerja.backend.controller;

import com.kelaspekerja.backend.model.Book;
import com.kelaspekerja.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    
    private final BookRepository bookRepository;
    
    @GetMapping
    public ResponseEntity<?> getBooks(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean featured,
            @RequestParam(required = false) Integer limit
    ) {
        try {
            List<Book> books;
            
            if (Boolean.TRUE.equals(featured)) {
                books = bookRepository.findByFeaturedTrueAndPublishedTrueOrderByCreatedAtDesc();
            } else if (search != null && !search.isEmpty()) {
                books = bookRepository.filterBooks(category, search);
            } else if (category != null && !category.isEmpty() && !category.equals("all")) {
                books = bookRepository.findByCategoryAndPublishedTrueOrderByCreatedAtDesc(category);
            } else {
                books = bookRepository.findByPublishedTrueOrderByCreatedAtDesc();
            }
            
            if (limit != null && limit > 0 && books.size() > limit) {
                books = books.subList(0, limit);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("books", books);
            response.put("total", books.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to fetch books",
                "message", e.getMessage()
            ));
        }
    }
    
    @GetMapping("/{slug}")
    public ResponseEntity<?> getBookBySlug(@PathVariable String slug) {
        try {
            return bookRepository.findBySlug(slug)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to fetch book",
                "message", e.getMessage()
            ));
        }
    }
    
}

package com.kelaspekerja.backend.controller;

import com.kelaspekerja.backend.model.BookView;
import com.kelaspekerja.backend.repository.BookViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/book-views")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class BookViewController {
    
    private final BookViewRepository bookViewRepository;
    
    @GetMapping("/{slug}")
    public ResponseEntity<?> getBookView(@PathVariable String slug) {
        try {
            return bookViewRepository.findBySlug(slug)
                    .map(view -> ResponseEntity.ok(Map.of("slug", slug, "views", view.getViews())))
                    .orElse(ResponseEntity.ok(Map.of("slug", slug, "views", 0)));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to fetch book views",
                "message", e.getMessage()
            ));
        }
    }
    
    @PostMapping("/increment")
    public ResponseEntity<?> incrementView(@RequestBody Map<String, String> request) {
        try {
            String slug = request.get("slug");
            if (slug == null || slug.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Slug is required"));
            }
            
            BookView bookView = bookViewRepository.findBySlug(slug)
                    .orElse(new BookView(null, slug, 0, null));
            
            bookView.setViews(bookView.getViews() + 1);
            bookViewRepository.save(bookView);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "views", bookView.getViews()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to increment view",
                "message", e.getMessage()
            ));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getAllBookViews() {
        try {
            Map<String, Integer> views = bookViewRepository.findAll().stream()
                    .collect(java.util.stream.Collectors.toMap(
                            BookView::getSlug,
                            BookView::getViews
                    ));
            return ResponseEntity.ok(views);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to fetch all book views",
                "message", e.getMessage()
            ));
        }
    }
    
}

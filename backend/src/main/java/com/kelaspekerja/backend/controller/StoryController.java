package com.kelaspekerja.backend.controller;

import com.kelaspekerja.backend.model.Story;
import com.kelaspekerja.backend.repository.StoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stories")
@RequiredArgsConstructor
public class StoryController {
    
    private final StoryRepository storyRepository;
    
    @GetMapping
    public ResponseEntity<?> getStories(@RequestParam(required = false) String category) {
        try {
            List<Story> stories;
            if (category != null && !category.isEmpty()) {
                stories = storyRepository.findByCategoryAndIsPublishedTrueOrderByCreatedAtDesc(category);
            } else {
                stories = storyRepository.findByIsPublishedTrueOrderByCreatedAtDesc();
            }
            return ResponseEntity.ok(Map.of("stories", stories));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to fetch stories",
                "message", e.getMessage()
            ));
        }
    }
    
    @GetMapping("/{slug}")
    public ResponseEntity<?> getStoryBySlug(@PathVariable String slug) {
        try {
            return storyRepository.findBySlug(slug)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to fetch story",
                "message", e.getMessage()
            ));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> submitStory(@RequestBody Story story) {
        try {
            if (story.getTitle() == null || story.getTitle().trim().isEmpty() ||
                story.getContent() == null || story.getContent().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Judul dan konten cerita wajib diisi"
                ));
            }
            
            story.setIsPublished(false);
            Story savedStory = storyRepository.save(story);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Cerita berhasil dikirim! Menunggu approval admin untuk ditampilkan di website.",
                "story", savedStory
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Gagal menyimpan cerita",
                "message", e.getMessage()
            ));
        }
    }
    
}

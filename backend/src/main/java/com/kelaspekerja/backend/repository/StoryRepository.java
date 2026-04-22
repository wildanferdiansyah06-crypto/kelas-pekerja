package com.kelaspekerja.backend.repository;

import com.kelaspekerja.backend.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    
    Optional<Story> findBySlug(String slug);
    
    List<Story> findByIsPublishedTrueOrderByCreatedAtDesc();
    
    List<Story> findByCategoryAndIsPublishedTrueOrderByCreatedAtDesc(String category);
    
}

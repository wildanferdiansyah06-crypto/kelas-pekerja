package com.kelaspekerja.backend.repository;

import com.kelaspekerja.backend.model.BookView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookViewRepository extends JpaRepository<BookView, Long> {
    
    Optional<BookView> findBySlug(String slug);
    
}

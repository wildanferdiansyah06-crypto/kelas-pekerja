package com.kelaspekerja.backend.repository;

import com.kelaspekerja.backend.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    
    Optional<Book> findBySlug(String slug);
    
    List<Book> findByPublishedTrueOrderByCreatedAtDesc();
    
    List<Book> findByFeaturedTrueAndPublishedTrueOrderByCreatedAtDesc();
    
    List<Book> findByCategoryAndPublishedTrueOrderByCreatedAtDesc(String category);
    
    @Query("SELECT b FROM Book b WHERE b.published = true AND " +
           "(LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Book> searchBooks(@Param("search") String search);
    
    @Query("SELECT b FROM Book b WHERE b.published = true AND " +
           "(:category IS NULL OR b.category = :category) AND " +
           "(:search IS NULL OR " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY b.createdAt DESC")
    List<Book> filterBooks(@Param("category") String category, @Param("search") String search);
    
}

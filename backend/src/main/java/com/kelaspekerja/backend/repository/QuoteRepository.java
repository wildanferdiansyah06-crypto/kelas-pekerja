package com.kelaspekerja.backend.repository;

import com.kelaspekerja.backend.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuoteRepository extends JpaRepository<Quote, Long> {
    
    List<Quote> findByIsApprovedTrueOrderByCreatedAtDesc();
    
    List<Quote> findByCategoryAndIsApprovedTrueOrderByCreatedAtDesc(String category);
    
}

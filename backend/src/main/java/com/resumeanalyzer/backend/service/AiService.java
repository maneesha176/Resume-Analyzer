package com.resumeanalyzer.backend.service;

import com.resumeanalyzer.backend.dto.AnalyzeRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class AiService {

    private final WebClient webClient;

    public AiService() {

        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:8000")
                .build();
    }

    public Map getAnalysis(
            String resumeText,
            String jobDescription
    ) {

        AnalyzeRequest request =
                new AnalyzeRequest(
                        resumeText,
                        jobDescription
                );

        return webClient.post()
                .uri("/analyze")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
    }
}
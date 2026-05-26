package com.resumeanalyzer.backend.controller;

import com.resumeanalyzer.backend.service.AiService;
import com.resumeanalyzer.backend.service.PdfService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyzeController {

    private final PdfService pdfService;
    private final AiService aiService;

    public AnalyzeController(
            PdfService pdfService,
            AiService aiService
    ) {
        this.pdfService = pdfService;
        this.aiService = aiService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(
            @RequestParam("name") String name,
            @RequestParam("jobDescription") String jobDescription,
            @RequestParam("resume") MultipartFile resume
    ) {

        try {

            String resumeText =
                    pdfService.extractText(resume);

            java.util.Map response =
                    aiService.getAnalysis(
                            resumeText,
                            jobDescription
                    );

            response.put("name", name);

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body("Error analyzing resume");
        }
    }
}
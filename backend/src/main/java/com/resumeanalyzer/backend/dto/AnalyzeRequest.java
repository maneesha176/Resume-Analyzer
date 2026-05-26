package com.resumeanalyzer.backend.dto;

public class AnalyzeRequest {

    private String resumeText;
    private String jobDescription;

    public AnalyzeRequest(String resumeText, String jobDescription) {
        this.resumeText = resumeText;
        this.jobDescription = jobDescription;
    }

    public String getResumeText() {
        return resumeText;
    }

    public String getJobDescription() {
        return jobDescription;
    }
}
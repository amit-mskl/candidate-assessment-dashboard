// Data configuration and management for Assessment Dashboard

// Interview performance data
const interviewData = [
    { name: 'SQL', enrolled: 30, cleared: 25, rejected: 5 },
    { name: 'Python', enrolled: 30, cleared: 28, rejected: 2 },
    { name: 'Cloud', enrolled: 30, cleared: 20, rejected: 10 },
    { name: 'PySpark', enrolled: 30, cleared: 18, rejected: 12 },
    { name: 'Databricks', enrolled: 30, cleared: 13, rejected: 17 }
];

// Candidate performance data
const candidateData = [
    { 
        name: 'Amit Choudhary', 
        email: 'amit@mentorskool.com', 
        sql: 13, 
        python: 42, 
        cloud: 31, 
        pyspark: 33, 
        databricks: 21 
    },
    { 
        name: 'Mandar Sawant', 
        email: 'mandar@mentorskool.com', 
        sql: 85, 
        python: 'Absent', 
        cloud: 'Absent', 
        pyspark: 88, 
        databricks: 68 
    },
    { 
        name: 'Sayti Nikumbh', 
        email: 'sayti@mentorskool.com', 
        sql: 35, 
        python: 39, 
        cloud: 82, 
        pyspark: 81, 
        databricks: 27 
    },
    { 
        name: 'Ayushi Gupta', 
        email: 'ayushi@mentorskool.com', 
        sql: 84, 
        python: 85, 
        cloud: 89, 
        pyspark: 73, 
        databricks: 10 
    },
    { 
        name: 'Rohit Ganjoo', 
        email: 'rohit@mentorskool.com', 
        sql: 36, 
        python: 'Absent', 
        cloud: 'Absent', 
        pyspark: 'Absent', 
        databricks: 62 
    },
    {
        name: 'Priya Sharma',
        email: 'priya@mentorskool.com',
        sql: 78,
        python: 82,
        cloud: 76,
        pyspark: 'Absent',
        databricks: 85
    },
    {
        name: 'Vikram Singh',
        email: 'vikram@mentorskool.com',
        sql: 45,
        python: 51,
        cloud: 48,
        pyspark: 52,
        databricks: 'Absent'
    }
];

// Program overview data
const programData = {
    totalCandidates: 40,
    preAssessment: {
        enrolled: 40,
        notStarted: 2,
        cleared: 30,
        failed: 3
    }
};

// Utility functions for data processing
const DataUtils = {
    // Calculate success rate percentage
    calculateSuccessRate: (cleared, enrolled) => {
        if (enrolled === 0) return 0;
        return Math.round((cleared / enrolled) * 100);
    },

    // Get score classification for styling
    getScoreClass: (score) => {
        if (score === 'Absent' || score === 'N/A') return 'absent';
        const numScore = parseInt(score);
        if (isNaN(numScore)) return 'absent';
        if (numScore >= 70) return 'high';
        if (numScore >= 40) return 'medium';
        return 'low';
    },

    // Calculate overall statistics
    calculateOverallStats: () => {
        const totalInterviews = interviewData.reduce((sum, interview) => sum + interview.enrolled, 0);
        const totalCleared = interviewData.reduce((sum, interview) => sum + interview.cleared, 0);
        const totalRejected = interviewData.reduce((sum, interview) => sum + interview.rejected, 0);

        return {
            totalInterviews,
            totalCleared,
            totalRejected,
            overallSuccessRate: DataUtils.calculateSuccessRate(totalCleared, totalInterviews)
        };
    },

    // Get candidate count by score range for specific technology
    getCandidateStatsByTech: (tech) => {
        const scores = candidateData.map(candidate => candidate[tech])
            .filter(score => score !== 'Absent');
        const numericScores = scores.map(score => parseInt(score))
            .filter(score => !isNaN(score));
        
        return {
            high: numericScores.filter(score => score >= 70).length,
            medium: numericScores.filter(score => score >= 40 && score < 70).length,
            low: numericScores.filter(score => score < 40).length,
            absent: candidateData.filter(candidate => candidate[tech] === 'Absent').length,
            total: candidateData.length
        };
    },

    // Get technology performance summary
    getTechnologySummary: () => {
        return interviewData.map(tech => ({
            ...tech,
            successRate: DataUtils.calculateSuccessRate(tech.cleared, tech.enrolled),
            candidateStats: DataUtils.getCandidateStatsByTech(tech.name.toLowerCase())
        }));
    },

    // Calculate average score across all technologies for a candidate
    calculateCandidateAverage: (candidate) => {
        const scores = [
            candidate.sql, 
            candidate.python, 
            candidate.cloud, 
            candidate.pyspark, 
            candidate.databricks
        ].filter(score => score !== 'Absent' && !isNaN(parseInt(score)))
         .map(score => parseInt(score));
        
        if (scores.length === 0) return null;
        return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
    },

    // Get top performers
    getTopPerformers: (limit = 5) => {
        return candidateData.map(candidate => ({
            ...candidate,
            average: DataUtils.calculateCandidateAverage(candidate)
        })).filter(candidate => candidate.average !== null)
          .sort((a, b) => b.average - a.average)
          .slice(0, limit);
    },

    // Get candidates needing improvement
    getCandidatesNeedingImprovement: (threshold = 40) => {
        return candidateData.map(candidate => ({
            ...candidate,
            average: DataUtils.calculateCandidateAverage(candidate)
        })).filter(candidate => candidate.average !== null && candidate.average < threshold)
          .sort((a, b) => a.average - b.average);
    },

    // Calculate completion rate
    calculateCompletionRate: () => {
        const totalTests = candidateData.length * 5; // 5 technologies per candidate
        const completedTests = candidateData.reduce((total, candidate) => {
            return total + [
                candidate.sql, 
                candidate.python, 
                candidate.cloud, 
                candidate.pyspark, 
                candidate.databricks
            ].filter(score => score !== 'Absent').length;
        }, 0);

        return DataUtils.calculateSuccessRate(completedTests, totalTests);
    },

    // Format score for display
    formatScore: (score) => {
        if (score === 'Absent' || score === null || score === undefined) {
            return 'Absent';
        }
        return score.toString();
    },

    // Validate candidate data
    validateCandidateData: () => {
        const errors = [];
        
        candidateData.forEach((candidate, index) => {
            if (!candidate.name || !candidate.email) {
                errors.push(`Candidate ${index + 1}: Missing name or email`);
            }
            
            const technologies = ['sql', 'python', 'cloud', 'pyspark', 'databricks'];
            technologies.forEach(tech => {
                const score = candidate[tech];
                if (score !== 'Absent' && (isNaN(parseInt(score)) || parseInt(score) < 0 || parseInt(score) > 100)) {
                    errors.push(`Candidate ${candidate.name}: Invalid ${tech} score`);
                }
            });
        });
        
        return errors;
    }
};

// Performance benchmarks
const benchmarks = {
    excellent: 85,
    good: 70,
    satisfactory: 55,
    needsImprovement: 40
};

// Technology information
const technologyInfo = {
    sql: {
        name: 'SQL',
        description: 'Structured Query Language for database operations',
        weight: 1.2 // Higher weight for more important technologies
    },
    python: {
        name: 'Python',
        description: 'Programming language for data analysis and automation',
        weight: 1.3
    },
    cloud: {
        name: 'Cloud',
        description: 'Cloud computing platforms and services',
        weight: 1.1
    },
    pyspark: {
        name: 'PySpark',
        description: 'Python API for Apache Spark data processing',
        weight: 1.0
    },
    databricks: {
        name: 'Databricks',
        description: 'Unified data analytics platform',
        weight: 1.0
    }
};

// Export data for use in other files (if using modules)
// export { interviewData, candidateData, programData, DataUtils, benchmarks, technologyInfo };
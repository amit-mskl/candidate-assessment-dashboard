// Data configuration and management

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
        email: 'amit@mentorskool.com', 
        sql: 85, 
        python: 'Absent', 
        cloud: 'Absent', 
        pyspark: 88, 
        databricks: 68 
    },
    { 
        name: 'Sayti Nikumbh', 
        email: 'amit@mentorskool.com', 
        sql: 35, 
        python: 39, 
        cloud: 82, 
        pyspark: 81, 
        databricks: 27 
    },
    { 
        name: 'Ayushi Gupta', 
        email: 'amit@mentorskool.com', 
        sql: 84, 
        python: 85, 
        cloud: 89, 
        pyspark: 73, 
        databricks: 10 
    },
    { 
        name: 'Rohit Ganjoo', 
        email: 'amit@mentorskool.com', 
        sql: 36, 
        python: 'Absent', 
        cloud: 'Absent', 
        pyspark: 'Absent', 
        databricks: 62 
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
        return Math.round((cleared / enrolled) * 100);
    },

    // Get score classification
    getScoreClass: (score) => {
        if (score === 'Absent') return 'absent';
        const numScore = parseInt(score);
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
            overallSuccessRate: Math.round((totalCleared / totalInterviews) * 100)
        };
    },

    // Get candidate count by score range
    getCandidateStatsByTech: (tech) => {
        const scores = candidateData.map(candidate => candidate[tech]).filter(score => score !== 'Absent');
        const numericScores = scores.map(score => parseInt(score));
        
        return {
            high: numericScores.filter(score => score >= 70).length,
            medium: numericScores.filter(score => score >= 40 && score < 70).length,
            low: numericScores.filter(score => score < 40).length,
            absent: candidateData.filter(candidate => candidate[tech] === 'Absent').length
        };
    }
};

// Export data for use in other files (if using modules)
// export { interviewData, candidateData, programData, DataUtils };
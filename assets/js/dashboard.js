// Main dashboard functionality

class AssessmentDashboard {
    constructor() {
        this.initializeEventListeners();
        this.renderDashboard();
    }

    // Initialize event listeners
    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.addStaggeredAnimations();
        });

        // Add resize listener for responsive behavior
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // Main render function
    renderDashboard() {
        this.populateInterviewStats();
        this.populateCandidateTable();
        this.updateProgressBar();
    }

    // Populate interview statistics cards
    populateInterviewStats() {
        const container = document.getElementById('interviewStats');
        if (!container) return;

        container.innerHTML = ''; // Clear existing content

        interviewData.forEach(interview => {
            const successRate = DataUtils.calculateSuccessRate(interview.cleared, interview.enrolled);
            const item = this.createInterviewStatItem(interview, successRate);
            container.appendChild(item);
        });
    }

    // Create individual interview stat item
    createInterviewStatItem(interview, successRate) {
        const item = document.createElement('div');
        item.className = 'interview-item';
        
        item.innerHTML = `
            <h4>${interview.name}</h4>
            <div class="stats-row">
                <span>Enrolled:</span>
                <span><strong>${interview.enrolled}</strong></span>
            </div>
            <div class="stats-row">
                <span>Cleared:</span>
                <span style="color: #38b2ac;"><strong>${interview.cleared}</strong></span>
            </div>
            <div class="stats-row">
                <span>Rejected:</span>
                <span style="color: #e53e3e;"><strong>${interview.rejected}</strong></span>
            </div>
            <div class="stats-row">
                <span>Success Rate:</span>
                <span style="color: #2d3748;"><strong>${successRate}%</strong></span>
            </div>
        `;

        // Add click event for detailed view (future enhancement)
        item.addEventListener('click', () => {
            this.showInterviewDetails(interview);
        });

        return item;
    }

    // Populate candidate performance table
    populateCandidateTable() {
        const tbody = document.getElementById('candidateTableBody');
        if (!tbody) return;

        tbody.innerHTML = ''; // Clear existing content

        candidateData.forEach((candidate, index) => {
            const row = this.createCandidateRow(candidate, index);
            tbody.appendChild(row);
        });
    }

    // Create individual candidate row
    createCandidateRow(candidate, index) {
        const row = document.createElement('tr');
        row.className = 'candidate-row';
        
        row.innerHTML = `
            <td><strong>${candidate.name}</strong></td>
            <td><a href="mailto:${candidate.email}" class="email-link">${candidate.email}</a></td>
            <td>${this.createScoreBadge(candidate.sql)}</td>
            <td>${this.createScoreBadge(candidate.python)}</td>
            <td>${this.createScoreBadge(candidate.cloud)}</td>
            <td>${this.createScoreBadge(candidate.pyspark)}</td>
            <td>${this.createScoreBadge(candidate.databricks)}</td>
        `;

        // Add hover effect
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#f8fafc';
        });

        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });

        return row;
    }

    // Create score badge HTML
    createScoreBadge(score) {
        const scoreClass = DataUtils.getScoreClass(score);
        return `<span class="score ${scoreClass}">${score}</span>`;
    }

    // Update progress bar based on assessment data
    updateProgressBar() {
        const progressFill = document.querySelector('.progress-fill');
        if (!progressFill) return;

        const { cleared, enrolled } = programData.preAssessment;
        const progressPercentage = DataUtils.calculateSuccessRate(cleared, enrolled);
        
        progressFill.style.width = `${progressPercentage}%`;
    }

    // Add staggered animations to cards
    addStaggeredAnimations() {
        const cards = document.querySelectorAll('.fade-in');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    // Handle window resize for responsive behavior
    handleResize() {
        // Recalculate any responsive elements if needed
        this.adjustTableForMobile();
    }

    // Adjust table for mobile view
    adjustTableForMobile() {
        const table = document.querySelector('.candidate-table table');
        const isMobile = window.innerWidth <= 768;
        
        if (table) {
            if (isMobile) {
                table.style.fontSize = '0.85rem';
            } else {
                table.style.fontSize = '0.95rem';
            }
        }
    }

    // Show detailed interview information (placeholder for future enhancement)
    showInterviewDetails(interview) {
        console.log(`Showing details for ${interview.name}:`, interview);
        // This could open a modal or navigate to a detailed view
    }

    // Filter candidates by score range
    filterCandidatesByScore(minScore, maxScore) {
        const rows = document.querySelectorAll('.candidate-row');
        
        rows.forEach(row => {
            const scores = Array.from(row.querySelectorAll('.score')).map(badge => {
                const text = badge.textContent;
                return text === 'Absent' ? 0 : parseInt(text);
            });
            
            const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            
            if (averageScore >= minScore && averageScore <= maxScore) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Search candidates by name
    searchCandidates(searchTerm) {
        const rows = document.querySelectorAll('.candidate-row');
        const term = searchTerm.toLowerCase();
        
        rows.forEach(row => {
            const name = row.querySelector('td strong').textContent.toLowerCase();
            const email = row.querySelector('.email-link').textContent.toLowerCase();
            
            if (name.includes(term) || email.includes(term)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Export data to CSV (future enhancement)
    exportToCSV() {
        const csvContent = this.generateCSVContent();
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'candidate_assessment_data.csv';
        a.click();
        
        window.URL.revokeObjectURL(url);
    }

    // Generate CSV content
    generateCSVContent() {
        const headers = ['Name', 'Email', 'SQL', 'Python', 'Cloud', 'PySpark', 'Databricks'];
        const rows = candidateData.map(candidate => [
            candidate.name,
            candidate.email,
            candidate.sql,
            candidate.python,
            candidate.cloud,
            candidate.pyspark,
            candidate.databricks
        ]);

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new AssessmentDashboard();
});

// Global utility functions for console access
window.DashboardUtils = {
    filterByScore: (min, max) => window.dashboard.filterCandidatesByScore(min, max),
    searchCandidates: (term) => window.dashboard.searchCandidates(term),
    exportData: () => window.dashboard.exportToCSV(),
    refreshData: () => window.dashboard.renderDashboard()
};
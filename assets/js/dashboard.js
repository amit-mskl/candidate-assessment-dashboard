// Main dashboard functionality for Moment Theme

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

        // Add search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                this.searchCandidates(e.target.value);
            });
        }

        // Add resize listener for responsive behavior
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // Main render function
    renderDashboard() {
        this.updateMetrics();
        this.populateTechnologyStats();
        this.populateCandidateTable();
        this.updateDonutChart();
        this.populateStatusLegend();
    }

    // Update key metrics
    updateMetrics() {
        const totalCandidates = candidateData.length;
        const totalAssessments = programData.preAssessment.cleared;
        const successRate = DataUtils.calculateSuccessRate(
            programData.preAssessment.cleared, 
            programData.preAssessment.enrolled
        );
        const averageScore = this.calculateOverallAverageScore();

        // Update metric values
        this.updateElement('totalCandidates', totalCandidates);
        this.updateElement('activeAssessments', totalAssessments);
        this.updateElement('successRate', `${successRate}%`);
        this.updateElement('averageScore', averageScore.toFixed(1));
    }

    // Calculate overall average score
    calculateOverallAverageScore() {
        let totalScore = 0;
        let totalTests = 0;

        candidateData.forEach(candidate => {
            const scores = [candidate.sql, candidate.python, candidate.cloud, candidate.pyspark, candidate.databricks]
                .filter(score => score !== 'Absent')
                .map(score => parseInt(score));
            
            totalScore += scores.reduce((sum, score) => sum + score, 0);
            totalTests += scores.length;
        });

        return totalTests > 0 ? totalScore / totalTests : 0;
    }

    // Update element content safely
    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }

    // Populate technology statistics
    populateTechnologyStats() {
        const container = document.getElementById('technologyStats');
        if (!container) return;

        container.innerHTML = '';

        interviewData.forEach(tech => {
            const successRate = DataUtils.calculateSuccessRate(tech.cleared, tech.enrolled);
            const item = this.createTechnologyStatItem(tech, successRate);
            container.appendChild(item);
        });
    }

    // Create individual technology stat item
    createTechnologyStatItem(tech, successRate) {
        const item = document.createElement('div');
        item.className = 'tech-stat';
        
        item.innerHTML = `
            <div class="tech-name">${tech.name}</div>
            <div class="tech-metrics">
                <span class="tech-label">Enrolled:</span>
                <span class="tech-value">${tech.enrolled}</span>
            </div>
            <div class="tech-metrics">
                <span class="tech-label">Cleared:</span>
                <span class="tech-value" style="color: #10b981;">${tech.cleared}</span>
            </div>
            <div class="tech-metrics">
                <span class="tech-label">Success:</span>
                <span class="tech-value">${successRate}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${successRate}%"></div>
            </div>
        `;

        return item;
    }

    // Populate candidate performance table
    populateCandidateTable() {
        const tbody = document.getElementById('candidateTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        candidateData.forEach((candidate, index) => {
            const row = this.createCandidateRow(candidate, index);
            tbody.appendChild(row);
        });
    }

    // Create individual candidate row
    createCandidateRow(candidate, index) {
        const row = document.createElement('tr');
        row.className = 'candidate-row';
        
        const average = this.calculateCandidateAverage(candidate);
        
        row.innerHTML = `
            <td class="candidate-name">${candidate.name}</td>
            <td><a href="mailto:${candidate.email}" class="candidate-email">${candidate.email}</a></td>
            <td>${this.createScoreBadge(candidate.sql)}</td>
            <td>${this.createScoreBadge(candidate.python)}</td>
            <td>${this.createScoreBadge(candidate.cloud)}</td>
            <td>${this.createScoreBadge(candidate.pyspark)}</td>
            <td>${this.createScoreBadge(candidate.databricks)}</td>
            <td>${this.createScoreBadge(average)}</td>
        `;

        return row;
    }

    // Calculate individual candidate average
    calculateCandidateAverage(candidate) {
        const scores = [candidate.sql, candidate.python, candidate.cloud, candidate.pyspark, candidate.databricks]
            .filter(score => score !== 'Absent')
            .map(score => parseInt(score));
        
        if (scores.length === 0) return 'N/A';
        return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
    }

    // Create score badge HTML
    createScoreBadge(score) {
        const scoreClass = DataUtils.getScoreClass(score);
        return `<span class="score-badge score-${scoreClass}">${score}</span>`;
    }

    // Update donut chart
    updateDonutChart() {
        const successRate = DataUtils.calculateSuccessRate(
            programData.preAssessment.cleared, 
            programData.preAssessment.enrolled
        );
        
        // Update circle stroke-dashoffset for progress
        const circle = document.getElementById('successCircle');
        const donutValue = document.getElementById('donutValue');
        
        if (circle && donutValue) {
            const circumference = 2 * Math.PI * 35; // radius = 35
            const offset = circumference - (successRate / 100) * circumference;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
            donutValue.textContent = `${successRate}%`;
        }
    }

    // Populate status legend
    populateStatusLegend() {
        const container = document.getElementById('statusLegend');
        if (!container) return;

        const statusData = [
            { label: 'Cleared', value: programData.preAssessment.cleared, color: '#10b981' },
            { label: 'Enrolled', value: programData.preAssessment.enrolled, color: '#3b82f6' },
            { label: 'Failed', value: programData.preAssessment.failed, color: '#ef4444' },
            { label: 'Not Started', value: programData.preAssessment.notStarted, color: '#f59e0b' }
        ];

        container.innerHTML = '';
        
        statusData.forEach(status => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `
                <div class="legend-label">
                    <div class="legend-dot" style="background: ${status.color};"></div>
                    ${status.label}
                </div>
                <div class="legend-value">${status.value}</div>
            `;
            container.appendChild(item);
        });
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
        this.adjustTableForMobile();
    }

    // Adjust table for mobile view
    adjustTableForMobile() {
        const table = document.querySelector('.candidates-table');
        const isMobile = window.innerWidth <= 768;
        
        if (table) {
            if (isMobile) {
                table.style.fontSize = '12px';
            } else {
                table.style.fontSize = '14px';
            }
        }
    }

    // Search candidates by name or email
    searchCandidates(searchTerm) {
        const rows = document.querySelectorAll('.candidate-row');
        const term = searchTerm.toLowerCase();
        
        rows.forEach(row => {
            const name = row.querySelector('.candidate-name').textContent.toLowerCase();
            const email = row.querySelector('.candidate-email').textContent.toLowerCase();
            
            if (name.includes(term) || email.includes(term)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Filter candidates by score range
    filterCandidatesByScore(minScore, maxScore) {
        const rows = document.querySelectorAll('.candidate-row');
        
        rows.forEach(row => {
            const scores = Array.from(row.querySelectorAll('.score-badge')).map(badge => {
                const text = badge.textContent;
                return text === 'Absent' || text === 'N/A' ? 0 : parseInt(text);
            });
            
            // Get average score (last column)
            const averageScore = scores[scores.length - 1];
            
            if (averageScore >= minScore && averageScore <= maxScore) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Export data to CSV
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
        const headers = ['Name', 'Email', 'SQL', 'Python', 'Cloud', 'PySpark', 'Databricks', 'Average'];
        const rows = candidateData.map(candidate => {
            const average = this.calculateCandidateAverage(candidate);
            return [
                candidate.name,
                candidate.email,
                candidate.sql,
                candidate.python,
                candidate.cloud,
                candidate.pyspark,
                candidate.databricks,
                average
            ];
        });

        return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    // Show detailed technology information
    showTechnologyDetails(techName) {
        const tech = interviewData.find(t => t.name === techName);
        if (tech) {
            console.log(`Technology Details for ${tech.name}:`, tech);
            // Future: Could open a modal or detailed view
        }
    }

    // Refresh dashboard data
    refreshDashboard() {
        this.renderDashboard();
        console.log('Dashboard refreshed');
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
    refreshData: () => window.dashboard.refreshDashboard(),
    showTechDetails: (techName) => window.dashboard.showTechnologyDetails(techName)
};
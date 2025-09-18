// GitHub Issues API Poll Data Collector
// This script collects poll responses and creates GitHub issues for each submission

class GitHubPollCollector {
    constructor(repoOwner, repoName, githubToken) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
        this.githubToken = githubToken;
        this.apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;
    }

    async submitPollResponse(pollData) {
        try {
            const issueTitle = `Poll Response: ${pollData.category} - ${new Date().toLocaleDateString()}`;
            
            const issueBody = this.formatPollDataAsMarkdown(pollData);
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: issueTitle,
                    body: issueBody,
                    labels: ['poll-response', pollData.category.toLowerCase().replace(/\s+/g, '-')]
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Poll response submitted to GitHub:', result.html_url);
                return result;
            } else {
                throw new Error(`GitHub API error: ${response.status}`);
            }
        } catch (error) {
            console.error('Failed to submit poll to GitHub:', error);
            // Fallback to localStorage
            this.saveToLocalStorage(pollData);
            throw error;
        }
    }

    formatPollDataAsMarkdown(pollData) {
        return `## Poll Response Data

**Poll ID:** ${pollData.pollId}
**Question:** ${pollData.question}
**Response:** ${pollData.response}
**Category:** ${pollData.category}

### User Information
- **Country:** ${pollData.userCountry}
- **Language:** ${pollData.language}
- **Session ID:** ${pollData.sessionId}
- **Timestamp:** ${pollData.timestamp}

### Browser Information
- **User Agent:** ${pollData.userAgent}

---
*Submitted via Hamro Awaz Polling Platform*
*Issue created automatically by poll submission system*`;
    }

    saveToLocalStorage(pollData) {
        // Fallback storage
        const existingData = JSON.parse(localStorage.getItem('hamroawaz_poll_responses') || '[]');
        existingData.push(pollData);
        localStorage.setItem('hamroawaz_poll_responses', JSON.stringify(existingData));
    }
}

// Usage example:
// const collector = new GitHubPollCollector('yourusername', 'hamroawaz-polling-platform', 'your_github_token');
// collector.submitPollResponse(pollData);

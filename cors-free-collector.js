// CORS-Free Poll Data Collector
// This uses a different approach to avoid CORS issues

class CORSFreeCollector {
    constructor(webhookUrl) {
        this.webhookUrl = webhookUrl;
    }

    async submitPollResponse(pollData) {
        try {
            // Method 1: Try direct fetch first
            const response = await this.tryDirectFetch(pollData);
            if (response.success) {
                return response;
            }
        } catch (error) {
            console.log('Direct fetch failed, trying alternative method:', error);
        }

        // Method 2: Use JSONP-like approach with script injection
        return await this.tryScriptInjection(pollData);
    }

    async tryDirectFetch(pollData) {
        const response = await fetch(this.webhookUrl, {
            method: 'POST',
            mode: 'no-cors', // This bypasses CORS but we can't read the response
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pollData)
        });

        // With no-cors mode, we can't read the response, but we assume success
        return { success: true, message: 'Data sent (no-cors mode)' };
    }

    async tryScriptInjection(pollData) {
        return new Promise((resolve, reject) => {
            // Create a form and submit it (this bypasses CORS)
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = this.webhookUrl;
            form.target = '_blank'; // Open in new tab to avoid navigation
            form.style.display = 'none';

            // Add the data as a hidden input
            const dataInput = document.createElement('input');
            dataInput.type = 'hidden';
            dataInput.name = 'data';
            dataInput.value = JSON.stringify(pollData);
            form.appendChild(dataInput);

            // Add form to page, submit, then remove
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

            // Assume success after a short delay
            setTimeout(() => {
                resolve({ success: true, message: 'Data sent via form submission' });
            }, 1000);
        });
    }

    // Alternative: Use Google Forms approach
    async submitViaGoogleForm(pollData) {
        // This would require creating a Google Form and using its submission URL
        // More complex but completely CORS-free
        console.log('Google Form submission method not implemented yet');
        return { success: false, message: 'Google Form method not implemented' };
    }
}

// Usage example:
// const collector = new CORSFreeCollector('your_webhook_url');
// collector.submitPollResponse(pollData);

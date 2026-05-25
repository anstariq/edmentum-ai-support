/**
 * Generic proxy endpoint for all chatQuartz requests
 * Forwards any request to chatQuartz backend, bypassing CORS issues
 */
export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing url parameter" });
    }

    try {
        // Decode the URL that was passed
        const decodedUrl = decodeURIComponent(url);

        // Validate that it's actually a chatQuartz URL
        if (!decodedUrl.includes("beta.ai.chatquartz.com")) {
            return res
                .status(400)
                .json({ error: "Invalid URL - must be from chatQuartz" });
        }

        const response = await fetch(decodedUrl, {
            method: req.method || "GET",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (compatible; Edmentum-AI-Support/1.0; +https://edmentum-ai-support.vercel.app)",
            },
            // Forward body if it's a POST request
            ...(req.body ? { body: JSON.stringify(req.body) } : {}),
        });

        // Get the response content type
        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch from chatQuartz",
                status: response.status,
            });
        }

        // Set appropriate content type for the response
        if (contentType) {
            res.setHeader("Content-Type", contentType);
        }

        // Read and return the response
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            const text = await response.text();
            res.status(200).send(text);
        }
    } catch (error) {
        console.error("Error proxying chatQuartz request:", error);
        res
            .status(500)
            .json({ error: "Internal server error", message: error.message });
    }
}

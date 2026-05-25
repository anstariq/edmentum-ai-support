/**
 * Proxy endpoint for chatQuartz init.php
 * Forwards requests to chatQuartz backend, bypassing CORS issues
 */
export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Missing id parameter" });
    }

    try {
        const response = await fetch(
            `https://beta.ai.chatquartz.com/account/init.php?id=${encodeURIComponent(id)}`,
            {
                method: "GET",
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (compatible; Edmentum-AI-Support/1.0; +https://edmentum-ai-support.vercel.app)",
                },
            }
        );

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch from chatQuartz",
                status: response.status,
            });
        }

        const data = await response.json();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(data);
    } catch (error) {
        console.error("Error proxying chatQuartz request:", error);
        res
            .status(500)
            .json({ error: "Internal server error", message: error.message });
    }
}

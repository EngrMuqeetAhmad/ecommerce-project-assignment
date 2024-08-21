// middleware/apiKeyAuth.js
function apiKeyAuth(req: any, res: any, next:any) {
    const apiKey = req.headers['x-api-key']; // Use the 'x-api-key' header to pass the API key
    const validApiKey = process.env.API_KEY; // Store the valid API key in an environment variable

    if (apiKey && apiKey === validApiKey) {
        next(); // API key is valid, proceed to the next middleware or route handler
    } else {
        res.status(401).json({ message: "Unauthorized: Invalid API key" }); // API key is invalid, respond with an error
    }
}

export default apiKeyAuth;

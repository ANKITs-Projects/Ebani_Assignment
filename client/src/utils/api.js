const url = import.meta.env.VITE_BACKEND_URL

const apicall = async (endpoint, method = "GET", data = null) => {
    try {
        const res = await fetch(url + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: data ? JSON.stringify(data) : null
        });

        const result = await res.json();
        
        if (!res.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        return result;

    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
};

export default apicall
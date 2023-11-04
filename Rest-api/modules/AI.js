// Import required modules and configurations
const axios = require('axios');
const School = require('./School');
const { OPEN_AI_API_KEY } = require('../config');

// Class definition for AI, extending the School class
class AI extends School {
    constructor() {
        super(); // Call the constructor of the parent class with schoolData
    }

    // Apply query configuration to the input question
    applyQueryConfig(question) {
        return `data:
                ${this.schoolData}
        \n
        \n
        Important response instruction(must must strictly follow): 
            1.Use the data provided to answer the following questions. If the questions don't relate to or aren't mentioned in the provided data, respond with 'please contact assigned personnel for more details, thank you!'. This is very important!
            2.Always add 'This response is Ai, you may contact crt.edu.@gmail.com'. It is also an important instruction.
            3. Just answer questions.
            4. (Important) Just answer the question naturally without explicitly referring to the data provided, as if you are providing information on your own.
            5. Provide a clear and safe response without making any claims.
            6. If the question is not CRT related question, just say that 'Please only ask CRT related questions or concerns. Thank you!'. 
        \n
        \n
        Questions:
        \n
            ${question}`;
    }

    // Method to query OpenAI API with the provided question
    async query(question) {
        const configApplied = this.applyQueryConfig(question); // Apply query configuration

        // Request headers for the OpenAI API
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
        };

        // Request body for the OpenAI API
        const requestBody = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a school administrator, you must strictly respond only on CRT school realated questions',
                },
                {
                    role: 'user',
                    content: configApplied,
                },
            ],
            temperature: 0.4,
        });

        try {
            // Send POST request to OpenAI API
            const response = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
                headers,
            });

            // Parse the response and log it (you can handle the response as needed)
            const reply = await response.data;
            return reply;
        } catch (err) {
            throw err; // Handle errors if the API request fails
        }
    }
}

module.exports = AI; // Export the AI class for external use

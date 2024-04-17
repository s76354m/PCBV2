const axios = require('axios');
require('dotenv').config();

const openAIRequest = (userInput, followUp = false) => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Correctly retrieving API key
  const prompt = followUp ? "Generate follow-up questions based on the user's PCB design description and previous interactions." : "You are a helpful assistant. Generate follow-up questions to clarify the user's PCB design description.";
  return axios({
    method: 'post',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    data: {
      model: "gpt-4-turbo", // Adjust based on current availability
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: userInput
        }
      ]
    }
  }).then(response => {
    console.log("OpenAI API request successful.");
    console.log("Response data:", response.data);
    return response;
  }).catch(error => {
    console.error("Error making OpenAI API request:", error.response ? error.response.data : error);
    console.error("Full error:", error);
    throw error;
  });
};

const extractFollowUpQuestions = (openAIResponse) => {
  try {
    if (!openAIResponse.data.choices || openAIResponse.data.choices.length === 0) {
      console.log("No choices available in the OpenAI response.");
      return { questions: [], isComplete: false };
    }
    // Correctly accessing the message content and splitting it into lines for analysis
    const messages = openAIResponse.data.choices[0].message.content.split('\n').filter(line => line.trim() !== '');
    const questions = messages.filter(message => message.trim().endsWith('?'));
    console.log("Extracted follow-up questions:", questions);

    // Enhanced check for specific phrases indicating completion of the design description
    const completionPhrases = ["enough information", "complete design", "sufficient details"];
    const isComplete = questions.length === 0 && messages.some(message => completionPhrases.some(phrase => message.includes(phrase)));
    if (isComplete) {
      console.log("Design description is deemed complete by OpenAI.");
    } else {
      console.log("More information required to complete the design description.");
    }

    return { questions, isComplete };
  } catch (error) {
    console.error("Error extracting follow-up questions:", error);
    console.error("Full error:", error);
    throw error;
  }
};

module.exports = { openAIRequest, extractFollowUpQuestions };
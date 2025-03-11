const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");

const getTaskSuggestion  = async(inputText) => {
    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
            {
                contents: [
                    {parts: [
                        {text : `Suggest task names for :  ${inputText}`}
                    ]}
                ]
            },
            {
                headers :{"Content-Type": "application/json"},
                params: {key:process.env.GOOGLE_PALM_API_KEY}
            }
        )
        console.log("Responses from Gemini : ",response.data);
        return response.data.candidates.slice(0,10)?.[0]?.content?.parts?.[0]?.text || "No suggestions";
      //  return response.data?.candidates.slice(0,10)?.[0]?.content?.parts?.[0]?.text || "No suggestions";
    }catch (error){
        console.error("Error in API:",error?.response?.data || error.message);
        return "Error Fetching in suggestions"
    }

}

const getTaskPrediction  = async(inputText) => {
    try {
        console.log("Get task prediction for : ",inputText);
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
            {
                contents: [
                    {parts: [
                        {text : `Give answer in hours and minutes only. How much time it will take me to complete this task in hours and give in one line and give me a time only not text:  ${inputText}`}
                    ]}
                ]
            },
            {
                headers :{"Content-Type": "application/json"},
                params: {key:process.env.GOOGLE_PALM_API_KEY}
            }
        )
        console.log("Responses from Gemini : ",response.data);
        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No Time Prediciton";
      //  return response.data?.candidates.slice(0,10)?.[0]?.content?.parts?.[0]?.text || "No suggestions";
    }catch (error){
        console.error("Error in API:",error?.response?.data || error.message);
        return "Error Fetching in suggestions"
    }

}


module.exports = {getTaskSuggestion,getTaskPrediction};
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyCp4IeoH9GupO474BzoNx77B7WZptTaU9s');

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = 'Write a poem about a robot who dreams of becoming a gardener.';

const result = model.generateContent([prompt]);
result.then(function(data) {
    console.log(data.response.text())
});
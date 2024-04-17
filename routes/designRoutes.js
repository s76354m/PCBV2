const express = require('express');
const { openAIRequest, extractFollowUpQuestions } = require('../utils/openAIHandler'); // Import the OpenAI handler and the new extractFollowUpQuestions function
const { identifyComponents } = require('../utils/componentIdentifier'); // Import the component identifier
const { generateGerberFile } = require('../utils/gerberGenerator'); // Import the Gerber file generator
const router = express.Router();

router.post('/designs/interpret', (req, res) => {
  const designDescription = req.body.designDescription;
  openAIRequest(designDescription)
    .then(response => {
      console.log('OpenAI response:', response.data);
      const { questions, isComplete } = extractFollowUpQuestions(response);
      console.log('Extracted follow-up questions:', questions);
      if (questions.length > 0) {
        res.json({ message: 'Follow-up questions', questions: questions });
      } else if (isComplete) {
        console.log('Design description is deemed complete by OpenAI.');
        res.json({ message: 'Design description is complete. Proceeding to generate Gerber file.' });
      } else {
        console.log('No follow-up questions received and design description is not complete.');
        res.json({ message: 'No follow-up questions available. Please refine your design description and try again.' });
      }
    })
    .catch(error => {
      console.error('Error communicating with OpenAI:', error);
      res.status(500).json({ message: 'Failed to interpret design description.', error: error.toString() });
    });
});

router.post('/designs/refine', (req, res) => {
  console.log('User answers:', req.body.answers);
  if (req.body.answers && req.body.answers.length > 0) {
    const identifiedComponents = identifyComponents(req.body.answers);
    console.log(`Identified components: ${identifiedComponents.join(', ')}`);
    res.json({ message: 'Answers processed successfully.', identifiedComponents: identifiedComponents });
  } else {
    console.log('No answers received or answers array is empty.');
    res.status(400).json({ message: 'No answers received or answers array is empty.' });
  }
});

router.post('/designs/generate', (req, res) => {
  const { components, layoutSpecs } = req.body; // Assuming layoutSpecs is part of the request body for custom layout specifications
  generateGerberFile(components, layoutSpecs)
    .then(gerberFile => {
      console.log('Gerber file generated successfully.');
      res.json({ message: 'Gerber file generated successfully.', gerberFileUrl: gerberFile.url });
    })
    .catch(error => {
      console.error('Error generating Gerber file:', error);
      res.status(500).json({ message: 'Failed to generate Gerber file.', error: error.toString() });
    });
});

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
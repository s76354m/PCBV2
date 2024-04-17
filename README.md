# PCBV2

PCBV2 is an innovative web application designed to transform user-inputted PCB design goals described in free text into ready-to-use Gerber files. By leveraging the power of OpenAI's GPT-4 for intelligent question generation and component identification, PCBV2 streamlines the process from concept to production-ready PCB design.

## Overview

PCBV2 utilizes a modern tech stack including Node.js, Express, MongoDB, Mongoose, and EJS for server-side rendering, with Bootstrap for the frontend. The application operates statelessly, without requiring user accounts or data persistence beyond the current session. Integration with OpenAI's API facilitates dynamic interaction with users to refine PCB design requirements.

## Features

- **User-Driven Design Input**: Start with a simple description of your PCB design goals.
- **Intelligent Interaction**: Utilizes OpenAI's GPT-4 to ask follow-up questions, ensuring accurate component selection and design specifications.
- **Automated Gerber File Generation**: Translates the final design requirements into Gerber files, ready for manufacturing.
- **Stateless Operation**: No need for user accounts, ensuring simplicity and ease of use.

## Getting started

### Requirements

- Node.js
- MongoDB
- An OPENAI_API_KEY for integrating GPT-4

### Quickstart

1. Clone the repository to your local machine.
2. Install dependencies by running `npm install` in the project root.
3. Set up your `.env` file based on `.env.example`, including your MongoDB URL and OPENAI_API_KEY.
4. Start the application with `npm start`. The server will run on the specified PORT, defaulting to 3000 if not specified.
5. Access the application through `http://localhost:3000` in your web browser.

### License

Copyright (c) 2024.
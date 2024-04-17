# PCBV2

PCBV2 is an innovative web application designed to automate the PCB design process from concept to Gerber file generation. Leveraging OpenAI's GPT-4, it interprets user-described goals in natural language, identifies necessary components, and outputs a Gerber file sketch.

## Overview

PCBV2 employs a Node/Express/MongoDB/Mongoose/EJS stack for backend and server-side rendering, with Bootstrap enhancing the frontend. The integration with OpenAI's API enables dynamic interaction, refining user inputs into precise design specifications. Stateless operation ensures a streamlined user experience without the need for account management.

## Features

- **Natural Language Processing**: Interprets free-text design descriptions.
- **Dynamic Questioning**: Uses GPT-4 to ask follow-up questions, refining design requirements.
- **Component Identification**: Identifies all standard PCB components necessary for the design.
- **Gerber File Generation**: Outputs a Gerber file ready for manufacturing.

## Getting Started

### Requirements

- Node.js
- MongoDB
- An OpenAI API key

### Quickstart

1. Clone the repository and navigate to the project directory.
2. Install dependencies with `npm install`.
3. Set up your `.env` file as per the `.env.example` template.
4. Run `npm start` to launch the application on the default port (3000) or your specified port.
5. Access the web application via `http://localhost:3000`.

### License

Copyright (c) 2024.
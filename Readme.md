# Quantity Measurement Frontend

This is an React frontend application for the Quantity Measurement system. It allows users to login, signup,
and perform different measurement operations.

## Features

- User authentication (login and signup)
- JWT based secure communication
- Measurement types:
  - Length
  - Weight
  - Temperature
  - Volume
- Operations:
  - Compare
  - Convert
  - Add, Subtract, Divide
- History tracking of operations

## Tech Stack

- React
- TypeScript
- HTML and CSS

## Project Structure

- auth: login and signup component
- dashboard: main functionality (operations and history)
- core:
  - services: API calls
  - guards: route protection
  - interceptors: JWT handling
  - models: data structures

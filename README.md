# Employee Taxonomy - HappyFox Assessment


## About 
This is a project based on a HappyFox assessment for Frontend Engineer position.

In this application a user can visualize and update an employee organization chart interactively with filtering and drag & drop functionality.

The application is deployed on Netlify - [Employee Taxonomy](https://happyfox-employee-taxonomy.netlify.app/)

[Project Demo Video](https://youtu.be/U9qadOzUCYw)

![Image](/public/Employee%20Taxonomy.png)



## Features
### Employee Listing - 

  List of employees pulled from an API endpoint. Showing employees details - Name, Designation and Team. 

  List also contains a search by any employee properties and filter by a specific team. Filtering by team in the list also renders the taxonomy for that team on the right side.

### Employee Taxonomy / Tree View - 

  Based on the employee's manager hierarchy a taxonomy is generated in a tree view.

  - Easy Manager Updates (Drag and Drop!):

      The system lets users easily update who an employee reports to. By Simply,

      Click and hold the box of the employee you want to change the manager for.
      Drag the employee box to the box of their new manager.
      Drop the employee box on the new manager's box.
  
  - Circular Reporting Scenario:

      There might be a situation where you try to make someone their own manager (confusing, right?). In this case, the system will automatically adjust the hierarchy to avoid a loop. Here's what happens:

      The original manager of the dragged employee becomes the manager of the dropped employee (the one you dropped on).
      The dragged employee then reports to their new manager, who was previously the dropped employee's manager.
      This way, the reporting structure remains clear and avoids circular reporting.

  #### Hopefully this makes sense :)

## Prerequisites
Node.js LTS should be installed.

## Installation

Run below commands on your terminal:

  `git clone https://github.com/harsh-dev-066/happyfox-employee-taxonomy.git`

  `cd happyfox-employee-taxonomy` 

  `npm install`

  `npm run dev`

## Technologies 

- React JS
- TypeScript
- Vite
- SCSS
- Redux Toolkit
- react-dnd
- Axios
- miragejs
- Jest

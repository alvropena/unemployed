import type { ResumeData } from "@/types/types"

export const defaultResumeData: ResumeData = {
  personal: {
    name: "Jake Ryan",
    phone: "123-456-7890",
    email: "jake@su.edu",
    linkedin: "linkedin.com/in/jake",
    github: "github.com/jakeryan",
  },
  education: [
    {
      institution: "Southwestern University",
      location: "Georgetown, TX",
      degree: "Bachelor of Arts in Computer Science, Minor in Business",
      startDate: new Date("2018-08-01"),
      endDate: new Date("2021-05-01"),
      current: false,
    },
    {
      institution: "Blinn College",
      location: "Bryan, TX",
      degree: "Associate's in Liberal Arts",
      startDate: new Date("2014-08-01"),
      endDate: new Date("2018-05-01"),
      current: false,
    },
  ],
  experience: [
    {
      company: "Texas A&M University",
      position: "Undergraduate Research Assistant",
      location: "College Station, TX",
      startDate: new Date("2020-06-01"),
      endDate: null,
      current: true,
      responsibilityOne: "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
      responsibilityTwo: "Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
      responsibilityThree: "Explored ways to visualize GitHub collaboration in a classroom setting",
      responsibilityFour: null,
    },
    {
      company: "Southwestern University",
      position: "Information Technology Support Specialist",
      location: "Georgetown, TX",
      startDate: new Date("2018-09-01"),
      endDate: null,
      current: true,
      responsibilityOne: "Communicate with managers to set up campus computers used on campus",
      responsibilityTwo: "Assess and troubleshoot computer problems brought by students, faculty and staff",
      responsibilityThree: "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
      responsibilityFour: null,
    },
    {
      company: "Southwestern University",
      position: "Artificial Intelligence Research Assistant",
      location: "Georgetown, TX",
      startDate: new Date("2019-05-01"),
      endDate: new Date("2019-07-01"),
      current: false,
      responsibilityOne: "Explored methods to generate video game dungeons based off of The Legend of Zelda",
      responsibilityTwo: "Developed a game in Java to test the generated dungeons",
      responsibilityThree: "Contributed 50K+ lines of code to an established codebase via Git",
      responsibilityFour: "Conducted a human subject study to determine which video game dungeon generation technique is enjoyable",
    },
  ],
  projects: [
    {
      name: "Gitlytics",
      startDate: new Date("2020-06-01"),
      endDate: null,
      current: true,
      responsibilityOne: "Developed a full-stack application to analyze GitHub collaboration patterns",
      responsibilityTwo: "Implemented data visualization using React and D3.js",
      responsibilityThree: "Created a RESTful API using FastAPI and PostgreSQL",
      responsibilityFour: "Deployed the application using Docker and Google Cloud Platform",
    },
    {
      name: "Simple Paintball",
      startDate: new Date("2018-05-01"),
      endDate: new Date("2020-05-01"),
      current: false,
      responsibilityOne: "Developed a 2D multiplayer paintball game using Java and JavaFX",
      responsibilityTwo: "Implemented real-time networking using WebSocket",
      responsibilityThree: "Created a custom physics engine for projectile movement",
      responsibilityFour: "Added AI opponents with pathfinding algorithms",
    },
  ],
  skills: [{
    languages: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
    frameworks: "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI",
    developerTools: "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse",
    libraries: "pandas, NumPy, Matplotlib"
  }]
}


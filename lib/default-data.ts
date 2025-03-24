import type { ResumeData } from "@/lib/types"

export const defaultResumeData: ResumeData = {
  personal: {
    name: "Jake Ryan",
    phone: "123-456-7890",
    email: "jake@su.edu",
    linkedin: "jake",
    github: "jake",
  },
  education: [
    {
      institution: "Southwestern University",
      location: "Georgetown, TX",
      degree: "Bachelor of Arts in Computer Science, Minor in Business",
      date: "Aug. 2018 – May 2021",
    },
    {
      institution: "Blinn College",
      location: "Bryan, TX",
      degree: "Associate's in Liberal Arts",
      date: "Aug. 2014 – May 2018",
    },
  ],
  experience: [
    {
      title: "Undergraduate Research Assistant",
      company: "Texas A&M University",
      location: "College Station, TX",
      date: "June 2020 – Present",
      responsibilities: [
        "Developed a REST API using FastAPI and PostgreSQL to store data from learning management systems",
        "Developed a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
        "Explored ways to visualize GitHub collaboration in a classroom setting",
      ],
    },
    {
      title: "Information Technology Support Specialist",
      company: "Southwestern University",
      location: "Georgetown, TX",
      date: "Sep. 2018 – Present",
      responsibilities: [
        "Communicate with managers to set up campus computers used on campus",
        "Assess and troubleshoot computer problems brought by students, faculty and staff",
        "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
      ],
    },
    {
      title: "Artificial Intelligence Research Assistant",
      company: "Southwestern University",
      location: "Georgetown, TX",
      date: "May 2019 – July 2019",
      responsibilities: [
        "Explored methods to generate video game dungeons based off of The Legend of Zelda",
        "Developed a game in Java to test the generated dungeons",
        "Contributed 50K+ lines of code to an established codebase via Git",
        "Conducted a human subject study to determine which video game dungeon generation technique is enjoyable",
        "Wrote an 8-page paper and gave multiple presentations on-campus",
        "Presented virtually to the World Conference on Computational Intelligence",
      ],
    },
  ],
  projects: [
    {
      name: "Gitlytics",
      technologies: "Python, Flask, React, PostgreSQL, Docker",
      date: "June 2020 – Present",
      details: [
        "Developed a full-stack web application using with Flask serving a REST API with React as the frontend",
        "Implemented GitHub OAuth to get data from user's repositories",
        "Visualized GitHub data to show collaboration",
        "Used Celery and Redis for asynchronous tasks",
      ],
    },
    {
      name: "Simple Paintball",
      technologies: "Spigot API, Java, Maven, TravisCI, Git",
      date: "May 2018 – May 2020",
      details: [
        "Developed a Minecraft server plugin to entertain kids during free time for a previous job",
        "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
        "Implemented continuous delivery using TravisCI to build the plugin upon new a release",
        "Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin",
      ],
    },
  ],
  skills: {
    languages: "Java, Python, C/C++, SQL (Postgres), JavaScript, HTML/CSS, R",
    frameworks: "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI",
    tools: "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse",
    libraries: "pandas, NumPy, Matplotlib",
  },
}


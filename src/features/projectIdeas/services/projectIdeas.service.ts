export function getProjectIdeas(category: string) {

  if (category === "Web") {

    return [

      {
        title: "Netflix Clone",
        level: "Intermediate",
        time: "2 Weeks",
      },

      {
        title: "Expense Tracker",
        level: "Easy",
        time: "1 Week",
      },

      {
        title: "Portfolio Website",
        level: "Easy",
        time: "3 Days",
      },

    ];

  }

  if (category === "AI") {

    return [

      {
        title: "Resume Analyzer",
        level: "Intermediate",
        time: "2 Weeks",
      },

      {
        title: "Face Detection",
        level: "Advanced",
        time: "3 Weeks",
      },

    ];

  }

  return [

    {
      title: "Library Management",
      level: "Intermediate",
      time: "10 Days",
    },

  ];

}
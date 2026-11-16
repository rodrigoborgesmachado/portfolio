// English text for the static portfolio content.
// Only text lives here; links, images and stack come from perfil.js (merged in conteudo.js).

export const apresentacao = {
    saudacao: 'Hi, welcome to my natural habitat.',
    linha: '.NET developer · Uberlândia, Brazil',
    paragrafos: [
        "I've been building software for over 10 years, mostly with C# and .NET, and with React for the last few. Right now I'm on the team at Condo Control, a Canadian company, and I work in English every day.",
        'In my spare time I build things: an exam practice site for ENEM, an HR system, a multiplication game for kids, database tools. They are all listed below. Some are live, others stayed as experiments.',
        'Away from the computer, I ride my bike and play goalkeeper in futsal.',
    ],
};


// Same order as experiencias in perfil.js.
export const experiencias = [
    {
        cargo: 'Senior .NET Developer',
        periodo: 'Oct 2024 – present',
        itens: [
            'Develop features and maintain an ASP.NET MVC product using Razor, C#, APIs and SQL Server, and contribute to the gradual adoption of React.',
            'Implemented support for multiple product brands across login flows, redirects, email templates and workspace configuration.',
            'Investigate and fix defects in existing workflows, working with QA from analysis through validation of each delivery.',
        ],
    },
    {
        cargo: 'Senior .NET Developer · full-time until Nov 2020, then project-based consultant',
        periodo: 'Mar 2020 – present',
        itens: [
            'Technically responsible for an e-commerce platform made of four APIs, a frontend and a background processing service.',
            'Lead the platform modernization: AngularJS to React, four APIs from .NET Framework 4.8 to .NET 8, SQL Server to PostgreSQL and Azure to AWS.',
            'Define technical approaches, implement integrations, and estimate and deliver enhancements and fixes with stakeholders.',
        ],
    },
    {
        cargo: 'Senior .NET Developer',
        periodo: 'Nov 2022 – Oct 2024',
        itens: [
            "Led development of the client's main API and frontend within a microservices architecture, coordinating changes with other teams.",
            'Worked with AWS infrastructure, message queues and CI/CD pipelines.',
        ],
        tecnologias: ['C#', '.NET', 'REST', 'Microservices', 'AWS', 'CI/CD'],
    },
    {
        cargo: 'Senior .NET Developer',
        periodo: 'Nov 2020 – Oct 2022',
        itens: [
            'Developed web applications and APIs and maintained legacy systems across frontend and backend.',
            'Built an internal tool with centralized logging to help the support team investigate application issues.',
        ],
    },
    {
        cargo: 'Software Engineer II',
        periodo: 'Dec 2019 – Mar 2020',
        itens: [
            'Maintained ASP.NET systems and worked on database performance. Introduced Kanban and led the move from SVN to Git with GitFlow.',
        ],
    },
    {
        cargo: 'Software Engineer',
        periodo: 'Jan 2016 – Dec 2019',
        itens: [
            'Developed and maintained desktop and mobile applications working with multiple databases and internal tools.',
        ],
    },
];

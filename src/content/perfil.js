// Conteúdo estático do portfólio (apresentação, experiência e links).
// Fonte: currículo. Projetos e publicações continuam vindo da API.

export const links = {
    linkedin: 'https://www.linkedin.com/in/rodrigoborgesmachado/',
    github: 'https://github.com/rodrigoborgesmachado',
    email: 'rodrigoborgesmachado@gmail.com',
    curriculos: [
        { idioma: 'PT', href: '/curriculo/rodrigo-machado-cv-pt.pdf' },
        { idioma: 'EN', href: '/curriculo/rodrigo-machado-cv-en.pdf' },
    ],
};

export const apresentacao = {
    saudacao: 'Olá, seja bem-vindo ao meu habitat natural.',
    nome: 'Rodrigo Machado',
    linha: 'Desenvolvedor .NET · Uberlândia, MG',
    paragrafos: [
        'Trabalho com software há mais de 10 anos, quase sempre com C# e .NET e, de uns anos para cá, também com React. Hoje faço parte do time da Condo Control, uma empresa canadense, e uso inglês no dia a dia.',
        'Nas horas vagas eu construo coisas: um site de questões para o ENEM, um sistema de RH, um jogo de tabuada para crianças, ferramentas para banco de dados. Estão todos aqui embaixo. Alguns estão no ar, outros ficaram como estudo.',
        'Fora do computador, pedalo e jogo de goleiro no futsal.',
    ],
};


export const experiencias = [
    {
        empresa: 'Buffer Group',
        cliente: 'Condo Control',
        cargo: 'Desenvolvedor .NET Sênior',
        periodo: 'out 2024 – atual',
        itens: [
            'Desenvolvo funcionalidades e mantenho um produto ASP.NET MVC (Razor, C#, APIs e SQL Server) e participo da adoção gradual de React.',
            'Implementei o suporte a várias marcas do produto em fluxos de login, redirecionamentos, templates de email e configuração de workspaces.',
            'Investigo e corrijo defeitos em fluxos existentes, trabalhando com QA da análise até a validação de cada entrega.',
        ],
        tecnologias: ['C#', '.NET Framework 4.8', '.NET Core', 'ASP.NET MVC', 'React', 'SQL Server', 'Azure'],
    },
    {
        empresa: 'Pisomtech',
        cliente: 'Moderna',
        cargo: 'Desenvolvedor .NET Sênior · CLT até nov 2020, depois consultor por projeto',
        periodo: 'mar 2020 – atual',
        itens: [
            'Sou responsável técnico por uma plataforma de e-commerce com quatro APIs, um frontend e um serviço de processamento em segundo plano.',
            'Conduzo a modernização da plataforma: AngularJS para React, quatro APIs de .NET Framework 4.8 para .NET 8, SQL Server para PostgreSQL e Azure para AWS.',
            'Defino abordagens técnicas, implemento integrações e estimo e entrego melhorias e correções junto aos stakeholders.',
        ],
        tecnologias: ['C#', '.NET 8', 'React', 'AngularJS', 'PostgreSQL', 'SQL Server', 'AWS', 'Docker'],
    },
    {
        empresa: 'Lean Tech',
        cliente: 'Derivative Path',
        cargo: 'Desenvolvedor .NET Sênior',
        periodo: 'nov 2022 – out 2024',
        itens: [
            'Liderei o desenvolvimento da API principal e do frontend do cliente em uma arquitetura de microsserviços, coordenando mudanças com outros times.',
            'Trabalhei com infraestrutura AWS, filas de mensagens e pipelines de CI/CD.',
        ],
        tecnologias: ['C#', '.NET', 'REST', 'Microsserviços', 'AWS', 'CI/CD'],
    },
    {
        empresa: 'TopDown Sistemas',
        cargo: 'Desenvolvedor .NET Sênior',
        periodo: 'nov 2020 – out 2022',
        itens: [
            'Desenvolvi aplicações web e APIs e mantive sistemas legados no frontend e no backend.',
            'Criei uma ferramenta interna com log centralizado para o suporte investigar problemas nas aplicações.',
        ],
        tecnologias: ['C#', '.NET Framework 4.8', 'ASP.NET', 'Blazor', 'Oracle'],
    },
    {
        empresa: 'UP Brasil',
        cargo: 'Engenheiro de Software II',
        periodo: 'dez 2019 – mar 2020',
        itens: [
            'Mantive sistemas ASP.NET e trabalhei em performance de banco de dados. Introduzi o Kanban e conduzi a migração de SVN para Git com GitFlow.',
        ],
        tecnologias: ['C#', 'ASP.NET', 'SQL Server', 'Oracle', 'Git'],
    },
    {
        empresa: 'Landix Sistemas',
        cargo: 'Engenheiro de Software',
        periodo: 'jan 2016 – dez 2019',
        itens: [
            'Desenvolvi e mantive aplicações desktop e mobile com vários bancos de dados e ferramentas internas.',
        ],
        tecnologias: ['C#', '.NET', 'Xamarin', 'T-SQL', 'PL/SQL', 'Firebird', 'SQLite'],
    },
];

// Publicações mostradas na home (títulos exatos da API). A lista completa fica em /postagens.
export const publicacoesSelecionadas = [
    'Ciclo de Vida de uma API .NET',
    'Clean Architecture com .NET',
    'SOLID Principles',
];

import * as pt from './perfil';
import * as en from './perfil.en';

// Conteúdo estático por idioma. Links e tecnologias vêm sempre de perfil.js;
// perfil.en.js só traz os textos em inglês.
export const conteudo = {
    pt: {
        apresentacao: pt.apresentacao,
        experiencias: pt.experiencias,
    },
    en: {
        apresentacao: { ...pt.apresentacao, ...en.apresentacao },
        experiencias: pt.experiencias.map((exp, i) => ({ ...exp, ...en.experiencias[i] })),
    },
};

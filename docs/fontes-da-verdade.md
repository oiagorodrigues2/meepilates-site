# Fontes da verdade

Cada dado do negócio tem um único lugar que o define. Página nenhuma
repete o valor: importa daqui. Quando um dado novo aparecer, ele ganha
uma linha nesta tabela antes de ir para a página.

| Dado | Onde vive | Status |
| :-- | :-- | :-- |
| Nome, contato, endereço, redes sociais | `src/data/estudio.ts` | a criar com os dados reais |
| Modalidades | `src/data/modalidades.ts` | a criar |
| Planos e preços | `src/data/planos.ts` | a criar |
| Horários | `src/data/horarios.ts` | a criar |
| Título, descrição e SEO da página | props de `src/layouts/Base.astro` | ativo |

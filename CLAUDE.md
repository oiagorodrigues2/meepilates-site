# Mee Pilates — site

Site do estúdio Mee Pilates (meepilates.com.br), substituindo o site atual
no Wix. Também é o primeiro projeto construído com o GENIAX Framework: as
peças de trabalho autônomo (bastão, hooks, comandos) nascem aqui e sobem
para o repositório `agencia-ia` quando provarem valor.

## Framework (genérico)

Copiado de `agencia-ia/framework/CLAUDE-base.md` (commit 9a1c063). Não
edite aqui: melhorias entram lá primeiro e depois são copiadas para cá.

### Só executar com intenção declarada
Execute (código, banco, GitHub, branch) só quando o usuário declarar
intenção: "faça", "vai", "vamos fazer", "arrume isso", "muda isso" e
parecidos. Sem isso, analise, responda ou planeje, sem mexer em nada.
Se a intenção não estiver clara, pergunte uma vez só: "Quer que eu faça
ou só planejar?". Não pergunte a cada frase quando a ordem já foi dada.

### Planejar só tarefa grande
Tarefa pequena vai direto. Tarefa que não cabe numa frase: levante o
contexto, faça as perguntas em lote (com opções e recomendação),
apresente o plano e espere o "vai".

### Pronto é pronto
- Prove, não afirme: cite o resultado da verificação (typecheck, lint,
  teste), só o resumo, nunca o log inteiro.
- Ação só se relata depois do retorno da ferramenta: commit, push e
  issue se citam com o SHA ou número devolvido. Sem retorno, fale no
  futuro.
- Feito = merge na branch principal do projeto + deploy com sucesso.
  Se não der pra conferir o deploy, diga isso em vez de afirmar
  "no ar".

### Princípios de engenharia (nessa ordem quando conflitarem)
1. SSOT: cada informação ou regra existe num lugar só.
2. DRY: a mesma lógica não aparece copiada em dois lugares.
3. KISS: a solução mais simples que resolve vence.
- Falha que aparece: todo erro (banco, API, integração) é conferido e
  mostrado ao usuário; nada falha em silêncio.
- Idempotência decidida: o que grava em lote (geração em massa,
  backfill, migration) checa "já existe?" e não duplica se rodar duas
  vezes.
- Menor privilégio: cada pessoa só acessa o que precisa, e a permissão
  fica no banco/servidor, não só escondendo botão na tela.
- Procure antes de criar: ver "Checar duplicidade" abaixo.

### Checar duplicidade antes de feature/relatório novo
Antes de implementar algo novo, faça uma checagem rápida e barata
(busca direcionada pelo nome provável da tabela, verbos como
"criar"/"lançar"/"cadastrar" + o domínio, telas que já tocam esse dado;
não uma varredura grande nem um subagente) atrás de algo que já faça o
mesmo. Se achar algo para reaproveitar ou consolidar, aponte ANTES de
escrever código, citando arquivo:linha, nunca uma suspeita genérica. Se
não achar nada, uma frase basta.

### Avaliação de complexidade/impacto só quando pedida
Não pergunte proativamente se o usuário quer avaliar complexidade ou
impacto (performance, manutenção) antes de implementar. Quando ele
pedir, apresente isso claramente antes de implementar.

### Custo de tokens
Se algo for gastar muitos tokens (build completo, varredura grande,
leitura de muitos arquivos, subagente), avise antes e proponha a forma
mais barata.

### Referências não são regras
As pastas `referencias/`, `casos/` e `analises/` do repositório do
GENIAX são biblioteca de estudo. Não aplique práticas delas (time de
agentes, bastão, mapa, auditorias, branches paralelas) sem o usuário
pedir. Só vale o que está neste arquivo.

## Específico

### Stack
- Astro 7 (site estático) + Tailwind CSS 4, TypeScript estrito.
- Node >= 22.23.4 (`.nvmrc` fixa 24). Se o Node local for mais antigo,
  rode com `npx -y node@24 node_modules/astro/bin/astro.mjs <comando>`.
- Hospedagem: Cloudflare Workers com assets estáticos (plano gratuito,
  permite uso comercial; o Hobby da Vercel não permite). Deploy automático
  no push da `main`: `npm run build` e depois `npx wrangler deploy`, que lê
  `wrangler.jsonc` (serve `dist/`).
- Produção: https://meepilates-site.contato-iagorodrigues.workers.dev
  (meepilates.com.br continua no Wix até a troca do DNS). Cada branch
  ganha um preview em `*-meepilates-site.contato-iagorodrigues.workers.dev`.

### Comandos
- `npm run dev`: servidor local.
- `npm run build`: `astro check` (tipos) + build. É a prova de "pronto"
  e é o que o CI roda a cada push e PR.

### Estrutura
- `src/pages/`: uma página por arquivo (rota = caminho).
- `src/layouts/Base.astro`: casca HTML, `<head>` e SEO. Único lugar que
  monta `<title>`, descrição e canonical.
- `src/styles/global.css`: Tailwind e tokens do tema.
- `docs/`: decisões e fontes da verdade do projeto.

### Fontes da verdade
Ver `docs/fontes-da-verdade.md`. Dado do negócio (contato, endereço,
preço, horário) existe num lugar só e as páginas leem de lá.

### Git
- Branch principal: `main`. Commits pequenos, um assunto por vez.
- Nunca `git add -A` nem `git add .`: adicione os arquivos pelo nome.

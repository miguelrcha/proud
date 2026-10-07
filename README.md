# Feyce — Landing Page

Landing page em Next.js 14 (App Router) + TypeScript + Tailwind CSS, inspirada na estrutura da página da Alcove (tryalcove.com), com fundo cinza, texto preto e a marca "Feyce".

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Gerar build de produção (site estático)

O projeto está configurado com `output: "export"`, então o build gera arquivos estáticos prontos para qualquer hospedagem (Vercel, Netlify, S3, GitHub Pages, etc.):

```bash
npm run build
```

Os arquivos finais ficam na pasta `out/`. Para pré-visualizar o resultado do build:

```bash
npx serve@latest out
```

## Estrutura

```
app/
  layout.tsx      # layout raiz, fontes e metadata
  page.tsx        # monta todas as seções da home
  globals.css     # tokens de cor/tipografia e estilos base
components/
  Header.tsx      # cabeçalho com logo "Feyce" e navegação
  Hero.tsx        # headline + demo animada da barra de menu
  Stats.tsx       # tira de estatísticas
  Features.tsx    # recursos em linhas alternadas com ilustrações SVG
  HowItWorks.tsx  # 3 passos de configuração
  Testimonial.tsx # depoimento em destaque
  Pricing.tsx     # planos e CTA final (faixa escura)
  Footer.tsx      # rodapé
public/
  icon-180.png    # logo recortada (usada no header/footer)
  icon-512.png    # logo em alta resolução
  favicon-32.png  # favicon
```

## Personalizar

- Cores: `tailwind.config.ts` (tokens `bg`, `ink`, `night`, etc.)
- Textos: direto em cada componente dentro de `components/`
- Logo: substitua os arquivos em `public/` mantendo os mesmos nomes

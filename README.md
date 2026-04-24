# PageDrop — Générateur de pages Shopify IA

## Installation locale

```bash
npm install
cp .env.example .env.local
# Ajoute ta clé API dans .env.local
npm run dev
```

## Déploiement sur Vercel

1. Push ce projet sur GitHub
2. Va sur vercel.com → "New Project" → importe ton repo GitHub
3. Dans les settings Vercel, ajoute la variable d'environnement :
   - Nom : `ANTHROPIC_API_KEY`
   - Valeur : ta clé depuis console.anthropic.com
4. Clique sur "Deploy"

C'est tout ! Vercel s'occupe du reste.

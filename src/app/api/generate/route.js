import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    const { productName, category, benefits, target, tone, pageType } =
      await request.json();

    if (!productName) {
      return Response.json({ error: "Nom du produit requis" }, { status: 400 });
    }

    const typeLabel =
      pageType === "product"
        ? "page produit Shopify"
        : "landing page Shopify";

    const prompt = `Tu es un expert en copywriting e-commerce et dropshipping. Génère une ${typeLabel} complète en français pour ce produit.

Produit: ${productName}
Catégorie: ${category}
Bénéfices: ${benefits || "à déterminer selon le produit"}
Cible: ${target}
Ton: ${tone}

Réponds UNIQUEMENT en JSON valide avec cette structure exacte (pas de markdown, pas de backticks):
{
  "titre": "titre accrocheur du produit",
  "accroche": "phrase d'accroche courte et percutante (1-2 lignes)",
  "description": "description principale du produit (3-4 phrases persuasives)",
  "benefices": ["bénéfice 1", "bénéfice 2", "bénéfice 3", "bénéfice 4"],
  "preuve_sociale": "élément de preuve sociale / témoignage fictif",
  "cta": "texte du bouton d'achat"
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content[0].text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(raw);

    return Response.json(result);
  } catch (error) {
    console.error("Erreur génération:", error);
    return Response.json({ error: "Erreur de génération" }, { status: 500 });
  }
}

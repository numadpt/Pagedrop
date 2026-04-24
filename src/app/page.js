"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [pageType, setPageType] = useState("product");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("beaute");
  const [benefits, setBenefits] = useState("");
  const [target, setTarget] = useState("femmes");
  const [tone, setTone] = useState("premium");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    if (!productName.trim()) {
      setError("Entre le nom de ton produit");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, category, benefits, target, tone, pageType }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError("Erreur de génération, réessaie.");
    }
    setLoading(false);
  }

  function copyAll() {
    if (!result) return;
    const text = `TITRE: ${result.titre}\n\nACCROCHE: ${result.accroche}\n\nDESCRIPTION: ${result.description}\n\nBÉNÉFICES:\n${result.benefices.map((b) => "• " + b).join("\n")}\n\nPREUVE SOCIALE: ${result.preuve_sociale}\n\nCTA: ${result.cta}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={styles.page}>
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <nav className={styles.nav}>
        <div className={styles.logo}>Page<span>Drop</span></div>
        <div className={styles.badge}>Beta</div>
      </nav>

      <main className={styles.main}>
        <div className={styles.heroTag}>✦ Propulsé par l&apos;IA</div>
        <h1 className={styles.h1}>
          Génère ta page Shopify<br />
          <em>en 10 secondes.</em>
        </h1>
        <p className={styles.subtitle}>
          Entre ton produit, l&apos;IA crée une page complète optimisée pour convertir.
          Prête à copier dans Shopify.
        </p>

        <div className={styles.formCard}>
          <div className={styles.typeToggle}>
            <button
              className={`${styles.typeBtn} ${pageType === "product" ? styles.active : ""}`}
              onClick={() => setPageType("product")}
            >
              📦 Page Produit
            </button>
            <button
              className={`${styles.typeBtn} ${pageType === "landing" ? styles.active : ""}`}
              onClick={() => setPageType("landing")}
            >
              🚀 Landing Page
            </button>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label>Nom du produit *</label>
              <input
                type="text"
                placeholder="ex: Ice Face Roller Glacé"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={error ? { borderColor: "#ff4d6d" } : {}}
              />
              {error && <span className={styles.errorMsg}>{error}</span>}
            </div>
            <div className={styles.field}>
              <label>Catégorie</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="beaute">Beauté / Skincare</option>
                <option value="maison">Maison / Déco</option>
                <option value="fitness">Fitness / Sport</option>
                <option value="tech">Tech / Gadgets</option>
                <option value="mode">Mode / Accessoires</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div className={`${styles.field} ${styles.full}`}>
              <label>Bénéfices clés (optionnel)</label>
              <input
                type="text"
                placeholder="ex: réduit les pores, effet anti-âge, stimule la circulation"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label>Cible</label>
              <select value={target} onChange={(e) => setTarget(e.target.value)}>
                <option value="femmes">Femmes 18-35</option>
                <option value="hommes">Hommes 18-35</option>
                <option value="tous">Tout public</option>
                <option value="pro">Professionnels</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Ton de la page</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="premium">Premium / Luxe</option>
                <option value="viral">Viral / Tendance</option>
                <option value="simple">Simple / Direct</option>
                <option value="scientifique">Scientifique / Expert</option>
              </select>
            </div>
          </div>

          <button className={styles.generateBtn} onClick={generate} disabled={loading}>
            {loading ? (
              <span className={styles.btnInner}>
                <span className={styles.spinner} />
                Génération en cours...
              </span>
            ) : (
              <span className={styles.btnInner}>✦ Générer ma page</span>
            )}
          </button>
        </div>

        {result && (
          <div className={styles.resultCard}>
            <div className={styles.resultHeader}>
              <div className={styles.resultTitle}>✦ Page générée</div>
              <div className={styles.resultActions}>
                <button className={styles.copyBtn} onClick={copyAll}>
                  {copied ? "✓ Copié !" : "Copier tout"}
                </button>
                <button className={styles.shopifyBtn}>↗ Exporter Shopify</button>
              </div>
            </div>
            <div className={styles.resultContent}>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel}>Titre</div>
                <div className={styles.productTitle}>{result.titre}</div>
              </div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel}>Accroche</div>
                <div className={styles.sectionText}>{result.accroche}</div>
              </div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel}>Description</div>
                <div className={styles.sectionText}>{result.description}</div>
              </div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel}>Bénéfices clés</div>
                <ul className={styles.bullets}>
                  {result.benefices.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel}>Preuve sociale</div>
                <div className={styles.sectionText}>{result.preuve_sociale}</div>
              </div>
              <div className={styles.sectionBlock}>
                <div className={styles.sectionLabel}>Bouton d&apos;achat</div>
                <div className={styles.ctaPreview}>{result.cta}</div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNum}>2 400+</div>
            <div className={styles.statLabel}>Pages générées</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>+34%</div>
            <div className={styles.statLabel}>Taux de conversion</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>10s</div>
            <div className={styles.statLabel}>Temps de génération</div>
          </div>
        </div>
      </main>
    </div>
  );
}

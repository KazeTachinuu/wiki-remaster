// Mock catalog for local WikiMasters prototype.
// Seeded with real card data captured from the live app (titles, categories,
// stats, Wikimedia images) plus a few extra commons/legendaries for variety.
// rarity order: C=0 PC=1 R=2 SR=3 UR=4 L=5

const RARITY_ORDER = { C: 0, PC: 1, R: 2, SR: 3, UR: 4, L: 5 };

// Draw weights (gacha odds). Tuned slightly generous so testing is fun.
const RARITY_WEIGHTS = { C: 50, PC: 26, R: 15, SR: 6, UR: 2.6, L: 0.4 };

const PV_BY_RARITY = { C: 12, PC: 160, R: 520, SR: 2100, UR: 9000, L: 21000 };
function card(wikipedia_title, category, rarity, atk, def, image_url) {
  const jitter = 0.6 + Math.random() * 0.9;
  return {
    id: null, // filled below
    wikipedia_title,
    wikipedia_url:
      "https://fr.wikipedia.org/wiki/" + encodeURIComponent(wikipedia_title.replace(/ /g, "_")),
    category,
    rarity,
    rarity_order: RARITY_ORDER[rarity],
    atk,
    def,
    q_score: Math.round((5 + Math.random() * 85) * 100) / 100,
    pageviews: Math.round(PV_BY_RARITY[rarity] * jitter),
    image_url: image_url || null,
  };
}

const W = "https://upload.wikimedia.org/wikipedia/commons/thumb/";

const CATALOG = [
  // ---- Legendary ----
  card("Albert Einstein", "physicien théoricien (1879-1955)", "L", 9840, 8120,
    W + "d/d3/Albert_Einstein_Head.jpg/330px-Albert_Einstein_Head.jpg"),
  card("Marie Curie", "physicienne et chimiste (1867-1934)", "L", 9610, 8480,
    W + "7/7e/Marie_Curie_c1920.jpg/330px-Marie_Curie_c1920.jpg"),
  card("Léonard de Vinci", "artiste et savant de la Renaissance", "L", 9720, 8890,
    W + "c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/330px-Francesco_Melzi_-_Portrait_of_Leonardo.png"),

  // ---- Ultra rare ----
  card("Albert Uderzo", "dessinateur français de bande dessinée (1927-2020)", "UR", 8731, 7942,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Albert_Uderzo_20080318_Salon_du_livre_3.jpg/330px-Albert_Uderzo_20080318_Salon_du_livre_3.jpg"),
  card("Tibet", "haut plateau situé au nord de l'Himalaya", "UR", 9000, 9019,
    W + "6/6b/Tibet-claims.jpg/330px-Tibet-claims.jpg"),
  card("Vera Farmiga", "actrice, productrice et directrice artistique américaine", "UR", 8636, 6736,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Vera_Farmiga_%2843676389342%29.jpg/330px-Vera_Farmiga_%2843676389342%29.jpg"),
  card("Roland Giraud", "acteur français", "UR", 7784, 4073,
    W + "0/06/Roland_Giraud_au_th%C3%A9atre_en_mars_2012_%28Auderghem-Belgique%29.jpg/330px-Roland_Giraud_au_th%C3%A9atre_en_mars_2012_%28Auderghem-Belgique%29.jpg"),
  card("Pour le plaisir (film, 2026)", "film réalisé par Reem Kherici, 2026", "UR", 7015, 3553, null),

  // ---- Super rare ----
  card("Université de Genève", "université à Genève, Suisse", "SR", 7273, 7786,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/GenevaUniversity.JPG/330px-GenevaUniversity.JPG"),
  card("The Cars", "groupe de musique rock américain", "SR", 6010, 3575,
    W + "f/f7/Ric-Ocasek.jpg/330px-Ric-Ocasek.jpg"),
  card("Wilhelm Gustloff (paquebot)", "paquebot allemand torpillé en 1945", "SR", 6656, 5320,
    W + "b/bf/Bundesarchiv_Bild_183-H27992%2C_Lazarettschiff_%22Wilhelm_Gustloff%22_in_Danzig.jpg/330px-Bundesarchiv_Bild_183-H27992%2C_Lazarettschiff_%22Wilhelm_Gustloff%22_in_Danzig.jpg"),
  card("Accordéon diatonique", "instrument de musique", "SR", 7157, 8437,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Accord%C3%A9on_diatonique_B.Loffet_Graet_e_Breizh_2_rangs_3_voix.jpg/330px-Accord%C3%A9on_diatonique_B.Loffet_Graet_e_Breizh_2_rangs_3_voix.jpg"),
  card("Georges Seurat", "peintre français", "SR", 7230, 8605,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Georges_Seurat_1888.jpg/330px-Georges_Seurat_1888.jpg"),
  card("Meylan", "commune française du département de l'Isère", "SR", 7284, 8425,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Avenue_de_Verdun_-_Meylan.JPG/330px-Avenue_de_Verdun_-_Meylan.JPG"),
  card("Club de Rome", "groupe de réflexion", "SR", 6496, 5782,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Club_of_Rome_Logo.svg/330px-Club_of_Rome_Logo.svg.png"),
  card("Sean Parker", "homme d'affaires américain", "SR", 5789, 3485,
    W + "0/04/Sean_Parker_2011.jpg/330px-Sean_Parker_2011.jpg"),
  card("Barbara Probst", "actrice française", "SR", 6201, 3158, null),

  // ---- Rare ----
  card("Mikaela Shiffrin", "skieuse alpine américaine", "R", 6000, 8550,
    W + "8/81/Mikaela_Shiffrin_M%C3%A9ribel_2023.jpg/330px-Mikaela_Shiffrin_M%C3%A9ribel_2023.jpg"),
  card("L'Est républicain", "quotidien régional français", "R", 5628, 8167,
    W + "c/c5/Logo_Journal_L%27Est_R%C3%A9publicain_-_2022.svg/330px-Logo_Journal_L%27Est_R%C3%A9publicain_-_2022.svg.png"),
  card("Souslik d'Europe", "espèce de rongeur", "R", 4909, 5137,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Europ%C3%A4ischer_Ziesel_in_Hockstellung.jpg/330px-Europ%C3%A4ischer_Ziesel_in_Hockstellung.jpg"),
  card("Alfonsina Storni", "écrivaine argentine", "R", 4561, 3552, null),
  card("Conor Bradley", "footballeur nord-irlandais", "R", 5084, 4545,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Conor_Bradley_in_2021.jpg/330px-Conor_Bradley_in_2021.jpg"),
  card("Musée Champollion (Figeac)", "musée de Figeac dans le Lot", "R", 4605, 3628,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Facade_musee_champollion_figeac.jpg/330px-Facade_musee_champollion_figeac.jpg"),
  card("Flevoland", "province des Pays-Bas", "R", 4888, 4115,
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Flevoland.svg/330px-Flag_of_Flevoland.svg.png"),
  card("Larme", "sécrétion des glandes lacrymales", "R", 5058, 4890,
    W + "e/e2/Lacrimal_punctum.jpg/330px-Lacrimal_punctum.jpg"),
  card("Sigebert III", "roi d'Austrasie", "R", 5030, 4447,
    W + "e/ef/Solidus_de_Sigebert_III_frapp%C3%A9_%C3%A0_Marseille.png/330px-Solidus_de_Sigebert_III_frapp%C3%A9_%C3%A0_Marseille.png"),
  card("One Ok Rock", "groupe de musique japonais", "R", 5664, 6060, null),
  card("Bing Russell", "acteur américain", "R", 4675, 1948, null),
  card("My Funny Valentine", "chanson de Richard Rodgers et Lorenz Hart", "R", 4562, 2451, null),
  card("Histoire de la langue italienne", "histoire linguistique", "R", 5005, 3500, null),

  // ---- Peu commun ----
  card("Réceswinthe", "roi wisigoth du VIIe siècle", "PC", 3165, 4363,
    W + "7/72/Recesvinto_%28Museo_del_Prado%29.jpg/330px-Recesvinto_%28Museo_del_Prado%29.jpg"),
  card("Gare de Vierzon", "gare ferroviaire française", "PC", 2980, 3610, null),
  card("Céraiste commun", "plante de la famille des Caryophyllaceae", "PC", 2740, 3980, null),
  card("Phare de Cordouan", "phare en mer à l'embouchure de la Gironde", "PC", 3320, 4510,
    W + "9/9a/Phare_de_Cordouan_-_2.jpg/330px-Phare_de_Cordouan_-_2.jpg"),
  card("Rue Saint-Maur", "voie du 11e arrondissement de Paris", "PC", 2610, 3200, null),

  // ---- Commun ----
  card("Gwilym Prys Davies", "personnalité politique britannique", "C", 1831, 2658, null),
  card("Shane Willis", "joueur de hockey sur glace canadien", "C", 2012, 2800,
    W + "2/21/Shane_Willis.jpg/330px-Shane_Willis.jpg"),
  card("Nakajima-Kōen (métro de Sapporo)", "station du métro de Sapporo", "C", 1797, 3421,
    W + "d/d8/Nakajima_Koen_Station_Sapporo03n4050.jpg/330px-Nakajima_Koen_Station_Sapporo03n4050.jpg"),
  card("Tanacross", "langue athapascane", "C", 1848, 2190, null),
  card("Xylocope violet", "abeille solitaire de grande taille", "C", 1520, 2740, null),
  card("Ruisseau des Planches", "cours d'eau du Jura", "C", 1340, 2010, null),
  card("Édouard Baratoux", "médecin français du XIXe siècle", "C", 1610, 1980, null),
  card("Gare de Lozanne", "gare ferroviaire du Rhône", "C", 1450, 2360, null),
  card("Micrurus tener", "serpent corail d'Amérique du Nord", "C", 1720, 2280,
    W + "5/5e/Texas_Coral_Snake.jpg/330px-Texas_Coral_Snake.jpg"),
  card("Hippolyte Bayard", "photographe français, pionnier (1801-1887)", "C", 1900, 3050, null),
  card("Canton de Sault", "ancienne division administrative du Vaucluse", "C", 1280, 2440, null),
  card("Salsepareille", "plante grimpante du genre Smilax", "C", 1390, 2620, null),
];

CATALOG.forEach((c, i) => (c.id = "card_" + (i + 1)));

export { CATALOG, RARITY_WEIGHTS, RARITY_ORDER };

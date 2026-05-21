# PROMPT — Fix Questionnaire Distribution (lien inaccessible)

## Problème actuel
Le module Questionnaire génère un lien de partage qui pointe vers l'URL de l'artefact Claude (`claude.ai/artifact/...`). Ce lien nécessite un "preview token" côté Claude → les destinataires externes ne peuvent PAS ouvrir le questionnaire. Le lien est mort pour eux.

## Solution demandée — Questionnaire standalone exportable + collecte via shared storage

Remplace le système de distribution actuel par une architecture en 2 volets :

### Volet 1 — Export du questionnaire en fichier HTML standalone

Quand l'utilisateur clique sur "Distribute" → au lieu de copier un lien Claude :
1. **Générer un fichier HTML autonome** contenant le questionnaire complet (questions, options, styling) — ce fichier fonctionne en ouvrant simplement le `.html` dans un navigateur, sans aucune dépendance externe.
2. Le HTML embarqué contient :
   - Les questions du template sélectionné (Application Utility / Cloud Migration Readiness / SCOR Process Coverage) ou du questionnaire custom
   - Un formulaire fonctionnel avec tous les types de questions (Likert, choix multiple, texte libre, etc.)
   - Un champ "Respondent name" et "Site" (Munich/UK/SGP/MAL) en haut
   - Un bouton "Submit" qui :
     - Sérialise les réponses en JSON
     - Affiche le JSON dans une zone copiable avec un bouton "Copy to clipboard"
     - Affiche aussi un **QR code** (généré côté client, librairie `qrcode.js` en inline ou via CDN) encodant le JSON compressé
     - Affiche un message : "Copiez ce JSON et envoyez-le par email à [adresse configurable] OU scannez le QR code"
3. Le styling du HTML standalone doit reprendre l'identité visuelle ASMPT (bleu/gris, professionnel)

### Volet 2 — Import des réponses dans l'artefact principal

Dans la page Questionnaire de l'artefact principal, ajouter une section **"Import Responses"** :
1. **Zone de paste** : textarea où l'admin colle le JSON reçu par email
2. **Bouton "Import"** qui parse le JSON, valide la structure, et écrit dans `window.storage` avec la clé `questionnaire-responses:{questionnaire_id}:{respondent}:{timestamp}` (shared: false, car c'est l'admin qui importe)
3. **Historique des imports** : liste des réponses importées avec respondent name, site, date, questionnaire type
4. Les réponses importées alimentent ensuite le module **AI Analysis** existant exactement comme avant

### Volet 3 — Mettre à jour les boutons de distribution existants

Les boutons existants (Copy link, Copy email, mailto Outlook, Teams deep link, QR code) doivent être remplacés/adaptés :
- **"Copy link"** → supprimé (plus de lien à copier)
- **"Download questionnaire HTML"** → NOUVEAU : télécharge le fichier HTML standalone généré
- **"Send via Email"** → `mailto:` qui ouvre Outlook avec le fichier HTML en pièce jointe mentionnée dans le corps ("Please find attached the questionnaire, open it in your browser, fill it, and send back the JSON result")
- **"Send via Teams"** → deep link Teams avec un message pré-rempli expliquant la procédure
- **"QR Code"** → QR code encodant un lien vers le fichier HTML si hébergé, OU supprimé si pas hébergé

## Contraintes techniques
- Pas de backend — tout côté client
- Le fichier HTML standalone doit être 100% autonome (pas de fetch vers l'artefact Claude)
- `window.storage` pour la persistance dans l'artefact principal (PAS localStorage)
- Le store centralisé reste la source de vérité
- Performance : fluide avec 137+ apps
- Style : cohérent avec l'existant (dark sidebar, ASMPT bleu/gris, data-dense)

## Ce qui ne doit PAS changer
- Le questionnaire builder (création/édition des questions) reste identique
- Les 3 templates existants restent identiques
- Le module AI Analysis continue de fonctionner sur les réponses importées
- Toutes les autres pages/vues restent inchangées

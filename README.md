Marre des pubs et du pistage sur les sites de cuisine?

Hébergez le vôtre localement, et n'extrayez-en que la substantifique moelle.

![](data/assets/logo_white_colo.png)

Bouillonnade, c'est pas de la marmelade.

Venez voir chez [Au Gros Bouillon](https://bouillon.nopub.club) en guise d'amuse-bouche.

## 🍳 Détails

`bouillonnade` est composé de trois services docker qui fonctionnent comme un tout:

- `nginx` pour la gestion HTTP,
- `php` pour l'exécution de scripts côté serveur, 
- `searx` (moteur de recherche local) pour récupérer les URL de recettes correspondant à la recherche de l'utilisateur

Le fonctionnement de `bouillonnade` est proche de celui d'une API. Les données brutes des sites de cuisine sont récupérées et transformées localement.
En résumé, `bouillonnade` ne stocke pas d'informations mais ne fait que les épurer.

Trois sites sont actuellement supportés:

- [marmiton](https://marmiton.org)
- [750g](https://750g.com)
- [cuisineaz](https://cuisineaz.com)

En aucune manière `bouillonnade` n'est affilié à ces sites.

`bouillonnade` est en développement passif.

## 🍰 Les problèmes du web moderne

Voici une courte illustration de ce qu'il se passe lorsqu'on clique sur une [page de recette](https://www.marmiton.org/recettes/recette_carbonades-flamandes-traditionnelles_29711.aspx) chez [marmiton.org](https://marmiton.org): 

- **en seulement <ins>15 secondes</ins> c'est plus de <ins>130 requêtes</ins> et <ins>30MB</ins> de données en transit (pour une simple recette!)**.

En restant sur la page quelques minutes (sans rien faire), c'est 30MB de plus. Pourquoi? Pistage.

- du pistage, du **pistage** et encore du <ins>**pistage**</ins>...

Voici une liste non exhaustive de noms de domaines invoqués pour une malheureuse salade fraîcheur:

```console
marmiton.org
2mdn.net
adtelligent.com
afcdn.com
affilizz.com
amazon-adsystem.com
criteo.com
doubleclick.net
flymenu.fr
googlesyndication.com
googletagmanager.com
gstatic.com
id5-sync.com
imasdk.googleapis.com
mrf.io
pbstck.com
privacy-center.org
sparteo.com
stickyadstv.com
teads.tv
viously.com
wysistat.com
```

- des <ins>pubs</ins>, des <ins>pubs</ins>, des *<ins>pubs</ins>*... 

Visuellement, c'est affreux.

| En somme |
|:--------:|
|On nous prend vraiment pour des jambons.|

## 🍒 La solution

Faites appel à `bouillonnade`.

```console
$ git clone https://github.com/dougy147/bouillonnade
$ cd ./bouillonnade
$ docker compose build
$ docker compose up -d
```

Puis `http://localhost:8989`.

Les _query parameters_ sont supportés (e.g. `http://localhost:8989/?q=omelette+du+fromage`).

Il est possible d'entrer directement une URL dans la barre de recherche, ou comme _query parameter_ (e.g. `http://localhost:8989/?q=https://www.marmiton.org/recettes/recette_carbonades-flamandes-traditionnelles_29711.aspx`). 

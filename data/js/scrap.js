function scrap(url, content) {
    if (url.includes("marmiton")) {
	return scrap_marmiton(content)
    }
    if (url.includes("750g")) {
	return scrap_750g(content)
    }
    if (url.includes("cuisineaz")) {
	return scrap_cuisineaz(content)
    }
    return {}
}

function scrap_cuisineaz(content) {
    /*
	cuisineaz: no keywords, no videos
	*/
    var recipe = JSON.parse(content);

    var r = recipe["@graph"][1];

    var name 		   = r["name"] || "";
    var description 	   = r["description"] || "";
    var images 		   = r["image"] || []; 		/*list*/
    var recipeCategory 	   = r["recipeCategory"] || "";
    var recipeCuisine 	   = r["recipeCuisine"] || "";
    var recipeIngredient   = r["recipeIngredient"] || []; 	/*list*/
    var recipeInstructions = r["recipeInstructions"] || [];	/*list*/
    var recipeYield 	   = r["recipeYield"] || "";
    var keywords 	   = []; /* for cuisineaz */
    var author 		   = (r["author"] && r["author"].name) ? r["author"].name : "unknown";
    var datePublished 	   = r["datePublished"] || "";
    var cookTime 	   = r["cookTime"] || "";
    var prepTime 	   = r["prepTime"] || "";
    var video 		   = []; /*TODO check again*/

    /*
	Take special variables in charge
	*/
    /* Instructions */
    var recipeInstructions = recipeInstructions.map(step => step["text"]);

    /* Return a dict */
    return {
	"name": name,
	"description": description,
	"images": images,
	"recipeCategory": recipeCategory,
	"recipeCuisine": recipeCuisine,
	"recipeIngredient": recipeIngredient,
	"recipeInstructions": recipeInstructions,
	"recipeYield": recipeYield,
	"keywords": keywords,
	"author": author,
	"datePublished": datePublished,
	"cookTime": cookTime,
	"prepTime": prepTime,
	"video": video,
    }
}

function scrap_marmiton(content) {
    /*
	marmiton: no prob
	*/
    var recipe = JSON.parse(content);

    var r = recipe;

    var name 		   = r["name"] || "";
    var description 	   = r["description"] || "";
    var images 		   = r["image"] || []; 		/*list*/
    var recipeCategory 	   = r["recipeCategory"] || "";
    var recipeCuisine 	   = r["recipeCuisine"] || "";
    var recipeIngredient   = r["recipeIngredient"] || []; /*list*/
    var recipeInstructions = r["recipeInstructions"] || []; /*list*/
    var recipeYield 	   = r["recipeYield"] || "";
    var keywords 	   = r["keywords"] || "";
    var author 		   = (r["author"] && r["author"].name) ? r["author"].name : r["author"] || "unknown";
    var datePublished 	   = r["datePublished"] || "";
    var cookTime 	   = r["cookTime"] || "";
    var prepTime 	   = r["prepTime"] || "";
    var video 		   = (r["video"] && r["video"].contentUrl) ? r["video"].contentUrl : [];

    /*
	Take special variables in charge
	*/
    /* Instructions */
    var recipeInstructions = recipeInstructions.map(step => step["text"]);
    /* Keywords */
    var keywords = keywords
	.split(",")
	.map(item => item.trim())
	.filter(item => item !== "");

    /* Return a dict */
    return {
	"name": name,
	"description": description,
	"images": images,
	"recipeCategory": recipeCategory,
	"recipeCuisine": recipeCuisine,
	"recipeIngredient": recipeIngredient,
	"recipeInstructions": recipeInstructions,
	"recipeYield": recipeYield,
	"keywords": keywords,
	"author": author,
	"datePublished": datePublished,
	"cookTime": cookTime,
	"prepTime": prepTime,
	"video": video,
    }
}

function scrap_750g(content) {
    /*
	750g : no prob
	*/
    var recipe = JSON.parse(content);

    var r = recipe;

    var name 		   = r["name"] || "";
    var description 	   = r["description"] || "";
    var images 		   = (r["image"] && r["image"].url) ? [r["image"].url] : []; /*list*/
    var recipeCategory 	   = r["recipeCategory"] || "";
    var recipeCuisine 	   = r["recipeCuisine"] || "";
    var recipeIngredient   = r["recipeIngredient"] || []; 	/*list*/
    var recipeInstructions = r["recipeInstructions"] || [];	/*list*/
    var recipeYield 	   = r["recipeYield"] || [];
    var keywords 	   = r["keywords"] || "";
    var author 		   = (r["author"] && r["author"].name) ? r["author"].name : "unknown";
    var datePublished 	   = r["datePublished"];
    var cookTime 	   = r["cookTime"];
    var prepTime 	   = r["prepTime"];
    var video 		   = (r["video"] && r["video"].contentUrl) ? r["video"].contentUrl : [];

    /*
	Take special variables in charge
	*/
    /* Instructions */
    var recipeInstructions = recipeInstructions.map(step => step["text"]);
    /* Keywords */
    var keywords = keywords
	.split(",")
	.map(item => item.trim())
	.filter(item => item !== "");

    /* Return a dict */
    return {
	"name": name,
	"description": description,
	"images": images,
	"recipeCategory": recipeCategory,
	"recipeCuisine": recipeCuisine,
	"recipeIngredient": recipeIngredient,
	"recipeInstructions": recipeInstructions,
	"recipeYield": recipeYield,
	"keywords": keywords,
	"author": author,
	"datePublished": datePublished,
	"cookTime": cookTime,
	"prepTime": prepTime,
	"video": video,
    }
}

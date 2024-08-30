var current_id = 0;
var max_id = 0;

/*TODO: engine filtering should be exclusively SERVER SIDE*/
function fetch_engine(input, regex, auto_display = true) {
    /*
	Use a search engine instead
	of directly fetching recipes
	on specialized websites.
	*/
    input = encodeURI(input);
    fetch('./scripts/fetch_engine.php', { method: 'POST', body: input })
	.then(function(response) { return response.text() })
	.then(function(html) {
	    var parser = new DOMParser();
	    var doc = parser.parseFromString(html, "text/html");

	    result = doc.body.innerHTML;  // need to extract links list, not full html
	    console.log("[INFO] Result (full answer): ", result);
	    console.log("[INFO] Matched links: ", result.match(regex));

	    var links = result.match(regex);
	    var links = [... new Set(links)]; // remove duplicate links

	    /* Build HTML div for links' displaying (hidden by default) */
	    var links_div_string = "";
	    links_div_string = "<ul>"
	    for (var i = 0; i < links.length; i++) {
		var link = links[i].replace(/"/g, '');
		    var custom_id = parseInt(i);
		    var line  = '<li id="' + custom_id + '" onclick="go_recipe(' + custom_id + ');">' + link + '</li>';
		    links_div_string = links_div_string + line
		}
	    links_div_string = links_div_string + "</ul>"

	    /* Auto display goes immediately to the first link */
	    if (auto_display && links.length > 0) {
		document.getElementById('current_recipe').style.display = '';
		document.getElementById('button-next').style.display = '';
		document.getElementById('links').style.display = 'none';
		document.getElementById('links').innerHTML = links_div_string;
		go_recipe(0);
	    } else {
		if (links.length == 0) {
		    document.getElementById('current_recipe').style.display = 'none';
		} else {
		    document.getElementById('current_recipe').style.display = '';
		}
		document.getElementById('button-next').style.display = 'none';
		document.getElementById('button-prev').style.display = 'none';
		document.getElementById('links').innerHTML = links_div_string;
	    }
	    max_id = links.length - 1;
	    console.log(`[INFO] Found ${links.length} links.`);
	})
		    .catch(function(err) {
			console.log('[ERROR] Engine failed.', err);
		    });
}

async function search_recipes(input="",auto_display=true) {
    let debouncerTimer = 1000;
    await new Promise(r => setTimeout(r,debouncerTimer));

    if (input == "") {
	var input = document.getElementById('searchbar').value;
    }

    const regex = /"http(?![^"]*archive)[^"]*(?:(recettes\/recette)[^"]*aspx|-r\d+.htm)"/g;
    const websites_regex = /(https?:\/\/)?(www\.)?(marmiton.org|750g.com|cuisineaz.com)/g;

    if (input.match(websites_regex)) {
	console.log("[INFO] Matched known website.");
	if (!input.startsWith("http")) {
	    console.log("[WARNING] URL should start with protocol. Adding 'https://'.");
	    input = "https://" + input;
	}
	fetch_direct_link(input,0);
    } else {
	fetch_engine(input, regex, auto_display);
    }
    current_id = 0;
}

function parse_and_build_recipe(jsons_list, link, id) {
    var recipe_html = "";

    for (var i = 0; i < jsons_list.length; i++) {

	var inner = jsons_list[i].innerHTML;
	inner = replace_invalid_chars(inner);

	var scrapped = scrap(link, inner);

	/* Consider fail if the name, recipeIngredients or recipeInstructions are empty */
	/* TODO: improve here */
	if (scrapped["name"] == "" || scrapped["recipeIngredient"] == [] || scrapped["recipeInstructions"] == [])
	{ console.log("[INFO] Could not find anything useful in this JSON. Pursuing."); continue; }

	var name = scrapped["name"];
	var description = scrapped["description"];
	var images = scrapped["images"];
	var recipeCategory = scrapped["recipeCategory"];
	var recipeCuisine = scrapped["recipeCuisine"];
	var recipeIngredient = scrapped["recipeIngredient"];
	var recipeInstructions = scrapped["recipeInstructions"];
	var recipeYield = scrapped["recipeYield"];
	var keywords = scrapped["keywords"];
	var author = scrapped["author"];
	var datePublished = scrapped["datePublished"];
	var cookTime = scrapped["cookTime"];
	var totalTime = scrapped["totalTime"];
	var video = scrapped["video"];

	const website = `<a target="_blank" href="${link}">Source</a>`; // TODO: adjust

	/* Debug
	console.log("name: ",name);
	console.log("description: ",description);
	console.log("images: ",images);
	console.log("recipeCategory: ",recipeCategory);
	console.log("recipeCuisine: ",recipeCuisine);
	console.log("recipeIngredient: ",recipeIngredient);
	console.log("recipeInstructions: ",recipeInstructions);
	console.log("recipeYield: ",recipeYield);
	console.log("keywords: ",keywords);
	console.log("author: ",author);
	console.log("datePublished: ",datePublished);
	console.log("cookTime: ",cookTime);
	console.log("totalTime: ",totalTime);
	console.log("video: ",video);
//*/

/* Build page and display (TODO) */
/* Prepare image (TODO: multiple images)*/
var image = "<!-- no image -->";
var image = "<center><em>Aucune image disponible pour cette recette.</em></center>";

if (images.length > 0) {
    /* Marmiton */
    if (images[0].includes("http")) {
	var image = '<img src="' + images[0] + '"\\>' + '<br>';
    }
}

/* Prepare ingredients string */
var ing_string = '';
recipeIngredient.forEach ( ing => {
    ing_string = ing_string + `<li>${ing}</li>`;
})

/* Prepare instructions string */
var ins_string = '';
recipeInstructions.forEach ( ins => {
    ins_string = ins_string + `<li>${ins}</li>`;
})

/* Prepare keywords string */
var kw_string = '';
keywords.forEach ( kw => {
    kw_string = kw_string + `<span class="keyword">${kw}</span>`;
})

/* Prepare video string */
var video_div = `<!-- no video -->`;
if (video.length > 0) {
    var video_div = `
			   <center>
			   <div class="video_frame">
				   <video controls>
				   <source src="${video}" type="video/mp4">
				   <source src="${video}" type="video/ogg">
				   </video>
				   </div>
			   </center>
				   <br>
			   `;
}

/* Prepare whole recipe string */
recipe_html = `
		<div id="recipe-${id}">
		       <h1 class="recipe">${name}</h1>
		   ${image}
		   <div class="table_overview">
		   <table class="overview">
		   <tr>
		   <td class="overview_cookTime">Temps</td>
		   <td class="overview_yield">Service</td>
		   </tr>
		   <tr>
		   <td class="overview_cookTime">${cookTime}</td>
		   <td class="overview_yield">${recipeYield}</td>
		   </tr>
		   </table>
		   </div>
		   <br>
		   <div class="ingredients">
		   <ul>
		   ${ing_string}
		   </ul>
		   </div>
		   <br>
		   <div class="steps">
		   <ol>
		   ${ins_string}
		   </ol>
		   </div>
		   <br>
		   ${video_div}
		   <div class="keywords">
		   ${kw_string}
		   </div>
		   <br>
		   <div class="source">
		   ${author} -- ${datePublished} -- ${website}
		   </div>
		   <br>
		</div>
		   `;
return recipe_html;
}
return recipe_html;
}

function fetch_direct_link(link, id, direction = "") {
    /* Following fetch function modified from: https://stackoverflow.com/a/50812705/22665005 */
    fetch('./scripts/fetch_direct_link.php', {
	method: 'POST',
	body: link
    })
	.then(function(response) {
	    return response.text()
	})
	.then(function(html) {
	    var parser = new DOMParser();
	    var doc = parser.parseFromString(html, "text/html");
	    var jsons_list = doc.querySelectorAll('script[type="application/ld+json"]');
	    /* for Marmiton, this gets json for:
		- @type: Breadcrumblist
		- @type: Recipe (the one I currently use)
		- @type: ItemList
		- @type: WebPage
		*/
	    var recipe_html = parse_and_build_recipe(jsons_list, link, id);
	    if (recipe_html == "") {
		throw new Error("[ERROR] Recipe JSON not found. Empty 'recipe_html'.");
	    }
	    console.log("Recipe HTML: ", recipe_html);

	    /* Insert recipe in webpage */
	    document.getElementById('current_recipe').style.display = '';
	    document.getElementById('current_recipe').innerHTML = recipe_html;

	    /* Scroll smoothly to recipe */
	    var current_recipe_id = document.getElementById("current_recipe");
	    current_recipe_id.scrollIntoView({ behavior: "smooth" });
	    stop_gif(); // Called from './animation-gif.js'
	})
	.catch(function(err) {
	    stop_gif(); // Called from './animation-gif.js'
	    console.log('[ERROR] Failed to fetch URL: ', err);
	    if (direction == "") {
		if (id + 1 <= max_id) {
		    id += 1;
		} else {
		    id = 0;
		}
	    } else if (direction == "next") {
		if (id + 1 <= max_id) { id += 1; } else { id = 0; }
	    } else if (direction == "prev") {
		if (id - 1 >= 0) { id -= 1; } else { id = max_id; }
	    }
	    go_recipe(id);
	});
}

function go_recipe(id, direction="") {
    console.log(`[INFO] Loading recipe with id=${id}`);

    var link = document.getElementById(id).innerHTML;

    console.log(`[INFO] URL: ${link}`);
    console.log("[INFO] Fetching URL.");

    fetch_direct_link(link, id, direction);
}

function next_recipe() {
    console.log(`[INFO] current_id = ${current_id}; max_id = ${max_id}`);
    if (current_id + 1 == max_id) {
	document.getElementById('button-next').style.display = 'none';
	document.getElementById('button-prev').style.display = '';
    } else {
	document.getElementById('button-next').style.display = '';
	document.getElementById('button-prev').style.display = '';
    }
    if (current_id + 1 <= max_id) {
	current_id += 1;
    } else {
	current_id = 0;
    }
    go_recipe(current_id, "next");
}

function prev_recipe() {
    console.log(`[INFO] current_id = ${current_id}; max_id = ${max_id}`);
    if (current_id - 1 <= 0) {
	document.getElementById('button-prev').style.display = 'none';
	document.getElementById('button-next').style.display = '';
    } else {
	document.getElementById('button-prev').style.display = '';
	document.getElementById('button-next').style.display = '';
    }
    if (current_id - 1 >= 0) {
	current_id -= 1;
    } else {
	current_id = max_id;
    }
    go_recipe(current_id, "prev");
}

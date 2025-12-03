Identify the components:

1. Where is the recipe data stored?

Recipe data is stored in database as - Recipes, id, title, ingredients, instructions

2. How does the frontend communicate with the backend?

The frontend communicate with the backend through REST API.
Frontend send HTTP requests to the backend.
The backend checks HTTP method and endpoints to process the request.
GET/recipes - get all recipes
POST/recipes/id - Add a new recipe
PUT/recipes/id - Update a recipe
DELETE/recipe/id - Delete a recipe

The backend validates the request, communicates with the database, and responds with JSON

3. What happens when a user adds a new recipe?

User fills out a form on the frontend with recipe title, ingredients, instructions, etc.
User clicks “Add a new Recipe”.
The frontend sends a POST request to the backend

       POST /recipes

{
Title: “Chocolate Cake",
Ingredients: “..…..”,
Instructions: “..…..”
}

The backend receives and validates the data, adds a new recipe in the database, saves it and generates an ID and responds with JSON

200 OK
{
Id: 1,
Title: “Chocolate Cake",
Ingredients: "...",
Instructions: "..."
}

5. The frontend updates the UI and shows the recipe in the user's recipe list.

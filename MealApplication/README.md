
# Meal Searching Application

If you're looking for a catchy and descriptive title for your meal application, consider something like "DeliciousDine: Your Meal Discovery App" or "MealMaster: Explore, Enjoy, and Share Meals." These titles convey the idea that your app is about discovering and enjoying different meals, while also suggesting a sense of mastery or expertise in meal exploration. You can adjust the title to best suit the branding and purpose of your application.


## API Reference

#### Get all items

```http
  GET https://www.themealdb.com/api/json/v1/1/filter.php?i
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET https://www.themealdb.com/api/json/v1/1/lookup.php?i
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Meal_App Features

**HOME PAGE:**
Users can Search any Meals from the API via Seach Input.
Users can able generate Random Meals in front end.
Users can add the Meals to Favourites via Favourite icon.
Users can use light dark mode button to change the background color of Meal Details Modal

**MEAL DETAILS:**
Users can see the Meals Details Pop-up Modal when he click on the specific meal.
The Meal Detials Modal consists of information of the meals Such as Image, Name, Instructions, Ingredients used and Watch Recipe video link.
We can close the pop-up btn when we click on the X icon in Model.


**FAVOURITES PAGE:**
Displays list of all the favourite meals.
Remove from favourites button: Each meal has remove from favourites button, clicking on which should remove that meal from the list.
The Favourite List is persistent (having the same number of meals before and after closing the browser/refreshing the browser)


## Tech Stack

**Tech Stack:** Html, Css, Vanilla Javascript




## Running Tests

To run application, I preferably use Microsoft Edge and Google Chrome to test Application 




## Used By

This project is used by the following companies:

Here are a few well-known companies that have meal delivery or meal-related applications:

Uber Eats: Uber Eats is a food delivery platform by Uber Technologies. It allows users to order food from local restaurants through a mobile app.

Grubhub: Grubhub is an American online and mobile food ordering and delivery platform that connects users with local restaurants.

DoorDash: DoorDash is a food delivery service that partners with local restaurants and chains to deliver food to customers' doors.

Postmates: Postmates, which was acquired by Uber Eats in 2020, offered on-demand delivery from local businesses and restaurants.

HelloFresh: HelloFresh is a meal kit delivery service that provides users with pre-portioned ingredients and recipes for cooking at home.

Blue Apron: Blue Apron is another meal kit delivery service that delivers recipes and ingredients to customers for preparing meals at home.

MealPal: MealPal is a subscription service that allows users to order lunch from local restaurants at a discounted price.
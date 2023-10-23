// Selecting DOM elements
const mealEl_container = document.querySelector('.meal')
const fav_meals_container = document.querySelector('.fav-meals');

const search_input = document.querySelector('.search-input');
const search_icon = document.querySelector('.search-icon');

const popup_container = document.querySelector('.pop-up-container');
const close_popup_btn = document.querySelector('.pop-up > i');
const popup = document.querySelector('.pop-up-inner');

const lightDarkModeSpan = document.querySelector('.light-dark-mode');
const lightDarkModeIcon = document.querySelector('.light-dark-mode > i');


// Initial actions on page load

getRandomMeal(); // Fetch and display a random meal
fetchFavMeals(); // Fetch and display favorite meals from local storage


// Fetch and display a random meal
async function getRandomMeal () {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json()
    const random_meal = respData.meals[0];
    console.log(random_meal);
    addMeal(random_meal)
}

// Fetch a meal by its ID
async function getMealById (id) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const respData = await resp.json()
    const meal = respData.meals[0];
    
    return meal;
}

// Fetch meals by search term
async function getMealsBySearch (term) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const respData = await resp.json()
    const meals = respData.meals;

    return meals;
}

// Add a meal to the meal container
function addMeal (meal) {
    const meal_card = document.createElement('div');
    meal_card.classList.add('meal-card');
    meal_card.innerHTML = `
            <div class="meal-card-img-container">
                <img src="${meal.strMealThumb}">
            </div>
            <div class="meal-name">
                <p>${meal.strMeal}</p>
                 <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-heart-circle-plus"></i> 
            </div>
    `
      // Event listener for the heart icon to add/remove a meal from favorites
    const btn = meal_card.querySelector('.fa-heart');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('fa-regular')) {
            btn.setAttribute('class', 'fa-solid fa-heart')
            addMealLS(meal.idMeal)
        } else {
            btn.setAttribute('class', 'fa-regular fa-heart')
            removeMealLS(meal.idMeal)
        }
        fetchFavMeals()
    })

    meal_card.firstChild.nextSibling.addEventListener('click', () => {
        showMealPopup(meal)
    })

    mealEl_container.appendChild(meal_card)
}

// Add a meal to local storage (favorites)
function addMealLS (mealID) {
    const mealIds = getMealLS()
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealID]))
}

// Remove a meal from local storage (favorites)
function removeMealLS (mealID) {
    const mealIds = getMealLS()
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealID)))
}

// Get favorite meal IDs from local storage
function getMealLS () {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds
}

// Fetch and display favorite meals from local storage
async function fetchFavMeals () {
    fav_meals_container.innerHTML = '';

    const mealsIds = getMealLS();
    const meals = [];
    for(let i = 0; i < mealsIds.length; i++) {
        const mealID = mealsIds[i];
        meal = await getMealById(mealID)
        addMealToFav(meal)
        meals.push(meal)
    }
}

// Add a favorite meal to the favorite meals container
function addMealToFav (meal) {
    const fav_meals = document.createElement('div');
    fav_meals.innerHTML = `
            <div class="single">
                <div class="top">
                    <div class="img-container">
                        <img src="${meal.strMealThumb}">
                    </div>
                    <div class="text">
                        <p>${meal.strMeal}</p>
                    </div>
                </div>
                <i class="fa-solid fa-x"></i>
            </div>
    `

      // Event listener for the 'x' icon to remove a meal from favorites
    const x = fav_meals.querySelector('.fa-x');
    x.addEventListener('click', () => {
        removeMealLS(meal.idMeal)

        const heart_btns = document.querySelectorAll('.fa-heart');
        heart_btns.forEach(heart_btn => {
            heart_btn.setAttribute('class', 'fa-regular fa-heart');
        })

        fetchFavMeals()
    })

    // Event listener for clicking on a favorite meal to show its details
    fav_meals.firstChild.nextSibling.firstChild.nextSibling.addEventListener('click', () => {
        showMealPopup(meal)
    })

    fav_meals_container.appendChild(fav_meals)
}

// Event listener for searching meals
search_icon.addEventListener('click', async () => {
    mealEl_container.innerHTML = '';
    const searchVal = search_input.value;
    const meals = await getMealsBySearch(searchVal)
    if (meals) {
        meals.forEach(meal => {
            addMeal(meal)
        })
        document.querySelector('.meals-container > h2').innerText = 'Your Results...'
    } else {
        document.querySelector('.meals-container > h2').innerText = 'No Meals Found for your search'
        mealEl_container.innerHTML = '';
    }
})
// Event listener to close the meal details popup
close_popup_btn.addEventListener('click', () => {
    popup_container.style.display = 'none';
})


// Function to display meal details in a popup
function showMealPopup (meal) {
    popup.innerHTML = ''

    const newPopup = document.createElement('div');
    newPopup.classList.add('pop-up-inner');

    const ingredients = [];
    for(let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        } else {
            break
        }
    }

    newPopup.innerHTML = `
        <div class="left">
            <div class="meal-card">
                <div class="meal-card-img-container">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="meal-name">
                    <p>${meal.strMeal}</p>
                    <i class="fa-regular fa-heart"></i>
                </div>
            </div>
        </div>
        <div class="right">
            <div>
                <h2>Intructions</h2>
                <p class="meal-info">${meal.strInstructions}</p>
            </div>
            <div>
                <h2>Ingredients / Measures</h2>
                <ul>
                    ${ingredients.map(e => `<li>${e}</li>`).join('')}
                </ul>
            </div>
        </div>
    `
    popup.appendChild(newPopup);
    popup_container.style.display = 'flex';
}

lightDarkModeSpan.addEventListener('click', () => {
    if (lightDarkModeIcon.classList.contains('fa-sun')) {
        lightDarkModeIcon.setAttribute('class', 'fa-solid fa-moon')
    } else {
        lightDarkModeIcon.setAttribute('class', 'fa-solid fa-sun')
    }

    document.documentElement.classList.toggle('light-theme');
})
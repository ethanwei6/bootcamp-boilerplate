**PawGrammers@H4I Technical**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Chiemeka Chukwu, Kate Hong, Ethan Wei

**Project proposal:**

I would like to develop a project where users can browse different types of pets and favorite or adopt the ones they like. 

We will be building a system where an admin can delete and update the pet properties. 

Once a user buys a pet, the pet gets deleted from the website, and the user can see the pet they bought in their Pets Owned webpage.

**Proposed Technical Stack:** 

* MongoDB  
* Vercel  
* React  
* TypeScript  
  


**Backend Setup:**

PetModel: 

- id(PrimaryKey)  
- Name(String)  
- Breed(String)  
- Euthanized(Boolean)  
- Age(Int)  
- Gender(String)  
- Price(Int)  
- Description(String)  
- Location(String)  
- Personality\[\](String)  
- Characteristics\[\](String)

UserModel:

* id(PrimaryKey)  
* userName(String)  
* passWord(String)  
* PetsOwned\[\](Pets)

AdminModel:

* userName(String)  
* passWord(String)

ApplicationModel:

* user(UserModel)  
* Address(String)  
* Email(String)  
* Phone Number(Int)  
* YearlyIncome(Int)  
* VetName(String)  
* VetLocation(String)

**Workflows & Specifics**

**Admin Side** \- When the admin logs in, they should be on a page that lets, view all users and what pets they have.  When they create a pet, they should be able to define all the properties of a classic pet. With each “PetCard” shown on the frontend, the admin should be able to delete a pet, which removes the pet model from the database as well as the front end. The admin should also be able to edit a pet with all the properties of a classic pet. The admin should be able to see a Delete, Update, and Euthanize button on each of the “PetCard” items on the front end.

On the top right of the webpage, the Admin should see a Dashboard button, which directs them to a page that allows them to see all users laid out into a grid. This dashboard should have 2 tabs, which include a users tab and an applications tab. The admin should be able to click on each user and see the following: The pets they own and the applications they have to adopt a pet. On the applications tab, the admin should be able to see a grid layout of all applications and should be able to Approve or Deny the application. If the admin approves the application, then the pet goes into the user's “ownedPets” array and is deleted from the front webpage, but if it application is denied, the pet remains on the front webpage. If either button is clicked, the application should be deleted.

**User Side \-** When a user logs in, they should be taken to a dashboard displaying all available pets in a grid layout. Each “PetCard” will show the pet’s photo, name, breed, and basic details.

Hovering over a card will slightly expand it to reveal more information, such as personality traits and location. Each card will have an **Adopt** button that brings the user to an adoption application form.

The application form will collect:

* Name  
* Address  
* Type of housing  
* Email  
* Phone number  
* Whether they have other pets (and what kind)  
* Yearly income  
* Veterinarian name and location

Once submitted, the application will appear in the user’s **Applications** page, where they can track the status of their submissions (Pending, Approved, or Rejected).

If approved, the pet will appear on their **Pets Owned** page.

**Backend Development Steps**

These steps are to be followed by Cursor Agent running. Each step should only be completed one at a time, and after each step is completed, the readme file should be updated accordingly. Do NOT go ahead at all and do not set up extra steps in advance

1. Set up the file directory and all necessary introductory files for the project. Install any necessary components.  
2. Create and define our different file models  
3. Build out authentication and login frameworks (seperate for user and admin). Authentication should last for 1 month.  
4. Build the CRUD controllers and routes needed to add and remove each of our models. Then, create routes to query the lists of them.  
5. Build out the orderbook and define all methods that deal with order cancellation, incoming orders, and order fulfillment  
6. Build out framework for the web socket connection and all necessary calls, as well as the connection requirements.  
7. Review your work and make sure it is all coherent.

**Frontend Development Steps**

1. Create a file directory with images, components, data and pages. Create a global API variable that is set and can be edited for where the server is hosted  
2. Develop a header, footer, and landing page which explain what this project is about and how it works generally.  
3. Develop the log in pages which follows the authentication guidelines laid out above  
4. Develop the admin dashboard  
5. Develop the admin event page  
6. Develop the user event page  
7. Use this page as inspiration for when you create the frontend: [https://zip-aspect-85258317.figma.site/](https://zip-aspect-85258317.figma.site/), [https://www.figma.com/community/file/1561461570320461806](https://www.figma.com/community/file/1561461570320461806)  
8. I want the theme to be a green and blue theme that looks “fun”

**Necessary Keys**

DATABASE\_NAME=Bootcamp  
ATLAS\_URI=mongodb+srv://user:[P4ssword123@bootcamp.yhq8vxy.mongodb.net](mailto:P4ssword123@bootcamp.yhq8vxy.mongodb.net)/


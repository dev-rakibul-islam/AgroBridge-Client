B12-A10_category-0015

    			Video Link: B12-A10_category-0015.mp4

KrishiLink- Farmer’s Growth & Connection Platform
KrishiLink is a modern web application that connects people in the agricultural sector such as farmers, traders, and consumers in one digital space.
For now every user can:
● Post what they are growing or selling
● Browse others crop’s posts
● Show interest to connect and collaborate
Instead of a traditional e-commerce or buyer-seller model, this platform works as a social agro network, where everyone can interact directly.

---

Key Rules:
● GitHub Commits:
○ Include a minimum of 15 notable GitHub commits on the client side.
○ Include a minimum of 8 notable GitHub commits on the server side
● Readme.md: Add a meaningful readme.md file with the name of your website and a live site URL on client side. Include a minimum of five bullet points to feature your website.  
● Lorem Text: Don’t use any Lorem ipsum text; you can not use the default alert to show any error or success message.
● Host your Application: You can choose deployment systems like Netlify, Surge, and Firebase for client-side hosting and Vercel for server-side hosting. As you develop a single-page application
○ Ensure that the page doesn't throw any error on reloading from any routes.  
○ Add your domain for authorization to Firebase if you use Netlify / surge
○ Logged in User must not be redirected to Login on reloading any private route

---

Main Requirements:

1. Layout Structure

   Main Layout

● Header
❖ Logo+ Project Name
❖ If user not logged in show Home, All Crops, Login,Register
❖ If the user is logged in, show the following navigation links:
Home, All crops, Profile, Add crops, My posts, and My interests and logout button

● Footer: Create a relevant and stylish footer.
Keep the navbar and footer on all pages except the 404 page.

2. Home

● Hero Section: Make a slider for this section. Use relevant images and texts
● Latest crop post: Fetch the latest 6 crops data from the database and show them here. Add view all button linking to the all crops page
● How it works section: show the working procedure of that application
● Agro News or blogs section
● 2 extra relevant sections of your choice

3. All Crops Page
   This page will show all the crops posted. Add a search bar where users can search any crops. Crops shows as follows:
   ● Grid or card layout of crops
   ● Each card having information related that crops received from DB
   ● Search bar to filter
   ● View Details button for each crop card

Make sure search works perfectly and show no results found when search returns an empty array.

4. Crops Details Page (private route)
   The Crop Details page shows all information about a single crop post. It allows users to view crop details, send an interest request (if they are not the owner), or manage received interests (if they are the owner)

Page layout or sections:

1. Crop Information Section: design as you wish. Make sure UI design is eye-catching with each crop's information.
2. Interest Form (for non-owner users) show this section if the logged in user is not the owner of that crop
   Form Fields:
   ● Quantity (number input)
   ● Message ( text input)
   ● Total Price (auto-calculated = quantity × price per unit)
   ● Submit Interest button, confirmation modal before submitting interest
   ● Validation: If the quantity is less than 1 then prevent submitting interest form data.
   Example POST request JSON data for submit interest:
   {
   “cropId”:”cs757”,
   "userEmail": "ramin@gmail.com",
   "userName": "Rahim",
   "quantity": 100,
   "message": "Interested in 100kg",
   “status”: “pending”
   }
   When adding new crops status should be pending by default. No need to create any field for status. Make sure the owner can’t make interest requests on his own crops.

Create \_id on the server when a user submits an interest
In Node.js with MongoDB, you can use the ObjectId class from the mongodb package:
import { ObjectId } from "mongodb";
// Create a unique \_id for this interest
const interestId = new ObjectId();
const interest=req.body;

Include this \_id in the interest object before pushing it to the crop’s interests array

const newInterest = {\_id: interestId, interest};

After successfully creating an interest, update the specific crop’s interests field by pushing the new interest data. Once a user submits an interest, the crop data should look like this:
{
“\_id”:”u6564”,
"name": "Tomato",
"type": "Vegetable",
"pricePerUnit": 55,
"unit": "kg",
"quantity": 400,
"description": "Fresh organic tomatoes",
"location": "Bogura",
"image": "https://example.com/tomato.jpg",
“interests”:[
{
“_id”:”i5544”,
“cropId”:”cs757”,
"userEmail": "rahim@gmail.com",
"userName": "Rahim",
"quantity": 100,
"message": "Interested in 100kg",
“status”: “pending”
}]

"owner":
{
“\_id”:”64411s”,
"ownerEmail": "owner@gmail.com",
"ownerName": "Mr Owner"
}
}
disable the form or show message You’ve already sent an interest if a user sends one interest per crop.

3. Received Interests Section (for owner) show this section if the logged in user is the owner of that crop
   Tablet of all interest requests for that crops:
   ● Buyer Name
   ● Quantity
   ● Message
   ● Status (pending / accepted / rejected)
   ● Action buttons: Accept / Reject  
   ● If no interest yet show relevant messages.

4. Authentication

a. User Login
The Login page allows users to access the application using their credentials. The page should display a clear title, e.g., Login to Your Account, and a form containing the following fields:
● Email,
● Password,
● Forget Password link,
● Login button.
When the user submits the form:
● If the credentials are correct, navigate the user to their desired page or the Home page.
● If the login fails, display an error message or toast notification
Additional options include:
● A link to the Register page for users who do not have an account.
● A Google login button that allows users to authenticate via their Google account. On successful authentication, the user should also be redirected to their desired route or the Home page.

b. User Registration
The Register page allows new users to create an account and data saved on the database. The page should include a clear title, e.g., Create Your Account, and a form with the following fields:
● Name
● Email
● Photo
● Password
● Register button
Additionally, include a Google login button to allow registration via Google.
When the user submits the registration form he system should validate the password according to the following criteria:
● Must contain at least one uppercase letter
● Must contain at least one lowercase letter
● Must be at least 6 characters long
● If the password is invalid, show an inline error message and prevent registration.
● On successful registration, navigate the user to their desired route or the Home page.
● If registration fails (e.g., email already exists), show a toast/error message on the form.
● Include a link to the Login page for users who already have an account.
💡Don’t implement email verification or the forget password method, as it will inconvenience the examiner. If you want, you can add these after receiving the assignment result.

6.  CRUD Operation
    Add crop page (private route)
    This page allows a user to create a new crop post and list their agricultural items on the platform.
    The page contains a form with the following fields:
    ● Name (the crop name)
    ● Type (e.g., Vegetable, Fruit, Grain)
    ● Price per unit,
    ● Unit (kg, ton, bag)
    ● Estimated quantity (the quantity they expect to harvest)
    ● Description (short details about the crop)
    ● Location (where the crop is grown)
    ● Image (photo of the crop)
    When the user fills out the form and submits it,
    ● The data is sent to the backend and saved in the MongoDB database.
    ● The post is automatically associated with the logged-in user, so the system knows who owns it.
    ● After the crop is successfully added, a success message should appear to notify the users
    ● users should be redirected to the My Posts page to view and manage their new entry.

        Example POST request JSON data
        	{

    "name": "Tomato",
    "type": "Vegetable",
    "pricePerUnit": 55,
    "unit": "kg",
    "quantity": 400,
    "description": "Fresh organic tomatoes",
    "location": "Bogura",
    "image": "https://example.com/tomato.jpg",
    "owner":
    {
    "ownerEmail": "owner@gmail.com",
    "ownerName": "Mr Owner"
    }
    }

My post page (private route)
This page allows you to manage posts created by the logged-in user. only shows logged in user’s crops data in tabular form and each row has edit and delete buttons . After click edit a modal open which shows the clicked crops information and user can edit them, the information must update in UI and database.
After click delete button shows confirmation modal or toast if agree to delete then delete the product in ui and database

Profile page (private route)
Shows user profile information and allow to edit their information from here

My Interest Page (private route)
The My Interests page shows all the crop interests that the user has sent to other posts on the platform. This is displayed in a table format, with each row containing the crop name,the owner of the crop, the quantity requested, the user’s message, and the status of the interest (e.g., pending, accepted, rejected).
This page allows users to track the status of their requests and follow up on their interests. It ensures that users can easily monitor their interactions on the platform, providing transparency and helping them manage connections with other users effectively.

7. Other Requirements

● Show Loading while data fetching and navigate from one route to another
● Error Page
● Make sure after reload any page (exclude home page) their should be no error
● Must look good on mobile & desktop

---

UI Design Requirements:

● Unique Design: First, decide what kind of website you want to make. Then, search online or check out websites like ThemeForest to get ideas for the design. But remember, your website idea shouldn't be similar to any projects you've done before or to any examples in our modules or conceptual sessions.
★ You can also look for free resources on blogs to help with your website.

1. Keep the main heading style (font, size, color) consistent across all sections.

2. Keep paragraph spacing balanced and text easily readable.
3. Maintain uniform image sizes and spacing. 4. Use the same button style as on the home page.
4. Ensure good spacing and proper alignment.
5. Navbar, Keep the heading/logo same style and size as on the home page.
6. Use a grid layout with equal image sizes.
7. Keep all cards equal height and width (especially in services, projects, or products section)
8. Use the new X logo instead of the old Twitter bird to match the latest rebrand
9. Responsiveness: Make it responsive for all devices, including mobile, tablet, and desktop views.
   Resources:
   ● https://uiverse.io/
   ● https://devmeetsdevs.com/
   ● https://bootcamp.uxdesign.cc/free-images-and-resources-collection-for-website-c77f2fc46ce5
   ● https://themeforest.net/?srsltid=AfmBOopTj6PNz51iuV2YJXUtBP8nt19_zT5LG2dToAjIHQqzNCzregn0
   ● https://codecanyon.net/?srsltid=AfmBOooRoUfeK7lOROpchCuA4hPVj5P9WRmtDQJ9K0E6Yhf4VTrHhXKt ********\*\*********\_\_\_\_********\*\*********

Challenges
● Allow owners to accepts or rejects the interests received in each crops details page
Example accept PUT request JSON data
{
“interestId”:”u778811”,
“cropsId”:”ce75588”,
“status”:”accepted”
}
After accepting or rejecting update status in the specific interest and update in UI instantly and hide action buttons. Actions buttons will be visible only when the status remains pending.

● If owners accepts the interest reduce the quantity of that crops
● Add a sorting method in my interest page.

# Client

## Tuwaiq Club  

### Description

This is a client-side 'frontend' for the Tuwaiq Club project.

Tuwaiq Club is a platform that will save the projects for Tuwaiq members. 

### User Stories

* As a user I want to be able to Register/login.

* As a user I want to be able to have a Profile page that has an image, user name, and email and be able to update my information also have my own project.

* As a user I want to be able to Reset Passwords.

* As a user I want to be able to share my Project demo that my be image.

* As a user I want to be able to write comments, add like in another project.

* As a user, I want to be able to see other members' profiles.

* As a user, I want to be able to have discussions with other members.

* As an instructor, I want to be able to signup for the site and display my projects.

* As an Admin I want to be able to see all users and their progress and can also delete or disable any user account.

### Admin Story
- Delete users:  admin be able to spam any user if the rating is low with convincing reason.
- Delete posts:  admin be able to delete the posts if they are inappropriate.
- Delete comments:  admin is able to delete the comments if they are inappropriate.
- Delete discussion:  admin be able to delete the discussion if they are inappropriate.

<br/>

### Links:

#### trello
https://trello.com/b/MOLHmrhc/mp-project-rawan-almutairi 

#### Slides
The url to your presentation slides

Slides Link

### Server Repo:
https://github.com/MP-PROJECT-RAWAN-ALMUTAIRI/Server

### Deploy:


<br/>


### Client / Frontend

#### React Router Routes (React App)


| Parameter | Component  | Permissions              | Behavior    |
| :-------- | :----------| :-------------           | :-----------| 
|  /        |   LandPage | public <Route>           |  LandPage   | 
|  /signup  |   signup   | anon only <AnonRoute>    | Signup form, link to login, navigate to homepage after signup. | 
|  /login   |   login    | anon only <AnonRoute>    | Login form, link to signup, navigate to homepage after login. |
| /mainPage |   MainPage | user only <PrivateRoute> | The main page has the ability to show all pages of the website.|  
| /timeLine |   TimeLine | user only <PrivateRoute> | The timeLine page has the ability to show all projects in the website.|    
|  /Nav     |   Nav      | user only <PrivateRoute> | The navbar has a logout button and displays it on all user pages. | 
|  /Footer     |   Footer      | user only <PrivateRoute> | The Footer has a copyright  and displays it on all user pages. |   
|  /Post    |   Post     | user only <PrivateRoute> |The post page Shows all posts and add post.|   
| /Post/:id |  OnePost  | user only <PrivateRoute> |The One post page Shows one post and like button with comments related to the post.|
| /Profile  |  Profile   | user only <PrivateRoute> |The profile page will allow users to display information with  the ability to edit profile.|
| /Descussion | Descussion | user only <PrivateRoute>| The discussions page allows users to make discussions together.|



  
### Components

* LandPage

* signup page 

* login page 
  
* Main page 
  
* TimeLine page

* Navbar 

* Post page 

* OnePost page 

* Profile page 

* Descussion page 
 


## UML Diagram 
  
![UMLclient](https://user-images.githubusercontent.com/92248041/146689592-4cede930-c70a-4ccd-ac25-adb8821aa470.jpg)

## Page Layout 

 ### Signup form
  ![‏‏لقطة الشاشة (13)](https://user-images.githubusercontent.com/92248041/146685725-baa0877e-6b3b-4eaa-ad18-d895f58f01ce.png)

 ### Login form
  ![‏‏لقطة الشاشة (14)](https://user-images.githubusercontent.com/92248041/146685733-bc43d683-fc36-4c64-9de1-7fd08a86d6fa.png)

 ### Main page 
  ![‏‏لقطة الشاشة (7)](https://user-images.githubusercontent.com/92248041/146685738-6e54cd55-eb7a-4b5f-b555-86700c358ff8.png)
 
 ### Profile page 
![‏‏لقطة الشاشة (12)](https://user-images.githubusercontent.com/92248041/146685835-f281b117-4bbd-4b18-bac3-097e446499e8.png)

 ### Project page 
  
![‏‏لقطة الشاشة (8)](https://user-images.githubusercontent.com/92248041/146685915-e242b3b5-5661-4250-9c03-d21c720a887f.png)
  
 ![‏‏لقطة الشاشة (15)](https://user-images.githubusercontent.com/92248041/146685928-09e0d4ac-c99f-4cf0-8578-ecc90a18be95.png)


 ### Best project page 
  
  ![‏‏لقطة الشاشة (10)](https://user-images.githubusercontent.com/92248041/146685901-b44474a7-0deb-4ff6-a754-d9ec4017c328.png)
  
  
 ### Upload post page 
  
![‏‏لقطة الشاشة (17)](https://user-images.githubusercontent.com/92248041/146685890-3c865a89-2089-4820-905c-6924770bd5ed.png)

  


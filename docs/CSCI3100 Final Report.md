# CSCI3100 Final Report

Group 31(Dubby)

17/5/2020

Alexandru Jucan, 1155141090

Chin Hsin Chan, 1155085506

Shann-Wei Yeh, 1155100333

Tsai Li Luan, 1155075536

Yung-chieh Huang, 1155120711

## 1 INTRODUCTION

### 1.1 Project Overview

Dubby, originated from the word “buddy,” is a service that connects university students who want to do sports but have difficulties in finding partners. For team sports such as basketball and soccer, it is hard for a person to enjoy playing if he/she cannot find enough teammates, which could result in him/her giving up on playing. On the other hand, for sports like badminton and tennis, people may want to find different opponents to play with in order to enhance their skills. In fact, according to our study, many students who love to do sports are suffering from similar scenarios, especially when they do not belong to any university sports team. Our idea is to connect all these people through Dubby so that they can hold or join a game randomly.

In this group, we have various teamworks for group members. Shann-Wei Yeh (1155100333) is in charge of the whole coding functionalities. Alexandru Jucan (1155141090) mainly worked on the functions of the gym page and profile page. Yung-chieh Huang (1155120711) designed the application appearance and focused on the functions of the chat page. Chin Hsin Chan (1155085506) is responsible for the program testing and the reports writing. Tsai Li Luan (1155075536) worked on system design, coding, the initial report and final report.

### 1.2 Objective

Our main object is to help people with similar expectations of doing sports to be connected so that students could have higher opportunities to play sports. Another goal is providing complete and correct information about each stadium inside the campus. We hope that the information could help students to utilize sports facilities better. Starting from CUHK, we eventually want to let Dubby become the no.1 service in Hong Kong for university students to find their sports partners.

### 1.3 Highlights

#### 1.3.1 Major Function

1. Events
   1. Hold/edit events
      - Dubby allows users to hold a particular sports game initiative. The creators can add descriptions such as the location, expected participants, date, and time of the game. The user can also set whether the event is open to everyone or is it private.
   2. Join/interested in events
      - A user can view the events list, and find the kind of sport event that he/she is interested in, he/she can click on the event to see the further event details (etc. time/location/number of participants required).
      - After clicking into the event details, the user can see how many people are joining/interested in the event, he/she can also click on the button to join/show their interest in the event.
      - The events list could be sorted by time/location/type of sports.
2. Gym info
   1. Check gym info
      - At this page, the user can check the gym opening time in each university and also check if there is any other people booking the gym for training or game purpose (etc. school team booking gym for training)
   2. Update gym info
      - A user can also update the gym opening time and gym pictures by updating photos or filling the form, so that other users could use the information. (Etc. menu uploading function of openrice)
3. Profile
   1. View Profile
      - Users can view both their own and other users’ profiles.
      - Edit Profile
      - Users can type in their personal info, such as their age/university/type of sports interested in. They could also type down a self-introduction in designated areas.
4. Chatting
   1. Private chat/group chat
      - Just like other chatting apps (instagram, whatsapp), users can chat with their friends/an anonymous user, or choose to open a group chat with their friends.
   2. Event chat
      - Event chat is a chat room that will automatically generated when an event is hosted, every other user that has joined the event will be automatically added into this chat room. Which means when a user has created a sport event, he/she will automatically create a event chat.
      - The Event chat will self-destruct 72 hours after the event hosting time. Before the event chat disappears, users can add each other into their friends list

#### 1.3.2 Advanced features

- Friends
  - Friends List
    - The friends that the current user has will be shown. Users could click on their friends to see their profile page, or he/she can also chat with them.
  - Search User
    - Users can search for particular user by input his/her username
    - Users can search for other users based on their interested sports
  - Send friend request/Unfriend
    - When viewing another user’s profile, the user can send a friend request to him/her to add them into the friends list.
    - Users can also unfriend their current friends to remove them from the friends list.
- Invite
  - After the users join the event, they are able to invite their friends if the event is not fully occupied, so that users could enjoy the game with their friends together.
- Dark Theme (Purple Theme)
  - The original design is the CUHK yellow theme, which is bright and clear. Since the concept of having the dark theme protecting users’ eyes is more and more popular, we also design a dark theme version, which is CUHK purple, so that users could enjoy the brand-new user experience. (The function is just an advanced layout design, details of this feature will be less mentioned in the report)

#### 1.3.3 Expected customers and users

Our target users are students in universities in Hong Kong who would like to find partners for sports. We assume that those who are not that familiar with the university environment, who are less interested in joining a regular sports association, or who want to play a game without enough participants can use a more straightforward way to solve the problem. We expect our user base to include exchange students, non-local students, and those who want to have more partners to join their games. This program provides and integrates all the gym information in different universities, in which many students are international students. They could easily find prefered sports partners, or host the game without the problem of not enough participants.

#### 1.4 Project Statistics

In the _project statistics_ sub-section, you should indicate the LOC (lines of code) and McCabe’s number (to be taught in class) of your project, including the main function and other major functions. These metrics can be as extensive as possible, and down to module level. Present your project statistics clearly, such as using a tabular format

In this program, we designed 337 functions to implement our thoughts. In total, we create 4131 lines of code to make our idea into practice. With the assistance of “sonarQube”, we calculated that the complexity of the whole project is 716 (figure 1.4.1).

For our case, it would be too complicated to count the complexity of each module separately; therefore, we listed out the complexity for each page of our program (figure 1.4.2) (etc. chat page, gym page). However, the total complexity is not the total add-up of complexity of each page because the complexity would increase when combining different functions together as there will be data exchange between them.

![Figure 1.4.1](https://lh6.googleusercontent.com/8uOrz314NvGxftpWgpH0x4nR9vdu1fKh6OEg9jxO3w4s8EZhY07oL11XJP_H5wOOClQL4VmfFXmK6kAH8r94_5toiG9GODKI0LsFQ-sguYhe7YNO0fKa0bc0G--UehTYlqPjCUeL)
Figure 1.4.1

![Figure 1.4.2](https://lh5.googleusercontent.com/CLqeyqHsHfPHhFk2Zx_j0rWKzg3VpkC12GpxMsytuOO1AKOiddByt4S3QxIllaN0aBDVR1KLFJSW3cjEyyZiN4XTCG6SsMra0shjoM4BvmCwvNbQuV2lyuA3jayzxhOWlGvNsLpA)
Figure 1.4.2

## 2 SYSTEM ARCHITECTURAL DESIGN by DFD

### 2.1 System Architecture

Architecture Diagram

![img](https://lh6.googleusercontent.com/uQzoJj8y9IjVOPwcssjNiWXWuBCk9ad4KT6abpWNFoR38Hxe8ZwwuhPFIFTutI5zvS3iqzuts_Vve42xClAl3FGuO8rhH-Kl8jOPa9KKlu4zoLGXyGYYrlQSCxeYviO9yrB4Tlx7)

The architecture of Dubby could be divided into three parts, client, web application and database. When a user is interacting with the Dubby application, it will retrieve data from the database and update the information shown on page.Client: A user can visit dubby from web browser and mobile web browser (The layout of Dubby is designed with Bootstrap, which will automatically fit to mobile page)Web Application (Front end): This includes all major functions inside DubbyServer Side Database (Back end): This includes all the databases used in Dubby

### 2.2 DFDs

#### 2.2.1 Level 0 diagram (Context diagram)

![img](https://lh6.googleusercontent.com/SVQOKQ3yiiRBu78XJL-Brkn_-LrcK6lxvf4V3ZSaSu96Jov-MB9B7ZO3koJGAzrwHokyguUyaFRwMBeuHB76sM8r6zCWKSnhcHu_DYGCjggRkMWDr4Yz8q-eeOettmSjPB2ihhtC)

The context diagram generalizes the system, since our program does not contain “administrators”, the only external entity would be user, and the process shown here would be the dubby information system.

#### 2.2.2 Level 1 diagram!

![img](https://lh5.googleusercontent.com/JKWXQKPJ6brigv4cWueaWrIGa6SbImmZX6fekHqSdaoNW37AmhGC3yjNwgHit6w_m-hHpuDlzXZOaXZx95wkttrAUrXUw7Y4abv_OEzIIPnXQTFVznndnRshGI0AqCp046a9ue9k)

- Level 1 diagram includes all main process inside the dubby system
  - Registration: A user can register an account by input his/her email & password, which will be saved to user database
  - Authentication: System will authenticate whether the user is a valid user by checking the input with user database
  - View gym info & upload gym info: User can see the gym info, which will be retrieved from the gym database; user can also upload the gym info into the database
  - View event, search event & join event: When entering the events page, the system will get the event list from the database and show it to the user. Users can also search the event by choosing the type of sport that he/she wants to search. By clicking on the particular event, the system will get event detail from the database and show it to the user, he/she can decide if he/she wants to join it.
  - Host event: By clicking “+ new event!” button on the dubby homepage, the user can type in the detailed information of the event he/she wants to host. After he/she clicks “submit”, the event will be shown to every user on the events list (unless the user chooses to host a private event).
  - Profile: Each user has their own profile, a user can also view other users’ profiles (Detailed information of this part will be given out in the level 2 diagram below).
  - Friends & search user: When entering the friends page, the profile database will provide friends data, which includes friends list/sent friend requests/received friend requests of the current user. A search bar is also provided in the page, where he/she can search for a particular user who has a registered account.
  - Chat: A user can chat with other users in the dubby system (Detailed information of this part will be given out in the level 2 diagram below).

#### 2.2.3 Level 2 diagram

- Level 2 diagram goes deeper into several processes in level 1 diagram that needs further elaboration, namely upload gym info, chat and profile.

  ![img](https://lh6.googleusercontent.com/p1jJ2_aaP_RSKYJsJ2CWO_kkxlFM_LCj8SIF5ewrBSAI3i_QoQTfsyAxPgURXaD0g1xI6iqbK2pYlIpgZsABuHfyE8uo5VmKntUQHfWkubh80AkbBxEG2U6rC5uAoiaiQ69qhRRn)

  - Upload gym info: A user can upload two types of info, gym schedule and gym image into the database, but both are in picture format. The pictures will be shown inside the carousel on the gym page.

    ![img](https://lh5.googleusercontent.com/r-G-HV0_iExbIIruw7u3pcINsRpGRjksJeAN9asXbHiakVNdzj_htUBVM1ugd77eXMcrlYEpz24zBQpc53bbhRWC8o7brE1op2anJsJFh40cS3m26xjiMpc4tIU2fCYG9r-sOMIo)

  - Profile

    - When directly entering the “profile” page, the user will see his/her own profile, where he/she can choose to edit his/her own profile.
    - A user can also view other users’ profiles through other methods, such as directly searching for users, checking user profiles from friends list, checking user profiles from joining the event process etc. When viewing another user’s profile, the current user could choose to send friend requests or unfriend the user.

      ![img](https://lh6.googleusercontent.com/KURkza7c9Ekci3kUz7oN8NAEHbZ6viES5kvGbXgzoOT4jklnrkBCF_VI1FJoAjFADoRbVfHsGijLVLnPFeX1lsnS2WRtQAPKg9c4u-SUpI_7_bzzRzn3ZlXMIeBVXMPsEx3B-lsH)

  - Chat
    - When entering the chat page, the user can see all the chats he/she has with other users, which the chat list will be retrieved from the chat database
    - There are three types of chat in the dubby system, namely private chat, group chat and event chat. A user can create his/her own private chat and group chat, but an event chat is automatically created when an event is hosted. Other users will be added into this particular event chat if they join the event.

## 3 DETAILED DESCRIPTION OF COMPONENTS by UML

### 3.1 Class Diagram

User, profile & friends: Each user has one profile, and it has one own friend list. When the user is deleted, its profile and friends data will also be deleted (composition relation)Chats: Users have access to chat functions. There are three types of chats: private, group and event.Gym: Users can view/update the information in the gym page.Event: Users can view/join/host an event.

![img](https://lh3.googleusercontent.com/hf-pxG1t5wPmirhBPiP3Mhqro-SIr9TfSo-0LJXPisWo6w7mrQjIsCLgRAcd9sqDyYl7HD_ySjL6IXQ8ioFgBi2Vt273rERr1KP-v9zeHYGdDWGBZsgK4VqE2e-9GenWg5qfn7sM)

### 3.2 Use-case diagram

The diagram shows all the main interactions between the user and Dubby system, the actions a user can perform are listed as follows.

![img](https://lh5.googleusercontent.com/_BDQkl1RzROyop873qRPzSBRK2oQOZRVoQwQ15CL5TtXQ7VqzZgDqrUu3oPOUOHM-k4kYKbSs1IMhGLG3ItOcNS-B7xo0V2fmO8hZhbx95Wqgm3bignKwWxHGkCaW7t9HCFtl2Wb)

### 3.3 Sequence Diagram

Below diagrams are sequence diagrams of main functions inside the Dubby system, which illustrates how the user, app front end (Dubby page) and app back end (database) interact with each other.

![img](https://lh3.googleusercontent.com/wK-5JFFjS1yqBWTgnuLIbOV-1oCGCQqWJAggnYFRbIO3KIPLYImJ9D8_vWOSiu_ru-zt5DnYEA9D7w8MgnQJEFFBmtKMLt90uCebRGAcMCjeDctgpaHHA9LXsyUY6QkRYoobdtOy)

Authentication: User types in his/her account email & password. Dubby will verify the user with the user database and decide whether the user can log in or not.

![img](https://lh3.googleusercontent.com/nIBMegHSjzz8BI2TEOaSkCoAuwFqL62U6mQQ8CGzwCupCNFHo7JUx5stDTtGRa96_I-3AUPT9X8pNHkiCxOp-0ZPhR8ozEiKRIFogV-yiIEOHfFxXaymRxx_LYBfLazEEwi_0Qeu)

Host Event: By clicking “+ New Event!”, the user will be directed to the page where he/she can type in event detail about the event he/she wants to host. If there is error input (eg. did not specify participant numbers, the starting time of the event has past), the system will prompt the error. By clicking submit, the event will be added into the database and the user will be directed to the event detail page.

![img](https://lh5.googleusercontent.com/H-SILuRnpQbDJ-VpzUvK7k93YYl9wHtlC3gKG8aZS-ZzpgrnQdasLlZgJeW6qGxKWBHGzBRxrKDOJFfBJpq9WTZrEMPKvQ84Rwf0RHUJFlr4xQBEdGAx6xYEwlSKcKYzLBrUjKhr)

View Event & Join Event: By clicking the “events'' tag in the navbar user will be redirected to the events page, where the events data will be retrieved from the event database. Users can click on a particular event card to see further details, and if the user decides to join the event, the system will add the user into this event and event chat, then update the data.

![img](https://lh5.googleusercontent.com/xG-K58JowDNsYJ6QCyOSBaGSCv0VLiWUguG_v-P9wVMkG06EVA4inD_X38ODe8C3B0V5vG6yAeglXkmx32uYXOjorO0oaKSeAcuN75q5XvSmWxbpS0IX1TIxhUVI39yBhL_WISLe)

![img](https://lh3.googleusercontent.com/ClZCDUoC063iG8l7eErDreqol-qy9OX8nDlx_WWqAb0kIZXRo92sz4Vtg5x6WVx4HXcGkiDcsLwe1AuFNY1LZ1R4b4b_ccgcBKXpLSaKFVn-Q98At_btNf2kNQpbiIWd3T-Yt4Ya)

Chats & Create Chats: Click “Chats'' in Navbar to enter the page. The system will retrieve the chat list from the database. Users can enter either chatbox, detailed chat info and messages will be retrieved from the chat database. Users can also create group chat/send private messages, which the newly created chat will be added into the database.

![img](https://lh6.googleusercontent.com/UHYQSF9FWvfSjcQkSfgnd6BAQilO06i7ECMPREMpj97a-mDDcjzAOOzU-vBnQ_AD7nQSaqB7GLR4lrX4JTuuElzuzeu4AWIpsy7ibjInhKeZLFmFbqFx-3CNK0TMJ5oJTIerYkEA)
View Gym & Upload Gym Images: Click “Gym” in Navbar to enter the page. The data (gym info, gym pictures & gym schedule pictures) will be retrieved from the database, and users can update the schedule & gym picture by uploading pictures from their computer.
![img](https://lh3.googleusercontent.com/BowlFqqC89ZKM4-i5XfyUIG_5QpWSfa8bC4KMhKS3h_pxGOyCbgHKeYRF1IOdXohGj5W1NwDm79tvHikN-qpcneYUKqPxa2EBH9XOuojOl9Ur3iiFKlINhZw5pQDRKsPLSSKxMCe)

View Profile & Edit Profile: Click on the “Profile” tag in Navbar to enter the page, the profile data of current user will be retrieved from database. Users can edit their own profile by clicking the “edit” button. The page will show the columns and profile picture upload function. Click “save” to save the updated information into the profile database. View profile function also allows the user to check other users’ profile by clicking other users’ name (from friends, chats or events), but he/she is not allowed to modify the profile data, instead, the edit button will become the “+add friend” button and the user could send a friend invitation.

![img](https://lh6.googleusercontent.com/y-00dT8L52i5eWziaZpGBrNn4bm5-SGWBZHamey27GJ4MlJkDN3qv-ZUyGaQ702VVgla3AqzkAbfb3wFl76Z8ovu9shtm4BrNMx5iSBNk4kAHe2uDpPAgYwMV-8N94U-ir99OEcd)

Sending Friend Request: When browsing other users’ profile pages, user can click on the “+Add Friend” button to send a friend request.

![img](https://lh6.googleusercontent.com/ICLKU1xOCcszzXgqlZgPObUVWoAKbvNF2qwVf5k4iS4SJcnAyCCLdKz0fmmzsuYYtMlGRcLcSyMHxIJZCh6N1LyqZ5D0yFeXvcJKeZEeTat_0ZhyO8oXlcoJSFcYF9jcJJvN_BlR)

Accepting Friend Request: Click on the “Friends” tag in Navbar to enter the page, friend list/sent requests/received requests data will be retrieved from database. Users can click on the “Accept” button, and the data will be updated. The request will be removed from the received requests list and the person will be added into the friend list.

## 4 USER INTERFACE DESIGN

### 4.1 Introduction of the User Interface

There are mainly 7 parts of user interfaces, which are login/sign up pages, My Events page, Events page, Chat page, Gym page, Profile page, and Friends page respectively, for this project. Except for login/sign up pages, which are shown before the user signs in, all the other pages with different functions are available for users to choose without extra limitation on the same interface. These pages, which are considered “main function pages” are listed out on the upper-left hand side of the website, so that users could easily find the button of function they want. On the other hand, other extra functions that are not emphasized, and people might access those pages less frequently, such as friends, night shift and log out, are all listed under the menu button. In addition, when the cursor is pointing to the designated function or button, the color of words on the button would be changed to show users clearly. For Dubby, we use Reactstrap as our layout tool to implement a Responsive Web Design, in order to create a website that will automatically fit to both desktop and mobile environments.

### 4.2 Objects and Actions

#### 4.2.1 Login and sign up pages:

Firstly, the login page (figure 4.2.1.1) would be shown before users are able to access the main page. Login is necessary for using Dubby; consequently, for those who do not have an account should click the sign up button for creating a new user account in sign up page (figure 4.2.1.2). When users are setting their email account and password, the system would check the security of the password. If the password is too short or not secure, the warning message would pop up. So as for the login page, if the email or password is entered wrongly, the notification would pop up as a reminder.

![Figure 4.2.1.1](https://lh5.googleusercontent.com/lSxpaxBgW9i0s2C3BVYKRqjDSjgiL8h_Xlbi_OF1jrddHH4fNwDp0q3gFG2ccJJrPXjNm1fJFKTqzih3DXAaG7VV-NbQwWjxf4WvOsLAn4P6awp3UcrEXGSnZsk1t8iGy_XFUeaJ)
Figure 4.2.1.1

![Figure 4.2.1.2](https://lh3.googleusercontent.com/BPrkkk4wVzo1eJuM1oblPZTYQHQm_iWtBqWy232_js-pLLmxchNccN_eErgAlG-m2L5olzFbH-HfelOe-srTHj9NqxUjVTkxB5yVo3z2TV_HRfJyf3-a6UOXW5HcczKi81MHP9OX)
Figure 4.2.1.2

#### 4.2.2 my event (dubby):

![Figure 4.2.2.1](https://lh6.googleusercontent.com/9K7DKua9ZF3-hfiHJnPiI4VTTS3aBSqj230CR28Hh-IDyFESzI2wosx_S_5uyfk68P9Nrq7oPxHV5lBCYMrak7TcUXP-q8Tutr6l4dJcybXmabkUDhH2_gqITzOeWjMVjXi4EYaZ)
Figure 4.2.2.1

After login to Dubby, the initial page is the “My Event” page (figure 4.2.2.1), which shows all events that the user has decided to join. To access this page, users could also click the icon of “Dubby” on the left-top corner (figure 4.2.2.2). On this page, all the events that the user hosted or joined would be shown here, and the events are sorted by the event starting date. Moreover, the event that the user friends invited the user to join would also appear here. After the event starting time is over, the events would not be displayed on this page anymore. If users would like to host an event, they can create an event by clicking the “+ New Event!” button. After filling in all the required information (figure 4.2.2.3), such as event name, number of participants, sport type, location, and so on, the new event would be created and appear on the “My Event” page (figure 4.2.2.4). Or users can just select “Cancel” if they change their minds.

![Figure 4.2.2.2](https://lh5.googleusercontent.com/xWlkdg_xUDmUyLRcuDMpXsv742K36zRAwCLgVWQe5fdLVku_PqtI24AiP3H1TEOc1Hybhwh2X74YlY99QfoLL-uarYZ18KZoy1CESepw2qSWSkmWEep0CfmPMI5FvlXtpeN5cIeL)
Figure 4.2.2.2
![Figure 4.2.2.3](https://lh6.googleusercontent.com/dIntTFMRShauX5q8ix6DuE3mmqPiBhD7uKPr4Wos2OTdWv0rDSpbYE8f0JmGe1J-WMSsT8LQkNcndbu6OcXX6Od9i6G2iQdhvbXaC3NCHbyYBZR0nDSQG7ffZoKv22LPBIb0XGvP)
Figure 4.2.2.3
![Figure 4.2.2.4](https://lh5.googleusercontent.com/MdqBNlArCqOrTyv6VoUlg6FR3dGEb05t9QPPPCHuVUwstQ-UKWM6kVHy0rwTOqKgFV-X6-Au3RPEbzOTq5q5e0PFho08o_bdh04FPfUKoT9cF1eOYCtNt_fq-v9METgTSrVpXYoT)
Figure 4.2.2.4

#### 4.2.3 event (public):

The event page (figure 4.2.3.1) shows all the public events that are open for any user to join. There is a search bar in the upper section, where the users could find all the related events by typing the key words (figure 4.2.3.2). The lower part displays all the events that are not overdue and public for everyone. Private events would also be shown here if the users are the hosts or they are allowed to join the private events. After the event date is passed, the event card would disappear and no longer be on this page. The events are sorted by the starting date order, the event with closer dates would appear on the top. Each event card would show the information for the event as introduced at my event part above. By clicking the event card, the events details would appear.

![Figure 4.2.3.1](https://lh4.googleusercontent.com/gaFAVVv67ysGNKJObqDDm4sWyjNnIgQRKdh7EhjlOSfjntnjPcog6Uos0Gp-x8rAhXTAdUqmya0bHfovl2ndwDLxbEwpUwvBLEkqwrfp6QUp3cmVHlijYysZF_8vIFkeAaUPlYvq)
Figure 4.2.3.1
![Figure 4.2.3.2](https://lh6.googleusercontent.com/sjaT6javrW_xO-cGCCkX1N5Z0uBs_69ugFFUtpaLE9mQ3ts84uqlbMFK01OLqr_raqYhhWqKMbjtvznVZ7N-YUvzyRvveazU-uWwSjoNQWdFenbEjZOBD1z81daFqYJxPfJssdif)

#### 4.2.4 event card:

![Figure 4.2.4.1](https://lh5.googleusercontent.com/aYlAgF0eTNM1-01Csi9bF3Dp2VIx0CmdhtAEZnzAjCAhk1g2kspJBifOepZiU0AH9YA9cnag6pwCN-emPcbV9Hu7DwanZcY-GmYMn-tRoKE8T3-stZqmwEaY3mzAHVK2S62Kzm4f)
Figure 4.2.4.1

The event information page (figure 4.2.4.1) would be shown when the event card is selected. It shows the information of what the sport category is, whether the user has joined or not, and who the host is. For each event page, users could see the location, starting time and vacancy of events (figure 4.2.4.2). There is also a return button (figure 4.2.4.3), which would bring users back to My Events page. The host of that event would also be displayed, and users could check the profile of that host by clicking the “host” button (figure 4.2.4.4). If the user has not joined the event, there is a “join” button at the bottom. After joining the event, users are able to open the group chat for that specific event (figure 4.2.4.5). If the user is the host of events or the user has joined the event and the event allows other people to join, there are two buttons “participants” and “invited friends” on the upper area (figure 4.2.4.6). By clicking “participants,” users could see the participants who have joined the event already (figure 4.2.4.7). They could also invite their friends by clicking the “invite friends” button (figure 4.2.4.8). In addition, if the user is the host of the event, he/she can delete the event at the event page by just clicking the “delete” button (figure 4.2.4.9).

![Figure 4.2.4.2](https://lh5.googleusercontent.com/6DcYPoK-ipHUpcZhEybP2Gsw5dw--wobh-mGTx5bW74z0SST6mt0setIuJrQpK1q-yT-UWVnSsHNCr6mi5D849PEdUf_mhWDMiYAUizKfeP5UldxG_3JqE1jgTZ6fnJw12lXDdGy)
Figure 4.2.4.2

![Figure 4.2.4.3](https://lh5.googleusercontent.com/dDQSF8SVZ9FSqLSGgf_QBAB3xh55YyAuvGYsaKiXIUBMIung9tPbHHIR0wWahSnLpx4PeU5_AetMNkrR9R4U6IfELc0ZWRmJ3WT27E23EUCH5xVze1bi8UdGzbqlrSJu6UMcDKgr)
Figure 4.2.4.3

![Figure 4.2.4.4](https://lh3.googleusercontent.com/mXn2PBmUgoX4Tmc-LkrbNsgU_tb9mzxp5MfqH9LTiEDjKXLgiNP3x9Vx8KVLtDBs99Y2u0jWA86Ru5AXg_Q38-57t51zzuI_iWQAH7TnlX7XBh5x631VPlSvzaq8yYGsqFHrS6xS)
Figure 4.2.4.4

![Figure 4.2.4.5](https://lh5.googleusercontent.com/LIDJwuDPJ0H1bliz7131hiDk_Wm5S_HB9woDAISdPZ08cmL2mKGQJCWtwqafrdTV3brYfrR9SJFqMkF1pMZpmN8IEfe0UWhfSOV7UDADM4Pi2SzcZJlwn2SKY52jX9BMdHMUzevO)
Figure 4.2.4.5

![Figure 4.2.4.6](https://lh6.googleusercontent.com/aKj9gaKFylCSCWxbqfp2ExhdwALJOWUXsFk04RdeRFP9LZuh2q_4mW6QEjREFLU7wsl6LK3KOnb6-GPtzCx0QCAGdK6AzprY5jH_ytq27L9CENcQkjT9YeBCU4WsQuv72zN0PPMS)
Figure 4.2.4.6

![Figure 4.2.4.7](https://lh3.googleusercontent.com/bBZh1dFIfPOR_hDLNh7J81kIfth6v2Vvg293rOu9fB9NaPLNK8kmCpy-VZpolbTh1jW0S5zDTFk_vhok54zXlMqf04OhH6tdVyQAzcX9Gry9MpQZlrAZ4YVpEXu75IXP0iqbERdl)
Figure 4.2.4.7

![Figure 4.2.4.8](https://lh6.googleusercontent.com/YO4kTWpS696_4epVL5ycQ45rsowkDv-Z0n4U80jxqGCsOMah1HIAywr_LDZMmwUwvKpl8rShHJucHFUU_t77hT1wOhByXi6lbHuRkiZmXs0KsxHixmiQNvsb7ewUxUJWbgduR8Ey)

![Figure 4.2.4.9](https://lh3.googleusercontent.com/dszBz0cubK8AzEakFLv8ZZzcwyHrBkLe7PRJvXwUYD9wIXW0YPyRScL-oAr1Fsqzfl0BQTRSJxoRPnmj0epdR4lCeTiT4w3dTjMeDFsxnNZR3e3rM2dmWFsKJf6ZmjqSYp2Njkg3)
Figure 4.2.4.9

#### 4.2.5 chat:

On the chat page (figure 4.2.5.1), all the chat records are saved here. Each chat bar represents a chatting group, with the event name, icon of the user who sent the latest message and the message they sent. The event type is shown on the right hand side. Yellow bar represents the chat is a group chat automatically created after the event is created or after the user joins the event, and green bar represents a private chat with any user's friend. Users are also able to create a new chat group by clicking the blue button on the top, so they can select any users’ friends for a group chat (figure 4.2.5.2). By clicking the private chat, users could find their friends they would like to message directly (figure 4.2.5.3). The chat history would be shown if they already have chatted before. On this page, the latest updated chat group would be pushed to the top, so that users would be noticed if there are some new messages.To enter the chat room, users could just simply click the chat group showing on the chat page. For the event group chat, users can check the participants of the event (figure 4.2.5.4), and they can also check the event detail by clicking the circle icon “i” on the right side (figure 4.2.5.5). Besides the chatting content would be shown, the time of sent message would also be stated under each chat bubble.

![Figure 4.2.5.1](https://lh6.googleusercontent.com/s8XNlHSjna2pwfB5C51n_MMgevCAp_pwuSgpp73G1yvo4ThELSPI4jzZcDVScvdBj493SmJ3MiTQ3g-sA-oNKQc_sgAGoKVsWo-Hk4LppHmQXyAMZQOFUkZjqB6kcWsv6orQlfLv)
Figure 4.2.5.1

![Figure 4.2.5.2](https://lh4.googleusercontent.com/Uc3xVmqicrzPdOa4TRcyVidlukCxZdipc3ZrJNoO4gXHkTaKWiP1qt1aZ4PBBdXKfPMQ3RFEDGF4rHvVN2Ev16HEahWWsVVX74s8QWKpkQGTuEi2YgqFau1wsl--w0d1SaX9pTup)
Figure 4.2.5.2

![Figure 4.2.5.3](https://lh4.googleusercontent.com/4KRbzOAMHM-vqPZB3wUPaHB9DymG_uXEHy-9xTYPs_0MKawEml-abYRR2FY6KjJJAzU1EhnbNNoZpoqCti_UAIKFDOgGJTshFVJcuN7eWV79GLv6YpaziHNOlGmo0dQl7LadK6TH)
Figure 4.2.5.3

![Figure 4.2.5.4](https://lh3.googleusercontent.com/jCuZRL8E7z3eGqWVKNddkGGRMkCCk-hrIVWpYznd86ZkKBji9x5uJ_HoczCdWRg45lEkwB2CNRVdpuUhl-86xnm5ctYoTEtRw9j4EwconPk03HEzW019IgCtk7Y5jOaa5tF4GTjM)
Figure 4.2.5.4

![Figure 4.2.5.5](https://lh5.googleusercontent.com/SvbOYeRt35EuWxYUOGfcxCdUE-_UbgfQ8iWTB_tDP8vrmsm0c5Ry4Af2F1Sq-b9APonBP-Vg2g6CyQwoNStHvUMT0nNERL9E4z5BEfZeo6PhhVbg2X2q4dPFBbt3kAjqNv2upQER)
Figure 4.2.5.5

#### 4.2.6 gym (cuhk, hku, ust):

On the gym page, the information of the gyms from different universities would be shown here (figure 4.2.6.1). Gym page would list out all the gyms that the university has. Take the CUHK for an example. Users can see descriptions, pictures and the open schedule of the gym. Users can click the right and left arrows on the picture for checking the pictures and schedules (figure 4.2.6.2). Users are allowed to upload the latest gym image or schedule by selecting the file and “Upload” button (figure 4.2.6.3). Moreover, the notification would pop out when the photo upload is complete, so that users could make sure the information is updated (figure 4.2.6.4). Basically, only one gym picture would be kept for each gym, which is the first image, and the rest of pictures are the schedule that any other users uploaded. This page would only keep the latest three photos of schedule; therefore, we have at most four images totally (one gym picture and three schedule images).

![Figure 4.2.6.1](https://lh6.googleusercontent.com/aezY_GuO9d6-2K0PyC7IpxmtBk5nbJff9jmJ3-gLpo4mbA3hU63NeVD-fp32hJ92CnfRjvmMaRZ-y3UAKE-9tZ5QFXPI188TigzKRTHJ9GbYIShNx-F8knWaGWu1-RLKJEskbQlY)
Figure 4.2.6.1

![Figure 4.2.6.2](https://lh5.googleusercontent.com/OHUJWRz3kNqnThkU5cTqYfQjQMHc9zIymwD5WWGnFbJtcilusQqAOq_4jdIS4sl-FU0k0GAEBVWgR-q6pJG3Pq1tKNYt2_kbOrNlDgbybD_CtYs9UUDa-md97c-7L6egbiMIY6G7)
Figure 4.2.6.2

![Figure 4.2.6.3](https://lh5.googleusercontent.com/q_cUhhobdsDuMBUU0jl45g78k-an2FimO7wuJwpqQ2G1i4PJ_PzNtM-mmwFN5Tjh5ZxnQoKt-8zcbHd34p59S7HJ8XvCEVLrD-cW31agPddTIj_rP8FpSqC7oj2pzGt9G07GGLn5)
Figure 4.2.6.3

![Figure 4.2.6.4](https://lh4.googleusercontent.com/Ry8DtdyBPuPVJobJ8Jx9t-kFOKGWoXiDxy6oBmA9wvVdOasjYV57Wtj6TvjAQISEkpbFWBoIMI9Ban-WWKZHXHRQDF8px8Nj-AyN-33RnUHSZlF4ctbIcYJyj4xyM6Rfcfd1bPfG)
Figure 4.2.6.4

#### 4.2.7 profile:

The profile page displays the personal information that users would like to show to the public. There is a profile photo with a circle frame, user name, personal descriptions, university, and the interested sports (figure 4.2.7.1). For browsing others’ profile pages, the profile photo and information would be shown, and there is an add friend button at the bottom so that users could send the friend request for sports partners they are interested in (figure 4.2.7.2). If the user and that particular user are friends already, the add friend button would become an unfriend button (figure 4.2.7.3). On the other hand, for users themselves, they are allowed to edit their information by clicking the edit button. In the profile editing page (figure 4.2.7.4), users are able to change their profile photo by choosing the picture and uploading it. The alterations would only be saved after the save button is selected.

![img](https://lh6.googleusercontent.com/i0jA6pCoqQjcWqTr2FmY5aIQjG3YEupoVo0HTiJID5F30qZosTGN0_GaVCp7n2DXNlgjuMhroEzTq48Dwy6kbdjeEkdw_p7Q2tZomk_dCZXHwxItOOFJIWpd_EXgwrcPkVyCMgg2)
Figure 4.2.7.1

Figure 4.2.7.2
![img](https://lh4.googleusercontent.com/A8wHqByi0ZUKEwgVkdLe09x6OmsZWK_LqmFuSP-6nPb69xn_yH5fkLwqvboAgOkZMN0yInqERiS4VERlakkv7G6RgJfEGZxtJxuwg0clQ8DoNX1y6BvLHl37ajvec1nNzmaJNJuU)

![img](https://lh5.googleusercontent.com/ptrErn7oqRaeNnK2AzOjfwM0o1Kx6VI_4H_whQw6rpXL-kK-SQAfO7sO9O_SwRrmkM3qhS-_4laxi7_pkrPsOt8mpw48vs7fgvHGAPn_0PMGtXx3AGMOSVMMKCxdMCRVOnwZ8DCS)
Figure 4.2.7.3

![img](https://lh4.googleusercontent.com/Nc4eAk1RDU1thYdgslVXF36zD1ZF75Blr9kHrJMqyrrwp2Hgn4_4FHV1UBveIRxa-1iFELYDfT_NG1XHNOx1Ept4z45lzj_IpQWqnoTna3jUXLJItoqpwzCYXX2-UAjWm_RzTtHH)
Figure 4.2.7.4

#### 4.2.8 menu (friends, purple, sign out):

Under the menu, there are three different options. These three functions are not listed on the top page because they are subsidiary functions (figure 4.2.8.1). To make the main page clear, we decided to hide them under the menu.

![img](https://lh4.googleusercontent.com/ya6aCID6A9vz4IJrRqvlEdwYDTJ2QlCiUVXQsTrIXRa5jAmxvLeEWDxKMJEpV7OHdtml_N6kHXx-cG5sNQ2B8r6lrB15s8bmJdc03iOZKTn8JnTE3c00OJ6gVXhi_h39g9z6DxuN)
Figure 4.2.8.1

The first one is the friends page (figure 4.2.8.2). There are mainly four parts on this page: searching bar, friends list, sent requests and received requests. For the searching bar, users can either type the user’s name they want to search (figure 4.2.8.3), or search by interested sports (figure 4.2.8.4). It should be noted that the searching bar is case sensitive. After clicking the button, users can select the sport they are interested in and find other users who are also interested in this sport. For the friends list (figure 4.2.8.5), it shows all the friends the user has. They can unfriend their friend by clicking the red “unfriend” button, or check their friend's profile by clicking their names. For the sent requests (figure 4.2.8.6), it shows all the friend requests the user has sent, and by clicking the “unrequest” button, the request would be retrieved. For the received requests (figure 4.2.8.7), it shows all the friend requests that are sent by other users. After clicking the “accept button”, the accepted user would become the user’s friends, listed on the friends list.

![img](https://lh3.googleusercontent.com/tISyIRcIpUiq_ANDOn_YsiOJck2rOvd0vNNOWbCyj03VCaoROGHhJul-KGn0G6C9_wFkbDNB9ehiO5-3ADBVShtgZkGq8FAVOwrRzPvWrmnv1sSRRUhGTvRGl_g51X3H59uqWZ8t)
Figure 4.2.8.2

![img](https://lh6.googleusercontent.com/mtBTnT1svAYzwOXYZwuc2cyXifWe8rAu91jQBfNIevWD9lFvFE_bJZzk7sOPUnIEfF9j5cy4dQLgU8_X4E9CE7y-DiKWJpZ6Lgr7PbNhxS9pzV2WsKsUUpOONvXC_3Qb11Xl7OdD)
Figure 4.2.8.3

![img](https://lh3.googleusercontent.com/ZvmLT1ZJ6HhJssqlNWXy-lj6KQOUI_LxvHswwDBNjR5HXvRVuG0zh6fS3YpYJgy88zzI_Bf5Y_V_HJVvVmVf_aBBIw8-3ICY6QO5TG5g_SAQ_BEkTqfkQjgbQLrujLIpMvq0lagc)
Figure 4.2.8.4

![img](https://lh3.googleusercontent.com/hVQOeD-AvgyF2qk-qn2k1xju8-CkTGIohG8g8k4hz-KxJPPWbVyyu1Vb57P8Z57YK4iqO93xrdzxe7eXJhowlca6-2Zy_GX5hTc--YWTPOQVA4ZHsgVtY-rvRZ-HJC0UhaulRwgq)
Figure 4.2.8.5

![img](https://lh4.googleusercontent.com/l-qDOGNlNgSUkB2Q0_2w0Y7RpR1f2NG7meij1TO-J7r4bGT2a4lfnRuKpIP4ZWV4KWnw3ikCMnzRn_oXqo-nWWuPwceeE6n34y0phHWy-S-GkWjdhSfWgF1YMTc0lD0yT7WdNBaF)
Figure 4.2.8.6

![img](https://lh3.googleusercontent.com/w6rZZKlfx7MC56sOX93RIZwQqu7QG4MI53jq434bxyclVbTHo7v7MHrqaqKoHNJrnkQ7NVQEt_q38oKmZTTbkZ5IGV8JFtC-k92gFCFYKsw98SgzOOZgWwr-Qy9Nuc_S9kela0a1)
Figure 4.2.8.7

The second option is purple. By clicking “purple”, the user interface would be changed into purple theme (figure 4.2.8.8), which is the dark mode. With lower brightness, users are able to protect their eyes. If the theme color is purple, this button under the menu would become “yellow” (figure 4.2.8.9), and by clicking it, the theme color would be changed back to yellow.

![img](https://lh3.googleusercontent.com/pxu0MldWeJrZEt_0ZeWeXJ7ehZuqqo0Djz04_2zvWIo2lW-aZxF5v_Es-aMDLxLhwdmZtwDw5KfODA-VzQhIvIgZseX5bwwORjufUna2Ud727V4P39UgN1JzkZOBBxn0fFtlR5e6)
Figure 4.2.8.8

The third option is the “sign out” button, where the user could sign out the account, and the login page would be displayed again.

![img](https://lh6.googleusercontent.com/vJxWqROnm1jKhgwJcQVLgkiDAvlgWVeUQcvJ0lpizJNSue5orCfx5dU6EWwAd0odBT9Tput2omnMHF1FCE0MGBQigbVSkZBHqCJxft4vaL6uG6nbBaguHkj9Yi_gZhwX9B-jO_bH)
Figure 4.2.8.9

## 5 TEST

### 5.1 Test Overview and Test Plan

For Dubby, our basic testing logic is: Testing each small parts inside different functions of Dubby (eg. data update function, submit button, file upload function) Testing the function as whole (eg. create a dummy account and test if it can successfully create an event that could be joined by other dummy accounts) Testing the whole system by registering multiple real accounts and performing different tasks according to our specification. Therefore, I would say we use an incremental testing technique and basically perform them in a bottom-up strategy. Furthermore, in the module testing, we use black box tests as our main testing method and use white box tests as assist tools. The reason behind is because black box testing is requirement based, which we believe is more suitable for our system as it contains lots of interactions between users, database and web page. The white box testing is performed every time a module is coded, in order to test the control flow inside the module is correct.In the following section, we would list out the black-box tests we have performed on each function. We have prepared various cases to ensure each part of the function is fully covered. The categories of our black box testing is sign up function, login function, functions related to events, functions within event card, chat functions, functions related to gym page, functions related to profile, functions related to friend page, dark/light mode functions, and sign out function. When we came across the problems, we tried to fix them, and the results are the final version of the test. All the test cases are listed in the table below.

### 5.2 sign up:

#### 5.2.1 create an account

| Case Description                                          | Purpose                                                                        | Input                                         | Expected Output                                                                         | Pass/Fail Criteria                                                           |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| email address with @ and **.com**, and password is strong | See if the proper way to create an account works as expected                   | email: “12345678@email.com”password: 12345678 | Sucessfully sign up                                                                     | Pass                                                                         |
| email address with @ and **.com**, and password is weak   | See whether proper email address but non-proper password can create an account | email: “12345678@email.com”password: 1234     | The warning “ the password is too weak” should pop up, and sign up unsuccessfully       | Pass                                                                         |
| email address without **@** and password is strong        | See if non-proper email address with proper password can work or not           | email: “12345678.email.com”password: 12345678 | The warning “ email address should contain @” should pop up, and sign up unsuccessfully | Pass                                                                         |
| email address without **.com** and password is strong     | See if non-proper email address with proper password can work or not           | email: “12345678@email”password: 12345678     | The warning “ email address is incorrect” should pop up, and sign up unsuccessfully     | Pass, although there is no warning pop up, but the sign up is not successful |

### 5.3 login:

#### 5.3.1 account login

| Case Description                         | Purpose                                                                   | Input                                         | Expected Output                                                   | Pass/Fail Criteria |
| ---------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------------- | ------------------ |
| correct account and correct password     | To see if correct account and correct password can login successfully     | email: “12345678@email.com”password: 12345678 | Login successfully                                                | Pass               |
| incorrect account and incorrect password | To see if incorrect account and incorrect password can login successfully | email: “1234567@email.com”password: 1234567   | The warning “Please check your email or password!” would pop out. | Pass               |
| incorrect account and correct password   | To see if incorrect account and correct password can login successfully   | email: “1234567@email.com”password: 12345678  | The warning “Please check your email or password!” would pop out. | Pass               |
| correct account and incorrect password   | To see if correct account and incorrect password can login successfully   | email: “12345678@email.com”password: 1234567  | The warning “Please check your email or password!” would pop out. | Pass               |

### 5.4 event:

#### 5.4.1 create new event

| Case Description                                                                         | Purpose                                                                            | Input                                                                                                                                                                       | Expected Output                                                                                                        | Pass/Fail Criteria |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Event name not blank, proper number of participants, starting time is after current time | To check if users are able to create an event as expected event information input. | Event Name: This is a testParticipants allowed: 5Event type: BasketballPublic Event: YesEvent Location: Shaw College CourtStarting Date: 2020/6/25Starting Time: 11:30 A.M. | Successfully create an event                                                                                           | Pass               |
| Blank event name                                                                         | To check if users are able to create an event without event name                   | Event Name: (blank)Participants allowed: 5Event type: BasketballPublic Event: YesEvent Location: Shaw College CourtStarting Date: 2020/6/25Starting Time: 11:30 A.M.        | The warning pops up and asks the user to fill in the Event Name. The event will not be created.                        | Pass               |
| wrong number of participants (lower than 2)                                              | To check if users are able to create an event with wrong number of participants    | Event Name: This is a testParticipants allowed: 1Event type: BasketballPublic Event: YesEvent Location: Shaw College CourtStarting Date: 2020/6/25Starting Time: 11:30 A.M. | Not allowed to have the option of choosing participants lower than two.                                                | Pass               |
| starting date is earlier than today                                                      | To check if users are able to create an event with passed starting date            | Event Name: This is a testParticipants allowed: 5Event type: BasketballPublic Event: YesEvent Location: Shaw College CourtStarting Date: 2020/4/25Starting Time: 11:30 A.M. | The warning pop up and ask the user to fill in starting date later than current date. The event will not be created.   | Pass               |
| starting time is earlier than current time                                               | To check if users are able to create an event with passed starting time            | Event Name: This is a testParticipants allowed: 5Event type: BasketballPublic Event: YesEvent Location: Shaw College CourtStarting Date: 2020/5/16Starting Time: 06:30 A.M. | The warning pops up and asks the user to fill in starting time later than current time. The event will not be created. | Pass               |
| cancel the event                                                                         | To check whether users are able to cancel the event creation                       | click the cancel button                                                                                                                                                     | Back to My Event page                                                                                                  | Pass               |

#### 5.4.2 click the event card

| Case Description     | Purpose                                                                                 | Input                        | Expected Output                                           | Pass/Fail Criteria |
| -------------------- | --------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------- | ------------------ |
| click any event card | To check whether the event information would show properly from clicking the event card | click “this is a test” event | The event information of “this is a test” should be shown | Pass               |

#### 5.4.3 search for events

| Case Description                                          | Purpose                                                               | Input                               | Expected Output                                          | Pass/Fail Criteria |
| --------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------- | ------------------ |
| type an event name with case sensitive                    | To check whether users could only search with proper alphabet case    | Type “Run” in the search box        | The page only show the event name with “Run”             | Pass               |
| type an event name without case sensitive                 | To check whether users could only search with different alphabet case | Type “run” in the search box        | The page show the event name with “Run”                  | Pass               |
| type a sport appear on the category bar on event page     | To check whether users could find the existing sports events          | Type “basketball” in the search box | The page show all the basketball events                  | Pass               |
| type a sport not appear on the category bar on event page | To check whether users could find the non-existing sports events      | Type “tennis” in the search box     | The page would show nothing                              | Pass               |
| type a host name appear on the event card                 | To check whether users could find events hosted by specific user      | Type “potato” in the search box     | All the hosts with names contain “potato” would show     | Pass               |
| type a gym name                                           | To check whether users could find events hold at specific location    | ype “NA Gym” in the search box      | All the locations of events are at NA Gym would be shown | Pass               |

### 5.5 event card:

#### 5.5.1 back to event button

| Case Description                 | Purpose                                                | Input            | Expected Output           | Pass/Fail Criteria |
| -------------------------------- | ------------------------------------------------------ | ---------------- | ------------------------- | ------------------ |
| click the “back to event” button | To see whether the back to event button works properly | click the button | back to the previous page | Pass               |

#### 5.5.2 join event

| Case Description            | Purpose                                      | Input            | Expected Output                                        | Pass/Fail Criteria |
| --------------------------- | -------------------------------------------- | ---------------- | ------------------------------------------------------ | ------------------ |
| click the join event button | To check whether the join event button works | click the button | join the event and the event is shown on My Event page | Pass               |

#### 5.5.3 check participants

| Case Description             | Purpose                                    | Input                           | Expected Output                     | Pass/Fail Criteria |
| ---------------------------- | ------------------------------------------ | ------------------------------- | ----------------------------------- | ------------------ |
| click the participant button | To check whether the button works properly | click the “participants” button | All the participants are listed out | Pass               |

#### 5.5.4 invite friends

| Case Description                        | Purpose                                                               | Input                                     | Expected Output                                                          | Pass/Fail Criteria |
| --------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------ | ------------------ |
| click invite friends button             | To see whether the button work properly                               | click the button                          | The tab that allow the user to invite friend should appear               | Pass               |
| add friends                             | To see whether the user can add a friend to invite list               | click the plus button of friend           | The selected friends are moved from “Add friends” list to “invites” list | Pass               |
| remove invited friends                  | To see whether the user can remove invited friend from “invites” list | click the minus button of friend          | The selected friends are moved from “invites” list to “Add friends” list | Pass               |
| invite at least one friend and “cancel” | To see whether the cancel button works                                | invite one friend and click cancel button | The invite process would be canceled                                     | Pass               |
| invite at least one friend and “done”   | To see whether users are able to invite friends                       | invite one friend and click done button   | The invited event would appear on invited user’s event page              | Pass               |

#### 5.5.5 group chat

| Case Description      | Purpose                                                                | Input                 | Expected Output                                   | Pass/Fail Criteria |
| --------------------- | ---------------------------------------------------------------------- | --------------------- | ------------------------------------------------- | ------------------ |
| click the chat button | To see whether users could enter the group chat from event information | click the chat button | The page redirect to the chat room for that event | Pass               |

#### 5.5.6 delete event (if the user is the host)

| Case Description                   | Purpose                                            | Input                                           | Expected Output                                                                             | Pass/Fail Criteria |
| ---------------------------------- | -------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------ |
| click the delete button and cancel | To see what if users accidentally delete the event | click the delete event button and select cancel | The confirming tab would pop up, and after clicking cancel, nothing happen                  | Pass               |
| click the delete button and delete | To check whether users could delete the event      | click the delete event button and select delete | The confirming tab would pop up, and after clicking delete, the event would no longer exist | Pass               |

#### 5.5.7 check host profile

| Case Description      | Purpose                                                    | Input                 | Expected Output                                | Pass/Fail Criteria |
| --------------------- | ---------------------------------------------------------- | --------------------- | ---------------------------------------------- | ------------------ |
| click the host button | To check whether users can check the profile of event host | click the host button | The page would redirect to the profile of host | Pass               |

### 5.6 chat:

#### 5.6.1 create private chat

| Case Description                                           | Purpose                                            | Input                    | Expected Output                                                                                                                                                                  | Pass/Fail Criteria |
| ---------------------------------------------------------- | -------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| create a private chat with a friend that never chat before | To see whether the private chat works              | choose from friends list | create a new private chat room with correct title and image, messages sent and received successfully, database updated, chat room displayed on the top of user’s chat rooms list | pass               |
| create a private chat with a friend that have chat history | To see whether the chat history could be retrieved | choose from friends list | direct to the already existed private chat room                                                                                                                                  | pass               |

#### 5.6.2 group chat

| Case Description                       | Purpose                                                                   | Input                                                                            | Expected Output                                                                                                                                                                                       | Pass/Fail Criteria |
| -------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| chat with friends for the same event   | facilitate discussion between participants, let user discover new friends | join the event, send message in the automatically joined/created event chat room | joined chat room successfully, able to view the corresponding event and participants, messages displayed correctly, database updated, chat room displayed on the top of user’s chat rooms list        | pass               |
| create a group chat with users friends | To see whether group chat could be created                                | enter group name and choose participants from friends list                       | chat room created successfully, able to add more participants and view participants, messages sent and received correctly, database updated, chat room displayed on the top of user’s chat rooms list | pass               |

#### 5.6.3 private chat with friends

| Case Description               | Purpose                                                    | Input                   | Expected Output                                                                                                                           | Pass/Fail Criteria |
| ------------------------------ | ---------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| send a text string to a friend | to chat with other users in a one-to-one private chat room | type in the message box | message displayed in correct chat bubble style for both users, database updated, chat room displayed on the top of user’s chat rooms list | pass               |

### 5.7 gym:

#### 5.7.1 check the photo of gym/ schedule

| Case Description                                               | Purpose                                          | Input                                      | Expected Output                                 | Pass/Fail Criteria |
| -------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------ | ----------------------------------------------- | ------------------ |
| check the photos and click left and right arrows               | To see whether the photo function work properly  | click the left and right arrow of pictures | the right or left pictures would be shown       | Pass               |
| leave the page still and see if the photo change automatically | To see whether the photos would show like slides | click the gym page and wait                | the pictures would show as slides automatically | Pass               |

#### 5.7.2 upload gym photo

| Case Description   | Purpose                                    | Input                                | Expected Output       | Pass/Fail Criteria |
| ------------------ | ------------------------------------------ | ------------------------------------ | --------------------- | ------------------ |
| upload a gym photo | To check whether the upload function works | Upload a photo from update gym image | the photo is uploaded | Pass               |

#### 5.7.3 upload schedule photo

| Case Description        | Purpose                                    | Input                                     | Expected Output       | Pass/Fail Criteria |
| ----------------------- | ------------------------------------------ | ----------------------------------------- | --------------------- | ------------------ |
| upload a schedule photo | To check whether the upload function works | Upload a photo from update schedule image | the photo is uploaded | Pass               |

### 5.8 profile:

#### 5.8.1 edit profile

| Case Description                               | Purpose                                                 | Input                                                 | Expected Output                                                 | Pass/Fail Criteria |
| ---------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- | ------------------ |
| click the Edit button                          | To see whether the edit button works properly           | click the edit profile button                         | The page redirected to profile editing page                     | Pass               |
| change the username and save                   | To see whether users could change the username          | change the username to be “the changed name” and save | the username become “the changed name”                          | Pass               |
| change the description and save                | To see whether the user can change the description      | change the description to be “say sth” and save       | the description is changed                                      | Pass               |
| change the university and save                 | To see whether the user can change the university name  | change the university to be “CU”                      | the university is changed                                       | Pass               |
| select interested sports and save              | To see whether the user can edit the interested sports  | select Badminton, Basketball, and Running             | the interested sports shows: Badminton, Basketball, and Running | Pass               |
| select nothing (no interested sports) and save | To see whether the user can select no interested sports | select nothing                                        | show no interested sports                                       | Pass               |

#### 5.8.2 upload image

| Case Description | Purpose | Input | Expected Output | Pass/Fail Criteria |
| ---------------- | ------- | ----- | --------------- | ------------------ |
| upload a photo   |

#### 5.8.3 Corresponding username changed

| Case Description                                                        | Purpose                                        | Input                                     | Expected Output                       | Pass/Fail Criteria |
| ----------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------- | ------------------------------------- | ------------------ |
| Change username and see if the username of My event has changed as well | To check whether the username changed globally | change the user name and check other page | the username has been changed as well | Pass               |

### 5.9 friend:

#### 5.9.1 search by username

| Case Description                         | Purpose                                                                      | Input                  | Expected Output                                                                        | Pass/Fail Criteria |
| ---------------------------------------- | ---------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------- | ------------------ |
| search a username with exact case        | To check whether users can find another user                                 | search a username: Law | the user with name Law would be shown                                                  | Pass               |
| search a username without case sensitive | To check whether users can find another user with similar but not exact name | search a username: Law | the user with name law would be shown if the username exists, but not the username Law | Pass               |

#### 5.9.2 search by interested sports

| Case Description       | Purpose                                       | Input                         | Expected Output                            | Pass/Fail Criteria |
| ---------------------- | --------------------------------------------- | ----------------------------- | ------------------------------------------ | ------------------ |
| search by Badminton    | To check whether search by Badminton works    | select search by Badminton    | Users interested in Badminton are shown    | Pass               |
| search by Basketball   | To check whether search by Basketball works   | select search by Basketball   | Users interested in Basketball are shown   | Pass               |
| search by Rugby        | To check whether search by Rugby works        | select search by Rugby        | Users interested in Rugby are shown        | Pass               |
| search by Running      | To check whether search by Running works      | select search by Running      | Users interested in Running are shown      | Pass               |
| search by Soccer       | To check whether search by Soccer works       | select search by Soccer       | Users interested in Soccer are shown       | Pass               |
| search by Swimming     | To check whether search by Swimming works     | select search by Swimming     | Users interested in Swimming are shown     | Pass               |
| search by Table Tennis | To check whether search by Table Tennis works | select search by Table Tennis | Users interested in Table Tennis are shown | Pass               |
| search by Tennis       | To check whether search by Tennis works       | select search by Tennis       | Users interested in Tennis are shown       | Pass               |
| search by Volleyball   | To check whether search by Volleyball works   | select search by Volleyball   | Users interested in Volleyball are shown   | Pass               |
| search by Others       | To check whether search by Others works       | select search by others       | Users interested in Others are shown       | Pass               |

#### 5.9.3 check user’s profile

| Case Description                               | Purpose                                                | Input                 | Expected Output                                   | Pass/Fail Criteria |
| ---------------------------------------------- | ------------------------------------------------------ | --------------------- | ------------------------------------------------- | ------------------ |
| search a username card and click the user name | To see whether the profile linked to the username card | click a username card | the page redirect to the profile of selected user | Pass               |

#### 5.9.4 add friend (send/unsend request)

| Case Description                                                      | Purpose                                                                 | Input                                                    | Expected Output                                                            | Pass/Fail Criteria |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------ |
| find a user (not friend) and add friend on their profile              | To check whether users could find another user and add he/she as friend | Search username: Big Potato, and click add friend button | able to search a user and send the friend request                          | Pass               |
| unsend friend request on their profile                                | To see whether unfriend function works                                  | click the unrequest button                               | request is retrieved and the button change back to add friend button       | Pass               |
| send a request and check if the request is added on sent request list | To see whether the “sent requests” area on friend page works            | click the add friend button and go to the friend page    | the request is added on the “sent request” area on the friend page         | Pass               |
| unrequest on the sent request list                                    | To see whether the unrequest function works                             | click the unrequest button                               | the request is unsent and the user is disappear on the “sent request” list | Pass               |

#### 5.9.5 unfriend

| Case Description                             | Purpose                                          | Input                     | Expected Output                                       | Pass/Fail Criteria |
| -------------------------------------------- | ------------------------------------------------ | ------------------------- | ----------------------------------------------------- | ------------------ |
| click the unfriend button on the friend list | check whether the unfriend button works properly | click the unfriend button | the user is unfriend and disappear on the friend list | Pass               |

#### 5.9.6 accept request

| Case Description            | Purpose                                  | Input                   | Expected Output                                                                   | Pass/Fail Criteria |
| --------------------------- | ---------------------------------------- | ----------------------- | --------------------------------------------------------------------------------- | ------------------ |
| accept other user’s request | To check whether the accept button works | click the accept button | the user become friends of user, and appear on the friend list on the friend page | Pass               |

### 5.10 dark/light mode:

| Case Description                              | Purpose                                                 | Input                   | Expected Output                              | Pass/Fail Criteria |
| --------------------------------------------- | ------------------------------------------------------- | ----------------------- | -------------------------------------------- | ------------------ |
| click the purple button and check other pages | check whether the purple button works for all the pages | click the purple button | all the pages are changed to dark mode       | Pass               |
| click the yellow button and check other pages | check whether the yellow button works for all the pages | click the yellow button | all the pages are changed back to light mode | Pass               |

### 5.11 sign out:

| Case Description      | Purpose                                      | Input                     | Expected Output           | Pass/Fail Criteria |
| --------------------- | -------------------------------------------- | ------------------------- | ------------------------- | ------------------ |
| click sign out button | To check whether the sign out function works | click the sign out button | the account is signed out | Pass               |

## 6 LESSONS LEARNED

From the project, the biggest lesson we have learnt is the importance of proper software design. For example, although we did draw diagrams such as DFD, and UML, we still fail to properly visualize our application using illustrations. This results in problems like pages that are coded by different people having different layouts, and missing functions/buttons that shouldn’t be forgotten. At last, we spend huge effort and time to correct these design flaws, which could be avoided since the beginning.

Some parts we would do differently if we can re-do the project:

- Chat
  - The notification of chat: In the current version of Dubby. Although the chat box would be pushed to the top of the chat list when a new message is received, it won’t show any notifications to the user. To make it more convenient and instant for users, we can add the notification bell so that users could catch up the most updated message immediately.
- Gym
  - Redesign the layout for the gym page. The system now doesn’t allow the user to crop the image they upload to the event database, which results in images that are shown in the carousel are in different sizes. We would like to redesign this part by adding an image crop function, or even redesign the whole layout of how the images are shown.
- Database
  - Redesign the database structure: We should properly design the database structure in the beginning (etc. which database should save what kinds of data, the name of the key in different database)
- Layout Design
  - Initially, we designed the layout based on the size of the mobile phone monitor, and it turns out the layout looks much better on mobile devices than laptop or tablet. We might want to change the tool for designing layout (eg. React-mdl: a set of React components built on top of Material Design Lite), or even create both mobile & desktop versions of webpage so that it can better fit into different screen sizes.

## 7 CONCLUSION

For the project, we have developed an event-based socializing app Dubby where university students can easily find their sports buddies. We analyzed students’ needs and implemented several functions into our system, including hosting & joining sport events, viewing & uploading gym schedules, a chat function, a profile function and a friend system. We drafted diagrams such as Data Flow Diagram and UML sequence diagram to help us with the design and implementation of the system, and perform module and integration testing to ensure the system has met our requirements. Although there are still flaws inside the program and we did wish to redo modules to perfect the system, we are generally satisfied with the program we have created. We tried to practice the software engineering principles and knowledge learned in class throughout our system and it did help us a lot in different stages of the engineering process.

At last, once again thanks to Professor Lyu and all the teaching assistants in the class that provide us important experience on software engineering, thank you.

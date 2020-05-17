# Group 31 Project Initial Design Report

Project Title: Dubby

Document Version Number: 1

Printing Date: 12/03/2020

Group ID: 31

## Members:

- Shann-Wei Yeh, 1155100333, Computer Science and Engineering Department, CUHK
- Chin Hsin Chan, 1155085506, Faculty of Business Administration, CUHK
- Alexandru Jucan, 1155141090, Computer Science and Engineering Department, The University of Sheffield
- Yung-chieh Huang, 1155120711, Computer Science and Engineering Department, CUHK
- Tsai Li Luan, 1155075536, School of Journalism and Communication, CUHK

## 1 INTRODUCTION

### 1.1 Project Overview

Dubby, originated from the word “buddy,” is a service that connects university students who want to do sports but have difficulties in finding partners. For team sports such as basketball and soccer, it is hard for a person to enjoy playing if he/she cannot find enough teammates, which could result in him/her giving up on playing. On the other hand, for sports like badminton and tennis, people may want to find different opponents to play with in order to enhance their skills. In fact, according to our study, many students who love to do sports are suffering from similar scenarios, especially when they do not belong to any university sports team. Our idea is to connect all these people through Dubby so that they can hold or join a game randomly.

### 1.2 Objective

Our main object is to help people with similar expectations of doing sports to be connected so that students could have higher opportunities to play sports. Another goal is providing complete and correct information about each stadium inside the campus. We hope that the information could help students to utilize sports facilities better. Starting from CUHK, we eventually want to let Dubby become the no.1 service in Hong Kong for university students to find their sports partners.

### 1.3 Expected Customers and Market

Our target users are students in universities in Hong Kong who would like to find partners for sports. We assume that those who are not that familiar with the university environment, who are less interested in joining a regular sports association, or who want to play a game without enough participants can use a more straightforward way to solve the problem. We expect our user base to include exchange students, non-local students, and those who want to have more partners to join their games.

### 1.4 System Features

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
   2. Edit Profile
      - Users can type in their personal info, such as their age/university/type of sports interested in. They could also type down a self-introduction in designated areas.
   3. Friends List
      - The friends that the current user has will be shown. Users could click on their friends to see their profile page, or he/she can also chat with them.
   4. Search User
      - Users can search for particular user by input his/her username
   5. Send friend request/Unfriend
      - When viewing another user’s profile, the user can send a friend request to him/her to add them into the friends list.
      - Users can also unfriend their current friends to remove them from the friends list.

4. Chatting

   1. Private chat/group chat
      - Just like other chatting apps (instagram, whatsapp), users can chat with their friends/an anonymous user, or choose to open a group chat with their friends.
   2. Event chat
      - Event chat is a chat room that will automatically generated when an event is hosted, every other user that has joined the event will be automatically added into this chat room. Which means when a user has created a sport event, he/she will automatically create a event chat.
      - The Event chat will self-destruct 72 hours after the event hosting time. Before the event chat disappears, users can add each other into their friends list.

5. (administrative works)

   1. Dubby does not have administrator accounts, however, the developer could directly enter the database to perform the following actions.
      - Verify state of gyms
      - Delete user accounts

## 2 BACKGROUND

### 2.1 Incomplete gym information system provided in CUHK

First of all, as a group of students from CUHK, we all knew that there are a couple of stadiums on the campus. However, it is also well-known that these gyms are not always open to regular students but occupied by sports teams for formal training most of the time. It turns out that the gyms in CUHK from different colleges would open to students but only at a certain period, for example, only Friday afternoon and Sunday among a week. What is worse, this information is available only on the bulletin board of each gym, which means if anyone would like to do sports in the stadium, they would have to go there in person to check whether the gym is available. If not, they would have to go to another one and see whether they are lucky enough to visit an available gym. Besides, there is a high possibility that even the gym is available, the specific courts are already occupied by other students. Therefore, we think that it would be essential to provide such information to our users.

### 2.2 Insufficient participants for specific sports

Some of our team members are sportspeople, and the problem of not being able to find enough friends to play team sports is always challenging to be solved for them. It is quite often for them to visit the gym directly and risk playing on their own if nobody is there, which is quite disappointing. To make sure having enough players for the game, people could join sports teams or sports associations. However, sometimes they want to enjoy the game for fun instead of formal training. That is why we would like to help them easily find their teammates or competitors, who are also interested in playing the same sports with similar situations for the game. Users could create a new event or join other’s events, and then they could enjoy playing sports with enough teammates.

### 2.3 Difficulties of adapting new sports culture for newcomers

We found that people who have difficulty finding teammates are mostly newcomers, for example, exchange students or freshmen in the university. Since they are new to the environment, they probably do not have enough friends or information about playing sports with others in the university. To help them better and easier to adapt to the university sports culture, we offer the functions that users could add friends and chat privately/in a group if they have similar interests in sports. Finding friends on Dubby is helpful for university newcomers.

## 3 SPECIFICATION (e.g., DFD)

- DFD (Appendix 3.1, 3.2, 3.3)https://drive.google.com/file/d/1WhMahd-eB7pUKkq3TlNhFjLAn81Z61P5/view?usp=sharing
- Web page Design (Appendix 3.4, 3.5, 3.6, 3.7)

## 4 SYSTEM ARCHITECTURE

### 4.1 Architecture Diagram (Appendix 4.1)

https://drive.google.com/file/d/1zKsO5qReWf2nBPrCzPecadcHxMxy5jjl/view?usp=sharing

### 4.2 System Components

1. Front End: React.js
   - For the front end, we decide to use React.js. It could provide a single page application with easy state management and faster development. Furthermore, as we also consider the chance of developing a Dubby mobile app at the same time, we might adopt React Native as the possible tool, so using React.js for web page development is our best option.
2. Back End: Node.js
   - Since we have used React.js for web development, which is based on JavaScript. We think that using it for server-side scripting also could save us time from learning a new coding language, therefore we decide to use Node.js as our runtime environment.
3. Database: Firebase
   - Firebase allows us to host our website for free and has a integrated database support, this becomes the main reason for us choosing it.

### 4.3 Description of Major System Components by UML

- Use-case Diagram (Appendix 4.2)https://drive.google.com/file/d/1zfhPbdUVT3c5_wUK0IuF6-G0BWPEXV3H/view?usp=sharing
- Class Diagram(Appendix 4.3) https://www.draw.io/?libs=general;uml#G1KxSU08pCk89ZGnO-_Yd_omX18COuj7Fa
- Sequence Diagram (Appendix 4.4, 4.5) https://drive.google.com/file/d/1ex7DJqTXlXFkHm52WnGAVPxuhH6g3w0o/view?usp=sharing

## Appendix

![img](https://lh4.googleusercontent.com/ZmQPQ1x2-jt5cqFmdWfYgiSpiwHmqbY7Rew1tLD7v0PV-klxxsK0d7zRqDmONNrXflf4bkewfuMgnmQylvsOXi2lWvWdV3-NhPHnWSKUupFa6E6k3P-TSGz_4vQ8rmH4S9OclNFO)
(Appendix 3.1 DFD Level 0)
![img](https://lh4.googleusercontent.com/p9PVoH25IMX0o0lzeCVtrCCy18I_4WG_rgg0OaNMRwrjIr52325t9QTciQl0WUlQvt0rzGFpZZMQdN_Ha913QWvqgHMyA_m6az2ZXW4M-luJzlAA6IXVzN45KBfD9l5_WzRpekrX)
(Appendix 3.2 DFD Level 1)
![img](https://lh6.googleusercontent.com/DBQwjY8czJzuriIQwNR0GF3VZyJX53vKMmLnQuxXaFuYa0TSKVOfbK1RukoRX1JV3hqnYnwv1R-T9xJIXfem4AejwXNZ4lFgcK6PXonBuXeCb_yBmgX5HWIlo6mQoADKdEGoYRMJ)
(Appendix 3.3 DFD Level 2)
![img](https://lh3.googleusercontent.com/7ar8SNsMxVB7e6-2JZGFWR_fC7NlbKoL3zbuUwRF_3Yh63WJbEk1w8XITNKGfVhlaMhpcM9VjL4osK0wDkJUA12ShDfjxsZwTK8sn0PjWQNr_HYwEGk9G_AT_K_sCbDZOtc5oXs4)
(Appendix 3.4)
![img](https://lh6.googleusercontent.com/Jpqddr0LNGtKJf7gdl2scP3I_erarCxmFbnDFoEBlEww3vgvsr_JYsJO6J-0M_H3GiEhsjRW-g35wBJvAF8sCQK6wtZGuNSUhNhFi_C4sxF6Q50p73MTmJ75g1fufpUWTw5FWXyA)
(Appendix 3.5)
![img](https://lh6.googleusercontent.com/jyttuGfLC6BYU3Qs6JHxJVZlE-NHilqZHqujh5EXringUgAT3GlOwhJ2JW0eBgxs43EGW2Mx8ALzUEFRetuX366O5-y0ZeRUVg95oGOcjuMRtSyRBQHqZbSJ7W2-Nncv-_48gLLj)
(Appendix 3.6)
![img](https://lh4.googleusercontent.com/w4MwUbnIVH1-FrOwvtGCBRHfU16M1xlD7CtTPN9WKCOHe8oOYdu_D9xXjVrPuNorwvwegxz45hgJdWZEzV1jrg3MrxvrVFd1Xfb5cGYAp4d5Fk3F45l3Lmmc_NGs3mwro3zU_anG)
(Appendix 3.7)
![img](https://lh4.googleusercontent.com/b30fcHBE6ScTlnGqAr3ML1xSUB5W2cLdPnUr3Q-FZztp5AKwKk164bM6_hlKkjcm2nP6AJcBUcOPYqyPV96qCUnVXE2MCV8Iln1z9xt-2y3ucEcMqGcObcT_4TAgzXrA39CpHBrR)
(Appendix 4.1 Architecture Diagram)
![img](https://lh4.googleusercontent.com/Oetv764aKRwbWmOULkKBTBRsoaQntF-vIh0ncmydPiEBzmPgqTs-_kN90ioDMJO-yovjIb6VkTezncg48XTwo6ezJVyHLGrVMZ32Fxc4RFR9SV8FyfZsjTUTxYj4cmsOsBwiQF2c)
(Appendix 4.2 Use-case Diagram)
![img](https://lh3.googleusercontent.com/-oPGy8z4xar5YUZzzeksFbqpENOhnXV4jHgOyARr5yMq_jqg5L0E9nrDkBx0gPcl58i1pRjnpDpA6uzh1B6B-TgLg4uW7HA7qC4oxjT8kkM8vaso_Tv2U28Vp5zOUu1-TDA8T-bL)
(Appendix 4.3 Class Diagram)
![img](https://lh4.googleusercontent.com/LImEI3LCot5g78TK0CR4Hl03yNtJchWjAMzWMWzxn51DaQn4Qoq2hADX-GPomYANPjxTKdlu6KL3X-O7c5-5fPENDl4-3nreGJlSxPI7zqd9xPkRDGiC19aqVpX8OHupwOiIW0j2)
(Appendix 4.4 Host Event Sequence Diagram)
![img](https://lh6.googleusercontent.com/VAV9z9GjlPyoAvm2V7nQHvPtSK-13jJYseNNona5XYxAoRHWPNP2ce9aS-hJ_ABACiBhi-yb8hIPwdongppOTWyaE7XMHENPayEx9L1e1YZkFo17pBCPvoJ-nva8ffR9EUstUZp7)
(Appendix 4.5 Join Event Sequence Diagram)

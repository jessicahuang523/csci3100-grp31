import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const TestUserData = {
  biography: "Send help 👍\n(or an anonymous question down below)",
  date_joined: "2015-01-21T14:31:01",
  email: "duhweiwei1013@gmail.com",
  website: "https://peing.net/ja/the3dsandwich",
  gender: "male",
  private_account: false,
  name: "善維Wei-Wei",
  profile_pic_url:
    "https://scontent.cdninstagram.com/v/t51.2885-19/s150x150/64441130_443044792919884_6593254079055527936_n.jpg?_nc_ht=scontent.cdninstagram.com&_nc_ohc=Ky67yr2_9nUAX-NDUO3&oh=082b19a53198ae18dd75219d22b481bf&oe=5EC1C8DA",
  username: "the3dsandwich"
};

const UserContextProvider = props => {
  const [userLoggedin, setUserLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(TestUserData);
    setUserLoggedin(true);
  }, []);

  return (
    <UserContext.Provider value={{ userLoggedin, ...userData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

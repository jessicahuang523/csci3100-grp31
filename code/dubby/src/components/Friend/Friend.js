import React, { useContext, useState } from "react";
import { firestore } from "firebase";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FriendContext } from "../../contexts/FriendContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import {
  Jumbotron,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  DropdownToggle,
  InputGroupButtonDropdown,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import UserList from "./UserList";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import {
  acceptFriendRequest,
  removeFriendRequest,
  unfriendFriend,
} from "../../utilityfunctions/Utilities";

const Friend = () => {
  const { theme } = useContext(ThemeContext);
  const { eventTypeData } = useContext(EventTypeContext);
  const {
    sentRequestData,
    receivedRequestData,
    friendListData,
    friendContextLoaded,
  } = useContext(FriendContext);

  // input for searching user
  const [searchUserString, setSearchUserString] = useState();
  // input for searching user by event type, updated from dropdown
  const [searchUserInterest, setSearchUserInterest] = useState();
  // list of user data as search result
  const [searchUserResult, setSearchUserResult] = useState();
  // dropdown state for searching by event type
  const [eventTypeDropdownOpen, setEventTypeDropdownOpen] = useState(false);

  const toggleEventTypeDropdown = () => {
    setEventTypeDropdownOpen(!eventTypeDropdownOpen);
  };

  // fetch data from database in /user_profile
  // given searchUserString and/or searchUserInterest
  // updates searchUserResult
  const handleSearchUseSubmit = (e) => {
    e.preventDefault();
    const fetchResult = async () => {
      let query = firestore().collection("user_profile");
      if (searchUserString) {
        query = query.where("username", "==", searchUserString);
      }
      if (searchUserInterest) {
        query = query.where(
          "interested_sports",
          "array-contains",
          searchUserInterest
        );
      }
      const res = await query.get();
      let tmp = [];
      res.forEach((d) => tmp.push(d.data()));
      setSearchUserResult(tmp);
    };
    if (searchUserInterest || searchUserString) {
      fetchResult();
    }
  };

  // render
  if (!friendContextLoaded || !eventTypeData) {
    return <Loading />;
  } else {
    return (
      <div style={theme.background}>
        <NavBar />
        <Jumbotron style={theme.jumbotron}>
          <h1>Friends</h1>
          <p>We all love friends... right?</p>
          {/* input bar to search for user */}
          <Form onSubmit={handleSearchUseSubmit}>
            <InputGroup size="sm">
              <Input
                placeholder="Search for a user..."
                onChange={(e) => setSearchUserString(e.target.value)}
              />
              <InputGroupButtonDropdown
                addonType="append"
                isOpen={eventTypeDropdownOpen}
                toggle={toggleEventTypeDropdown}
              >
                <DropdownToggle caret color="light">
                  <i className="fas fa-search"></i>
                  search by {searchUserInterest || "interested sports"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setSearchUserInterest(null)}>
                    <i className="fas fa-times"></i>
                    None
                  </DropdownItem>
                  {eventTypeData.map(({ value, display, icon }) => (
                    <DropdownItem
                      key={value}
                      onClick={() => setSearchUserInterest(value)}
                    >
                      <i className={icon}></i>
                      {display}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </InputGroupButtonDropdown>
              <InputGroupAddon addonType="append">
                <Button color="dark" type="submit">
                  <i className="fas fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          <hr />
          {searchUserResult && <UserList users={searchUserResult} />}
        </Jumbotron>

        <div style={theme.mainContainer}>
          {/* display lists of friends, sent requests and received requests */}
          <UserList
            users={friendListData}
            heading="Friends"
            action={unfriendFriend}
            actionIcon="fas fa-trash"
            actionText="Unfriend"
            actionColor="danger"
          />
          <hr />
          <UserList
            users={sentRequestData}
            heading="Sent Requests"
            action={removeFriendRequest}
            actionIcon="fas fa-minus"
            actionText="Unrequest"
            actionColor="warning"
          />
          <hr />
          <UserList
            users={receivedRequestData}
            heading="Received Requests"
            action={acceptFriendRequest}
            actionIcon="fas fa-user-friends"
            actionText="Accept"
            actionColor="primary"
          />
        </div>
      </div>
    );
  }
};

export default Friend;

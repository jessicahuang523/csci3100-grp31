import React, {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
import {firestore} from "firebase";
import {UserContext} from "../../contexts/UserContext";
import {FriendContext} from "../../contexts/FriendContext";
import {EventTypeContext} from "../../contexts/EventTypeContext";
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
  DropdownItem
} from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import {acceptFriendRequest, removeFriendRequest, unfriendFriend} from "../../utilityfunctions/Utilities";
import UserList from "./UserList";

const Friend = () => {
  const {userData, userLoading} = useContext(UserContext);
  const {sentRequestData, receivedRequestData, friendListData, friendContextLoaded} = useContext(FriendContext);
  const {eventTypeData} = useContext(EventTypeContext);

  const [searchUserString, setSearchUserString] = useState();
  const [searchUserInterest, setSearchUserInterest] = useState();
  const [searchUserResult, setSearchUserResult] = useState();
  const [eventTypeDropdownOpen, setEventTypeDropdownOpen] = useState(false);

  const handleToggleEventTypeDropdown = () => {
    setEventTypeDropdownOpen(!eventTypeDropdownOpen);
  };

  const handleSearchUseSubmit = (e) => {
    e.preventDefault();
    const fetchResult = async () => {
      let query = firestore().collection("user_profile");
      if (searchUserString) {
        query = query.where("username", "==", searchUserString);
      }
      if (searchUserInterest) {
        query = query.where("interested_sports", "array-contains", searchUserInterest);
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

  const backgroundStyle = {
    background: "#F0C27B"
  };

  const jumbotronStyle = {
    background: "#F0C27B",
    textAlign: "center"
  };

  if (userLoading) {
    return <Loading/>;
  } else if (!userData) {
    return <Redirect to="/launch"/>;
  } else if (!friendContextLoaded || !eventTypeData) {
    return <Loading/>;
  } else {
    return (<div style={backgroundStyle}>
      <NavBar/>
      <Jumbotron style={jumbotronStyle}>
        <div style={{
            textAlign: "center"
          }}>
          <h1>Friends</h1>
          <Form onSubmit={handleSearchUseSubmit}>
            <InputGroup>
              <Input placeholder="search for a user..." onChange={(e) => setSearchUserString(e.target.value)}/>
              <InputGroupButtonDropdown addonType="append" isOpen={eventTypeDropdownOpen} toggle={handleToggleEventTypeDropdown}>
                <DropdownToggle caret="caret">
                  <i className="fas fa-search"></i>
                  Search by {searchUserInterest || "interested sports"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setSearchUserInterest(null)}>
                    <i className="fas fa-times"></i>
                    None
                  </DropdownItem>
                  {
                    eventTypeData.map(({value, display, icon}) => (<DropdownItem key={value} onClick={() => setSearchUserInterest(display)}>
                      <i className={icon}></i>
                      {display}
                    </DropdownItem>))
                  }
                </DropdownMenu>
              </InputGroupButtonDropdown>
              <InputGroupAddon addonType="append">
                <Button color="primary" type="submit">
                  <i className="fas fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          <hr/> {searchUserResult && <UserList users={searchUserResult}/>}
        </div>
      </Jumbotron>
      <div style={{
          padding: "1rem"
        }}>
        <UserList users={friendListData} heading="Friends" action={unfriendFriend} actionIcon="fas fa-trash" actionText="Unfriend" actionColor="danger"/>
        <hr/>
        <UserList users={sentRequestData} heading="Sent Requests" action={removeFriendRequest} actionIcon="fas fa-minus" actionText="Unrequest" actionColor="warning"/>
        <hr/>
        <UserList users={receivedRequestData} heading="Received Requests" action={acceptFriendRequest} actionIcon="fas fa-user-friends" actionText="Accept" actionColor="primary"/>
      </div>
    </div>);
  }
};

export default Friend;

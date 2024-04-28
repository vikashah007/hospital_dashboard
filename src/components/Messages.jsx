import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-management-backend-dut4.onrender.com/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {messages && messages.length > 0
          ? messages.map((element,id) => {
              return (
                <div className="card" key={id}>
                  <div className="details">
                  <p>First Name : {element.firstname} </p>
                  <p>Last Name : {element.lastname} </p>
                  <p>Email : {element.email} </p>
                  <p>Phone : {element.phone} </p>
                  <p>Messages : {element.message} </p>
                  </div>
                </div>
              );
            })
          : "<h1>NO MESSAGES FOUND</h1>"}
      </div>
    </section>
  );
};

export default Messages;

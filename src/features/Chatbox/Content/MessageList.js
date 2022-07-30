import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import { db } from "../../../firebase/firebase";
import { useRoom } from "../../../context/RoomContext";
import { useAuth } from "../../../context/AuthContext";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import MessageInput from "./MessageInput";

const MessageList = () => {
  const { user } = useAuth();
  const { activeRoom } = useRoom();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (messages) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);

  useEffect(() => {
    if (activeRoom === null) {
      return;
    }
    const q = query(
      collection(db, "groups", activeRoom.uid, "messages"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs
        .map((doc) => {
          return doc.data();
        })
        .reverse();
      setMessages(messages);
    });
    return unsubscribe;
  }, [activeRoom]);

  return (
    <>
      <div className="main-body">
        {messages &&
          messages.map((message, index) => (
            <Message data={message} user={user} key={index} />
          ))}
        <div className="scroll-bottom" ref={scrollRef}></div>
      </div>
      <MessageInput />
    </>
  );
};

export default MessageList;

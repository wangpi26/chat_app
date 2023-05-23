import React, { useEffect, useState } from "react";
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
} from "@ionic/react";
import { insertMessage, getMessagesBySessionId } from "../database/messageDb";
import { Message } from "../database/interfaces";
import MessageItem from "./MessageItem";

const Chat: React.FC = () => {
	const [inputValue, setInputValue] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const sessionId = 1; // Replace this with the session ID you want to use
			const sessionMessages = await getMessagesBySessionId(sessionId);
			setMessages(sessionMessages);
		};

		fetchData();
	}, []);

	const handleSendMessage = async () => {
		const newMessage: Message = {
			id: 0,
			content: inputValue,
			role: "user",
			sessionId: 1, // Replace this with the session ID you want to use
			parentId: 0,
			version: 0,
			nextMessageVersion: 0,
		};

		try {
			await insertMessage(newMessage);
			console.log("Message inserted");
		} catch (error) {
			console.error("Error inserting message:", error);
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Chat</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{/* Add your ListView or IonList component here */}
				<IonList>
					{messages.map((message) => (
						<MessageItem
							key={message.id}
							messageId={`${message.id}`}
							messageText={message.content}
							role={message.role as "user" | "assistant" | "system"}
						/>
					))}
				</IonList>
				<IonItem>
					<IonLabel position="floating">快来和我一起聊天吧</IonLabel>
					<IonInput
						value={inputValue}
						onIonChange={(e) => setInputValue(e.detail.value!)}></IonInput>
				</IonItem>
				<IonButton expand="block" onClick={handleSendMessage}>
					发送
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Chat;

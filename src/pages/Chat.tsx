import React, { useEffect, useState, useRef } from "react";
import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonList,
	IonItem,
	IonInput,
	IonButton,
	IonFooter,
	IonIcon,
	IonRow,
	IonGrid,
	IonCol,
} from "@ionic/react";
import {
	insertMessage,
	getMessagesBySessionId,
	getNextMessageId,
} from "../database/messageDb";
import { arrowBack, refreshOutline } from "ionicons/icons";
import { Message } from "../database/interfaces";
import MessageItem from "./MessageItem";
import { RouteComponentProps } from "react-router-dom";

interface SessionProps
	extends RouteComponentProps<{
		id: string;
	}> {}

const Chat: React.FC<SessionProps> = ({ match }) => {
	const sessionId = match.params.id;
	const sessionIdNumber = parseInt(sessionId, 10);
	const [inputValue, setInputValue] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const scrollRef = useRef<HTMLIonContentElement>(null);

	useEffect(() => {
		const fetchData = async () => {
			console.log(sessionIdNumber);
			const sessionMessages = await getMessagesBySessionId(sessionIdNumber);
			setMessages(sessionMessages);
			console.log(sessionMessages);
		};

		fetchData();
	}, [sessionIdNumber]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollToBottom();
		}
	}, [messages]);

	const handleSendMessage = async () => {
		if (inputValue.trim() === "") {
			return;
		}
		const newMessage: Message = {
			content: inputValue,
			role: "user",
			sessionId: sessionIdNumber,
			parentId: (await getNextMessageId(sessionIdNumber)) - 1,
			version: 0,
			nextMessageVersion: 0,
		};

		try {
			const id = await insertMessage(newMessage);
			console.log("Message inserted");
			// Add the new message to the messages state
			setMessages((prevMessages) => [...prevMessages, { ...newMessage, id }]);

			// Clear the input field
			setInputValue("");
		} catch (error) {
			console.error("Error inserting message:", error);
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButton fill="clear" slot="start" routerLink="/chatlist">
						<IonIcon icon={arrowBack}></IonIcon>
					</IonButton>
					<IonTitle>Chat</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent ref={scrollRef}>
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
			</IonContent>
			<IonFooter>
				<IonGrid>
					<IonRow>
						<IonCol></IonCol>
						<IonCol></IonCol>
						<IonCol>
							<IonButton fill="clear" onClick={handleSendMessage}>
								<IonIcon icon={refreshOutline}></IonIcon>重新生成
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>

				<IonItem>
					<IonInput
						placeholder="快来和我一起聊天吧"
						value={inputValue}
						onIonChange={(e) => setInputValue(e.detail.value!)}
						onKeyUp={(e) => {
							if (e.key === "Enter") {
								handleSendMessage();
								console.log("Enter key pressed - Bubble phase");
							}
						}}
					/>
				</IonItem>
				<IonButton expand="block" onClick={handleSendMessage}>
					发送
				</IonButton>
			</IonFooter>
		</IonPage>
	);
};

export default Chat;

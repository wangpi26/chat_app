import React from "react";
import { IonItem, IonLabel, IonButton } from "@ionic/react";
import "./MessageItem.css";

interface MessageItemProps {
	messageId: string;
	messageText: string;
	role: "user" | "assistant" | "system";
}

const MessageItem: React.FC<MessageItemProps> = ({
	messageId,
	messageText,
	role,
}) => {
	return (
		<IonItem>
			<IonLabel>
				<h2>{messageText}</h2>
			</IonLabel>
			<IonButton slot="end" onClick={() => console.log("Edit message")}>
				Edit
			</IonButton>
		</IonItem>
	);
};

export default MessageItem;

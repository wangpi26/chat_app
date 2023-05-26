import React from "react";
import { IonItem, IonLabel, IonButton, IonIcon } from "@ionic/react";
import "./MessageItem.css";
import { createOutline } from "ionicons/icons";

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
		<IonItem className={`message-item-${role}`} lines="none" >
			<IonLabel className="message-item-label ion-text-wrap ion-float-left" >
				<h2>{messageText}</h2>
			</IonLabel>
			{role !== "system" && (
				<IonButton fill="clear" slot="end" onClick={() => console.log("Edit message")}>
					<IonIcon icon={createOutline}/>
				</IonButton>
			)}
		</IonItem>
	);
};

export default MessageItem;

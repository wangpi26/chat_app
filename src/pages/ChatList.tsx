import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonItem,
	IonList,
	IonLabel,
	IonButtons,
	IonButton,
	IonIcon,
	IonFooter,
	IonFab,
	IonFabButton,
} from "@ionic/react";
import {settings } from "ionicons/icons";
import "./ChatList.css";
import { createOutline, trashOutline, add } from "ionicons/icons";
import { getAllSessions, insertSession } from "../database/sessionDb";
import { Session } from "../database/interfaces";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const ChatList: React.FC = () => {
	const [chats, setChats] = useState<Session[]>([]);
	const history = useHistory();

	useEffect(() => {
		const fetchData = async () => {
			const sessions = await getAllSessions();
			setChats(sessions);
		};

		fetchData();
	}, []);

	const handleCreateNewChat = async () => {
		console.log("创建新的聊天"); // Chinese log: 创建新的聊天

		const newSession: Session = {
			model: "GPT-3",
			title: "新聊天", // You may want to replace this with a dynamic title
		};

		try {
			const sessionId = await insertSession(newSession);
			console.log("成功创建新的聊天，ID:", sessionId); // Chinese log: 成功创建新的聊天，ID:

			// Update the chat list with the new chat
			setChats((prevChats) => [...prevChats, { ...newSession, id: sessionId }]);
			history.push(`/chat/${sessionId}`);
		} catch (error) {
			console.error("创建新聊天时出错:", error); // Chinese log: 创建新聊天时出错:
		}
	};

	const handleChatItemClick = (chatId: number) => {
		// 导航到聊天详情页面
		history.push(`/chat/${chatId}`);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Chat tools</IonTitle>
					<IonButtons slot="primary">
						<IonButton>
							<IonIcon slot="start" icon={settings}></IonIcon>
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList>
					{chats.map((chat) => (
						<IonItem
							key={chat.id}
							onClick={() => handleChatItemClick(chat.id!)}
							button detail>
							<IonLabel>{chat.title}</IonLabel>
							<IonButtons slot="end">
								<IonButton color="primary" fill="clear">
									<IonIcon icon={createOutline} />
								</IonButton>
								<IonButton color="danger" fill="clear">
									<IonIcon icon={trashOutline} />
								</IonButton>
							</IonButtons>
						</IonItem>
					))}
				</IonList>
			</IonContent>
			<IonFab slot="fixed" vertical="bottom" horizontal="end">
				<IonFabButton
					color="primary"
					onClick={handleCreateNewChat}
					className="ion-margin">
					<IonIcon icon={add}></IonIcon>
				</IonFabButton>
			</IonFab>
		</IonPage>
	);
};

export default ChatList;

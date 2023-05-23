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
} from "@ionic/react";
import { settings } from "ionicons/icons";
import "./ChatList.css";
import { createOutline, trashOutline } from "ionicons/icons";
import { getAllSessions ,insertSession } from "../database/sessionDb";
import { Session } from "../database/interfaces";
import { useEffect, useState } from "react";

const ChatList: React.FC = () => {
	const [chats, setChats] = useState<Session[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const sessions = await getAllSessions();
			setChats(sessions);
		};

		fetchData();
	}, []);
	
	const handleCreateNewChat = async () => {
    console.log('创建新的聊天'); // Chinese log: 创建新的聊天

    const newSession: Session = {
      id: 0,
      model: 'GPT-3',
      title: '新聊天', // You may want to replace this with a dynamic title
    };

    try {
      const sessionId = await insertSession(newSession);
      console.log('成功创建新的聊天，ID:', sessionId); // Chinese log: 成功创建新的聊天，ID:

      // Update the chat list with the new chat
      setChats((prevChats) => [...prevChats, { ...newSession, id: sessionId }]);
    } catch (error) {
      console.error('创建新聊天时出错:', error); // Chinese log: 创建新聊天时出错:
    }
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
					{chats.length}
					{chats.map((chat) => (
						<IonItem key={chat.id}>
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
			<IonFooter>
				<IonButton
					expand="full"
					color="primary"
					onClick={handleCreateNewChat}
					className="ion-margin">
					Create New Chat
				</IonButton>
			</IonFooter>
		</IonPage>
	);
};

export default ChatList;

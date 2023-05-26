import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { construct, chatbox } from "ionicons/icons";
import ChatList from "./pages/ChatList";
import Prompt from "./pages/Prompt";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Chat from "./pages/Chat";

setupIonicReact();

const App: React.FC = () => {
	
	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/chatlist">
							<ChatList />
						</Route>
						<Route exact path="/prompt">
							<Prompt />
						</Route>
						<Route exact path="/">
							<Redirect to="/chatlist" />
						</Route>
						<Route path="/chat/:id" component={Chat}></Route>
					</IonRouterOutlet>
					<IonTabBar slot="bottom">
						<IonTabButton tab="聊天记录" href="/chatlist">
							<IonIcon aria-hidden="true" icon={chatbox} />
							<IonLabel>聊天记录</IonLabel>
						</IonTabButton>
						<IonTabButton tab="prompt" href="/prompt">
							<IonIcon aria-hidden="true" icon={construct} />
							<IonLabel>提示语</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;

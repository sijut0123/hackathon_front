import './oscommand.css';
import PersistentDrawerLeft from "./PersistentDrawerLeft";
import { Sidemenu } from "./sidemenu";
import PersistentDrawerMainContent from "./persistentDrawerMainContent";

function Github() {
  return (
    <div className="App">
      <PersistentDrawerLeft
        sidemenu={<Sidemenu/>}
        mainContent={<PersistentDrawerMainContent/>}
      />
    </div>
    );
  }

  export default Github;

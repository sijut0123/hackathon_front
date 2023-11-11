import './contents.css';
import PersistentDrawerLeft from "../PersistentDrawerLeft";
import { Sidemenu } from "../sidemenu";
import PersistentDrawerMainContent from "../persistentDrawerMainContent";

function Typescript() {
  return (
    <div className="App">
      <PersistentDrawerLeft
        sidemenu={<Sidemenu/>}
        mainContent={<PersistentDrawerMainContent/>}
      />
    </div>
    );
  }

  export default Typescript;

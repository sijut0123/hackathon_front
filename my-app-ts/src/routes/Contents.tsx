import PersistentDrawerLeft from "./sidecontents/PersistentDrawerLeft";
import { Sidemenu } from "./sidecontents/sidemenu";
import MainContents from "./MainContents";

function Contents() {
    return (
        <div>
            <PersistentDrawerLeft
                sidemenu={<Sidemenu/>}
                mainContent={<MainContents/>}
            />
        </div>
    );
  };
  
export default Contents;
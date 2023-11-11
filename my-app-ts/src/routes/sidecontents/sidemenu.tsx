// 関連するコンポーネントのみimportのコードをデモコードからコピーしてくる
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";

// function名をSidemenuとする
export function Sidemenu() {
  return (
    // 複数のエレメントを返すのでReact.Flagment（<></>）で囲む
    <>
      {/* 下記はデモコードのリスト部分 */}
      <List>
        {['home'].map((text, index) => (
            <Link to={"/" + text}>
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            </Link>
        ))}
      </List>
      <Divider />
      <List>
      {[
        'OSコマンド(とシェル)', 
        'Git', 'Github', 
        'HTML & CSS', 
        'JavaScript', 
        'React', 
        'React x Typescript', 
        'SQL',
        'Docker',
        'Go',
        'HTTP Server(Go)',
        'RDBMS(MySQL)への接続(Go)',
        'Unit Test(Go)',
        'フロントエンドとバックエンドの接続',
        'CI(Continous Integration)',
        'CD(Continuous Delivery/Deployment)',
        '認証'
        ].map((text, index) => (
            <Link to={"/" + text}>
            <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            </Link>
        ))}
        </List>
    </>
  );
}

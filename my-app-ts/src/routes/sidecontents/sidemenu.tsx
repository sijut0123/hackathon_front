// 関連するコンポーネントのみimportのコードをデモコードからコピーしてくる
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";

// function名をSidemenuとする
export function Sidemenu() {
  return (
    // 複数のエレメントを返すのでReact.Flagment（<></>）で囲む
    <>
      {/* 下記はデモコードのリスト部分 */}
      <List>
        {['home'].map((text) => (
            <Link to={"/" + text}>
            <ListItem button key={text}>
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
        '認証',
        'その他'
        ].map((text) => (
            <Link to={"/" + text}>
            <ListItem button key={text}>
                <ListItemText primary={text} />
            </ListItem>
            </Link>
        ))}
        </List>
    </>
  );
}

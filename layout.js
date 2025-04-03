import Link from "next/link"
import "./css/wiklim.css"
import SkinLicense from "./skinlicense"
import Default from "@/defaultcomponents/default"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import NavBar from "./navbar"
export default function Skin (props) {
    const [rc, setrc] = useState([])
    const [chevron, setchevron] = useState("down");
    const router = useRouter();
    useEffect(() => {
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
              var dropdowns = document.querySelectorAll(".dropdown-content");
              dropdowns.forEach(function(dropdown) {
                if (dropdown.style.display === "block") {
                  dropdown.style.display = "none";
                }
              });
            }
          }
        async function logic () {
            const rc = await fetch(`${process.env.NEXT_PUBLIC_WIKI_URL}/api/recentchanges/20`)
            const text = await rc.json();
            setrc(text.recentchanges)
        }
        logic()
    }, [])
    
    return (
    <div className="wiklim">
        <script src="/skins/Wiklim/js/wiklim.js" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="on" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
        <NavBar prop={props} />
        <div className="center-aligner">
            <div className="content-box">
                <div className="content">
                    <div className="title-box">
                        <h1>{props.data.action != "watch" && (props.data.action+" - ")}{props.data.title}
                            {props.data.action == "history" && (" ("+props.data.rev+"번째 버전)")}
                        </h1>
                        {props.data.actiontype == "document" ? (
                            <div className="content-tool">
                                    {props.data.action != "watch" && (<Link className="content-tool-entry" href={`/w/${encodeURIComponent(props.data.namespace)}:${encodeURIComponent(props.data.title)}`}><i className="fas fa-file" /> 본문</Link>)}
                                    {props.data.action != "edit" && (<Link className="content-tool-entry" href={`/edit/${encodeURIComponent(props.data.namespace)}:${encodeURIComponent(props.data.title)}`}>{props.data.CanDoWithThisDoc.edit == true ? (<i className="fas fa-pen" />):(<i className="fas fa-skull" />)} 편집</Link>)}
                                    {props.data.action != "history" && props.data.action != "historys" &&(<Link className="content-tool-entry" href={`/historys/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}><i className="fas fa-toilet-paper" /> 역사</Link>)}
                                    {props.data.action != "acl" && (<Link className="content-tool-entry" href={`/acl/${encodeURIComponent(props.data.namespace)}/${encodeURIComponent(props.data.title)}`}><i className="fas fa-key" /> ACL</Link>)}
                            </div>
                        ) : (
                            <div className="content-tool" style={{border:"none"}}></div>
                        )}
                    </div>
                    <div className="select" dangerouslySetInnerHTML={{"__html":props.data.bodycontent}} />
                    {props.data.hasdefault == true && (<Default action={props.data.action} />)}
                    {props.data.action == "license" && <SkinLicense />}
                    <div style={{width:"200%",border:"1px solid",borderColor:"#3b3b3b",marginTop:"10px",marginBottom:"10px",marginLeft:"-30px"}} />
                    {Object.entries(props.data.Footers).map(([k, v]) => {
                        return (<div style={{fontSize:"small",marginLeft:"-20px"}} key={k} dangerouslySetInnerHTML={{"__html":v}} />)
                    })}
                </div>
                <div className="right-padding">
                    <div className="userbox">
                        <div className="userbox-info">
                            <div className="userbox-profile"><img src="/skins/Wiklim/img/userbox-user.wow.png" width={"60px"} height={"60px"}/></div>
                                <div className="userbox-liner">
                                    <div className="userbox-job">
                                        {props.data.user.isRegistered == true ? (
                                            props.data.user.permission.includes(`owner`) ? ("서버장") : (
                                                props.data.user.permission.includes(`admin`) ? ("관리자") : ("유저")
                                            )
                                        ) : ("IP")}
                                    </div>
                                    <div className="userbox-username">{props.data.user.name}</div>
                                </div>
                        </div>
                        
                        <div className="userbox-buttons">
                        <button className="userbox-button"><i className="fas fa-moon" /> 다크 테마로</button>
                            {props.data.user.isRegistered == false ? (
                                <>
                                    <Link href={`/login/${encodeURIComponent(window.location.pathname)}`} className="userbox-button"><i className="fas fa-sign-in" /> 로그인</Link>
                                    <Link href={`/register/${encodeURIComponent(window.location.pathname)}`} className="userbox-button"><i className="fas fa-user" /> 회원가입</Link>
                                </>
                            ) : (
                                <>
                                    <Link href={`/preference`} className="userbox-button"><i className="fas fa-gear" /> 환경설정</Link>
                                    <Link href={`/logout/${encodeURIComponent(window.location.pathname)}`} className="userbox-button"><i className="fas fa-door-open" /> 로그아웃</Link> {/*로그 you out!*/}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="live">
                        <div className="live-title"><i className="fas fa-sync" /> 최근변경</div>
                        {rc.map((entry) => {
                            return (<Link href={`/w/${encodeURIComponent(entry.namespace)}:${encodeURIComponent(entry.title)}`} key={entry.modifiedtime} className="live-entry">{entry.namespace}:{entry.title}</Link>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
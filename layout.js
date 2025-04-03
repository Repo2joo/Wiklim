import Link from "next/link"
import "./css/wiklim.css"
import SkinLicense from "./skinlicense"
import Default from "@/defaultcomponents/default"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
    function toggleDropdown() {
        var dropdownContent = document.querySelector(".dropdown-content");
        dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
      }
    return (
    <div className="wiklim">
        <script src="/skins/Wiklim/js/wiklim.js" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="on" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
        <nav className="topnav">
            <span className="logo"><Link href={"/"}><img className="logoimg" src="/logo.png" height={"40px"} style={{outline:"1px sloid"}}/></Link></span>
            <Link href={"/recentchanges"} className="naventry"><i className="fas fa-building" /><span className="navbar-noticon"> 최근변경</span></Link>
            <Link href={"/randompages"} className="naventry"><i className="fas fa-random" /><span className="navbar-noticon"> 렌덤페이지</span></Link>
            <div className="naventry dropdown"><i className="fas fa-wrench" /><span className="navbar-noticon"> 도구</span>　<i className="fas fa-caret-down" />
                <div className="dropdown-box" style={{width:"190px"}}>
                    <div className="dropdown-entry"><i className="fas fa-comment" /> 최근 토론</div>
                    <div className="dropdown-entry"><img style={{margin:0, padding:0, display:"inline"}} src="/skins/Wiklim/img/isolation.png" width={16}/> 고립된 페이지</div>
                    <Link href={"/license"}><div className="dropdown-entry"><i className="fas fa-copyright" /> 라이선스</div></Link>
                    {props.data.user.isRegistered == true && (
                        props.data.user.permission.includes("admin") ||props.data.user.permission.includes("owner")) && (
                            <>
                                <div className="dropdown-line" />
                                {(props.data.user.permission.includes(" grant_group ") ||props.data.user.permission.includes("owner")) && (
                                    <div className="dropdown-entry"><i className="fas fa-user" /> 권한 부여 및 회수</div>
                                )}
                                {(props.data.user.permission.includes(" edit_group ") ||props.data.user.permission.includes("owner")) && (
                                    <div className="dropdown-entry"><i className="fas fa-users" /> 그룹 설정</div>
                                )}
                                {(props.data.user.permission.includes("site_notice") ||props.data.user.permission.includes("owner")) && (
                                    <div className="dropdown-entry"><i className="fas fa-bell" /> 사이트 알림 설정</div>
                                )}
                                {(props.data.user.permission.includes("mkns") ||props.data.user.permission.includes("owner")) && (
                                    <Link href={"/mkns"} className="dropdown-entry"><i className="fas fa-folder" /> 이름공간 생성</Link>
                                )}
                            </>
                    )}

                </div>
            </div>
            <div className="navbar-user">
                <button
                style={{backgroundImage:"url('/skins/Wiklim/img/userbox-user.wow.png/')",backgroundSize:"cover"}}
                className="dropbtn" onClick={(e) => {e.preventDefault();toggleDropdown()}}></button>
                <div className="dropdown-content">
                    <Link href={`/w/사용자:${props.data.user.name}`} className="dropdown-content-user">
                        {props.data.user.isRegistered == true ? (
                            props.data.user.permission.includes("owner") ? ("서버장") : ("사용자")
                        ) : ("IP")}
                        <br />
                        <sub>{props.data.user.name}</sub>
                    </Link>
                    <div className="dropdown-content-entry"><i className="fas fa-moon" /> 다크 테마로</div>
                    {props.data.user.isRegistered == false ? (
                        <>
                            <Link href={"/login"}><div className="dropdown-content-entry"><i className="fas fa-sign-in" /> 로그인</div></Link>
                            <Link href={"/register"}><div className="dropdown-content-entry"><i className="fas fa-user" /> 회원가입</div></Link>
                        </>
                    ) : (
                        <>
                            <Link href={"/preference"}><div className="dropdown-content-entry"><i className="fas fa-gear" /> 환경설정</div></Link>
                            <Link href={`/logout/${encodeURIComponent(window.location.pathname)}`}><div className="dropdown-content-entry"><i className="fas fa-door-open" /> 로그아웃</div></Link>
                        </>
                    )}
                </div>
            </div>
            <div className="navbar-right">
                <button className="search-random" onClick={(e) => {
                    e.preventDefault();
                    router.push("/randompage")
                }}><i className="fas fa-random" /></button>
                <div className="search-box">
                    <i className="search-icon fas fa-magnifying-glass" />
                    <input className="search-input" placeholder="wiklim 스킨 검색" />
                    <button className="search-button"><i className="fas fa-arrow-right" /></button>
                    <button className="search-button"><i className="fas fa-magnifying-glass" /></button>
                </div>
            </div>
        </nav>
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
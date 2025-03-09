import Link from "next/link"
import "./css/wiklim.css"
import SkinLicense from "./skinlicense"
export default function Skin (props) {
    return (
    <div className="wiklim">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
        <nav className="topnav">
            <span className="logo"><Link href={"/"}><img className="logoimg" src="/skins/liberty-skin/img/logo.png" height={"40px"} style={{outline:"1px sloid"}}/></Link></span>
            <div className="naventry"><i className="fas fa-building" /><span className="navbar-noticon"> 최근변경</span></div>
            <div className="naventry"><i className="fas fa-random" /><span className="navbar-noticon"> 렌덤페이지</span></div>
            <div className="naventry dropdown"><i className="fas fa-wrench" /><span className="navbar-noticon"> 도구</span> ⋁
                <div className="dropdown-box" style={{width:"190px"}}>
                    <div className="dropdown-entry"><i className="fas fa-comment" /> 최근 토론</div>
                    <div className="dropdown-entry"><img style={{margin:0, padding:0, display:"inline"}} src="/skins/wiklim/img/isolation.png" width={16}/> 고립된 페이지</div>
                    <Link href={"/license"}><div className="dropdown-entry"><i className="fas fa-copyright" /> 라이선스</div></Link>
                    {(props.data.user.perms.includes(" admin ") ||props.data.user.perms.includes(" owner ")) && (
                        <>
                            <div className="dropdown-line" />
                            {(props.data.user.perms.includes(" grant_group ") ||props.data.user.perms.includes(" owner ")) && (
                                <div className="dropdown-entry"><i className="fas fa-user" /> 권한 부여 및 회수</div>
                            )}
                            {(props.data.user.perms.includes(" edit_group ") ||props.data.user.perms.includes(" owner ")) && (
                                <div className="dropdown-entry"><i className="fas fa-users" /> 그룹 설정</div>
                            )}
                            {(props.data.user.perms.includes(" site_notice ") ||props.data.user.perms.includes(" owner ")) && (
                                <div className="dropdown-entry"><i className="fas fa-bell" /> 사이트 알림 설정</div>
                            )}
                        </>
                    )}

                </div>
            </div>
            <div className="navbar-right">
                <button className="search-random"><i className="fas fa-random" /></button>
                <div className="search-box">
                    <i className="search-icon fas fa-magnifying-glass" />
                    <input className="search-input" placeholder="wiklim 스킨 검색" />
                    <button className="search-button"><i className="fas fa-arrow-right" /></button>
                    <button className="search-button"><i className="fas fa-magnifying-glass" /></button>
                </div>
            </div>
        </nav>
        <div className="content-box">
            <div className="content">
                <div className="title-box">
                    <h1>{props.data.title}</h1>
                </div>
                <div dangerouslySetInnerHTML={{"__html":props.data.bodycontent}} />
                {props.data.action == "license" && <SkinLicense />}
            </div>
            <div className="right-padding">
                <div className="live">
                    <div className="live-title"><i className="fas fa-sync" /> 최근변경</div>
                    <div className="dropdown-line" />
                    <div className="live-entry">와우</div>
                </div>
            </div>
        </div>
    </div>
    )
}
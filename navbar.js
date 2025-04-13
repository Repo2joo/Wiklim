import Link from "next/link";
import { useEffect } from "react";

export default function NavBar(prop) {
    let props = prop.prop
    useEffect(() => {window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.querySelectorAll(".dropdown-content");
          dropdowns.forEach(function(dropdown) {
            if (dropdown.style.display === "block") {
              dropdown.style.display = "none";
            }
          });
        }
      }}, [])
    function toggleDropdown() {
        var dropdownContent = document.querySelector(".dropdown-content");
        dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
      }
    return (
    <nav className="topnav">
            <span className="logo"><Link href={"/"}><img className="logoimg" src="/logo.png" height={"40px"} style={{outline:"1px sloid"}}/></Link></span>
            <Link href={"/recentchanges"} className="naventry"><i className="fas fa-building" /><span className="navbar-noticon"> 최근변경</span></Link>
            <Link href={"/randompages"} className="naventry"><i className="fas fa-random" /><span className="navbar-noticon"> 렌덤페이지</span></Link>
            <div className="naventry dropdown"><i className="fas fa-wrench" /><span className="navbar-noticon"> 도구</span>　<i className="fas fa-caret-down" />
                <div className="dropdown-box" style={{width:"190px"}}>
                    <div className="dropdown-entry"><i className="fas fa-comment" /> 최근 토론</div>
                    <div className="dropdown-entry"><img style={{margin:0, padding:0, display:"inline"}} src="/skins/Wiklim/img/isolation.png" width={16}/> 고립된 페이지</div>
                    <Link href={"/namespaces"}><div className="dropdown-entry"><i className="fas fa-folder" /> 이름공간 목록</div></Link>
                    <Link href={"/upload"}><div className="dropdown-entry"><i className="fas fa-upload" /> 업로드</div></Link>
                    <Link href={"/log"}><div className="dropdown-entry"><i className="fas fa-scroll" /> 로그</div></Link>
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
    );
}
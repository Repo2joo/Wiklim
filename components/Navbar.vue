<script setup>
const rt = useRouter();
</script>
<template>
    <nav className="topnav">
        <div class="centernav">
        <span className="logo"><NuxtLink to="/"><img className="logoimg" src="../img/isolation.png" height="40px" style="outline:1px sloid"/></NuxtLink></span>
            <NuxtLink to="/RecentChanges" className="naventry"><i className="fas fa-building" /><span className="navbar-noticon"> 최근변경</span></NuxtLink>
            <NuxtLink to="/Random" className="naventry"><i className="fas fa-random" /><span className="navbar-noticon"> 렌덤페이지</span></NuxtLink>
            <div className="naventry">
            <DropDown>
                <template #button>
                    <div style="display: unset; height: 40px; display: inline-block; width: 100%;"><i className="fas fa-wrench" /><span className="navbar-noticon"> 도구</span>　<i className="fas fa-caret-down" /></div>
                </template>
                <div className="dropdown-box">
                    <div className="dropdown-entry"><i className="fas fa-comment" /> 최근 토론</div>
                    <div className="dropdown-entry"><img style="margin:0; padding:0; display:inline" src="/skins/Wiklim/img/isolation.png" width="16"/> 고립된 페이지</div>
                    <NuxtLink to="/namespaces"><div className="dropdown-entry"><i className="fas fa-folder" /> 이름공간 목록</div></NuxtLink>
                    <NuxtLink to="/RandomPage"><div className="dropdown-entry"><i className="fas fa-question" /> 렌덤</div></NuxtLink>
                    <NuxtLink to="/upload"><div className="dropdown-entry"><i className="fas fa-upload" /> 업로드</div></NuxtLink>
                    <NuxtLink to="/log"><div className="dropdown-entry"><i className="fas fa-scroll" /> 로그</div></NuxtLink>
                    <NuxtLink to="/license"><div className="dropdown-entry"><i className="fas fa-copyright" /> 라이선스</div></NuxtLink>
                    <template v-if="$store.state.session.menus.length != 0">
                        <div className="dropdown-line" />
                        <NuxtLink v-for="item in $store.state.session.menus" :key="item.l" :to="item.l" className="dropdown-entry">{{ item.t }}</NuxtLink> 
                    </template>
                </div>
            </DropDown>
            </div>
            <div className="navbar-user">
                <button
                style="background-image:url('/skins/Wiklim/img/userbox-user.wow.png/'); background-size:cover"
                className="dropbtn"></button>
            </div>
                <div className="navbar-right">
                    <button className="search-random" @click.prevent="rt.push('/Random')"><i className="fas fa-random" /></button>
                        <div className="search-box">
                            <i className="search-icon fas fa-arrow-right" />
                            <input className="search-input" placeholder="wiklim 스킨 검색" />
                            <button className="search-button"><i className="fas fa-arrow-right" /></button>
                            <button className="search-button"><i className="fas fa-arrow-right" /></button>
                            <div v-if="false" className="search-result-box">
                                <div className="search-result-entry" key={e.id}>안녕</div>
                            </div>
                            <template v-show="false">
                                
                            </template>
                        </div>
                </div>
                </div>
        </nav>
</template>
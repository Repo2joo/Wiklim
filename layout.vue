<script setup>
    import { useRecent } from "~/composables/caki/recent";
    import SkinLicense from "./components/SkinLicense.vue";
    import Navbar from "./components/Navbar.vue";
    let {recententry} = useRecent();
    const rt = useRoute();
    const storee = useStateStore();
    let contenttoolstyle = ref(null);
    if (storee.$state.page.isDocument) {
            contenttoolstyle.value = "user-select: none; position: relative; margin-left: auto;    margin-top: 20px;    border: 1px solid;    border-radius: 10px;    border-color: #3b3b3b;    display: flex;    height: 30px;    overflow: hidden;"
        } else {
            contenttoolstyle.value = "user-select: none; position: relative; margin-left: auto;    margin-top: 20px;    border: none;    border-radius: 10px;    border-color: #3b3b3b;    display: flex;    height: 30px;    overflow: hidden;"
        }
    watch(() => rt.fullPath, (_) => {
        if (storee.$state.page.isDocument) {
            contenttoolstyle.value = "user-select: none; position: relative; margin-left: auto;    margin-top: 20px;    border: 1px solid;    border-radius: 10px;    border-color: #3b3b3b;    display: flex;    height: 30px;    overflow: hidden;"
        } else {
            contenttoolstyle.value = "user-select: none; position: relative; margin-left: auto;    margin-top: 20px;    border: none;    border-radius: 10px;    border-color: #3b3b3b;    display: flex;    height: 30px;    overflow: hidden;"
        }
    })
    onMounted(() => {
        color()
    })
    function color() {
        if (storee.$state.localConfig.gcurrentTheme == "light") {
            document.documentElement.style.setProperty("--wiklim-main-color", "#E5E5E5")
            document.documentElement.style.setProperty("--wiklim-main-color2", "#E7E7E7")
            document.documentElement.style.setProperty("--wiklim-main-color3", "#EFEFEF")
            document.documentElement.style.setProperty("--wiklim-off-color", "black")
            document.documentElement.style.setProperty("--wiklim-brand-color", "#248790")
            document.documentElement.style.setProperty("--wiklim-link-color", "#749700")
            document.documentElement.style.setProperty("--wiklim-link-color2", "#80F000")
            document.documentElement.style.setProperty("--wiklim-nav-color", "aliceblue")
        }
    }
    function changetneme() {
        if (storee.$state.localConfig.currentTneme == "light") {
        } else if (storee.$state.localConfig.currentTneme == "dark") {
            storee.$state.localConfig.currentTneme = "light"
        } else {
            storee.$state.localConfig.currentTneme = "light"
        }
        color()
    }
</script>
<style>
@import "./css/wiklim.css";
@import "../liberty/css/font-awesome.min.css";
@import "./css/pallet.css";
</style>
<template>
    <div class="wiklim">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="on" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
        <Navbar />
        <div class="center-aligner">
            <div class="content-box">
                <div class="content">
                    <div class="title-box">
                        <h1>여기에 제목 입력</h1>
                            <div :style="contenttoolstyle">
                                <template v-if="$store.state.page.isDocument">
                                    <NuxtLink class="content-tool-entry" href="/여기에 경로 입력"><i class="fas fa-file" /> 여기에</NuxtLink>
                                    <NuxtLink class="content-tool-entry" href="/여기에 경로 입력"><i class="fas fa-file" /> 여기에</NuxtLink>
                                    <NuxtLink class="content-tool-entry" href="/여기에 경로 입력"><i class="fas fa-file" /> 여기에</NuxtLink>
                                    <NuxtLink class="content-tool-entry" href="/여기에 경로 입력"><i class="fas fa-file" /> 여기에</NuxtLink>
                                    <NuxtLink class="content-tool-entry" href="/여기에 경로 입력"><i class="fas fa-file" /> 여기에</NuxtLink>
                                </template>
                            </div>
                    </div>
                    <NuxtPage />
                    <SkinLicense v-if="$store.state.page.viewName=='license'" />
                    <div style="width:100%;border:1px solid; border-color:#3b3b3b; margin-top:10px; margin-bottom:10px;"></div>
                    <div v-html="$store.state.config['wiki.copyright_text']" style="font-size:small; margin-left:-20px;" />
                    <div v-html="$store.state.config['wiki.footer_text']" style="font-size:small; margin-left:-20px;" />
                    <div style="font-size:small;">
                        Wiklim on Caki
                    </div>
                </div>
                <div class="right-padding">
                    <div class="userbox">
                        <div class="userbox-info">
                            <div class="userbox-profile"><img src="/skins/Wiklim/img/userbox-user.wow.png" width="60px" height="60px"/></div>
                                <div class="userbox-liner">
                                    <div class="userbox-job">
                                        Member
                                    </div>
                                    <div class="userbox-username">{{ $store.state.session.account.name }}</div>
                                </div>
                        </div>
                        
                        <div class="userbox-buttons">
                        <button v-if="$store.state.currentTheme == 'light'" class="userbox-button" @click="changetneme"><i class="fas fa-moon" /> 다크 테마로</button>
                        <button @click="changetneme" v-else class="userbox-button"><i class="fas fa-lightbulb" /> 라이트 테마로</button>
                                <template v-if="$store.state.session.account.type !== '1'">
                                    
                                    <NuxtLink :to="{ path: '/member/login', query: { redirect: $route.fullPath } }" class="userbox-button"><i class="fas fa-sign-in" /> 로그인</NuxtLink>
                                    <NuxtLink :to="{ path: '/member/register', query: { redirect: $route.fullPath } }" class="userbox-button"><i class="fas fa-user" /> 회원가입</NuxtLink>
                                </template>
                                <template v-else>
                                    <NuxtLink to="고려할 필요" class="userbox-button"><i class="fas fa-gear" /> 환경설정</NuxtLink>
                                    <NuxtLink :to="{ path: '/member/register', query: { redirect: $route.fullPath } }" class="userbox-button"><i class="fas fa-door-open" /> 로그아웃</NuxtLink>
                                </template>
                        </div>
                    </div>
                    <div class="live">
                        <div class="live-title"><i class="fas fa-sync" /> 최근변경</div>
                        <NuxtLink v-for="(item, index) in recententry" :to="item.time" :key="index" class="live-entry">{{ item.fullname }}</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
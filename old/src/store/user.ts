import { defineStore } from 'pinia'
import { ref } from 'vue'
import cookies, { getUid } from '@/util/cookie'
import { UserSignOutRequst } from '@/api/public'
import { GetMyInfoRequest, UpdateMyCurrentTeam } from '@/api/my'
import { UserInfo } from '@/type/types'

export const useUserStore = defineStore('user', () => {
    const uid = ref("")
    const info = ref<UserInfo>()

    function isLogin() {
        uid.value = getUid()
        return uid.value != ""
    }
    function hasInfo() {
        return info.value?.id !== undefined && info.value?.id !== ""
    }
    async function signOut() {
        uid.value = ""
        info.value = {}
        cookies.removeAll()
        await UserSignOutRequst()
    }

    function getUserInfo() {
        GetMyInfoRequest().then(resp => {
            info.value = { ...resp.data }
        })
    }

    async function saveLoginData(data: any) {
        uid.value = data['uid']
    }

    async function removeLoginData() {
        uid.value = ""
    }

    function changeTeam(team_id: string) {
        UpdateMyCurrentTeam(team_id).then(resp => {
            if (resp.code === 0) {
                location.href = '/'
            }
        })
    }

    return {
        uid: uid,
        info: info,
        getUserInfo,
        saveLoginData,
        removeLoginData,
        hasInfo,
        isLogin,
        signOut,
        changeTeam,
    }
})

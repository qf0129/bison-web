<template>
    <div class="teamSelect">
        <t-button class="current" variant="text">
            {{ userStore.info?.current_team?.name }}
            <SwapIcon size="10px" />
        </t-button>
        <div class="card">
            <div class="optionLabel">MyTeams</div>
            <div class="options">
                <div class="option" v-for="team in userStore.info?.teams" @click="changeTeam(team.id)">{{ team.name }}</div>
            </div>
            <div class="option optionBtn" @click="createTeam">CreateTeam</div>
        </div>
        <createTeamDialog ref="teamDialog" />
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user'
import createTeamDialog from './create-team-dialog.vue';
import { SwapIcon } from 'tdesign-icons-vue-next';
import { ref } from 'vue';

const userStore = useUserStore()
const changeTeam = (teamId: string) => {
    userStore.changeTeam(teamId)
}

const teamDialog = ref()
const createTeam = () => {
    teamDialog.value.show()
}

</script>

<style lang="less">
.teamSelect {
    position: relative;

    .current {
        color: var(--td-text-color-placeholder);

        .t-button__text {
            align-items: center;

            svg {
                margin-left: 6px;
            }
        }
    }

    &:hover {
        .card {
            display: block;
        }
    }

    .card {
        display: none;
        position: absolute;
        left: 0;
        background-color: var(--td-bg-color-container);
        padding: 10px;
        box-shadow: 0 2px 8px #00000022;
        transition: all 0.25s;
        min-width: 200px;
        border-radius: 4px;
        font-size: 14px;

        .options {
            padding: 5px 0;
            margin-bottom: 5px;
            border-bottom: 1px solid var(--td-component-stroke);
        }

        .optionLabel {
            padding: 5px 0;
            color: var(--td-text-color-disabled);
            user-select: none;
        }

        .option {
            padding: 5px 10px;
            cursor: pointer;
            transition: all 0.25s;
            font-size: 1rem;
            font-size: 14px;
            border-radius: 2px;

            &:hover {
                background-color: var(--td-bg-color-container-hover);
            }
        }

        .optionBtn {
            color: var(--td-text-color-brand);
        }
    }
}
</style>
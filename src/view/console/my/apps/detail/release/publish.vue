<template>
  <div>
    <t-button @click="show" theme="primary">
      <template v-if="releaseId">Update</template>
      <template v-else>PublishApp</template>
    </t-button>
    <t-dialog v-model:visible="visible" header="Publish App" width="60%" style="max-height: 500px" :on-close="onClose" :on-confirm="submitForm">
      <!-- <t-drawer v-model:visible="visible" header="Publish App" size="large" confirmBtn="Submit" @confirm="submitForm" @close="onClose" :destroyOnClose="true"> -->
      <t-form v-if="formData" ref="form" :data="formData" labelWidth="150px">
        <t-form-item name="EnvId" label="Env">
          <my-env-selector v-model="formData.env_id" style="width: 50%" />
        </t-form-item>
        <t-form-item name="ImageId" label="Image">
          <my-image-selector v-if="appId || release?.app_id" v-model="formData.image_id" :appId="appId || release?.app_id || ''" style="width: 50%" />
        </t-form-item>
        <t-form-item name="DomainId" label="DomainSuffix">
          <my-domain-selector v-model="formData.domain_id" :envId="formData.env_id" style="width: 50%" />
        </t-form-item>
        <t-form-item name="ReplicaCount" label="ReplicaCount">
          <t-input-number v-model="formData.replica_count" min="1" style="width: 50%" />
        </t-form-item>
        <t-form-item name="ConfigMode" label="ConfigMode">
          <t-space>
            <t-radio-group v-model="formData.config_mode">
              <t-radio-button value="" label="None" />
              <t-radio-button value="env" label="Env" />
              <t-radio-button value="json" label="JSON" />
            </t-radio-group>
            <t-input v-if="formData.config_mode === 'json'" v-model="formData.config_path" />
          </t-space>
        </t-form-item>
      </t-form>
      <m-collapse-panel title="More">
        <t-form v-if="formData?.container" ref="form" :data="formData" labelWidth="150px">
          <t-form-item name="command" label="Command">
            <t-tag-input v-model="formData.container.command" clearable />
          </t-form-item>
          <t-form-item name="args" label="Args">
            <t-tag-input v-model="formData.container.args" clearable />
          </t-form-item>
          <t-form-item name="env" label="Env">
            <t-space style="width: 100%" direction="vertical" align="start" size="2px">
              <div v-for="(item, i) in formData.container.env">
                <t-input-group style="width: 100%">
                  <t-input v-model="item.name" placeholder="Key" style="width: 40%" />
                  <t-input v-model="item.value" placeholder="Value" />
                  <t-button variant="text" shape="square" @click="delEnv(i)">
                    <DeleteIcon color="red" />
                  </t-button>
                </t-input-group>
              </div>
              <t-row>
                <t-button @click="addEnv" theme="default" size="small">
                  <template #icon> <PlusIcon /> </template>Add
                </t-button>
              </t-row>
            </t-space>
          </t-form-item>
          <t-form-item name="port" label="ContainerPort">
            <t-space style="width: 100%" direction="vertical" align="start" size="2px">
              <div v-for="(item, i) in formData.container.ports">
                <t-input-group style="width: 100%">
                  <t-select v-model="item.protocol" style="width: 100px">
                    <t-option key="tcp" value="tcp" label="TCP" />
                    <t-option key="udp" value="udp" label="UDP" />
                  </t-select>
                  <t-input-number v-model="item.containerPort" placeholder="Value" />
                  <t-button variant="text" shape="square" @click="delPort(i)">
                    <DeleteIcon color="red" />
                  </t-button>
                </t-input-group>
              </div>
              <t-row>
                <t-button @click="addPort" theme="default" size="small">
                  <template #icon> <PlusIcon /> </template>Add
                </t-button>
              </t-row>
            </t-space>
          </t-form-item>
          <t-form-item name="servicePort" label="ServicePort">
            <t-space style="width: 100%" direction="vertical" align="start" size="2px">
              <div v-for="(item, i) in formData.service_spec.ports">
                <t-input-group style="width: 100%">
                  <t-select v-model="item.protocol" style="width: 100px">
                    <t-option key="tcp" value="tcp" label="TCP" />
                    <t-option key="udp" value="udp" label="UDP" />
                  </t-select>
                  <t-input-number v-model="item.port" placeholder="Value" theme="normal" :min="1" :max="65535" label="Port" />
                  <t-input-number v-model="item.targetPort" placeholder="Value" theme="normal" :min="1" :max="65535" label="TargetPort" />
                  <t-button variant="text" shape="square" @click="delServicePort(i)">
                    <DeleteIcon color="red" />
                  </t-button>
                </t-input-group>
              </div>
              <t-row>
                <t-button @click="addServicePort" theme="default" size="small">
                  <template #icon> <PlusIcon /> </template>Add
                </t-button>
              </t-row>
            </t-space>
          </t-form-item>
          <t-form-item name="livenessProbe" label="Liveness">
            <t-checkbox @change="toggleLiveness" :defaultChecked="formData?.container?.livenessProbe != null" />
          </t-form-item>
        </t-form>
        <t-form v-if="formData?.container?.livenessProbe" labelWidth="150px" size="small" style="margin-top: 10px; background-color: #f7f7f7; padding: 20px">
          <t-form-item name="httpGetPath" label="Path">
            <t-input v-model="formData.container.livenessProbe.httpGet.path" />
          </t-form-item>
          <t-form-item name="httpGetPort" label="Port">
            <t-input-number v-model="formData.container.livenessProbe.httpGet.port" theme="normal" :min="1" :max="65535" />
          </t-form-item>
          <t-form-item name="initialDelaySeconds" label="initialDelaySeconds">
            <t-input-number v-model="formData.container.livenessProbe.initialDelaySeconds" theme="normal" :min="0" :max="3600" />
          </t-form-item>
          <t-form-item name="timeoutSeconds" label="timeoutSeconds">
            <t-input-number v-model="formData.container.livenessProbe.timeoutSeconds" theme="normal" :min="0" :max="3600" />
          </t-form-item>
          <t-form-item name="periodSeconds" label="periodSeconds">
            <t-input-number v-model="formData.container.livenessProbe.periodSeconds" theme="normal" :min="0" :max="3600" />
          </t-form-item>
          <t-form-item name="failureThreshold" label="failureThreshold">
            <t-input-number v-model="formData.container.livenessProbe.failureThreshold" theme="normal" :min="0" :max="3600" />
          </t-form-item>
        </t-form>
      </m-collapse-panel>
      <!-- <t-row style="margin-top: 50px;text-align: center;">
                <t-button theme="primary" type="submit" @click="submitForm">Submit</t-button>
            </t-row> -->
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ApplyRelease } from "@/api/my";
import { GetMyAppReleases } from "@/api/my";
import { PlusIcon, DeleteIcon } from "tdesign-icons-vue-next";
import { PublishObject, Release } from "@/type/types";

const props = defineProps({
  appId: String || "",
  envId: String || "",
  releaseId: String || "",
});

const visible = ref(false);
const formData = ref<PublishObject>();

const show = () => {
  visible.value = true;
  if (props.releaseId) {
    requestRelease(props.releaseId);
  } else {
    if (formData.value) {
      if (props.envId) {
        formData.value.env_id = props.envId;
      }
    }
  }
};

const release = ref<Release>();
function requestRelease(releaseId: string) {
  GetMyAppReleases(props.appId as string, { id: releaseId }).then((resp) => {
    if (resp.code === 0) {
      release.value = resp.data?.list[0];
      if (formData.value && release.value) {
        formData.value.release_id = release.value.id;
        formData.value.env_id = release.value.env_id;
        formData.value.domain_id = release.value.domain_id;
        formData.value.image_id = release.value.image_id;
        formData.value.replica_count = release.value.replica_count;
        formData.value.config_mode = release.value.config_mode;
        formData.value.config_path = release.value.config_path;
        // formData.value.container = JSON.parse(release.value.container)
        // formData.value.service_spec = JSON.parse(release.value.service_spec)
        var recordContainer = JSON.parse(release.value.container);
        var recordServiceSpec = JSON.parse(release.value.service_spec);
        for (const key in recordContainer) {
          formData.value.container[key as keyof typeof formData.value.container] = recordContainer[key];
        }
        for (const key in recordServiceSpec) {
          formData.value.service_spec[key as keyof typeof formData.value.service_spec] = recordServiceSpec[key];
        }
      }
    }
  });
}

const emits = defineEmits(["onSubmit"]);
const submitForm = () => {
  if (formData.value) {
    ApplyRelease(formData.value).then((resp) => {
      if (resp.code === 0) {
        visible.value = false;
        // MessagePlugin.success("Publish success!")
        emits("onSubmit", resp.data); // releaseId
      }
    });
  }
};

const addEnv = () => {
  if (formData.value) {
    formData.value.container.env.push({ name: "", value: "" });
  }
};

const delEnv = (index: number) => {
  if (formData.value?.container.env.length) {
    formData.value.container.env.splice(index, 1);
    // formData.value.container.env = formData.value.container.env.filter((_, i) => i !== index)
  }
};

const addPort = () => {
  if (formData.value) {
    formData.value.container.ports.push({ protocol: "tcp", containerPort: 8080 });
  }
};

const delPort = (index: number) => {
  if (formData.value?.container.ports.length) {
    formData.value.container.ports = formData.value.container.ports.filter((_, i) => i !== index);
  }
};

const addServicePort = () => {
  if (formData.value) {
    formData.value.service_spec.ports.push({ protocol: "tcp", port: 80, targetPort: 8080 });
  }
};

const delServicePort = (index: number) => {
  if (formData.value?.service_spec.ports.length) {
    formData.value.service_spec.ports = formData.value.service_spec.ports.filter((_, i) => i !== index);
  }
};
const toggleLiveness = (checked: boolean) => {
  if (formData.value?.container) {
    if (checked) {
      formData.value.container.livenessProbe = {
        httpGet: {
          path: "/health",
          port: 80,
        },
        initialDelaySeconds: 5,
        timeoutSeconds: 3,
        periodSeconds: 10,
        failureThreshold: 3,
      };
    } else {
      delete formData.value.container["livenessProbe"];
    }
  }
};

const resetForm = () => {
  formData.value = {
    env_id: "",
    domain_id: "",
    image_id: "",
    replica_count: 1,
    config_mode: "",
    config_path: "/config.json",
    container: {
      command: [],
      args: [],
      env: [],
      ports: [
        {
          name: "http",
          protocol: "TCP",
          containerPort: 8080,
        },
      ],
      volumeMounts: [],
    },
    service_spec: {
      ports: [
        {
          protocol: "TCP",
          port: 80,
          targetPort: 8080,
        },
      ],
    },
  };
};

onMounted(() => {
  resetForm();
});

const onClose = () => {
  resetForm();
};

defineExpose({ show });
</script>

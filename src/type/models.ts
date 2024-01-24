import { Model } from "@/components/m-crud-table/type";

const commonNameRule = [
  { required: true, message: "Required", type: "error", trigger: "blur" },
  { whitespace: true, message: "CanNotEmpty", type: "error" },
  { min: 2, message: "length should be 2-50", type: "error" },
  { max: 50, message: "length should be 2-50", type: "error" },
];

const models: { [key: string]: Model } = {
  app: {
    name: "app",
    title: "App",
    columns: [
      { key: "id", title: "ID", type: "string", show: false, edit: false },
      { key: "name", title: "Name", type: "string" },
      { key: "desc", title: "Desc", type: "string" },
      { key: "git_url", title: "GitUrl", type: "string" },
      {
        key: "git_platform",
        title: "GitPlatform",
        type: "select",
        select: ["github", "gitlab", "other"],
        labels: { github: "Github", gitlab: "Gitlab", other: "Other" },
      },
      { key: "ctime", title: "CreateTime", type: "string", edit: false },
    ],
    rules: {
      name: commonNameRule,
    },
  },
  env: {
    name: "env",
    title: "DeployEnv",
    columns: [
      { key: "id", title: "ID", type: "string", show: false, edit: false },
      { key: "name", title: "Name", type: "string" },
      { key: "title", title: "Title", type: "string" },
      { key: "desc", title: "Desc", type: "string" },
      { key: "kube_config", title: "KubeConfig", type: "text", ellipsis: true },
      { key: "ctime", title: "CreateTime", type: "string", edit: false },
    ],
    rules: {
      name: commonNameRule,
    },
  },
  git_account: {
    name: "git_account",
    title: "GitAcconut",
    columns: [
      { key: "id", title: "ID", type: "string", show: false, edit: false },
      { key: "name", title: "Name", type: "string" },
      { key: "account", title: "Account", type: "string" },
      { key: "token", title: "Token", type: "string" },
      { key: "desc", title: "Desc", type: "string" },
      { key: "ctime", title: "CreateTime", type: "string", edit: false },
    ],
    rules: {
      name: commonNameRule,
    },
  },
  config: {
    name: "config",
    title: "Config",
    columns: [
      { key: "id", title: "ID", type: "string", show: false, edit: false },
      { key: "app_id", title: "AppId", type: "string" },
      { key: "env_id", title: "EnvId", type: "string" },
      { key: "key", title: "Key", type: "string" },
      { key: "value", title: "Value", type: "string" },
      { key: "type", title: "Type", type: "string" },
      { key: "encrypted", title: "Encrypted", type: "string" },
      { key: "desc", title: "Desc", type: "string" },
      { key: "ctime", title: "CreateTime", type: "string", edit: false },
    ],
    rules: {
      name: commonNameRule,
    },
  },
  image: {
    name: "image",
    title: "Image",
    columns: [
      { key: "id", title: "ID", type: "string", show: false, edit: false },
      { key: "app_id", title: "appId", type: "string" },
      { key: "app_name", title: "AppName", type: "string" },
      { key: "repo_name", title: "RepoName", type: "string" },
      { key: "repo_branch", title: "RepoBranch", type: "string" },
      { key: "repo_commit", title: "RepoCommit", type: "string" },
      { key: "name", title: "Name", type: "string" },
      { key: "tag", title: "Tag", type: "string" },
      { key: "digest", title: "Digest", type: "string" },
      { key: "status", title: "Status", type: "string" },
      { key: "err_msg", title: "ErrMsg", type: "string", ellipsis: true },
      { key: "build_time", title: "BuildTime", type: "string" },
      { key: "desc", title: "Desc", type: "string" },
      { key: "ctime", title: "CreateTime", type: "string", edit: false },
    ],
    rules: {
      name: commonNameRule,
    },
  },
  release: {
    name: "release",
    title: "Release",
    columns: [
      { key: "id", title: "ID", type: "string", show: false, edit: false },
      { key: "app_id", title: "AppId", type: "string" },
      { key: "env_id", title: "EnvId", type: "string" },
      { key: "image_id", title: "ImageId", type: "string" },
      { key: "domain_id", title: "DomainId", type: "string" },
      { key: "name", title: "Name", type: "string" },
      { key: "status", title: "Status", type: "string" },
      { key: "err_msg", title: "ErrMsg", type: "string", ellipsis: true },
      { key: "desc", title: "Desc", type: "string" },
      { key: "replica_count", title: "ReplicaCount", type: "number" },
      { key: "config_mode", title: "ConfigMode", type: "string" },
      { key: "config_path", title: "ConfigPath", type: "string" },
      { key: "container", title: "Container", type: "string", ellipsis: true },
      {
        key: "service_spec",
        title: "ServiceSpec",
        type: "string",
        ellipsis: true,
      },
      {
        key: "ctime",
        title: "CreateTime",
        type: "string",
        ellipsis: true,
        edit: false,
      },
    ],
    rules: {
      name: commonNameRule,
    },
  },
  domain: {
    name: "domain",
    title: "Domain",
    columns: [
      { key: "id", title: "ID", type: "string", show: false, edit: false },
      { key: "content", title: "Content", type: "string" },
      { key: "desc", title: "Desc", type: "string" },
      { key: "ctime", title: "CreateTime", type: "string", ellipsis: true, edit: false },
    ],
    rules: {
      content: commonNameRule,
    },
  },
};
export default models;

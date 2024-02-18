export type Team = {
  id: string;
  name: string;
};

export type UserInfo = {
  id?: string;
  email?: string;
  phone?: string;
  username?: string;
  nickname?: string;
  current_team_id?: string;
  current_team?: Team;
  teams?: Array<Team>;
};

export type App = {
  id: string;
  git_account_id: string;
  name: string;
  desc: string;
  git_url: string;
  git_platform: string;
  git_account: any;
  owners: Array<UserInfo>;
  developers: Array<UserInfo>;
};

export type Image = {
  id: string;
  creator_id: string;
  app_id: string;
  app_name: string;
  repo_name: string;
  repo_branch: string;
  repo_commit: string;
  name: string;
  tag: string;
  digest: string;
  desc: string;
  status: string;
  build_time: number;
  ctime: string;
};

export type Config = {
  id?: string;
  ctime?: string;
  utime?: string;
  app_id?: string;
  env_id?: string;
  key?: string;
  value?: string;
  desc?: string;
  type?: string;
  encrypted?: boolean;
  edit_desc?: boolean;
  edit_value?: boolean;
};

export type Env = {
  id?: string;
  name?: string;
  title?: string;
  desc?: string;
  is_prd?: boolean;
  limit_one?: boolean;
  kube_config?: string;
};

export type Domain = {
  id: string;
  content: string;
  desc: string;
};

export type DeploymentStatus = {
  observedGeneration: number;
  replicas: number;
  updatedReplicas: number;
  readyReplicas: number;
  availableReplicas: number;
  unavailableReplicas: number;
  collisionCount: number;
};

export type Release = {
  id: string;
  creator_id: string;
  env_id: string;
  app_id: string;
  image_id: string;
  domain_id: string;
  domain_prefix: string;
  name: string;
  status: string;
  err_msg: string;
  desc: string;
  replica_count: number;
  config_mode: string;
  config_path: string;
  container: string;
  service_spec: string;
  creator: UserInfo;
  app: App;
  image: Image;
  ctime: String;
  domain: Domain;
  env: Env;
  deployment_status: DeploymentStatus;
};

// export type ReleaseRecord = {
//     id: string
//     release_id: string
//     apply_type: string
//     container: string
//     service_spec: string
// }

export type PublishObject = {
  release_id?: string;
  apply_type?: string;
  env_id: string;
  domain_id: string;
  image_id: string;
  domain_prefix: string;
  replica_count: number;
  config_mode: string;
  config_path: string;
  container: {
    command: string[];
    args: string[];
    env: {
      name: string;
      value: string;
    }[];
    ports: {
      name?: string;
      protocol: string;
      containerPort: number;
    }[];
    volumeMounts: {
      name: string;
      mountPath: string;
      readOnly: boolean;
    }[];
    livenessProbe?: {
      httpGet: {
        path: string;
        port: number;
        host?: string;
        scheme?: string;
      };
      initialDelaySeconds: number;
      timeoutSeconds: number;
      periodSeconds: number;
      failureThreshold: number;
      terminationGracePeriodSeconds?: number;
    };
  };
  service_spec: {
    ports: {
      protocol: string;
      port: number;
      targetPort: number;
    }[];
  };
};

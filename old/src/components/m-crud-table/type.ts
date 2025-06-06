export type Column = {
    key: string,
    title?: string, // table column title
    type?: string, // value type
    default?: string, // default value
    show?: boolean, // show in table
    edit?: boolean, // edit in form
    select?: Array<any>, // select options
    labels?: any, // value labels
    ellipsis?: boolean, // 超长省略
}

export type Model = {
    name: string,
    title: string,
    columns: Array<Column>,
    rules: Object
}
interface ImportMeta {
  readonly env: {
    readonly BASE_URL: string
    readonly CI?: boolean
    [key: string]: string | boolean | undefined
  }
}

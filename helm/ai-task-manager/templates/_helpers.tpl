{{/*
Common labels
*/}}
{{- define "ai-task-manager.labels" -}}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
{{- end }}

{{/*
Database URL
*/}}
{{- define "ai-task-manager.databaseUrl" -}}
postgresql://{{ .Values.postgres.credentials.user }}:{{ .Values.postgres.credentials.password }}@postgres:{{ .Values.postgres.port }}/{{ .Values.postgres.credentials.database }}
{{- end }}

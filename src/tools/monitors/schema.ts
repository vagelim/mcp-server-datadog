import { z } from 'zod'

export const GetMonitorsZodSchema = z.object({
  groupStates: z
    .array(z.enum(['alert', 'warn', 'no data', 'ok']))
    .optional()
    .describe('Filter monitors by their states'),
  name: z.string().optional().describe('Filter monitors by name'),
  tags: z.array(z.string()).optional().describe('Filter monitors by tags'),
})

export const CreateMonitorZodSchema = z.object({
  type: z
    .enum([
      'composite',
      'event alert',
      'log alert',
      'metric alert',
      'process alert',
      'query alert',
      'rum alert',
      'service check',
      'synthetics alert',
      'trace-analytics alert',
      'slo alert',
      'event-v2 alert',
      'audit alert',
      'ci-pipelines alert',
      'ci-tests alert',
      'error-tracking alert',
      'database-monitoring alert',
      'network-performance alert',
    ])
    .describe('The type of monitor'),
  query: z.string().describe('The monitor query string'),
  name: z.string().describe('The name of the monitor'),
  message: z
    .string()
    .optional()
    .describe('Message to include with notifications for this monitor'),
  tags: z
    .array(z.string())
    .optional()
    .describe('Tags to associate with the monitor'),
  priority: z
    .number()
    .int()
    .min(1)
    .max(5)
    .optional()
    .describe('Priority of the monitor (1=highest, 5=lowest)'),
  options: z
    .object({
      thresholds: z
        .object({
          critical: z.number().optional().describe('Alert threshold'),
          warning: z.number().optional().describe('Warning threshold'),
          ok: z.number().optional().describe('Recovery threshold'),
          criticalRecovery: z
            .number()
            .optional()
            .describe('Alert recovery threshold'),
          warningRecovery: z
            .number()
            .optional()
            .describe('Warning recovery threshold'),
        })
        .optional()
        .describe('Alert thresholds'),
      notifyNoData: z
        .boolean()
        .optional()
        .describe('Whether to notify when data is missing'),
      noDataTimeframe: z
        .number()
        .int()
        .optional()
        .describe('Minutes before notifying on missing data'),
      notifyAudit: z
        .boolean()
        .optional()
        .describe('Notify monitor watchers on changes to the monitor'),
      timeoutH: z
        .number()
        .int()
        .optional()
        .describe('Hours until monitor auto-resolves after triggering'),
      renotifyInterval: z
        .number()
        .int()
        .optional()
        .describe(
          'Minutes between re-notifications while the monitor is alerting',
        ),
      evaluationDelay: z
        .number()
        .int()
        .optional()
        .describe('Seconds to delay evaluation to account for data lag'),
      newGroupDelay: z
        .number()
        .int()
        .optional()
        .describe('Seconds to wait before alerting on a new group'),
      requireFullWindow: z
        .boolean()
        .optional()
        .describe(
          'Only evaluate the monitor if a full data window is available',
        ),
      includeTags: z
        .boolean()
        .optional()
        .describe('Whether to include triggering tags into notification title'),
    })
    .optional()
    .describe('Monitor options'),
})

/**
 * Maker-Checker Workflow Engine
 * 
 * Implements the approval state machine required by Brief Section 4.1.
 * Every transaction follows: DRAFT → PENDING_APPROVAL → APPROVED → GENERATED
 * With configurable threshold-based auto-approval and authorization types.
 */

export type WorkflowStatus = 
  | 'draft' 
  | 'pending_approval' 
  | 'approved' 
  | 'rejected' 
  | 'generated' 
  | 'reversed'
  | 'closed';

export type AuthorizationType = 
  | 'sequential'        // Auth Type 1 — must go through levels in order
  | 'horizontal_any';   // Auth Type 2 — any authorized user at the level can approve

export type EntityType = 
  | 'policy' 
  | 'endorsement' 
  | 'claim_registration' 
  | 'claim_settlement' 
  | 'receipt' 
  | 'payment' 
  | 'journal' 
  | 'treaty' 
  | 'customer_master'
  | 'ri_allocation'
  | 'product_version';

export interface WorkflowConfig {
  entityType: EntityType;
  authorizationType: AuthorizationType;
  autoApproveThreshold?: number;  // TZS amount below which auto-approve
  requiresApproval: boolean;
  approvalLevels: number;         // number of approval levels
}

export interface WorkflowEvent {
  id: string;
  user: string;
  role: string;
  action: 'created' | 'submitted' | 'approved' | 'rejected' | 'amended' | 'reversed' | 'generated';
  timestamp: string;
  details?: string;
  previousValue?: string;
  newValue?: string;
}

export interface WorkflowState {
  entityType: EntityType;
  entityId: string;
  status: WorkflowStatus;
  config: WorkflowConfig;
  events: WorkflowEvent[];
  currentLevel: number;
  createdBy: string;
  createdDate: string;
  modifiedBy?: string;
  modifiedDate?: string;
}

// Default workflow configs per entity type (per Brief Section 4.1)
export const WORKFLOW_CONFIGS: Record<EntityType, WorkflowConfig> = {
  policy: {
    entityType: 'policy',
    authorizationType: 'horizontal_any',
    autoApproveThreshold: 50_000_000, // TZS 50M
    requiresApproval: true,
    approvalLevels: 1,
  },
  endorsement: {
    entityType: 'endorsement',
    authorizationType: 'horizontal_any',
    requiresApproval: true,
    approvalLevels: 1,
  },
  claim_registration: {
    entityType: 'claim_registration',
    authorizationType: 'sequential',
    requiresApproval: true,
    approvalLevels: 1,
  },
  claim_settlement: {
    entityType: 'claim_settlement',
    authorizationType: 'sequential',
    autoApproveThreshold: 5_000_000, // TZS 5M
    requiresApproval: true,
    approvalLevels: 2,
  },
  receipt: {
    entityType: 'receipt',
    authorizationType: 'horizontal_any',
    autoApproveThreshold: 10_000_000, // TZS 10M
    requiresApproval: true,
    approvalLevels: 1,
  },
  payment: {
    entityType: 'payment',
    authorizationType: 'horizontal_any',
    requiresApproval: true,
    approvalLevels: 1,
  },
  journal: {
    entityType: 'journal',
    authorizationType: 'horizontal_any',
    requiresApproval: true,
    approvalLevels: 1,
  },
  treaty: {
    entityType: 'treaty',
    authorizationType: 'sequential',
    requiresApproval: true,
    approvalLevels: 2,
  },
  customer_master: {
    entityType: 'customer_master',
    authorizationType: 'horizontal_any',
    autoApproveThreshold: 100_000_000, // TZS 100M credit limit
    requiresApproval: true,
    approvalLevels: 1,
  },
  ri_allocation: {
    entityType: 'ri_allocation',
    authorizationType: 'horizontal_any',
    requiresApproval: true,
    approvalLevels: 1,
  },
  product_version: {
    entityType: 'product_version',
    authorizationType: 'sequential',
    requiresApproval: true,
    approvalLevels: 2, // Needs underwriting manager approval
  },
};

// Valid state transitions
const VALID_TRANSITIONS: Record<WorkflowStatus, WorkflowStatus[]> = {
  draft: ['pending_approval', 'approved'], // approved directly if below threshold
  pending_approval: ['approved', 'rejected'],
  approved: ['generated', 'reversed'],
  rejected: ['draft'], // can be re-edited and re-submitted
  generated: ['reversed'],
  reversed: ['draft'],
  closed: [],
};

export function canTransition(from: WorkflowStatus, to: WorkflowStatus): boolean {
  return VALID_TRANSITIONS[from]?.includes(to) ?? false;
}

export function getNextActions(status: WorkflowStatus): WorkflowStatus[] {
  return VALID_TRANSITIONS[status] || [];
}

export function shouldAutoApprove(config: WorkflowConfig, amount: number): boolean {
  if (!config.requiresApproval) return true;
  if (config.autoApproveThreshold && amount < config.autoApproveThreshold) return true;
  return false;
}

export function createWorkflowState(
  entityType: EntityType,
  entityId: string,
  createdBy: string,
): WorkflowState {
  const config = WORKFLOW_CONFIGS[entityType];
  const now = new Date().toISOString();
  
  return {
    entityType,
    entityId,
    status: 'draft',
    config,
    events: [{
      id: `evt-${Date.now()}`,
      user: createdBy,
      role: 'Maker',
      action: 'created',
      timestamp: now,
      details: `${entityType} record created`,
    }],
    currentLevel: 0,
    createdBy,
    createdDate: now,
  };
}

// Mock approval data for prototype demonstration
export const MOCK_PENDING_APPROVALS = [
  { id: 'APR-001', entityType: 'policy' as EntityType, entityId: 'P11/2026/100/5042', description: 'New Motor Commercial Policy — Acme Corp Ltd', submittedBy: 'SARAH-UW', submittedDate: '12/05/2026 14:30', amount: 'TZS 45,000,000', status: 'pending_approval' as WorkflowStatus },
  { id: 'APR-002', entityType: 'claim_settlement' as EntityType, entityId: 'C11/100/1002/2026/011654', description: 'Partial Settlement — Fire Damage — Acme Corp Ltd', submittedBy: 'EUGINIA-CL', submittedDate: '12/05/2026 11:15', amount: 'TZS 12,500,000', status: 'pending_approval' as WorkflowStatus },
  { id: 'APR-003', entityType: 'receipt' as EntityType, entityId: 'RVB100-20261', description: 'Bank Receipt TZS — Premium Collection — Global Industries', submittedBy: 'ANISH-FN', submittedDate: '12/05/2026 09:45', amount: 'TZS 120,000,000', status: 'pending_approval' as WorkflowStatus },
  { id: 'APR-004', entityType: 'payment' as EntityType, entityId: 'PVB103-20261', description: 'Bank Payment USD — Claim Settlement — ALBIZIA LIMITED', submittedBy: 'SHUKURU-FN', submittedDate: '11/05/2026 16:20', amount: 'USD 434.00', status: 'pending_approval' as WorkflowStatus },
  { id: 'APR-005', entityType: 'treaty' as EntityType, entityId: 'FIR-2026', description: 'Fire Proportional Treaty 2026 — Setup Complete', submittedBy: 'JOHN-RI', submittedDate: '10/05/2026 10:00', amount: 'TZS 5,000,000,000', status: 'pending_approval' as WorkflowStatus },
  { id: 'APR-006', entityType: 'endorsement' as EntityType, entityId: 'P11/2025/100/5044-END-01', description: 'Mid-Term Addition — Additional Vehicle — John Doe', submittedBy: 'MIKE-UW', submittedDate: '11/05/2026 13:00', amount: 'TZS 3,200,000', status: 'pending_approval' as WorkflowStatus },
  { id: 'APR-007', entityType: 'ri_allocation' as EntityType, entityId: 'P11/2026/200/1008', description: 'RI Allocation — Fire & Allied Perils — Global Industries', submittedBy: 'SARAH-UW', submittedDate: '12/05/2026 08:30', amount: 'TZS 8,500,000,000', status: 'pending_approval' as WorkflowStatus },
];

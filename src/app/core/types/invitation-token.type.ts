export interface InvitationToken {
    id: number;
    token: string;
    createdBy: number;
    usedBy: number | null;
    expiresAt: string | null;
    usedAt: string | null;
    createdAt: string;
    isUsed: boolean;
    isExpired: boolean;
    isValid: boolean;
}

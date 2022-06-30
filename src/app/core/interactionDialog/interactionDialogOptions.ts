import { AttentionTypes } from "./attentionTypes";

export interface IInteractionDialogOptions{
    title?: string;
    message?: string;
    details?: string;
    noButtonText?: string;
    noButtonVisible?: boolean;
    okButtonText?: string;
    okButtonVisible?: boolean;
    cancelButtonText?: string;
    cancelButtonVisible? : boolean;
    dialogWidth?: number;
    dialogTop?: number;
    attentionType?: AttentionTypes;
}
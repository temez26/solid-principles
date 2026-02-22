/** Outbound DTO — what the use case returns to the interface layer */
export interface TodoResponseDTO {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}
/** Outbound DTO — what the use case returns to the presentation layer */
export interface TodoResponseDTO {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}
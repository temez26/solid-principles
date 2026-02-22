/**
 * ISP — Interface Segregation Principle
 *
 * Generic, minimal use case interface.
 * Each concrete use case implements exactly one operation.
 */
export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
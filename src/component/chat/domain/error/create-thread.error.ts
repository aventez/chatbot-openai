export type CreateThreadError = UnknownError | InsufficientBalance | InvalidApiKey;

type UnknownError = 'UNKNOWN_ERROR';
type InsufficientBalance = 'INSUFFICIENT_BALANCE';
type InvalidApiKey = 'INVALID_API_KEY';
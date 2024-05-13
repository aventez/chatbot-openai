export type GetThreadMessagesError = UnknownError | InsufficientBalance | InvalidApiKey;

type UnknownError = 'UNKNOWN_ERROR';
type InsufficientBalance = 'INSUFFICIENT_BALANCE';
type InvalidApiKey = 'INVALID_API_KEY';

// TBD MERGE THEM ALL INTO SOME OPENAI EXCEPTIONS
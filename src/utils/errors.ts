/// Error handling stuff

export class Errorer {
    constructor() {}

    error(err: string): Error {
        throw new Error(err);
    }

    /** Extracts message from Error
     * Taken from https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
     */
    getErrorMessage(error: unknown) {
        if (error instanceof Error) return error.message;
        return String(error);
    }

}
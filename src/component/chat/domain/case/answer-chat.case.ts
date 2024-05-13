import { Either, Right } from "purify-ts";
import { Inject } from "@nestjs/common";
import { AnswerChatError } from "../error/answer-chat.error";
import { AnswerChatResponseDto } from "../../ui/http/dto/answer-chat-response.dto";
import { AnswerChatDto } from "../../ui/http/dto/answer-chat.dto";
import { CreateMessageOperation, createMessageOperationSymbol } from "../operation/create-message.operation";
import { StartThreadProcessingOperation, startThreadProcessingOperationSymbol } from "../operation/start-thread-processing.operation";
import { GetThreadProcessingStatusOperation, getThreadProcessingStatusOperationSymbol } from "../operation/get-thread-processing-status.operation";
import { GetThreadMessagesOperation, getThreadMessagesOperationSymbol } from "../operation/get-thread-messages.operation";
import { SubmitToolOutputsOperation, submitToolOutputsOperationSymbol } from "../operation/submit-tool-outputs.operation";
import { sleep } from "openai/core";
import { TextContentBlock } from "openai/resources/beta/threads/messages";

export class AnswerChatCase {
    constructor(
        @Inject(createMessageOperationSymbol) private readonly createMessageOperation: CreateMessageOperation,
        @Inject(startThreadProcessingOperationSymbol) private readonly startThreadProcessingOperation: StartThreadProcessingOperation,
        @Inject(getThreadProcessingStatusOperationSymbol) private readonly getThreadProcessingStatusOperation: GetThreadProcessingStatusOperation,
        @Inject(getThreadMessagesOperationSymbol) private readonly getThreadMessagesOperation: GetThreadMessagesOperation,
        @Inject(submitToolOutputsOperationSymbol) private readonly submitToolOutputsOperation: SubmitToolOutputsOperation,
    ) {}


    // There should be also a path to use async/streamed responses, via websocket etc.
    async execute(payload: AnswerChatDto): Promise<Either<AnswerChatError, AnswerChatResponseDto>> {
        const createMessageResult = await this.createMessageOperation.execute(
            payload.threadId,
            payload.content,
            payload.file_ids,
            payload.metadata,
        );
        if (createMessageResult.isLeft()) {
            return createMessageResult;
        }

        const run = await this.startThreadProcessingOperation.execute(payload.threadId);
        if (run.isLeft()) {
            return run;
        }

        while (true) {
            const statusResult = await this.getThreadProcessingStatusOperation.execute(payload.threadId, run.unsafeCoerce().id);
            if (statusResult.isLeft()) throw new Error("Error getting processing status");

            const status = statusResult.unsafeCoerce();
            if (status.status === 'completed') break;
            if (status.status === 'requires_action') {
                const outputs = await Promise.all(status.required_action.submit_tool_outputs.tool_calls.map(async toolCall => {
                    console.log(toolCall)
                    switch (toolCall.function.name) {
                        case 'get_doctor_availability':
                            return { tool_call_id: toolCall.id, output: await this.getDoctorAvailability(toolCall.function.arguments) };
                        case 'book_appointment':
                            return { tool_call_id: toolCall.id, output: await this.bookAppointment(toolCall.function.arguments) };
                        default:
                            throw new Error(`Unsupported tool call: ${toolCall.function.name}`);
                    }
                }));
        
                const submitResult = await this.submitToolOutputsOperation.execute(payload.threadId, status.id, outputs);
                if (submitResult.isLeft()) return submitResult;
            }
            await sleep(2000);
        }
        const result = await this.getThreadMessagesOperation.execute(payload.threadId);
        if (result.isLeft()) return result;
        
        const lastMessage = result.unsafeCoerce().data
            .filter(message => message.run_id === run.unsafeCoerce().id && message.role === "assistant")
            .pop();
        const content = lastMessage.content[0] as TextContentBlock;

        return Right({ 
            threadId: payload.threadId, 
            content: content.text.value 
        });
    }

    // TBD: it should be external operation, that calls the API.
    async bookAppointment(rawData: string): Promise<string> {
        console.log('Booking appointment')
        console.log(rawData)

        return JSON.stringify({
            "success": true
        });
    }

    async getDoctorAvailability(rawData: string): Promise<string> {
        console.log('Presenting availability')

        return JSON.stringify([
            {
                "Start": "2024-05-06T09:00:00",
                "End": "2024-05-06T09:10:00",
            },
            {
                "Start": "2024-05-06T09:10:00",
                "End": "2024-05-06T09:20:00",
            },
            {
                "Start": "2024-05-06T09:20:00",
                "End": "2024-05-06T09:30:00",
            },
        ])
    }
}
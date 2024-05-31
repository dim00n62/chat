export type Message = {
    id: string;
    text: string;
    type: 'bot' | 'user';
    date: number;
    loading?: boolean;
};

export type Messages = Array<Message>;

export type MessageResponse = {
    id: string;
    chat_id: string;
    text: string;
    object: string;
    mtype: string;
    mstatus: string;
    created_at: number;
    evaluation: string;
    comment: string;
};
